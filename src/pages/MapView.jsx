import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapView = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_MAP_API_KEY;; // 🔐 Replace this with your key
    const region = "us-east-1";
    const style = "Standard";
    const colorScheme = "Light";

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://maps.geo.${region}.amazonaws.com/v2/styles/${style}/descriptor?key=${apiKey}&color-scheme=${colorScheme}`,
      center: [13.4050, 52.5200], // Example: Berlin, replace with your default or user coordinates
      zoom: 10,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-left");

    return () => map.remove();
  }, []);

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <div ref={mapContainer} style={{ height: '100%' }} />
    </div>
  );
};

export default MapView;
