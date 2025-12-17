import React from 'react';
import './PriorityList.css';

const PriorityList = ({ projects }) => {
  const getStatusClass = (status) => {
    switch(status) {
      case 'On Track': return 'status-on-track';
      case 'Delayed': return 'status-delayed';
      case 'At Risk': return 'status-at-risk';
      default: return '';
    }
  };

  return (
    <div className="priority-list">
      <div className="card-header">
        <h3 className="card-title">Priority Projects</h3>
        <button className="btn btn-sm btn-secondary">View All</button>
      </div>
      
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Due Date</th>
              <th>PIC</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="project-row">
                <td>
                  <div className="project-name">
                    <strong>{project.name}</strong>
                    <div className="project-action">{project.actionPlan}</div>
                  </div>
                </td>
                <td>
                  <div className="due-date">
                    {new Date(project.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </td>
                <td>
                  <div className="pic-info">
                    <div className="pic-avatar">{project.pic.charAt(0)}</div>
                    <span>{project.pic}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${getStatusClass(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{project.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriorityList;