import React from 'react';
import "./AuthModal.css";

const AuthModal = ({ onLogin, onGuestContinue, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <h3>Login Required</h3>
          <p>Please login to access all features, or continue as guest with limited access.</p>
          
          <div className="modal-actions">
            <button 
              className="btn btn-primary"
              onClick={onLogin}
            >
              Login / Sign Up
            </button>
            
            <button
              className="btn btn-secondary"
              onClick={onGuestContinue}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;