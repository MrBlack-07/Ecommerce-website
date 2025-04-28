// DOM selection
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const errorMessage = document.getElementById("error-message");
const togglePassword = document.getElementById("togglePassword");

// Event Listener for Password Visibility Toggle
togglePassword.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Form Validation Logic
function validateForm(email, password) {
    if (!email.includes("@")) {
        return "Please enter a valid email address.";
    }
    if (password.length < 6) {
        return "Password must be at least 6 characters long.";
    }
    return null; // No errors
}

// Event Listener for Login Button
loginBtn.addEventListener("click", function(e) {
    e.preventDefault();  // Prevents form submission to backend

    const email = emailInput.value;
    const password = passwordInput.value;

    const error = validateForm(email, password);

    if (error) {
        errorMessage.textContent = error; // Display error message
    } else {
        errorMessage.textContent = ""; // Clear error message
        // Save to localStorage (mock backend storage)
        localStorage.setItem("email", email);
        localStorage.setItem("password", password); // Note: Never store passwords like this in real apps!

        // Successful login action
        alert("Login successful!");
        // Redirect or further action can go here
    }
});
