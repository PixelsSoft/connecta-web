import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';

const MessageInput = ({ onSendMessage, onSendFile, disabled }) => {
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    try {
      await onSendFile(file);
      toast.success('File sent successfully');
    } catch (error) {
      toast.error('Failed to send file');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-input-form">
        <button
          type="button"
          className="btn-attachment"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
          title="Attach file"
        >
          <i className="bi bi-paperclip"></i>
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
        
        <textarea
          className="message-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled || isUploading}
          rows="1"
        />
        
        <button
          type="submit"
          className="btn-send"
          disabled={!message.trim() || disabled || isUploading}
          title="Send message"
        >
          {isUploading ? (
            <i className="bi bi-hourglass-split"></i>
          ) : (
            <i className="bi bi-send-fill"></i>
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
