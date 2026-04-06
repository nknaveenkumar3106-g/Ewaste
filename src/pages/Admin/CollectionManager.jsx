import { useState, useEffect } from 'react';
import { getBookings, updateBooking, getUsers, AREAS } from '../../services/database';
import { formatPrice } from '../../services/pricing';
import { HiOutlineCheck, HiOutlineTruck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import './AdminPages.css';

export default function CollectionManager() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [dayFilter, setDayFilter] = useState('all');

  const load = () => {
    setBookings(getBookings());
    setUsers(getUsers());
  };
  useEffect(() => { load(); }, []);

  const getUserName = (uid) => users.find(u => u.user_id === uid)?.name || 'Unknown';

  const collectableBookings = bookings.filter(b => b.status === 'Pending' || b.status === 'Scheduled');

  const areaGroups = AREAS.reduce((acc, area) => {
    const items = collectableBookings.filter(b => b.area === area);
    if (items.length > 0) acc[area] = items;
    return acc;
  }, {});

  const handleMarkCollected = (id) => {
    updateBooking(id, { status: 'Collected' });
    toast.success('Marked as collected');
    load();
  };

  const handleMarkScheduled = (id) => {
    updateBooking(id, { status: 'Scheduled' });
    toast.success('Marked as scheduled');
    load();
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Collection <span className="gradient-text">Manager</span></h1>
        <p className="page-subtitle">Field operations — {collectableBookings.length} pending collections</p>
      </div>

      {/* Overview */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}><HiOutlineTruck /></div>
          <div className="stat-content">
            <div className="stat-value">{bookings.filter(b => b.status === 'Pending').length}</div>
            <div className="stat-label">Pending Pickup</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}><HiOutlineTruck /></div>
          <div className="stat-content">
            <div className="stat-value">{bookings.filter(b => b.status === 'Scheduled').length}</div>
            <div className="stat-label">Scheduled</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}><HiOutlineCheck /></div>
          <div className="stat-content">
            <div className="stat-value">{bookings.filter(b => b.status === 'Collected').length}</div>
            <div className="stat-label">Collected Today</div>
          </div>
        </div>
      </div>

      {/* Area Cards */}
      {Object.keys(areaGroups).length === 0 ? (
        <div className="glass-card">
          <div className="empty-state">
            <div className="empty-state-icon">✅</div>
            <div className="empty-state-title">All caught up!</div>
            <div className="empty-state-text">No pending collections at the moment.</div>
          </div>
        </div>
      ) : (
        <div className="collection-area-cards">
          {Object.entries(areaGroups).map(([area, items]) => (
            <div key={area} className="collection-area-card">
              <div className="collection-area-header">
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>{area}</h3>
                <span className="badge badge-pending">{items.length} items</span>
              </div>
              {items.map(b => (
                <div key={b.booking_id} className="collection-booking-item">
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{b.device_type} — {b.condition}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{getUserName(b.user_id)} · {b.collection_mode}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {b.status === 'Pending' && (
                      <button className="btn btn-secondary btn-sm" onClick={() => handleMarkScheduled(b.booking_id)}>
                        Schedule
                      </button>
                    )}
                    <button className="btn btn-primary btn-sm" onClick={() => handleMarkCollected(b.booking_id)}>
                      <HiOutlineCheck /> Collect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
