import React, { useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LeafletMap.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Default center (Jakarta)
const defaultCenter = [-6.2088, 106.8456];
const defaultZoom = 12;

// Project locations data
const projectLocations = [
  {
    id: 1,
    name: "Factory A - Plant Expansion",
    position: [-6.2188, 106.8456],
    status: "active",
    description: "Line A Expansion Project",
    progress: 75,
    pic: "John Doe",
    dueDate: "2024-03-15",
    address: "Jl. Industri No. 123, Jakarta"
  },
  {
    id: 2,
    name: "Factory B - Equipment Upgrade",
    position: [-6.1988, 106.8356],
    status: "delayed",
    description: "Press Machine Upgrade",
    progress: 45,
    pic: "Jane Smith",
    dueDate: "2024-02-28",
    address: "Jl. Teknik No. 456, Jakarta"
  },
  {
    id: 3,
    name: "Warehouse Renovation",
    position: [-6.2288, 106.8256],
    status: "completed",
    description: "Warehouse Safety Upgrade",
    progress: 100,
    pic: "Bob Johnson",
    dueDate: "2024-01-30",
    address: "Jl. Gudang No. 789, Jakarta"
  },
  {
    id: 4,
    name: "New Office Building",
    position: [-6.2088, 106.8556],
    status: "active",
    description: "Office Construction",
    progress: 60,
    pic: "Alice Brown",
    dueDate: "2024-04-10",
    address: "Jl. Kantor No. 101, Jakarta"
  },
  {
    id: 5,
    name: "Maintenance Facility",
    position: [-6.2388, 106.8156],
    status: "at-risk",
    description: "Maintenance Workshop",
    progress: 30,
    pic: "Mike Chen",
    dueDate: "2024-03-30",
    address: "Jl. Perawatan No. 202, Jakarta"
  },
  {
    id: 6,
    name: "Solar Panel Installation",
    position: [-6.1888, 106.8756],
    status: "active",
    description: "Renewable Energy Project",
    progress: 80,
    pic: "Sarah Lee",
    dueDate: "2024-03-20",
    address: "Jl. Energi No. 303, Jakarta"
  },
  {
    id: 7,
    name: "Water Treatment Plant",
    position: [-6.2488, 106.7956],
    status: "completed",
    description: "Water Purification System",
    progress: 100,
    pic: "Tom Wilson",
    dueDate: "2024-01-15",
    address: "Jl. Air No. 404, Jakarta"
  }
];

// Custom marker icons based on status
const createCustomIcon = (status, progress) => {
  const colors = {
    active: '#2ecc71',
    delayed: '#e74c3c',
    completed: '#3498db',
    'at-risk': '#f39c12'
  };

  return L.divIcon({
    html: `
      <div class="custom-marker" style="
        background: ${colors[status] || '#95a5a6'};
        border-color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      ">
        ${progress}%
      </div>
    `,
    className: 'custom-marker-div',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

// Component to handle map events
function MapController({ onZoomChange, onCenterChange }) {
  const map = useMap();

  useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom());
    },
    moveend: () => {
      const center = map.getCenter();
      onCenterChange([center.lat, center.lng]);
    }
  });

  return null;
}

// Component to fit bounds to all markers
function FitBoundsControl({ positions }) {
  const map = useMap();

  const fitBounds = useCallback(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, positions]);

  return (
    <div className="leaflet-control leaflet-bar">
      <button
        onClick={fitBounds}
        title="Fit all projects"
        className="fit-bounds-btn"
      >
        📍
      </button>
    </div>
  );
}

