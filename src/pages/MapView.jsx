import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import axios from 'axios';

const MapView = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_MAP_API_KEY;
    const region = "us-east-1";
    const style = "Standard";
    const colorScheme = "Light";

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://maps.geo.${region}.amazonaws.com/v2/styles/${style}/descriptor?key=${apiKey}&color-scheme=${colorScheme}`,
      // center: [13.4050, 52.5200], // Default: Berlin
      center: [11.5202, 3.8617], // Default Yaounde
      zoom: 10,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-left");

    // 📍 Drop marker on click
    map.on("click", (e) => {
      const lngLat = e.lngLat;
      setCoords([lngLat.lng, lngLat.lat]);

      // Remove old marker
      if (markerRef.current) markerRef.current.remove();

      // Add new marker
      const marker = new maplibregl.Marker({ color: "red" })
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(map);

      markerRef.current = marker;
    });

    return () => map.remove();
  }, []);

  // 🔹 Save location to backend
  const saveLocation = async () => {
    if (!coords) {
      alert("Click on the map to set your location.");
      return;
    }
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("⚠️ User not logged in.");
      return;
    }

    try {
      await axios.post("https://https://0n3kbcjn67.execute-api.us-east-1.amazonaws.com/update-location", {
        user_id: userId,
        location: `${coords[1]},${coords[0]}` // lat,lng
      });
      alert("✅ Location updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update location.");
    }
  };

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <div ref={mapContainer} style={{ height: '100%' }} />
      <button 
        onClick={saveLocation} 
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          padding: "10px 20px",
          background: "blue",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Save Location
      </button>
    </div>
  );
};

export default MapView;


// import React, { useEffect, useRef } from 'react';
// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';

// const MapView = () => {
//   const mapContainer = useRef(null);

//   useEffect(() => {
//     const apiKey = import.meta.env.VITE_MAP_API_KEY;; // 🔐 Replace this with your key
//     const region = "us-east-1";
//     const style = "Standard";
//     const colorScheme = "Light";

//     const map = new maplibregl.Map({
//       container: mapContainer.current,
//       style: `https://maps.geo.${region}.amazonaws.com/v2/styles/${style}/descriptor?key=${apiKey}&color-scheme=${colorScheme}`,
//       center: [13.4050, 52.5200], // Example: Berlin, replace with your default or user coordinates
//       zoom: 10,
//     });

//     map.addControl(new maplibregl.NavigationControl(), "top-left");

//     return () => map.remove();
//   }, []);

//   return (
//     <div style={{ height: '90vh', width: '100%' }}>
//       <div ref={mapContainer} style={{ height: '100%' }} />
//     </div>
//   );
// };

// export default MapView;
