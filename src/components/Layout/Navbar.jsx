import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../services/auth';
import { getUnreadCount } from '../../services/notifications';
import {
  HiOutlineMenu, HiOutlineX, HiOutlineBell,
  HiOutlineLogout, HiOutlineUser, HiOutlineCog,
} from 'react-icons/hi';
import { FaRecycle } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar({ onToggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      setNotifCount(getUnreadCount(user.user_id));
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isLanding = location.pathname === '/';
  const isAuth = location.pathname.startsWith('/login') || location.pathname.startsWith('/register');

  return (
    <nav className={`navbar ${isLanding ? 'navbar-landing' : ''}`}>
      <div className="navbar-inner">
        <div className="navbar-left">
          {user && !isLanding && !isAuth && (
            <button className="sidebar-toggle" onClick={onToggleSidebar}>
              <HiOutlineMenu />
            </button>
          )}
          <Link to="/" className="navbar-brand">
            <div className="brand-icon">
              <FaRecycle />
            </div>
            <div className="brand-text">
              <span className="brand-name">CEMS</span>
              <span className="brand-tagline">Circular E-Waste</span>
            </div>
          </Link>
        </div>

        {/* Landing Nav Links */}
        {isLanding && !user && (
          <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#impact" onClick={() => setMenuOpen(false)}>Impact</a>
            <a href="#hubs" onClick={() => setMenuOpen(false)}>Hubs</a>
            <div className="navbar-links-actions">
              <Link to="/login" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </div>
          </div>
        )}

        <div className="navbar-right">
          {user && (
            <>
              <button className="nav-icon-btn" onClick={() => navigate(user.role === 'admin' ? '/admin' : '/dashboard')}>
                <HiOutlineBell />
                {notifCount > 0 && <span className="notif-badge">{notifCount}</span>}
              </button>
              <div className="profile-menu-wrap">
                <button className="profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
                  <div className="profile-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="profile-name">{user.name?.split(' ')[0]}</span>
                </button>
                {profileOpen && (
                  <div className="profile-dropdown animate-fade-in">
                    <div className="profile-dropdown-header">
                      <div className="profile-avatar-lg">{user.name?.charAt(0).toUpperCase()}</div>
                      <div>
                        <div className="profile-dropdown-name">{user.name}</div>
                        <div className="profile-dropdown-email">{user.email}</div>
                      </div>
                    </div>
                    <div className="profile-dropdown-divider" />
                    <button className="profile-dropdown-item" onClick={() => { setProfileOpen(false); navigate(user.role === 'admin' ? '/admin' : '/dashboard'); }}>
                      <HiOutlineUser /> Dashboard
                    </button>
                    <button className="profile-dropdown-item text-red" onClick={() => { setProfileOpen(false); handleLogout(); }}>
                      <HiOutlineLogout /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {isLanding && !user && (
            <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
