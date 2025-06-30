import React from 'react'

// replace the alert()s with actual backend triggers via Axios — and pass in geolocation, user ID, and contact data.

const Home = () => {
  const handleRiskClick = (level) => {
    switch (level) {
      case 'Low':
        alert('🟢 Low Risk Selected\n\nMessage will be sent to family member.');
        // Later: Call backend to send message to registered contact
        break;
      case 'Medium':
        alert('🟠 Medium Risk Selected\n\nMessage will be sent to your personal doctor.');
        // Later: Trigger notification to doctor via API or SNS
        break;
      case 'High':
        alert('🔴 High Risk Selected\n\nEvacuation initiated. Ambulance or emergency team will be notified.');
        // Later: Call /trigger-sos or emergency alert system
        break;
      default:
        break;
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


export default Home