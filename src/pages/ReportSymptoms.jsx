import React, { useState } from 'react';
import axios from 'axios';

const ReportSymptoms = () => {
  const [symptoms, setSymptoms] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        'https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/submit-health',
        {
          user_id: 'user_1718719650000', // Replace this with dynamic ID when available
          description: symptoms
        }
      );
      setMessage(response.data.message || 'Symptoms submitted successfully');
      setSymptoms('');
    } catch (err) {
      console.error(err);
      setMessage('Failed to submit symptoms');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-form-container">
    <div className="form-header">
        <h2>Report Symptoms</h2>
        <div className='underline'></div>
    </div>
    <div className='report-inputs'>
        <form onSubmit={handleSubmit}>
            <div className='report-input'>
                <label htmlFor="symptoms">Describe your symptoms:</label>
            </div>
            <div className='report-form'>
                <textarea
                id="symptoms"
                name="symptoms"
                rows="5"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
                ></textarea>
            </div>
            <div className='submit'>
                <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </form>
    </div>

        {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ReportSymptoms;
