import React, { useState } from 'react';
import './NonProjectSection.css';

const NonProjectSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('maintenance');

  const nonProjects = {
    maintenance: [
      { id: 1, name: 'Preventive Maintenance - Line 1', dueDate: '2024-03-10', pic: 'Mike Chen', status: 'On Track' },
      { id: 2, name: 'Equipment Calibration', dueDate: '2024-03-15', pic: 'Sarah Lee', status: 'Delayed' },
      { id: 3, name: 'Safety Inspection', dueDate: '2024-03-20', pic: 'Tom Wilson', status: 'On Track' },
    ],
    training: [
      { id: 4, name: 'Safety Training', dueDate: '2024-03-25', pic: 'Alice Brown', status: 'Scheduled' },
      { id: 5, name: 'New Equipment Training', dueDate: '2024-04-05', pic: 'John Doe', status: 'Planning' },
    ],
    improvement: [
      { id: 6, name: 'Process Optimization', dueDate: '2024-04-15', pic: 'Jane Smith', status: 'In Progress' },
      { id: 7, name: '5S Implementation', dueDate: '2024-03-30', pic: 'Bob Johnson', status: 'Completed' },
    ]
  };

  const categories = [
    { id: 'maintenance', name: 'Maintenance', count: nonProjects.maintenance.length },
    { id: 'training', name: 'Training', count: nonProjects.training.length },
    { id: 'improvement', name: 'Improvement', count: nonProjects.improvement.length },
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'On Track': return 'status-on-track';
      case 'Delayed': return 'status-delayed';
      case 'Completed': return 'status-on-track';
      case 'Scheduled': return 'status-at-risk';
      case 'Planning': return 'status-at-risk';
      default: return 'status-at-risk';
    }
  };

  return (
    <div className="non-project-section">
      <div className="section-header">
        <h2 className="section-title">Non-Project Activities</h2>
        <div className="section-actions">
          <button className="btn btn-primary">Add Activity</button>
          <button className="btn btn-secondary">Generate Report</button>
        </div>
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="tab-name">{category.name}</span>
            <span className="tab-count">{category.count}</span>
          </button>
        ))}
      </div>

      <div className="activities-grid">
        {nonProjects[selectedCategory].map((activity) => (
          <div key={activity.id} className="activity-card">
            <div className="activity-header">
              <h3 className="activity-title">{activity.name}</h3>
              <span className={`status-badge ${getStatusClass(activity.status)}`}>
                {activity.status}
              </span>
            </div>
            
            <div className="activity-details">
              <div className="detail-item">
                <span className="detail-label">Due Date:</span>
                <span className="detail-value">
                  {new Date(activity.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">PIC:</span>
                <span className="detail-value">{activity.pic}</span>
              </div>
            </div>

            <div className="activity-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '70%' }}></div>
              </div>
              <span className="progress-text">70%</span>
            </div>

            <div className="activity-actions">
              <button className="btn btn-sm btn-secondary">View Details</button>
              <button className="btn btn-sm btn-primary">Update</button>
            </div>
          </div>
        ))}
      </div>

      <div className="activity-stats">
        <div className="stat-card">
          <h3 className="stat-title">Total Activities</h3>
          <div className="stat-value">7</div>
        </div>
        
        <div className="stat-card">
          <h3 className="stat-title">Completed This Month</h3>
          <div className="stat-value">3</div>
        </div>
        
        <div className="stat-card">
          <h3 className="stat-title">Upcoming Deadlines</h3>
          <div className="stat-value">4</div>
        </div>
      </div>
    </div>
  );
};

export default NonProjectSection;