import React from 'react';
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import AuthModal from "./components/AuthModal";
import Navbar from './components/Navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(isLogged);
  }, []);

  // Function to check auth before actions
  const requireAuth = () => {
    if (!loggedIn && !isGuest) {
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  const handleProtectedAction = () => {
    // Handle guest user actions (e.g., show login modal)
    console.log('Please sign in to continue');
  };

  return (
    <>
      {(loggedIn || isGuest) && (
        <Navbar isGuest={isGuest} onProtectedAction={handleProtectedAction} />
      )}
      {loggedIn || isGuest ? (
        <Home 
          requireAuth={requireAuth} 
          isGuest={isGuest}
        />
      ) : (
        <LoginSignup 
          onLogin={() => setLoggedIn(true)} 
          onGuestContinue={() => setIsGuest(true)}
        />
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onLogin={() => {
            setShowAuthModal(false);
            setLoggedIn(true);
          }}
          onGuestContinue={() => {
            setShowAuthModal(false);
            setIsGuest(true);
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}

export default App;