import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiconfig';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [touched, setTouched] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    const isValid = formData.firstName && formData.lastName && formData.mobileNumber && 
                   formData.email && formData.password && formData.confirmPassword && formData.role &&
                   validateEmail(formData.email) && validateMobile(formData.mobileNumber) &&
                   formData.password.length >= 6 && formData.password === formData.confirmPassword;

    if (!isValid) return;

    try {
      const { confirmPassword, ...submitData } = formData;
      await axios.post(`${apiUrl}/user/signup`, submitData);
      setShowSuccessPopup(true);
    } catch (error) {
      navigate('/error');
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    navigate('/login');
  };

  return (
    <>
      <h1 className="page-title">Register page</h1>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-heading">Register for SkillForge</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('firstName')}
                />
                {touched.firstName && !formData.firstName && (
                  <span className="error-message">First name is required</span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('lastName')}
                />
                {touched.lastName && !formData.lastName && (
                  <span className="error-message">Last name is required</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                className="form-input"
                value={formData.mobileNumber}
                onChange={handleChange}
                onBlur={() => handleBlur('mobileNumber')}
              />
              {touched.mobileNumber && (!formData.mobileNumber || !validateMobile(formData.mobileNumber)) && (
                <span className="error-message">Please enter a valid 10-digit mobile number</span>
              )}
            </div>
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
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur('confirmPassword')}
              />
              {touched.confirmPassword && formData.password !== formData.confirmPassword && (
                <span className="error-message">Passwords do not match</span>
              )}
            </div>
            <div className="form-group">
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
                onBlur={() => handleBlur('role')}
              >
                <option value="">Select Role</option>
                <option value="Mentor">Mentor</option>
                <option value="Learner">Learner</option>
              </select>
              {touched.role && !formData.role && (
                <span className="error-message">Please select a role</span>
              )}
            </div>
            <button type="submit" className="register-button">Register</button>
          </form>
          <div className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </div>
        </div>
        <div className="brand-section">
          <h1 className="brand-title">SkillForge</h1>
          <p className="brand-tagline">Level up your learning journey</p>
        </div>
      </div>
      
      {showSuccessPopup && (
        <div className="success-modal">
          <div className="modal-content">
            <h3 className="modal-title">Registration Successful!</h3>
            <p className="modal-message">Your account has been created successfully.</p>
            <button className="modal-button" onClick={handleSuccessClose}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;