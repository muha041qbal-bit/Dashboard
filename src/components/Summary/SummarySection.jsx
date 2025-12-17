import React from 'react';
import { summaryData, priorityProjects, sCurveData } from '../../data/mockData';
import SCurveChart from './SCurveChart';
import PriorityList from './PriorityList';
import ProjectMap from './ProjectMap';
import './SummarySection.css';

const SummarySection = () => {
  return (
    <div className="summary-section">
      <div className="summary-header">
        <h2 className="section-title">Dashboard Summary</h2>
        <div className="summary-actions">
          <button className="btn btn-primary">Export Report</button>
          <button className="btn btn-secondary">Refresh Data</button>
        </div>
      </div>
      
      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3 className="stat-value">{summaryData.totalProjects}</h3>
            <p className="stat-label">Total Projects</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon active">🚀</div>
          <div className="stat-content">
            <h3 className="stat-value">{summaryData.activeProjects}</h3>
            <p className="stat-label">Active Projects</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon completed">✅</div>
          <div className="stat-content">
            <h3 className="stat-value">{summaryData.completedProjects}</h3>
            <p className="stat-label">Completed</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon delayed">⚠️</div>
          <div className="stat-content">
            <h3 className="stat-value">{summaryData.delayedProjects}</h3>
            <p className="stat-label">Delayed</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon manpower">👥</div>
          <div className="stat-content">
            <h3 className="stat-value">{summaryData.totalManpower}</h3>
            <p className="stat-label">Total Manpower</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon budget">💰</div>
          <div className="stat-content">
            <div className="budget-progress">
              <div className="budget-used" style={{ width: `${summaryData.budgetUsed}%` }}>
                <span className="budget-text">Used: {summaryData.budgetUsed}%</span>
              </div>
              <div className="budget-remaining" style={{ width: `${summaryData.budgetRemaining}%` }}>
                <span className="budget-text">Remaining: {summaryData.budgetRemaining}%</span>
              </div>
            </div>
            <p className="stat-label">Budget Utilization</p>
          </div>
        </div>
      </div>
      
      <div className="summary-grid">
        <div className="grid-item full-width">
          <ProjectMap />
        </div>
        
        <div className="grid-item">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Project S-Curve</h3>
            </div>
            <SCurveChart data={sCurveData} />
          </div>
        </div>
        
        <div className="grid-item">
          <PriorityList projects={priorityProjects} />
        </div>
      </div>
    </div>
  );
};

export default SummarySection;