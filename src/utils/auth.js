export function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

// 2. Login function (sets flag + stores user data if needed)
export const logIn = (user) => {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('user', JSON.stringify(user));
};

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