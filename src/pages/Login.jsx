import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setAlreadyLoggedIn(true);
      setMessage('✅ You are already logged in.');
    }
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        'https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/login',
        formData
      );

      if (response.data.user) {
        const user = response.data.user;

        // Save user data locally for later use
        localStorage.setItem('user_id', user.user_id);
        localStorage.setItem('full_name', user.full_name);
        localStorage.setItem('email', user.email);
        localStorage.setItem('caretaker_email', user.caretaker_email);
        localStorage.setItem('doctor_email', user.doctor_email);
        localStorage.setItem('chronic_condition', user.chronic_condition);
        localStorage.setItem('location', user.location);

        setMessage('✅ Login successful');
        setAlreadyLoggedIn(true);
      } else {
        setMessage('❌ Invalid login credentials');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Login failed');
    } finally {
      setLoading(false);
    }
  };

    // If already logged in, show a message instead of the login form
//   if (alreadyLoggedIn) {
//     return (
//       <div className="form-container">
//         <div className="form-header">
//           <h2>Login</h2>
//           <div className="underline"></div>
//         </div>
//         <p>{message}</p>
//       </div>
//     );
//   }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Login</h2>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="submit">
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
