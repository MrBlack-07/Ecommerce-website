// export function isLoggedIn() {
//     return localStorage.getItem("isLoggedIn") === "true";
//   }
  
//   export function logIn() {
//     localStorage.setItem("isLoggedIn", "true");
//   }
  
//   export function logOut() {
//     localStorage.removeItem("isLoggedIn");
//   }
  
  
  
// import { logIn } from "./auth";
  
//   const handleLogin = async () => {
   
//     logIn();
//     props.onLogin(); e
//   };
export function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

// 2. Login function (sets flag + stores user data if needed)
export function logIn(userData = null) {
  localStorage.setItem("isLoggedIn", "true");
  if (userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
}

// 3. Logout function (clears all auth-related data)
export function logOut() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");
}

// 4. Get current user data (optional)
export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}