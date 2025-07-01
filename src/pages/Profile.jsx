import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [data, setData] = useState({
    user_profile: {},
    health_history: [],
    sos_alerts: []
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const user_id = 'user_1718719650000'; // Replace with dynamic ID when available

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          'https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/get-user-data',
          { user_id }
        );
        const responseData = JSON.parse(res.data.body);
        setData(responseData);
      } catch (err) {
        console.error(err);
        setMessage('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      {data.user_profile && (
        <div className="profile-info">
          <p><strong>Name:</strong> {data.user_profile.full_name?.S}</p>
          <p><strong>Email:</strong> {data.user_profile.email?.S}</p>
          <p><strong>Condition:</strong> {data.user_profile.chronic_condition?.S}</p>
        </div>
      )}

      <h3>Health History</h3>
      {data.health_history.length === 0 ? (
        <p>No health data submitted yet.</p>
      ) : (
        <ul>
          {data.health_history.map((item, index) => (
            <li key={index}>
              <p><strong>Description:</strong> {item.description?.S}</p>
              <p><strong>Timestamp:</strong> {item.timestamp?.S}</p>
            </li>
          ))}
        </ul>
      )}

      <h3>SOS Alerts</h3>
      {data.sos_alerts.length === 0 ? (
        <p>No SOS alerts sent yet.</p>
      ) : (
        <ul>
          {data.sos_alerts.map((alert, index) => (
            <li key={index}>
              <p><strong>Risk Level:</strong> {alert.risk_level?.S}</p>
              <p><strong>Message:</strong> {alert.message?.S}</p>
              <p><strong>Location:</strong> {alert.location?.S}</p>
              <p><strong>Timestamp:</strong> {alert.timestamp?.S}</p>
            </li>
          ))}
        </ul>
      )}

      {message && <p className="error">{message}</p>}
    </div>
  );
};

export default Profile;
