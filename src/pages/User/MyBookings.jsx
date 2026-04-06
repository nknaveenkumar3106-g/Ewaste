import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../services/auth';
import { getBookingsByUser, deleteBooking } from '../../services/database';
import { formatPrice } from '../../services/pricing';
import { HiOutlineTrash, HiOutlineEye } from 'react-icons/hi';
import toast from 'react-hot-toast';
import './UserPages.css';

export default function MyBookings() {
  const user = getCurrentUser();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (user) setBookings(getBookingsByUser(user.user_id));
  }, []);

  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const handleCancel = (id) => {
    if (!confirm('Cancel this booking?')) return;
    deleteBooking(id);
    setBookings(prev => prev.filter(b => b.booking_id !== id));
    toast.success('Booking cancelled');
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">My <span className="gradient-text">Bookings</span></h1>
        <p className="page-subtitle">{bookings.length} total booking{bookings.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Filters */}
      <div className="tabs">
        {['All', 'Pending', 'Scheduled', 'Collected', 'Paid'].map(s => (
          <button key={s} className={`tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div className="glass-card">
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <div className="empty-state-title">No bookings found</div>
            <div className="empty-state-text">{filter !== 'All' ? `No ${filter.toLowerCase()} bookings.` : 'Create your first booking to get started.'}</div>
          </div>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Device</th>
                <th>Condition</th>
                <th>Method</th>
                <th>Status</th>
                <th>Price</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(b => (
                <tr key={b.booking_id}>
                  <td><strong>{b.device_type}</strong></td>
                  <td>{b.condition}</td>
                  <td>{b.collection_mode}</td>
                  <td><span className={`badge badge-${b.status.toLowerCase()}`}>{b.status}</span></td>
                  <td className="text-green">{formatPrice(b.estimated_price)}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{new Date(b.created_at).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setSelected(b)} title="View">
                        <HiOutlineEye />
                      </button>
                      {b.status === 'Pending' && (
                        <button className="btn btn-ghost btn-sm text-red" onClick={() => handleCancel(b.booking_id)} title="Cancel">
                          <HiOutlineTrash />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Booking Details</h2>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="booking-detail-grid">
              <div className="detail-group">
                <div className="detail-label">Device Type</div>
                <div className="detail-value">{selected.device_type}</div>
              </div>
              <div className="detail-group">
                <div className="detail-label">Condition</div>
                <div className="detail-value">{selected.condition}</div>
              </div>
              <div className="detail-group">
                <div className="detail-label">Collection Mode</div>
                <div className="detail-value">{selected.collection_mode}</div>
              </div>
              <div className="detail-group">
                <div className="detail-label">Status</div>
                <div className="detail-value"><span className={`badge badge-${selected.status.toLowerCase()}`}>{selected.status}</span></div>
              </div>
              <div className="detail-group">
                <div className="detail-label">Area</div>
                <div className="detail-value">{selected.area}</div>
              </div>
              <div className="detail-group">
                <div className="detail-label">Time Slot</div>
                <div className="detail-value">{selected.time_slot}</div>
              </div>
              <div className="detail-group">
                <div className="detail-label">Estimated Price</div>
                <div className="detail-value text-green">{formatPrice(selected.estimated_price)}</div>
              </div>
              <div className="detail-group">
                <div className="detail-label">Created</div>
                <div className="detail-value">{new Date(selected.created_at).toLocaleString()}</div>
              </div>
            </div>

            {/* Status Timeline */}
            <div style={{ marginTop: 24 }}>
              <h4 style={{ marginBottom: 12 }}>Status Timeline</h4>
              <div className="timeline">
                {['Pending', 'Scheduled', 'Collected', 'Paid'].map((s, i) => {
                  const statusOrder = ['Pending', 'Scheduled', 'Collected', 'Paid'];
                  const currentIdx = statusOrder.indexOf(selected.status);
                  const isCompleted = i < currentIdx;
                  const isActive = i === currentIdx;
                  return (
                    <div key={s} className={`timeline-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                      <div className="timeline-dot" />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{s}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                          {s === 'Pending' && 'Request submitted'}
                          {s === 'Scheduled' && 'Collection scheduled'}
                          {s === 'Collected' && 'Items collected'}
                          {s === 'Paid' && 'Payment processed'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
