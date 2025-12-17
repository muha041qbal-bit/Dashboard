import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './SimpleMap.css';

// Fix for leaflet icons in React
const createCustomIcon = (status) => {
  const colors = {
    active: '#2ecc71',
    delayed: '#e74c3c',
    completed: '#3498db',
    'at-risk': '#f39c12'
  };

  return L.divIcon({
    html: `
      <div style="
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${colors[status] || '#95a5a6'};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const SimpleMap = () => {
  useEffect(() => {
    // Fix leaflet default icon issue
    delete L.Icon.Default.prototype._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  }, []);

  const position = [-6.2088, 106.8456]; // Jakarta
  const zoom = 12;

  const projects = [
    { 
      id: 1, 
      name: "Factory A - Plant Expansion", 
      position: [-6.2188, 106.8456], 
      status: "active",
      progress: 75,
      pic: "John Doe",
      dueDate: "2024-03-15",
      address: "Jl. Industri Raya No. 123"
    },
    { 
      id: 2, 
      name: "Factory B - Equipment Upgrade", 
      position: [-6.1988, 106.8356], 
      status: "delayed",
      progress: 45,
      pic: "Jane Smith",
      dueDate: "2024-02-28",
      address: "Jl. Teknik No. 456"
    },
    { 
      id: 3, 
      name: "Warehouse Renovation", 
      position: [-6.2288, 106.8256], 
      status: "completed",
      progress: 100,
      pic: "Bob Johnson",
      dueDate: "2024-01-30",
      address: "Jl. Gudang Sentral No. 789"
    },
    { 
      id: 4, 
      name: "New Office Building", 
      position: [-6.2088, 106.8556], 
      status: "active",
      progress: 60,
      pic: "Alice Brown",
      dueDate: "2024-04-10",
      address: "Jl. Kantor Pusat No. 101"
    },
    { 
      id: 5, 
      name: "Maintenance Facility", 
      position: [-6.2388, 106.8156], 
      status: "at-risk",
      progress: 30,
      pic: "Mike Chen",
      dueDate: "2024-03-30",
      address: "Jl. Perawatan No. 202"
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#2ecc71';
      case 'delayed': return '#e74c3c';
      case 'completed': return '#3498db';
      case 'at-risk': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="simple-map-container">
      <div className="map-controls">
        <div className="map-info">
          <span className="info-item">
            <span className="info-label">Projects:</span>
            <span className="info-value">{projects.length}</span>
          </span>
          <span className="info-item">
            <span className="info-label">Zoom:</span>
            <span className="info-value">{zoom}x</span>
          </span>
        </div>
      </div>

      <div className="map-wrapper">
        <MapContainer 
          center={position} 
          zoom={zoom} 
          className="leaflet-map"
          scrollWheelZoom={true}
          zoomControl={false}
          doubleClickZoom={true}
          touchZoom={true}
          dragging={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <ZoomControl position="topright" />
          
          {projects.map(project => (
            <Marker 
              key={project.id} 
              position={project.position}
              icon={createCustomIcon(project.status)}
            >
              <Popup>
                <div className="popup-content">
                  <h3 className="popup-title">{project.name}</h3>
                  
                  <div 
                    className="status-badge"
                    style={{
                      backgroundColor: getStatusColor(project.status),
                      color: 'white'
                    }}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </div>
                  
                  <div className="popup-details">
                    <div className="detail-row">
                      <span className="detail-label">Progress:</span>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{project.progress}%</span>
                      </div>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">PIC:</span>
                      <span className="detail-value">{project.pic}</span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">Due Date:</span>
                      <span className="detail-value">
                        {new Date(project.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">Address:</span>
                      <span className="detail-value address">{project.address}</span>
                    </div>
                  </div>
                  
                  <div className="popup-actions">
                    <button className="popup-btn">
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="map-legend">
        <div className="legend-title">Project Status</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: '#2ecc71' }}></div>
            <span>Active</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: '#e74c3c' }}></div>
            <span>Delayed</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: '#3498db' }}></div>
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: '#f39c12' }}></div>
            <span>At Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMap;