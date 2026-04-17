import { db, storage, isFirebaseConfigured } from '../config/firebase';

export const testFirebaseConnection = async () => {
  try {
    console.log('🔍 Testing Firebase connection...');
    
    // Check if Firebase is configured
    if (!isFirebaseConfigured()) {
      console.warn('⚠️ Firebase is not properly configured');
      console.warn('Please update your Firebase credentials in:');
      console.warn('  1. connecta-web/.env file (recommended)');
      console.warn('  2. connecta-web/src/config/firebase.js (alternative)');
      console.warn('See CHAT_SETUP.md for detailed instructions');
      return false;
    }
    
    // Check if services are initialized
    if (!db) {
      console.error('❌ Firestore is not initialized');
      return false;
    }
    
    if (!storage) {
      console.error('❌ Storage is not initialized');
      return false;
    }
    
    console.log('✅ Firebase services initialized successfully');
    console.log('✅ Firestore: Ready');
    console.log('✅ Storage: Ready');
    console.log('💬 Chat features are available');
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
    });
    
    if (error.code === 'permission-denied') {
      console.error('⚠️  Firestore security rules may need to be configured');
    } else if (error.message?.includes('API key')) {
      console.error('⚠️  Firebase API key is invalid or missing');
    }
    
    return false;
  }
};

// Run test on import (only in development)
if (import.meta.env.DEV) {
  testFirebaseConnection();
}
