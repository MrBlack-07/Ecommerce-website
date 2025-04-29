import React, { useState } from 'react';
import axios from 'axios';
import "./LoginSignup.css";
// import { logIn } from '../utils/auth'; // Import login utility
import { logIn } from '/src/utils/auth.js';

const LoginSignup = ({ onLogin, onGuestContinue }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    password: '',
    emailOrMobile: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        const response = await axios.post('/api/login', {
          emailOrMobile: formData.email || formData.mobile,
          password: formData.password
        });
        
        if (response.data.message === 'Login successful') {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          onLogin();
        }
      } else {
        const response = await axios.post('/api/signup', formData);
        
        if (response.data.message === 'User registered successfully') {
          // Auto-login after successful signup
          const loginResponse = await axios.post('/api/login', {
            emailOrMobile: formData.email,
            password: formData.password
          });
          
          if (loginResponse.data.message === 'Login successful') {
            localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
            onLogin();
          }
        }
      }
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isLogin ? 'login-mode' : 'signup-mode'}`}>
        <div className="auth-header">
          <img src="/logo.PNG" alt="Logo" className="auth-logo" />
          <h3 className="auth-title">{isLogin ? 'Welcome Back!' : 'Create Account'}</h3>
          <p className="auth-subtitle">
            {isLogin ? 'Login to access your account' : 'Join us today'}
          </p>
        </div>

        {message && (
          <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} fade-in`}>
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-fields">
              <div className="form-group floating-label">
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="form-control"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label htmlFor="fullname">Full Name</label>
                <i className="bi bi-person-fill input-icon"></i>
              </div>

              <div className="form-group floating-label">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label htmlFor="email">Email Address</label>
                <i className="bi bi-envelope-fill input-icon"></i>
              </div>

              <div className="form-group floating-label">
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  pattern="[6-9]{1}[0-9]{9}"
                  maxLength="10"
                  className="form-control"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label htmlFor="mobile">Mobile Number</label>
                <i className="bi bi-phone-fill input-icon"></i>
              </div>
            </div>
          )}

          {isLogin && (
            <div className="form-group floating-label">
              <input
                type="text"
                name="emailOrMobile"
                id="emailOrMobile"
                className="form-control"
                value={formData.emailOrMobile}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="emailOrMobile">Email or Mobile</label>
              <i className="bi bi-person-fill input-icon"></i>
            </div>
          )}

          <div className="form-group floating-label">
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
            <i className="bi bi-lock-fill input-icon"></i>
          </div>

          {isLogin && (
            <div className="d-flex justify-content-end mb-3">
              <a href="/forgot-password" className="text-decoration-none small">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {isLogin ? 'Logging in...' : 'Creating account...'}
              </>
            ) : (
              isLogin ? 'Login' : 'Sign Up'
            )}
          </button>

          <div className="auth-divider"><span>OR</span></div>
        </form>
        <div className="guest-option">
          <button
            className="btn btn-outline"
            onClick={onGuestContinue}>
            Continue as Guest
          </button>
        </div>
        <div className="auth-footer text-center">
          <p className="mb-2">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              className="btn btn-link p-0 ms-2 toggle-mode-btn"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage('');
                setFormData({
                  fullname: '',
                  email: '',
                  mobile: '',
                  password: '',
                  emailOrMobile: '',
                });
              }}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
          <p className="terms-text">
            By {isLogin ? 'logging in' : 'signing up'}, you agree to our{' '}
            <a href="/terms" className="text-decoration-none">Terms</a> and{' '}
            <a href="/privacy" className="text-decoration-none">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;