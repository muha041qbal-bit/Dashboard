import React, { useState } from 'react';
import ManPowerChart from './ManPowerChart';
import AllocationTable from './AllocationTable';
import { manPowerData } from '../../data/mockData';
import './ManPowerSection.css';

const ManPowerSection = () => {
  const [viewType, setViewType] = useState('department');

  return (
    <div className="manpower-section">
      <div className="section-header">
        <h2 className="section-title">Man Power Management</h2>
        <div className="section-actions">
          <button className="btn btn-primary">Allocate Resources</button>
          <button className="btn btn-secondary">Export Data</button>
        </div>
      </div>

      <div className="view-toggle">
        <button 
          className={`toggle-btn ${viewType === 'department' ? 'active' : ''}`}
          onClick={() => setViewType('department')}
        >
          By Department
        </button>
        <button 
          className={`toggle-btn ${viewType === 'project' ? 'active' : ''}`}
          onClick={() => setViewType('project')}
        >
          By Project
        </button>
      </div>

      <div className="manpower-overview">
        <div className="overview-card">
          <h3 className="overview-title">Resource Overview</h3>
          <div className="resource-stats">
            {manPowerData.departments.map((dept, index) => (
              <div key={index} className="resource-stat">
                <div className="stat-header">
                  <span className="stat-label">{dept.name}</span>
                  <span className="stat-total">{dept.total}</span>
                </div>
                <div className="stat-bars">
                  <div className="allocated-bar" style={{ width: `${(dept.allocated / dept.total) * 100}%` }}>
                    <span className="bar-text">{dept.allocated}</span>
                  </div>
                  <div className="available-bar" style={{ width: `${(dept.available / dept.total) * 100}%` }}>
                    <span className="bar-text">{dept.available}</span>
                  </div>
                </div>
                <div className="stat-labels">
                  <span className="label-allocated">Allocated</span>
                  <span className="label-available">Available</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Overtime Hours</h3>
          <ManPowerChart data={manPowerData.overtime} />
        </div>
      </div>

      <div className="allocation-section">
        <div className="section-header">
          <h3 className="section-subtitle">Resource Allocation</h3>
          <div className="total-summary">
            <span className="summary-label">Total Allocated:</span>
            <span className="summary-value">32 Engineers</span>
          </div>
        </div>
        <AllocationTable data={manPowerData.allocation} />
      </div>

      <div className="utilization-metrics">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h4 className="metric-value">85%</h4>
            <p className="metric-label">Utilization Rate</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">⏰</div>
          <div className="metric-content">
            <h4 className="metric-value">165</h4>
            <p className="metric-label">Avg Monthly Overtime</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h4 className="metric-value">13</h4>
            <p className="metric-label">Available Resources</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">🎯</div>
          <div className="metric-content">
            <h4 className="metric-value">92%</h4>
            <p className="metric-label">Skill Match Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManPowerSection;