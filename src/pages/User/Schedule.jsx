import { useState } from 'react';
import { getCurrentUser } from '../../services/auth';
import { getSchedules } from '../../services/database';
import { HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';
import './UserPages.css';

export default function Schedule() {
  const user = getCurrentUser();
  const schedules = getSchedules().filter(s => s.active);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Collection <span className="gradient-text">Schedule</span></h1>
        <p className="page-subtitle">Area-wise collection days and time slots in Vellore</p>
      </div>

      {user?.area && (
        <div className="glass-card" style={{ padding: 20, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <HiOutlineLocationMarker style={{ fontSize: 20, color: 'var(--primary)' }} />
          <span>Your area: <strong>{user.area}</strong></span>
        </div>
      )}

      <div className="schedule-grid">
        {schedules.map(s => (
          <div key={s.schedule_id}
            className={`schedule-card ${s.area === user?.area ? 'highlight' : ''}`}>
            <div className="schedule-card-day">{s.collection_day}</div>
            <div className="schedule-card-time"><HiOutlineClock /> {s.time_slot}</div>
            <div className="schedule-card-area"><HiOutlineLocationMarker /> {s.area}</div>
            {s.area === user?.area && (
              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>
                ✓ Your area
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
