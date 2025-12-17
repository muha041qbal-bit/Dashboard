import React, { useState } from 'react';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import SummarySection from '../components/Summary/SummarySection';
import ProjectSection from '../components/Project/ProjectSection';
import NonProjectSection from '../components/NonProject/NonProjectSection';
import ManPowerSection from '../components/ManPower/ManPowerSection';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return <SummarySection />;
      case 'projects':
        return <ProjectSection />;
      case 'non-projects':
        return <NonProjectSection />;
      case 'manpower':
        return <ManPowerSection />;
      case 'reports':
        return <div className="coming-soon">Reports Section - Coming Soon</div>;
      case 'settings':
        return <div className="coming-soon">Settings Section - Coming Soon</div>;
      default:
        return <SummarySection />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'summary':
        return 'Dashboard Summary';
      case 'projects':
        return 'Project Monitoring';
      case 'non-projects':
        return 'Non-Project Activities';
      case 'manpower':
        return 'Man Power Management';
      case 'reports':
        return 'Reports & Analytics';
      case 'settings':
        return 'System Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="dashboard">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`main-content ${sidebarCollapsed ? 'content-full' : ''}`}>
        <Header 
          title={getPageTitle()}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;