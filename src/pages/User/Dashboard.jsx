import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth';
import { getBookingsByUser, getSchedulesByArea } from '../../services/database';
import { formatPrice } from '../../services/pricing';
import {
  HiOutlinePlusCircle, HiOutlineClipboardList, HiOutlineLocationMarker,
  HiOutlineCalendar, HiOutlineCurrencyRupee, HiOutlineTruck, HiOutlineClock,
} from 'react-icons/hi';
import './UserPages.css';

export default function UserDashboard() {
  const user = getCurrentUser();
  const [bookings, setBookings] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (user) {
      setBookings(getBookingsByUser(user.user_id));
      setSchedule(getSchedulesByArea(user.area));
    }
  }, []);

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    collected: bookings.filter(b => b.status === 'Collected' || b.status === 'Paid').length,
    earned: bookings.filter(b => b.status === 'Paid').reduce((sum, b) => sum + (b.estimated_price || 0), 0),
  };

  const recentBookings = [...bookings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="welcome-msg">
          <h1 className="page-title">Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋</h1>
          <p className="page-subtitle">Here's your e-waste management overview</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        <div className="stat-card animate-fade-in-up delay-1">
          <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}><HiOutlineClipboardList /></div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
        </div>
        <div className="stat-card animate-fade-in-up delay-2">
          <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}><HiOutlineClock /></div>
          <div className="stat-content">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
        <div className="stat-card animate-fade-in-up delay-3">
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}><HiOutlineTruck /></div>
          <div className="stat-content">
            <div className="stat-value">{stats.collected}</div>
            <div className="stat-label">Collected</div>
          </div>
        </div>
        <div className="stat-card animate-fade-in-up delay-4">
          <div className="stat-icon" style={{ background: 'rgba(139,92,246,0.12)', color: '#A78BFA' }}><HiOutlineCurrencyRupee /></div>
          <div className="stat-content">
            <div className="stat-value">{formatPrice(stats.earned)}</div>
            <div className="stat-label">Total Earned</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Quick Actions */}
        <div className="glass-card dashboard-section">
          <h3 className="section-heading">Quick Actions</h3>
          <div className="quick-actions">
            <Link to="/new-booking" className="quick-action-card">
              <div className="qa-icon" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}><HiOutlinePlusCircle /></div>
              <span>New Booking</span>
            </Link>
            <Link to="/my-bookings" className="quick-action-card">
              <div className="qa-icon" style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}><HiOutlineClipboardList /></div>
              <span>My Bookings</span>
            </Link>
            <Link to="/hubs" className="quick-action-card">
              <div className="qa-icon" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}><HiOutlineLocationMarker /></div>
              <span>Find Hubs</span>
            </Link>
            <Link to="/schedule" className="quick-action-card">
              <div className="qa-icon" style={{ background: 'rgba(139,92,246,0.12)', color: '#A78BFA' }}><HiOutlineCalendar /></div>
              <span>Schedule</span>
            </Link>
          </div>
        </div>

        {/* Next Collection */}
        {schedule.length > 0 && (
          <div className="glass-card dashboard-section">
            <h3 className="section-heading">Your Collection Schedule</h3>
            <div className="schedule-preview">
              {schedule.map(s => (
                <div key={s.schedule_id} className="schedule-item">
                  <div className="schedule-day">{s.collection_day}</div>
                  <div className="schedule-time">{s.time_slot}</div>
                  <div className="schedule-area">{s.area}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recent Bookings */}
      <div className="glass-card dashboard-section" style={{ marginTop: 24 }}>
        <div className="flex-between" style={{ marginBottom: 16 }}>
          <h3 className="section-heading" style={{ marginBottom: 0 }}>Recent Bookings</h3>
          <Link to="/my-bookings" className="btn btn-ghost btn-sm">View All</Link>
        </div>
        {recentBookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📱</div>
            <div className="empty-state-title">No bookings yet</div>
            <div className="empty-state-text">Submit your first e-waste request to get started.</div>
            <Link to="/new-booking" className="btn btn-primary" style={{ marginTop: 16 }}>Create Booking</Link>
          </div>
        ) : (
          <div className="booking-list">
            {recentBookings.map(b => (
              <div key={b.booking_id} className="booking-row">
                <div className="booking-device">
                  <div className="booking-device-type">{b.device_type}</div>
                  <div className="booking-device-condition">{b.condition}</div>
                </div>
                <div className="booking-mode">{b.collection_mode}</div>
                <div className={`badge badge-${b.status.toLowerCase()}`}>{b.status}</div>
                <div className="booking-price">{formatPrice(b.estimated_price)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
