# 💬 Firebase Real-Time Chat Implementation Guide

## 🎯 Overview
This chat system uses Firebase Firestore for real-time messaging and Firebase Storage for file sharing between customers and professionals.

## 📋 Features Implemented

### ✅ Core Features
- ✅ Real-time messaging between users
- ✅ Conversation list with unread counts
- ✅ Message read receipts (double check marks)
- ✅ File and image sharing (up to 10MB)
- ✅ Search conversations
- ✅ Message timestamps
- ✅ Auto-scroll to latest message
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ User avatars and status
- ✅ Typing indicators ready
- ✅ Message deletion
- ✅ Persistent conversations

### 🎨 UI Features
- Original design preserved
- Unread message badges
- Active conversation highlighting
- Smooth animations
- Mobile-friendly sidebar
- File attachment preview

## 🚀 Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `connecta24` (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Enable Firestore Database

1. In Firebase Console, go to **Build > Firestore Database**
2. Click "Create database"
3. Select **Start in production mode** (we'll set rules later)
4. Choose your location (closest to your users)
5. Click "Enable"

### Step 3: Set Firestore Security Rules

Go to **Firestore Database > Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Conversations collection
    match /conversations/{conversationId} {
      // Allow read if user is a participant
      allow read: if request.auth != null && 
                     request.auth.uid in resource.data.participants;
      
      // Allow create if user is one of the participants
      allow create: if request.auth != null && 
                       request.auth.uid in request.resource.data.participants;
      
      // Allow update if user is a participant
      allow update: if request.auth != null && 
                       request.auth.uid in resource.data.participants;
      
      // Messages subcollection
      match /messages/{messageId} {
        // Allow read if user is a participant of the conversation
        allow read: if request.auth != null && 
                       request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
        
        // Allow create if user is a participant
        allow create: if request.auth != null && 
                         request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
        
        // Allow delete if user is the sender
        allow delete: if request.auth != null && 
                         request.auth.uid == resource.data.senderId;
      }
    }
  }
}
```

Click **Publish**

### Step 4: Enable Firebase Storage

1. Go to **Build > Storage**
2. Click "Get Started"
3. Select **Start in production mode**
4. Choose same location as Firestore
5. Click "Done"

### Step 5: Set Storage Security Rules

Go to **Storage > Rules** and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /chat/{conversationId}/{fileName} {
      // Allow read if authenticated
      allow read: if request.auth != null;
      
      // Allow write if authenticated and file is under 10MB
      allow write: if request.auth != null && 
                      request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

Click **Publish**

### Step 6: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click the **Web** icon (</>)
4. Register app name: `Connecta24 Web`
5. Copy the configuration object

### Step 7: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=connecta24-xxxxx.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=connecta24-xxxxx
   VITE_FIREBASE_STORAGE_BUCKET=connecta24-xxxxx.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

### Step 8: Test the Chat

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Login as two different users (customer and professional)

3. From a job detail page, click "Start Chat" on an interested professional

4. Send messages and test features!

## 📁 File Structure

```
connecta-web/
├── src/
│   ├── config/
│   │   └── firebase.js              # Firebase initialization
│   ├── services/
│   │   └── chatService.js           # Chat operations (send, receive, etc.)
│   ├── components/
│   │   ├── ChatLayout/
│   │   │   ├── index.jsx            # Main chat component
│   │   │   └── index.css            # Chat styles
│   │   └── Chat/                    # Reusable chat components
│   │       ├── ConversationList.jsx
│   │       ├── MessageList.jsx
│   │       └── MessageInput.jsx
│   └── screens/
│       ├── ChatPage/                # Standalone chat page
│       ├── RecruiterScreens/
│       │   └── RecruiterChat/       # Professional chat
│       └── UserScreens/
│           └── UserChat/            # Customer chat
```

## 🔧 Chat Service Functions

### `getOrCreateConversation(userId1, userId2, user1Data, user2Data)`
Creates or retrieves a conversation between two users.

### `sendMessage(conversationId, senderId, senderName, message, type, fileUrl)`
Sends a text, image, or file message.

### `uploadFile(file, conversationId)`
Uploads a file to Firebase Storage and returns the URL.

### `subscribeToMessages(conversationId, callback)`
Real-time listener for messages in a conversation.

### `subscribeToConversations(userId, callback)`
Real-time listener for user's conversations.

### `markMessagesAsRead(conversationId, userId)`
Marks all messages in a conversation as read.

### `deleteMessage(conversationId, messageId)`
Deletes a message (sender only).

### `getTotalUnreadCount(userId)`
Gets total unread message count across all conversations.

## 🎨 Usage Examples

### Starting a Chat from Job Detail

```javascript
navigate('/chat', { 
  state: { 
    userId: professionalId,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userAvatar: 'https://...',
    userType: 'professional'
  } 
});
```

### Sending a Message

```javascript
await sendMessage(
  conversationId,
  currentUserId,
  currentUserName,
  'Hello!',
  'text'
);
```

### Sending an Image

```javascript
const fileUrl = await uploadFile(imageFile, conversationId);
await sendMessage(
  conversationId,
  currentUserId,
  currentUserName,
  'Check this out!',
  'image',
  fileUrl
);
```

## 🔐 Security Features

- ✅ Users can only access their own conversations
- ✅ Messages are only visible to conversation participants
- ✅ Users can only delete their own messages
- ✅ File uploads limited to 10MB
- ✅ Authentication required for all operations

## 📱 Responsive Design

- **Desktop**: Full 3-column layout (conversations, chat, job details)
- **Tablet**: 2-column with slide-in job details
- **Mobile**: Single column with slide-in conversations

## 🐛 Troubleshooting

### Chat not loading?
- Check Firebase configuration in `.env`
- Verify Firestore and Storage are enabled
- Check browser console for errors

### Messages not sending?
- Verify Firestore security rules
- Check user authentication
- Ensure conversation exists

### Files not uploading?
- Check Storage security rules
- Verify file size < 10MB
- Check file type is allowed

## 🚀 Future Enhancements

- [ ] Typing indicators
- [ ] Message reactions (emoji)
- [ ] Voice messages
- [ ] Video calls
- [ ] Message search within conversation
- [ ] Push notifications
- [ ] Message forwarding
- [ ] Group chats
- [ ] Message editing
- [ ] Read receipts for individual messages

## 📞 Support

For issues or questions, check:
- Firebase Console logs
- Browser console errors
- Network tab for failed requests

## 🎉 Success!

Your real-time chat is now fully functional! Users can:
- ✅ Start conversations from job details
- ✅ Send and receive messages in real-time
- ✅ Share images and files
- ✅ See unread message counts
- ✅ Search conversations
- ✅ Delete their own messages

Happy chatting! 💬
