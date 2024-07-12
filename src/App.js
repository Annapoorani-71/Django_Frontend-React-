import React, { useState } from 'react';
import './App.css';
import { FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    fname: '',
    email: '',
    password: '',
    retypePassword: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.retypePassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/users/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupData.name,
          fname: signupData.fname,
          email: signupData.email,
          password: signupData.password,
        }),
      });

      if (response.ok) {
        console.log('User created successfully!');
        setSignupData({
          name: '',
          fname: '',
          email: '',
          password: '',
          retypePassword: '',
        });
        alert('User created successfully!');
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');

    try {
      const response = await fetch('http://127.0.0.1:8000/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      console.log('Response received:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful!', data);
        alert('Login successful!');
        // Optionally, handle user data or redirect
      } else {
        const errorData = await response.json();
        console.error('Failed to login:', errorData);
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSignupSubmit}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="https://www.instagram.com/jiiva.___.79/" className="icon"><FaInstagram /></a>
            <a href="https://github.com/jeeva79" className="icon"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/jeeva-p-637323230/" className="icon"><FaLinkedinIn /></a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={signupData.name}
            onChange={handleSignupChange}
            required
          />
          <input
            type="text"
            placeholder="First Name"
            name="fname"
            value={signupData.fname}
            onChange={handleSignupChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={signupData.email}
            onChange={handleSignupChange}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            name="password"
            value={signupData.password}
            onChange={handleSignupChange}
            required
          />
          <input
            type="password"
            placeholder="Retype Password"
            name="retypePassword"
            value={signupData.retypePassword}
            onChange={handleSignupChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <div className="social-icons">
            <a href="https://www.instagram.com/jiiva.___.79/" className="icon"><FaInstagram /></a>
            <a href="https://github.com/jeeva79" className="icon"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/jeeva-p-637323230/" className="icon"><FaLinkedinIn /></a>
          </div>
          <span>or use your email password</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <a href="#">Forget Your Password?</a>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login" onClick={handleLoginClick}>Login</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
