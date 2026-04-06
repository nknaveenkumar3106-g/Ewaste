import { NavLink, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth';
import {
  HiOutlineViewGrid, HiOutlinePlusCircle, HiOutlineClipboardList,
  HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineTruck,
  HiOutlineOfficeBuilding, HiOutlineClock, HiOutlineChartBar,
} from 'react-icons/hi';
import { FaRecycle } from 'react-icons/fa';
import './Sidebar.css';

const userLinks = [
  { to: '/dashboard', icon: <HiOutlineViewGrid />, label: 'Dashboard' },
  { to: '/new-booking', icon: <HiOutlinePlusCircle />, label: 'New Booking' },
  { to: '/my-bookings', icon: <HiOutlineClipboardList />, label: 'My Bookings' },
  { to: '/hubs', icon: <HiOutlineLocationMarker />, label: 'Find Hubs' },
  { to: '/schedule', icon: <HiOutlineCalendar />, label: 'Schedule' },
];

const adminLinks = [
  { to: '/admin', icon: <HiOutlineChartBar />, label: 'Dashboard', end: true },
  { to: '/admin/bookings', icon: <HiOutlineClipboardList />, label: 'Bookings' },
  { to: '/admin/hubs', icon: <HiOutlineOfficeBuilding />, label: 'Hubs' },
  { to: '/admin/schedules', icon: <HiOutlineClock />, label: 'Schedules' },
  { to: '/admin/collection', icon: <HiOutlineTruck />, label: 'Collection' },
];

export default function Sidebar({ collapsed, onClose }) {
  const user = getCurrentUser();
  const links = user?.role === 'admin' ? adminLinks : userLinks;

  return (
    <>
      <div className={`sidebar-overlay ${!collapsed ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-nav">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="sidebar-link-icon">{link.icon}</span>
                <span className="sidebar-link-label">{link.label}</span>
              </NavLink>
            ))}
          </div>
          <div className="sidebar-footer">
            <div className="sidebar-footer-icon"><FaRecycle /></div>
            <span className="sidebar-footer-text">CEMS v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}
