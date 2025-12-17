import React, { useState } from 'react';
import ProjectDropdown from './ProjectDropdown';
import DeviationChart from './DeviationChart';
import { projects } from '../../data/mockData';
import './ProjectSection.css';

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="project-section">
      <div className="section-header">
        <h2 className="section-title">Project Monitoring</h2>
        <div className="section-actions">
          <button className="btn btn-primary">Add New Project</button>
          <button className="btn btn-secondary">Filter Projects</button>
        </div>
      </div>

      <ProjectDropdown 
        projects={projects}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
      />

      {selectedProject && (
        <div className="project-details">
          <div className="project-overview">
            <div className="overview-card">
              <h3 className="overview-title">Project Overview</h3>
              <div className="overview-grid">
                <div className="overview-item">
                  <span className="overview-label">Start Date</span>
                  <span className="overview-value">
                    {new Date(selectedProject.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">End Date</span>
                  <span className="overview-value">
                    {new Date(selectedProject.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Budget</span>
                  <span className="overview-value">
                    ${selectedProject.budget.toLocaleString()}
                  </span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Spent</span>
                  <span className="overview-value">
                    ${selectedProject.spent.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="progress-card">
              <h3 className="progress-title">Progress</h3>
              <div className="progress-circle">
                <div className="circle-chart">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#e9ecef"
                      strokeWidth="12"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#3498db"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${selectedProject.progress * 3.39} 339`}
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="circle-text">
                    <span className="circle-value">{selectedProject.progress}%</span>
                    <span className="circle-label">Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="project-charts">
            <div className="chart-card">
              <div className="card-header">
                <h3 className="card-title">S-Curve Progress</h3>
              </div>
              <DeviationChart />
            </div>

            <div className="chart-card">
              <div className="card-header">
                <h3 className="card-title">Budget vs Actual</h3>
              </div>
              <div className="budget-chart">
                <div className="budget-bar">
                  <div className="budget-label">Budget</div>
                  <div className="budget-track">
                    <div 
                      className="budget-fill"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <div className="budget-amount">${selectedProject.budget.toLocaleString()}</div>
                </div>
                <div className="budget-bar">
                  <div className="budget-label">Spent</div>
                  <div className="budget-track">
                    <div 
                      className="budget-fill spent"
                      style={{ width: `${(selectedProject.spent / selectedProject.budget) * 100}%` }}
                    ></div>
                  </div>
                  <div className="budget-amount">${selectedProject.spent.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="project-tables">
            <div className="table-card">
              <div className="card-header">
                <h3 className="card-title">Team Members</h3>
              </div>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProject.teamMembers.map((member, index) => (
                      <tr key={index}>
                        <td>
                          <div className="member-info">
                            <div className="member-avatar">
                              {member.name.charAt(0)}
                            </div>
                            <span>{member.name}</span>
                          </div>
                        </td>
                        <td>{member.role}</td>
                        <td>
                          <button className="btn btn-sm btn-secondary">
                            Contact
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="table-card">
              <div className="card-header">
                <h3 className="card-title">Milestones</h3>
              </div>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Milestone</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProject.milestones.map((milestone, index) => (
                      <tr key={index}>
                        <td>{milestone.name}</td>
                        <td>
                          {new Date(milestone.date).toLocaleDateString()}
                        </td>
                        <td>
                          <span className={`status-badge ${
                            milestone.status === 'completed' ? 'status-on-track' :
                            milestone.status === 'delayed' ? 'status-delayed' :
                            'status-at-risk'
                          }`}>
                            {milestone.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSection;