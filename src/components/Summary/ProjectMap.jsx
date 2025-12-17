import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ProjectMap.css';

// Fix for Leaflet default icons
const fixLeafletIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
};

// Create custom colored icons
const createCustomIcon = (color) => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 6px;
          height: 6px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};

const ProjectMap = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(12);

  useEffect(() => {
    fixLeafletIcons();
  }, []);

  // Jakarta as center
  const centerPosition = [-6.2088, 106.8456];
  
  // Detailed project locations in Jakarta area
  const projects = [
    { 
      id: 1, 
      name: "Factory A - Plant Expansion", 
      position: [-6.2188, 106.8456], // South of center
      status: "active",
      description: "Production line expansion for increased capacity",
      progress: 75,
      pic: "John Doe",
      dueDate: "2024-03-15",
      address: "Jl. Industri Raya No. 123, Cakung, Jakarta Timur",
      color: "#2ecc71",
      area: "East Jakarta"
    },
    { 
      id: 2, 
      name: "Factory B - Equipment Upgrade", 
      position: [-6.1988, 106.8356], // North-west of center
      status: "delayed",
      description: "Hydraulic press machine upgrade and automation",
      progress: 45,
      pic: "Jane Smith",
      dueDate: "2024-02-28",
      address: "Jl. Teknik No. 456, Cilandak, Jakarta Selatan",
      color: "#e74c3c",
      area: "South Jakarta"
    },
    { 
      id: 3, 
      name: "Warehouse Renovation", 
      position: [-6.2288, 106.8256], // South-west of center
      status: "completed",
      description: "Warehouse safety system and storage optimization",
      progress: 100,
      pic: "Bob Johnson",
      dueDate: "2024-01-30",
      address: "Jl. Gudang Sentral No. 789, Palmerah, Jakarta Barat",
      color: "#3498db",
      area: "West Jakarta"
    },
    { 
      id: 4, 
      name: "New Office Building", 
      position: [-6.2088, 106.8556], // East of center
      status: "active",
      description: "7-story office building with green design",
      progress: 60,
      pic: "Alice Brown",
      dueDate: "2024-04-10",
      address: "Jl. Sudirman No. 101, Menteng, Jakarta Pusat",
      color: "#2ecc71",
      area: "Central Jakarta"
    },
    { 
      id: 5, 
      name: "Maintenance Facility", 
      position: [-6.2388, 106.8156], // South-west of center
      status: "at-risk",
      description: "Maintenance workshop with testing equipment",
      progress: 30,
      pic: "Mike Chen",
      dueDate: "2024-03-30",
      address: "Jl. Perawatan No. 202, Kebon Jeruk, Jakarta Barat",
      color: "#f39c12",
      area: "West Jakarta"
    },
    { 
      id: 6, 
      name: "Solar Panel Installation", 
      position: [-6.1888, 106.8756], // North-east of center
      status: "active",
      description: "Renewable energy project for factory operations",
      progress: 80,
      pic: "Sarah Lee",
      dueDate: "2024-03-20",
      address: "Jl. Energi No. 303, Kelapa Gading, Jakarta Utara",
      color: "#2ecc71",
      area: "North Jakarta"
    },
    { 
      id: 7, 
      name: "Water Treatment Plant", 
      position: [-6.2488, 106.7956], // Far south-west
      status: "completed",
      description: "Water purification and recycling system",
      progress: 100,
      pic: "Tom Wilson",
      dueDate: "2024-01-15",
      address: "Jl. Air Bersih No. 404, Tangerang",
      color: "#3498db",
      area: "Tangerang (Outskirt)"
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.status === activeFilter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#2ecc71';
      case 'delayed': return '#e74c3c';
      case 'completed': return '#3498db';
      case 'at-risk': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleFilterClick = (status) => {
    setActiveFilter(status);
  };

  const getFilterStats = () => {
    return {
      all: projects.length,
      active: projects.filter(p => p.status === 'active').length,
      delayed: projects.filter(p => p.status === 'delayed').length,
      completed: projects.filter(p => p.status === 'completed').length,
      'at-risk': projects.filter(p => p.status === 'at-risk').length
    };
  };

  const filterStats = getFilterStats();

  return (
    <div className="project-map-card">
      <div className="card-header">
        <h3 className="card-title">Project Locations Map</h3>
        <div className="map-coordinates">
          <span className="coord-label">Center: </span>
          <span className="coord-value">
            {centerPosition[0].toFixed(4)}, {centerPosition[1].toFixed(4)}
          </span>
        </div>
      </div>
      
      <div className="map-filters">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterClick('all')}
        >
          All Projects ({filterStats.all})
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'active' ? 'active' : ''}`}
          onClick={() => handleFilterClick('active')}
        >
          Active ({filterStats.active})
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'delayed' ? 'active' : ''}`}
          onClick={() => handleFilterClick('delayed')}
        >
          Delayed ({filterStats.delayed})
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
          onClick={() => handleFilterClick('completed')}
        >
          Completed ({filterStats.completed})
        </button>
      </div>
      
      <div className="map-container">
        <div className="leaflet-map-wrapper">
          <MapContainer 
            center={centerPosition} 
            zoom={zoomLevel}
            scrollWheelZoom={true}
            className="leaflet-map"
            whenCreated={(map) => {
              map.on('zoomend', () => {
                setZoomLevel(map.getZoom());
              });
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <ZoomControl position="topright" />
            
            {filteredProjects.map((project) => (
              <Marker 
                key={project.id} 
                position={project.position}
                icon={createCustomIcon(getStatusColor(project.status))}
              >
                <Popup>
                  <div className="map-popup">
                    <h4>{project.name}</h4>
                    <div className="popup-header">
                      <span 
                        className="status-badge" 
                        style={{ backgroundColor: getStatusColor(project.status) }}
                      >
                        {getStatusText(project.status)}
                      </span>
                      <span className="area-badge">{project.area}</span>
                    </div>
                    
                    <div className="popup-details">
                      <div className="detail-item">
                        <span className="detail-label">Progress:</span>
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{ 
                                width: `${project.progress}%`,
                                backgroundColor: getStatusColor(project.status)
                              }}
                            ></div>
                          </div>
                          <span className="progress-text">{project.progress}%</span>
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <span className="detail-label">PIC:</span>
                        <span className="detail-value">{project.pic}</span>
                      </div>
                      
                      <div className="detail-item">
                        <span className="detail-label">Due Date:</span>
                        <span className="detail-value">
                          {new Date(project.dueDate).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <div className="detail-item">
                        <span className="detail-label">Address:</span>
                        <span className="detail-value address">{project.address}</span>
                      </div>
                      
                      <div className="detail-item">
                        <span className="detail-label">Coordinates:</span>
                        <span className="detail-value coordinates">
                          {project.position[0].toFixed(4)}, {project.position[1].toFixed(4)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="popup-actions">
                      <button className="popup-btn">
                        View Project Details
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      
      <div className="map-info-panel">
  <div className="legend-section">
    <h4>Project Status Legend</h4>
    <div className="legend-items">
      <div className="legend-item">
        <div className="legend-dot" style={{ backgroundColor: '#2ecc71' }}></div>
        <div className="legend-content">
          <span className="legend-title">Active Projects</span>
          <span className="legend-desc">On track, in progress</span>
        </div>
      </div>
      <div className="legend-item">
        <div className="legend-dot" style={{ backgroundColor: '#e74c3c' }}></div>
        <div className="legend-content">
          <span className="legend-title">Delayed Projects</span>
          <span className="legend-desc">Behind schedule</span>
        </div>
      </div>
      <div className="legend-item">
        <div className="legend-dot" style={{ backgroundColor: '#3498db' }}></div>
        <div className="legend-content">
          <span className="legend-title">Completed Projects</span>
          <span className="legend-desc">Finished successfully</span>
        </div>
      </div>
      <div className="legend-item">
        <div className="legend-dot" style={{ backgroundColor: '#f39c12' }}></div>
        <div className="legend-content">
          <span className="legend-title">At Risk Projects</span>
          <span className="legend-desc">Potential delays</span>
        </div>
      </div>
    </div>
  </div>
</div>
      
      <div className="project-locations-list">
        <h4>Project Locations Details</h4>
        <div className="locations-table">
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Location Area</th>
                <th>Coordinates</th>
                <th>Status</th>
                <th>Distance from Center</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => {
                // Calculate distance from center (simplified)
                const distance = Math.sqrt(
                  Math.pow(project.position[0] - centerPosition[0], 2) + 
                  Math.pow(project.position[1] - centerPosition[1], 2)
                ).toFixed(2);
                
                return (
                  <tr key={project.id}>
                    <td>
                      <div className="project-cell">
                        <div 
                          className="project-dot" 
                          style={{ backgroundColor: getStatusColor(project.status) }}
                        ></div>
                        <span>{project.name}</span>
                      </div>
                    </td>
                    <td>{project.area}</td>
                    <td className="coordinates-cell">
                      {project.position[0].toFixed(4)}, {project.position[1].toFixed(4)}
                    </td>
                    <td>
                      <span 
                        className="status-tag"
                        style={{ backgroundColor: getStatusColor(project.status) }}
                      >
                        {getStatusText(project.status)}
                      </span>
                    </td>
                    <td>{distance} km</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectMap;