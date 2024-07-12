import React, { useState } from 'react';
import "./Signup.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
      const response = await fetch('http://127.0.0.1:8000/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Login successful!');
        // Handle successful login, such as redirecting or setting user state
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="social-icons">
            <a href="https://www.instagram.com/jiiva.___.79/" className="icon">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://github.com/jeeva79" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/jeeva-p-637323230/" className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email and password</span>
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
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
