import React, { useState, useEffect } from 'react';
import { loadingManager } from '../../utils/loadingManager';
import './Loader.css';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Subscribe to loading changes
    const unsubscribe = loadingManager.subscribe((loading) => {
      setIsLoading(loading);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  if (!isLoading) return null;

  return (
    <div className="global-loader-overlay">
      <div className="global-loader-container">
        <div className="loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-logo">
            <svg viewBox="0 0 50 50" className="logo-icon">
              <circle cx="25" cy="25" r="20" fill="#26472b" />
              <path d="M25 15 L25 35 M15 25 L35 25" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
