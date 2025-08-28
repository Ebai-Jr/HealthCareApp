import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const Profile = () => {
  const [data, setData] = useState({
    user_profile: {},
    health_history: [],
    sos_alerts: [],
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const user_id = localStorage.getItem("user_id"); // ✅ dynamic user ID

  useEffect(() => {
    if (!user_id) {
      setMessage("⚠️ Please log in first.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.post(
          "https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/get-user-data",
          { user_id }
        );

        // Lambda returns { statusCode, body }, so parse body
        const responseData =
          typeof res.data.body === "string"
            ? JSON.parse(res.data.body)
            : res.data;

        setData(responseData);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  // 📄 Generate PDF for Health History
  const downloadHealthHistory = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Health History Report", 14, 20);

    // Add profile info
    doc.setFontSize(12);
    doc.text(
      `Name: ${data.user_profile.full_name?.S || "N/A"}`,
      14,
      30
    );
    doc.text(
      `Email: ${data.user_profile.email?.S || "N/A"}`,
      14,
      38
    );
    doc.text(
      `Condition: ${data.user_profile.chronic_condition?.S || "N/A"}`,
      14,
      46
    );

    let y = 60;

    if (data.health_history.length === 0) {
      doc.text("No health data submitted.", 14, y);
    } else {
      data.health_history.forEach((item, index) => {
        doc.setFontSize(12);
        doc.text(
          `#${index + 1} - ${item.timestamp?.S || "Unknown date"}`,
          14,
          y
        );
        y += 8;
        doc.text(`Description: ${item.description?.S || "N/A"}`, 14, y);
        y += 8;
        doc.text("----------------------------", 14, y);
        y += 10;
      });
    }

    doc.save("health_history.pdf");
  };

  // 📄 Generate PDF for SOS Alerts
  const downloadSOSAlerts = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("SOS Alerts Report", 14, 20);

    // Add profile info
    doc.setFontSize(12);
    doc.text(
      `Name: ${data.user_profile.full_name?.S || "N/A"}`,
      14,
      30
    );
    doc.text(
      `Email: ${data.user_profile.email?.S || "N/A"}`,
      14,
      38
    );
    doc.text(
      `Condition: ${data.user_profile.chronic_condition?.S || "N/A"}`,
      14,
      46
    );

    let y = 60;

    if (data.sos_alerts.length === 0) {
      doc.text("No SOS alerts found.", 14, y);
    } else {
      data.sos_alerts.forEach((alert, index) => {
        doc.setFontSize(12);
        doc.text(
          `#${index + 1} - ${alert.timestamp?.S || "Unknown date"}`,
          14,
          y
        );
        y += 8;
        doc.text(`Risk Level: ${alert.risk_level?.S || "N/A"}`, 14, y);
        y += 8;
        doc.text(`Message: ${alert.message?.S || "N/A"}`, 14, y);
        y += 8;
        doc.text(`Location: ${alert.location?.S || "N/A"}`, 14, y);
        y += 8;
        doc.text("----------------------------", 14, y);
        y += 10;
      });
    }

    doc.save("sos_alerts.pdf");
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-page" style={{ padding: "20px" }}>
      <h2>Your Profile</h2>
      {data.user_profile && (
        <div
          className="profile-info"
          style={{
            background: "#f9f9f9",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <p>
            <strong>Name:</strong> {data.user_profile.full_name?.S}
          </p>
          <p>
            <strong>Email:</strong> {data.user_profile.email?.S}
          </p>
          <p>
            <strong>Condition:</strong>{" "}
            {data.user_profile.chronic_condition?.S || "N/A"}
          </p>
        </div>
      )}

      {/* Two column layout */}
      <div
        className="profile-data-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Health History Section */}
        <div className="health-history">
          <h3>Health History</h3>
          {data.health_history.length === 0 ? (
            <p>No health data submitted yet.</p>
          ) : (
            <ul>
              {data.health_history.map((item, index) => (
                <li
                  key={index}
                  style={{
                    background: "#f0f8ff",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "6px",
                  }}
                >
                  <p>
                    <strong>Description:</strong> {item.description?.S}
                  </p>
                  <p>
                    <strong>Timestamp:</strong> {item.timestamp?.S}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={downloadHealthHistory}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            📄 Download Health History
          </button>
        </div>

        {/* SOS Alerts Section */}
        <div className="sos-alerts">
          <h3>SOS Alerts</h3>
          {data.sos_alerts.length === 0 ? (
            <p>No SOS alerts sent yet.</p>
          ) : (
            <ul>
              {data.sos_alerts.map((alert, index) => (
                <li
                  key={index}
                  style={{
                    background: "#fff0f0",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "6px",
                  }}
                >
                  <p>
                    <strong>Risk Level:</strong> {alert.risk_level?.S}
                  </p>
                  <p>
                    <strong>Message:</strong> {alert.message?.S}
                  </p>
                  <p>
                    <strong>Location:</strong> {alert.location?.S}
                  </p>
                  <p>
                    <strong>Timestamp:</strong> {alert.timestamp?.S}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={downloadSOSAlerts}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            📄 Download SOS Alerts
          </button>
        </div>
      </div>

      {message && <p className="error">{message}</p>}
    </div>
  );
};

export default Profile;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { jsPDF } from "jspdf";

// const Profile = () => {
//   const [data, setData] = useState({
//     user_profile: {},
//     health_history: [],
//     sos_alerts: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   const user_id = localStorage.getItem("user_id"); // ✅ dynamic user ID

//   useEffect(() => {
//     if (!user_id) {
//       setMessage("⚠️ Please log in first.");
//       setLoading(false);
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const res = await axios.post(
//           "https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/get-user-data",
//           { user_id }
//         );

//         // Lambda returns { statusCode, body }, so parse body
//         const responseData =
//           typeof res.data.body === "string"
//             ? JSON.parse(res.data.body)
//             : res.data;

//         setData(responseData);
//       } catch (err) {
//         console.error(err);
//         setMessage("❌ Failed to load profile data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user_id]);

//   // 📄 Generate PDF for Health History
//   const downloadHealthHistory = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text("Health History Report", 14, 20);

//     if (data.health_history.length === 0) {
//       doc.text("No health data submitted.", 14, 30);
//     } else {
//       let y = 30;
//       data.health_history.forEach((item, index) => {
//         doc.setFontSize(12);
//         doc.text(
//           `#${index + 1} - ${item.timestamp?.S || "Unknown date"}`,
//           14,
//           y
//         );
//         y += 8;
//         doc.text(`Description: ${item.description?.S || "N/A"}`, 14, y);
//         y += 8;
//         doc.text("----------------------------", 14, y);
//         y += 10;
//       });
//     }

//     doc.save("health_history.pdf");
//   };

//   // 📄 Generate PDF for SOS Alerts
//   const downloadSOSAlerts = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text("SOS Alerts Report", 14, 20);

//     if (data.sos_alerts.length === 0) {
//       doc.text("No SOS alerts found.", 14, 30);
//     } else {
//       let y = 30;
//       data.sos_alerts.forEach((alert, index) => {
//         doc.setFontSize(12);
//         doc.text(
//           `#${index + 1} - ${alert.timestamp?.S || "Unknown date"}`,
//           14,
//           y
//         );
//         y += 8;
//         doc.text(`Risk Level: ${alert.risk_level?.S || "N/A"}`, 14, y);
//         y += 8;
//         doc.text(`Message: ${alert.message?.S || "N/A"}`, 14, y);
//         y += 8;
//         doc.text(`Location: ${alert.location?.S || "N/A"}`, 14, y);
//         y += 8;
//         doc.text("----------------------------", 14, y);
//         y += 10;
//       });
//     }

//     doc.save("sos_alerts.pdf");
//   };

//   if (loading) return <p>Loading profile...</p>;

//   return (
//     <div className="profile-page">
//       <h2>Your Profile</h2>
//       {data.user_profile && (
//         <div className="profile-info">
//           <p>
//             <strong>Name:</strong> {data.user_profile.full_name?.S}
//           </p>
//           <p>
//             <strong>Email:</strong> {data.user_profile.email?.S}
//           </p>
//           <p>
//             <strong>Condition:</strong>{" "}
//             {data.user_profile.chronic_condition?.S || "N/A"}
//           </p>
//         </div>
//       )}

//       <h3>Health History</h3>
//       {data.health_history.length === 0 ? (
//         <p>No health data submitted yet.</p>
//       ) : (
//         <ul>
//           {data.health_history.map((item, index) => (
//             <li key={index}>
//               <p>
//                 <strong>Description:</strong> {item.description?.S}
//               </p>
//               <p>
//                 <strong>Timestamp:</strong> {item.timestamp?.S}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//       <button onClick={downloadHealthHistory}>📄 Download Health History</button>

//       <h3>SOS Alerts</h3>
//       {data.sos_alerts.length === 0 ? (
//         <p>No SOS alerts sent yet.</p>
//       ) : (
//         <ul>
//           {data.sos_alerts.map((alert, index) => (
//             <li key={index}>
//               <p>
//                 <strong>Risk Level:</strong> {alert.risk_level?.S}
//               </p>
//               <p>
//                 <strong>Message:</strong> {alert.message?.S}
//               </p>
//               <p>
//                 <strong>Location:</strong> {alert.location?.S}
//               </p>
//               <p>
//                 <strong>Timestamp:</strong> {alert.timestamp?.S}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//       <button onClick={downloadSOSAlerts}>📄 Download SOS Alerts</button>

//       {message && <p className="error">{message}</p>}
//     </div>
//   );
// };

// export default Profile;
