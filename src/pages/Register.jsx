import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    chronic_condition: '',
    caretaker_name: '',
    caretaker_email: '',
    doctor_name: '',
    doctor_email: ''
  });
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(
        'https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/register',
        formData
      );
      setMessage(response.data.message || 'Registration successful');
    } catch (err) {
      console.error(err);
      setMessage('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Register</h2>
        <div className='underline'></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='inputs'>
          <div className='input'>
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              placeholder='Enter your full name'
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='input'>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder='Enter your email address'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='input'>
            <label>Chronic Condition</label>
            <select
              name="chronic_condition"
              value={formData.chronic_condition}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Condition --</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Hypertension">Hypertension</option>
              <option value="Asthma">Asthma</option>
              <option value="Heart Disease">Heart Disease</option>
            </select>
          </div>

          {/* Caretaker info */}
          <div className='input'>
            <label>Caretaker Name</label>
            <input
              type="text"
              name="caretaker_name"
              placeholder='Enter caretaker name'
              value={formData.caretaker_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='input'>
            <label>Caretaker Email</label>
            <input
              type="email"
              name="caretaker_email"
              placeholder='Enter caretaker email'
              value={formData.caretaker_email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Doctor info */}
          <div className='input'>
            <label>Doctor Name</label>
            <input
              type="text"
              name="doctor_name"
              placeholder='Enter doctor name'
              value={formData.doctor_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='input'>
            <label>Doctor Email</label>
            <input
              type="email"
              name="doctor_email"
              placeholder='Enter doctor email'
              value={formData.doctor_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='submit'>
            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;


// import React from 'react';
// import axios from 'axios'; // to make HTTP requests Allows you use its methods (like axios.get(), axios.post(), axios.put(), axios.delete()
// import { useState } from 'react';

// const Register = () => {
//     const [formData, setFormData] = useState({
//       full_name: '',
//       email: '',
//       chronic_condition: ''
//     });
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);
  
//     const handleChange = e => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     const handleSubmit = async e => {
//       e.preventDefault();
//       setLoading(true);
//       setMessage('');
//       try {
//         const response = await axios.post(
//           'https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/register',
//           formData
//         );
//         setMessage(response.data.message || 'Registration successful');
//       } catch (err) {
//         console.error(err);
//         setMessage('Registration failed');
//       } finally {
//         setLoading(false);
//       }
//     };

//     return (
//         <div className="form-container">
//             <div className="form-header">
//                 <h2>Register</h2>
//                 <div className='underline'></div>
//             </div>
//             {/* <p>Please fill in the details below to register.</p> */}
//                 <form onSubmit={handleSubmit}>
//                 <div className='inputs'>
//                     <div className='input'>
//                         <label>Full Name</label>
//                         <input
//                         type="text"
//                         name="full_name"
//                         placeholder='Enter your full name'
//                         value={formData.full_name}
//                         onChange={handleChange}
//                         required
//                         />
//                     </div>
            
//                     <div className='input'>
//                         <label>Email</label>
//                         <input
//                         type="email"
//                         name="email"
//                         placeholder='Enter your email address'
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         />
//                     </div>
            
//                     <div className='input'>
//                         <label>Chronic Condition</label>
//                         <select
//                         name="chronic_condition"
//                         value={formData.chronic_condition}
//                         onChange={handleChange}
//                         required
//                         >
//                         <option value="">-- Select Condition --</option>
//                         <option value="Diabetes">Diabetes</option>
//                         <option value="Hypertension">Hypertension</option>
//                         <option value="Asthma">Asthma</option>
//                         <option value="Heart Disease">Heart Disease</option>
//                         </select>
//                     </div>

//                     <div className='submit'>
//                         <button type="submit" disabled={loading}>
//                         {loading ? 'Registering...' : 'Register'}
//                         </button>
//                     </div>
//                 </div>
//                 </form>
            
//                 {message && <p className="message">{message}</p>}
//         </div>
//       );
//     };

// export default Register