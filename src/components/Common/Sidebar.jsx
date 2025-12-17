import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }) => {
  const menuItems = [
    { id: 'summary', label: 'Summary', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '🏗️' },
    { id: 'non-projects', label: 'Non-Projects', icon: '📝' },
    { id: 'manpower', label: 'Man Power', icon: '👥' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h2 className="sidebar-title">TE Dashboard</h2>}
        <button 
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>
      
      {!collapsed && (
        <div className="sidebar-footer">
          <div className="version-info">v1.0.0</div>
          <div className="copyright">© 2024 TE Monitoring</div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;