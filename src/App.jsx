// import { useEffect, useState } from "react";
// import Home from "./pages/Home";
// import LoginSignup from "./pages/LoginSignup";

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const isLogged = localStorage.getItem("isLoggedIn") === "true";
//     setLoggedIn(isLogged);
//   }, []);

//   return loggedIn ? <Home /> : <LoginSignup onLogin={() => setLoggedIn(true)} />;
// }

// export default App;
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import AuthModal from "./components/AuthModal"; // We'll create this

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

  return (
    <>
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