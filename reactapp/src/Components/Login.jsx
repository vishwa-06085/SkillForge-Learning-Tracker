import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiconfig';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!formData.email || !formData.password || !validateEmail(formData.email) || formData.password.length < 6) {
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/user/login`, formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('userRole', response.data.user.role);
        localStorage.setItem('userName', `${response.data.user.firstName} ${response.data.user.lastName}`);
        
        if (response.data.user.role === 'Mentor') {
          navigate('/manage-modules');
        } else {
          navigate('/module-catalog');
        }
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      navigate('/error');
    }
  };

  return (
    <>
      <h1 className="page-title">Login page</h1>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-heading">Login to SkillForge</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
              />
              {touched.email && (!formData.email || !validateEmail(formData.email)) && (
                <span className="error-message">Please enter a valid email</span>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
              />
              {touched.password && (!formData.password || formData.password.length < 6) && (
                <span className="error-message">Password must be at least 6 characters</span>
              )}
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="signup-link">
            Don't have an account? <a href="/register">Signup</a>
          </div>
        </div>
        <div className="brand-section">
          <h1 className="brand-title">SkillForge</h1>
          <p className="brand-tagline">Level up your learning journey</p>
        </div>
      </div>
    </>
  );
};

export default Login;