const LeafletMap = () => {
  const [zoom, setZoom] = useState(defaultZoom);
  const [center, setCenter] = useState(defaultCenter);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projectLocations;
    return projectLocations.filter(project => project.status === activeFilter);
  }, [activeFilter]);

  const handleFilterClick = (status) => {
    setActiveFilter(status);
  };

  const resetView = () => {
    setCenter(defaultCenter);
    setZoom(defaultZoom);
  };

  const getStatusStats = () => {
    const stats = {
      all: projectLocations.length,
      active: projectLocations.filter(p => p.status === 'active').length,
      delayed: projectLocations.filter(p => p.status === 'delayed').length,
      completed: projectLocations.filter(p => p.status === 'completed').length,
      'at-risk': projectLocations.filter(p => p.status === 'at-risk').length
    };
    return stats;
  };

  const statusStats = getStatusStats();

  return (
    <div className="leaflet-map-container">
      <div className="map-controls">
        <div className="control-group">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            <span className="filter-icon">📍</span>
            <span>All Projects</span>
            <span className="filter-count">{statusStats.all}</span>
          </button>
          
          <button 
            className={`filter-btn ${activeFilter === 'active' ? 'active' : ''}`}
            onClick={() => handleFilterClick('active')}
          >
            <span className="filter-icon" style={{color: '#2ecc71'}}>●</span>
            <span>Active</span>
            <span className="filter-count">{statusStats.active}</span>
          </button>
          
          <button 
            className={`filter-btn ${activeFilter === 'delayed' ? 'active' : ''}`}
            onClick={() => handleFilterClick('delayed')}
          >
            <span className="filter-icon" style={{color: '#e74c3c'}}>●</span>
            <span>Delayed</span>
            <span className="filter-count">{statusStats.delayed}</span>
          </button>
          
          <button 
            className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => handleFilterClick('completed')}
          >
            <span className="filter-icon" style={{color: '#3498db'}}>●</span>
            <span>Completed</span>
            <span className="filter-count">{statusStats.completed}</span>
          </button>
        </div>

        <div className="map-info">
          <div className="zoom-info">
            <span className="zoom-label">Zoom:</span>
            <span className="zoom-value">{zoom.toFixed(1)}x</span>
          </div>
          <div className="center-info">
            <span className="center-label">Location:</span>
            <span className="center-value">
              {center[0].toFixed(4)}, {center[1].toFixed(4)}
            </span>
          </div>
          <button className="reset-btn" onClick={resetView}>
            <span className="reset-icon">🔄</span>
            <span>Reset View</span>
          </button>
        </div>
      </div>

      <div className="map-wrapper">
        <MapContainer
          center={center}
          zoom={zoom}
          zoomControl={false}
          className="leaflet-map"
          scrollWheelZoom={true}
          doubleClickZoom={true}
          touchZoom={true}
          dragging={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <ZoomControl position="topright" />
          
          <FitBoundsControl 
            positions={filteredProjects.map(p => p.position)} 
          />
          
          <MapController 
            onZoomChange={setZoom}
            onCenterChange={setCenter}
          />
          
          {filteredProjects.map((project) => (
            <Marker
              key={project.id}
              position={project.position}
              icon={createCustomIcon(project.status, project.progress)}
            >
              <Popup>
                <div className="popup-content">
                  <h3 className="popup-title">{project.name}</h3>
                  
                  <div className={`status-badge ${project.status}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </div>
                  
                  <div className="popup-details">
                    <div className="detail-row">
                      <span className="detail-label">Description:</span>
                      <span className="detail-value">{project.description}</span>
                    </div>
                    
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
                    <button className="popup-btn primary">
                      View Details
                    </button>
                    <button className="popup-btn secondary">
                      Get Directions
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="map-stats-panel">
        <div className="stat-item">
          <div className="stat-icon total">🏗️</div>
          <div className="stat-content">
            <h4 className="stat-value">{statusStats.all}</h4>
            <p className="stat-label">Total Projects</p>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon active">📈</div>
          <div className="stat-content">
            <h4 className="stat-value">{statusStats.active}</h4>
            <p className="stat-label">Active</p>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon delayed">⚠️</div>
          <div className="stat-content">
            <h4 className="stat-value">{statusStats.delayed}</h4>
            <p className="stat-label">Delayed</p>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon completed">✅</div>
          <div className="stat-content">
            <h4 className="stat-value">{statusStats.completed}</h4>
            <p className="stat-label">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;