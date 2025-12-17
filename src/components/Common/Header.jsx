import React from 'react';
import './Header.css';

const Header = ({ title, onMenuClick }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <span className="menu-icon">☰</span>
        </button>
        <h1 className="header-title">{title}</h1>
      </div>
      <div className="header-right">
        <div className="header-actions">
          <button className="btn btn-secondary">
            <span className="icon">🔔</span>
          </button>
          <button className="btn btn-secondary">
            <span className="icon">⚙️</span>
          </button>
          <div className="user-profile">
            <div className="avatar">JD</div>
            <span className="user-name">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;