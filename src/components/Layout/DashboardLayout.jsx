import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 1024);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const closeSidebar = () => {
    if (window.innerWidth < 1024) setSidebarCollapsed(true);
  };

  return (
    <div className="dashboard-layout">
      <Navbar onToggleSidebar={toggleSidebar} />
      <Sidebar collapsed={sidebarCollapsed} onClose={closeSidebar} />
      <main className={`dashboard-main ${sidebarCollapsed ? 'expanded' : ''}`}>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
