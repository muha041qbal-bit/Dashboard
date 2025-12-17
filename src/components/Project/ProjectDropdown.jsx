import React from 'react';
import './ProjectDropdown.css';

const ProjectDropdown = ({ projects, selectedProject, onSelectProject }) => {
  return (
    <div className="project-selector">
      <div className="selector-header">
        <h3 className="selector-title">Select Project</h3>
        <div className="project-count">
          {projects.length} Projects
        </div>
      </div>
      
      <div className="dropdown-container">
        <select 
          className="project-dropdown"
          value={selectedProject?.id}
          onChange={(e) => {
            const project = projects.find(p => p.id === parseInt(e.target.value));
            onSelectProject(project);
          }}
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        
        <div className="dropdown-arrow">▼</div>
      </div>
      
      {selectedProject && (
        <div className="selected-project-info">
          <div className="project-status">
            <span className={`status-indicator ${selectedProject.status}`}></span>
            <span className="status-text">
              {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
            </span>
          </div>
          <p className="project-description">{selectedProject.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectDropdown;