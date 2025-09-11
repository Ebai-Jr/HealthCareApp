import React, { useState } from 'react';
import axios from 'axios';

const ReportSymptoms = () => {
  const [symptoms, setSymptoms] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [risk, setRisk] = useState(null); // store ML classification result
  const [showDecision, setShowDecision] = useState(false); // ask user Yes/No

  const classifyRisk = async (description) => {
    const response = await axios.post(
      "https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/auto-classify-risk",
      { description }
    );
    // Your Lambda already returns { risk, confidence }
    return response.data; 
  };
  

  const saveReport = async (userId, description, risk) => {
    return await axios.post(
      "https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/submit-health",
      { user_id: userId, description, risk_level: risk }
    );
  };
  
  const notifyDoctors = async (userId, description, risk) => {
    return await axios.post(
      "https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/trigger-sos",
      { user_id: userId, description, risk_level: risk }
    );
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setRisk(null);

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setMessage("⚠️ No user logged in. Please log in first.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Classify using SageMaker
      const prediction = await classifyRisk(symptoms);
      const classifiedRisk = prediction?.risk || "Unknown";
    
      setRisk(classifiedRisk);
      setShowDecision(true);
      setMessage(`🩺 Risk classified as: ${classifiedRisk} (Confidence: ${(prediction?.confidence * 100).toFixed(1)}%)`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to classify symptoms");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDecision = async (sendNotification) => {
    const userId = localStorage.getItem('user_id');
    setLoading(true);
  
    try {
      // ✅ Always save first
      await saveReport(userId, symptoms, risk);
  
      if (sendNotification) {
        try {
          await notifyDoctors(userId, symptoms, risk);
          setMessage(`✅ Report saved and doctors notified (Risk: ${risk})`);
        } catch (err) {
          console.error("Notify failed:", err);
          setMessage(`⚠️ Report saved, but failed to notify doctors (Risk: ${risk})`);
        }
      } else {
        setMessage(`✅ Report saved (Risk: ${risk})`);
      }
  
      setSymptoms('');
      setShowDecision(false);
      setRisk(null);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to save report');
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
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      {/* Show classification result and decision */}
      {showDecision && (
        <div className="decision-box">
          <p>Risk classified as: <strong>{risk}</strong></p>
          <p>Do you want to notify doctors about this?</p>
          <button onClick={() => handleDecision(true)}>Yes, Notify</button>
          <button onClick={() => handleDecision(false)}>No, Just Save</button>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ReportSymptoms;

// Code without ML classification and user decision

// import React, { useState } from 'react';
// import axios from 'axios';

// const ReportSymptoms = () => {
//   const [symptoms, setSymptoms] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     const userId = localStorage.getItem('user_id'); // ✅ Fetch user_id from localStorage
//     if (!userId) {
//       setMessage("⚠️ No user logged in. Please log in first.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/submit-health',
//         {
//           user_id: userId, // ✅ use dynamic user_id instead of hardcoded value
//           description: symptoms
//         }
//       );

//       setMessage(response.data.message || 'Symptoms submitted successfully');
//       setSymptoms('');
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Failed to submit symptoms');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="report-form-container">
//       <div className="form-header">
//         <h2>Report Symptoms</h2>
//         <div className='underline'></div>
//       </div>

//       <div className='report-inputs'>
//         <form onSubmit={handleSubmit}>
//           <div className='report-input'>
//             <label htmlFor="symptoms">Describe your symptoms:</label>
//           </div>

//           <div className='report-form'>
//             <textarea
//               id="symptoms"
//               name="symptoms"
//               rows="5"
//               value={symptoms}
//               onChange={(e) => setSymptoms(e.target.value)}
//               required
//             ></textarea>
//           </div>

//           <div className='submit'>
//             <button type="submit" disabled={loading}>
//               {loading ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//         </form>
//       </div>

//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default ReportSymptoms;
