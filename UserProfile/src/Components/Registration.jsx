import React, { useState } from 'react';
import './Registration.css';


const Registration = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) return '';
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{8,}$");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*\\d))|((?=.*[A-Z])(?=.*\\d)))[A-Za-z\\d]{6,}$");

    if (strongRegex.test(password)) return 'strong';
    else if (mediumRegex.test(password)) return 'medium';
    else return 'weak';
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 10 characters';

    return newErrors;
  };

//   const handleSubmit = (e) => {
//   e.preventDefault();
//   const validationErrors = validate();
//   if (Object.keys(validationErrors).length === 0) {
//     alert('Registration successful!');
//     console.log('Registered User:', formData);
//     onRegister(formData); // ✅ passes data to App.js
//     setFormData({ firstName: '', lastName: '', email: '', password: '' });
//     setErrors({});
//   } else {
//     setErrors(validationErrors);
//   }
// };

    const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length === 0) {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log(response);

      const result = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        console.log('Backend Response:', result);
        onRegister(formData); // optional
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
        setErrors({});
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      alert('Something went wrong. Please try again later.');
    }
  } else {
    setErrors(validationErrors);
  }
};

   


  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Sign Up</h2>

      <div className="form-group">
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p className="error-text">{errors.firstName}</p>}
      </div>

      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p className="error-text">{errors.lastName}</p>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        {passwordStrength && (
          <p className={`password-strength ${passwordStrength}`}>
            Strength: {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
          </p>
        )}
      </div>

      <button type="submit" className="submit-btn">Sign Up</button>
    </form>
  );
};

export default Registration;
