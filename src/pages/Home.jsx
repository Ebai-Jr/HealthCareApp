import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // When the component mounts, fetch the user_id from localStorage
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert("⚠️ No user logged in. Please register first.");
      // navigate("/login"); // redirect to login if no user_id found
    }
  }, []);

  const handleRiskClick = async (level) => {
    if (!userId) {
      alert("No user ID found. Please register/login first.");
      return;
    }

    const payload = {
      user_id: userId,
      risk_level: level,
      location: "Yaoundé, Cameroon", // later: pull from geolocation API
      message:
        level === "Low"
          ? "Patient is feeling okay but wants caretaker notified."
          : level === "Medium"
          ? "Patient requires doctor assistance."
          : "Emergency! High risk detected. Immediate evacuation needed.",
    };

    try {
      const response = await axios.post(
        "https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/trigger-sos",
        payload
      );
      alert(`✅ ${level} Risk Alert sent successfully!`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send SOS alert.");
    }
  };

  return (
    <div className="home-container">
      <h1>How Are You Feeling Today?</h1>
      <p>Select your current health risk level to request the appropriate support:</p>

      <div className="risk-buttons">
        <button className="risk-button low" onClick={() => handleRiskClick("Low")}>
          Low Risk
        </button>
        <button className="risk-button medium" onClick={() => handleRiskClick("Medium")}>
          Medium Risk
        </button>
        <button className="risk-button high" onClick={() => handleRiskClick("High")}>
          High Risk
        </button>
      </div>
    </div>
  );
};

export default Home;


// import React from 'react';
// import axios from 'axios';

// const Home = () => {
//   const user_id = 'user_1718719650000'; // Later: Pull from user auth context or localStorage
//   const location = 'Yaoundé, Cameroon'; // Later: Use geolocation or stored address

//   const handleRiskClick = async (level) => {
//     const messages = {
//       Low: 'Patient is feeling okay but would like to notify a caretaker.',
//       Medium: 'Patient may require medical attention soon.',
//       High: 'Patient is in critical condition. Emergency response needed.',
//     };

//     try {
//       const response = await axios.post(
//         'https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/trigger-sos', // API endpoint
//         {
//           user_id,
//           risk_level: level,
//           location,
//           message: messages[level],
//         }
//       );

//       alert(`✅ ${level} Risk Alert Sent!\nResponse: ${response.data.message}`);
//     } catch (error) {
//       console.error('❌ Error sending alert:', error);
//       alert(`❌ Failed to send ${level} Risk Alert.`);
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

// export default Home;
