import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  getDocs,
  setDoc,
  getDoc,
  limit,
  deleteDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from '../config/firebase';

// Check if Firebase is available
const checkFirebase = () => {
  if (!db || !storage) {
    throw new Error('Firebase is not initialized. Please check your Firebase configuration.');
  }
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase credentials are not configured. Please update your .env file or firebase.js');
  }
};

// Remove undefined values from an object (Firestore doesn't accept undefined)
const sanitizeForFirestore = (obj) => {
  if (obj === null || obj === undefined) return null;
  if (typeof obj !== 'object') return obj;
  
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      sanitized[key] = typeof value === 'object' && value !== null
        ? sanitizeForFirestore(value)
        : value;
    }
  }
  return sanitized;
};

// Create or get conversation between two users
export const getOrCreateConversation = async (userId1, userId2, user1Data, user2Data, jobDetails = null) => {
  try {
    checkFirebase();
    
    // Create a consistent conversation ID
    const conversationId = [userId1, userId2].sort().join('_');
    const conversationRef = doc(db, 'conversations', conversationId);
    
    // Check if conversation exists
    const conversationSnap = await getDoc(conversationRef);
    
    if (!conversationSnap.exists()) {
      // Sanitize jobDetails to remove any undefined values
      const cleanJobDetails = jobDetails ? sanitizeForFirestore(jobDetails) : null;
      
      // Create new conversation
      await setDoc(conversationRef, {
        id: conversationId,
        participants: [userId1, userId2],
        participantsData: {
          [userId1]: {
            id: userId1,
            name: user1Data.name || null,
            email: user1Data.email || null,
            avatar: user1Data.avatar || null,
            userType: user1Data.userType || null,
          },
          [userId2]: {
            id: userId2,
            name: user2Data.name || null,
            email: user2Data.email || null,
            avatar: user2Data.avatar || null,
            userType: user2Data.userType || null,
          },
        },
        lastMessage: null,
        lastMessageTime: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        unreadCount: {
          [userId1]: 0,
          [userId2]: 0,
        },
        jobDetails: cleanJobDetails,
      });
    }
    
    return conversationId;
  } catch (error) {
    throw error;
  }
};

// Send a message
export const sendMessage = async (conversationId, senderId, senderName, message, type = 'text', fileUrl = null) => {
  try {
    checkFirebase();

    const conversationRef = doc(db, 'conversations', conversationId);
    const conversationSnap = await getDoc(conversationRef);

    if (!conversationSnap.exists()) {
      throw new Error('Conversation not ready. Please wait a moment and try again.');
    }

    const conversationData = conversationSnap.data();
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');

    await addDoc(messagesRef, {
      senderId,
      senderName,
      message,
      type,
      fileUrl,
      timestamp: serverTimestamp(),
      read: false,
    });

    const otherUserId = conversationData.participants?.find(id => id !== senderId);
    if (otherUserId) {
      await updateDoc(conversationRef, {
        lastMessage: type === 'text' ? message : `Sent a ${type}`,
        lastMessageTime: serverTimestamp(),
        updatedAt: serverTimestamp(),
        [`unreadCount.${otherUserId}`]: (conversationData.unreadCount?.[otherUserId] || 0) + 1,
      });
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Upload file to Firebase Storage
export const uploadFile = async (file, conversationId) => {
  try {
    checkFirebase();
    
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `chat/${conversationId}/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    throw error;
  }
};

// Listen to messages in real-time
export const subscribeToMessages = (conversationId, callback, limitCount = 50) => {
  checkFirebase();
  
  const messagesRef = collection(db, 'conversations', conversationId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(limitCount));
  
  return onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    callback(messages.reverse());
  }, () => {
    callback([]);
  });
};

// Listen to user's conversations
export const subscribeToConversations = (userId, callback) => {
  checkFirebase();
  
  const conversationsRef = collection(db, 'conversations');
  const q = query(
    conversationsRef,
    where('participants', 'array-contains', userId),
    orderBy('lastMessageTime', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const conversations = [];
    snapshot.forEach((doc) => {
      conversations.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    callback(conversations);
  }, () => {
    callback([]);
  });
};

// Mark messages as read
export const markMessagesAsRead = async (conversationId, userId) => {
  try {
    checkFirebase();
    
    const conversationRef = doc(db, 'conversations', conversationId);
    
    const conversationSnap = await getDoc(conversationRef);
    if (!conversationSnap.exists()) return;
    
    await updateDoc(conversationRef, {
      [`unreadCount.${userId}`]: 0,
    });
    
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const q = query(messagesRef, where('senderId', '!=', userId), where('read', '==', false));
    
    const snapshot = await getDocs(q);
    const updatePromises = [];
    
    snapshot.forEach((document) => {
      updatePromises.push(updateDoc(doc(db, 'conversations', conversationId, 'messages', document.id), {
        read: true,
      }));
    });
    
    await Promise.all(updatePromises);
  } catch (error) {
    // silently fail - not critical
  }
};

// Delete a message
export const deleteMessage = async (conversationId, messageId) => {
  try {
    checkFirebase();
    await deleteDoc(doc(db, 'conversations', conversationId, 'messages', messageId));
  } catch (error) {
    throw error;
  }
};

// Search messages
export const searchMessages = async (conversationId, searchTerm) => {
  try {
    checkFirebase();
    
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const snapshot = await getDocs(messagesRef);
    
    const messages = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.message && data.message.toLowerCase().includes(searchTerm.toLowerCase())) {
        messages.push({
          id: doc.id,
          ...data,
        });
      }
    });
    
    return messages;
  } catch (error) {
    throw error;
  }
};

// Get total unread count for user
export const getTotalUnreadCount = async (userId) => {
  try {
    checkFirebase();
    
    const conversationsRef = collection(db, 'conversations');
    const q = query(conversationsRef, where('participants', 'array-contains', userId));
    
    const snapshot = await getDocs(q);
    let totalUnread = 0;
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      totalUnread += data.unreadCount?.[userId] || 0;
    });
    
    return totalUnread;
  } catch (error) {
    return 0;
  }
};
