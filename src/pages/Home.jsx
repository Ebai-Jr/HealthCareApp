import React from 'react';
import axios from 'axios';

const Home = () => {
  const user_id = 'user_1718719650000'; // Later: Pull from user auth context or localStorage
  const location = 'Yaoundé, Cameroon'; // Later: Use geolocation or stored address

  const handleRiskClick = async (level) => {
    const messages = {
      Low: 'Patient is feeling okay but would like to notify a caretaker.',
      Medium: 'Patient may require medical attention soon.',
      High: 'Patient is in critical condition. Emergency response needed.',
    };

    try {
      const response = await axios.post(
        'https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/trigger-sos', // API endpoint
        {
          user_id,
          risk_level: level,
          location,
          message: messages[level],
        }
      );

      alert(`✅ ${level} Risk Alert Sent!\nResponse: ${response.data.message}`);
    } catch (error) {
      console.error('❌ Error sending alert:', error);
      alert(`❌ Failed to send ${level} Risk Alert.`);
    }
  };

  return (
    <div className="home-container">
      <h1>How Are You Feeling Today?</h1>
      <p>Select your current health risk level to request the appropriate support:</p>

      <div className="risk-buttons">
        <button className="risk-button low" onClick={() => handleRiskClick('Low')}>
          Low Risk
        </button>
        <button className="risk-button medium" onClick={() => handleRiskClick('Medium')}>
          Medium Risk
        </button>
        <button className="risk-button high" onClick={() => handleRiskClick('High')}>
          High Risk
        </button>
      </div>
    </div>
  );
};

export default Home;



// import React from 'react'

// // replace the alert()s with actual backend triggers via Axios — and pass in geolocation, user ID, and contact data.

// const Home = () => {
//   const handleRiskClick = (level) => {
//     switch (level) {
//       case 'Low':
//         alert('🟢 Low Risk Selected\n\nMessage will be sent to family member.');
//         // Later: Call backend to send message to registered contact
//         break;
//       case 'Medium':
//         alert('🟠 Medium Risk Selected\n\nMessage will be sent to your personal doctor.');
//         // Later: Trigger notification to doctor via API or SNS
//         break;
//       case 'High':
//         alert('🔴 High Risk Selected\n\nEvacuation initiated. Ambulance or emergency team will be notified.');
//         // Later: Call /trigger-sos or emergency alert system
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="home-container">
//       <h1>How Are You Feeling Today?</h1>
//       <p>Select your current health risk level to request the appropriate support:</p>

//       <div className="risk-buttons">
//         <button className="risk-button low" onClick={() => handleRiskClick('Low')}>
//           Low Risk
//         </button>
//         <button className="risk-button medium" onClick={() => handleRiskClick('Medium')}>
//           Medium Risk
//         </button>
//         <button className="risk-button high" onClick={() => handleRiskClick('High')}>
//           High Risk
//         </button>
//       </div>
//     </div>
//   );
// };


// export default Home