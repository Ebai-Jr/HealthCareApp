import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert("⚠️ No user logged in. Please register first.");
    }
  }, []);

  const handleRiskClick = async (level) => {
    if (!userId) {
      alert("No user ID found. Please register/login first.");
      return;
    }

    let finalLocation = null;

    // 1️⃣ Try live GPS
    await new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          finalLocation = `${latitude},${longitude}`;
          resolve();
        },
        (err) => {
          console.warn("GPS denied/unavailable, falling back to home location", err);
          resolve();
        }
      );
    });

    // 2️⃣ If GPS denied → fetch saved home_location
    if (!finalLocation) {
      try {
        const res = await axios.post("https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/get-user-data", {
          user_id: userId,
        });
        const data = JSON.parse(res.data.body);
        finalLocation = data.user_profile?.home_location?.S || "Unknown";
      } catch (err) {
        console.error("Failed to fetch home location", err);
        finalLocation = "Unknown";
      }
    }

    const payload = {
      user_id: userId,
      risk_level: level,
      location: finalLocation,
      message:
        level === "Low"
          ? "Patient is feeling okay but wants caretaker notified."
          : level === "Medium"
          ? "Patient requires doctor assistance."
          : "Emergency! High risk detected. Immediate evacuation needed.",
    };

    try {
      await axios.post(
        "https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/trigger-sos",
        payload
      );
      alert(`✅ ${level} Risk Alert sent successfully!\n📍 Location: ${finalLocation}`);
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


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     // When the component mounts, fetch the user_id from localStorage
//     const storedUserId = localStorage.getItem('user_id');
//     if (storedUserId) {
//       setUserId(storedUserId);
//     } else {
//       alert("⚠️ No user logged in. Please register first.");
//       // navigate("/login"); // redirect to login if no user_id found
//     }
//   }, []);

//   const handleRiskClick = async (level) => {
//     if (!userId) {
//       alert("No user ID found. Please register/login first.");
//       return;
//     }

//     const payload = {
//       user_id: userId,
//       risk_level: level,
//       location: "Yaoundé, Cameroon", // later: pull from geolocation API
//       message:
//         level === "Low"
//           ? "Patient is feeling okay but wants caretaker notified."
//           : level === "Medium"
//           ? "Patient requires doctor assistance."
//           : "Emergency! High risk detected. Immediate evacuation needed.",
//     };

//     try {
//       const response = await axios.post(
//         "https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/trigger-sos",
//         payload
//       );
//       alert(`✅ ${level} Risk Alert sent successfully!`);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to send SOS alert.");
//     }
//   };

//   return (
//     <div className="home-container">
//       <h1>How Are You Feeling Today?</h1>
//       <p>Select your current health risk level to request the appropriate support:</p>

//       <div className="risk-buttons">
//         <button className="risk-button low" onClick={() => handleRiskClick("Low")}>
//           Low Risk
//         </button>
//         <button className="risk-button medium" onClick={() => handleRiskClick("Medium")}>
//           Medium Risk
//         </button>
//         <button className="risk-button high" onClick={() => handleRiskClick("High")}>
//           High Risk
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;