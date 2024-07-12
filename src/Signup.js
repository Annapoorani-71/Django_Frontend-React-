import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    fname: '',
    email: '',
    password: '',
  });

  const [isLoginMode, setIsLoginMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLoginMode ? 'http://127.0.0.1:8000/users/login/' : 'http://127.0.0.1:8000/users/create/';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        // Optionally, reset the form after successful submission
        setFormData({
          name: '',
          fname: '',
          email: '',
          password: '',
        });
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(prevMode => !prevMode);
    setFormData({
      name: '',
      fname: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="container">
      <div className={`form-container ${isLoginMode ? 'sign-in' : 'sign-up'}`}>
        <form onSubmit={handleSubmit}>
          <h1>{isLoginMode ? 'Login' : 'Create Account'}</h1>
          {!isLoginMode && (
            <div className="social-icons">
              <a href="https://www.instagram.com/jiiva.___.79/" className="icon"><i className="fab fa-instagram"></i></a>
              <a href="https://github.com/jeeva79" className="icon"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/jeeva-p-637323230/" className="icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
          )}
          {!isLoginMode && <span>or use your email for registration</span>}
          {!isLoginMode && (
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          {!isLoginMode && (
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLoginMode && (
            <input
              type="password"
              placeholder="Retype Password"
              required
            />
          )}
          <button type="submit">{isLoginMode ? 'Login' : 'Sign Up'}</button>
        </form>
        <button className={`toggle-btn ${isLoginMode ? 'right-panel-active' : ''}`} onClick={toggleMode}>
          {isLoginMode ? 'Create Account' : 'Login'}
        </button>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className={`toggle-panel ${isLoginMode ? 'toggle-left' : 'toggle-right'}`}>
            <h1>{isLoginMode ? 'Welcome Back!' : 'Hello, Friend!'}</h1>
            <p>{isLoginMode ? 'Enter your email and password to access all site features' : 'Register with your personal details to use all site features'}</p>
            <button className={`hidden ${isLoginMode ? 'login' : 'signup'}`} id={isLoginMode ? 'login' : 'register'}>
              {isLoginMode ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
