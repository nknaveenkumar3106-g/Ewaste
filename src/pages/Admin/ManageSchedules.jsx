import { useState, useEffect } from 'react';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule, AREAS, DAYS } from '../../services/database';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';
import toast from 'react-hot-toast';
import './AdminPages.css';

export default function ManageSchedules() {
  const [schedules, setSchedulesList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ area: '', collection_day: '', time_slot: '' });

  const load = () => setSchedulesList(getSchedules());
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ area: '', collection_day: '', time_slot: '' });
    setEditing(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!form.area || !form.collection_day || !form.time_slot) {
      toast.error('Fill all fields');
      return;
    }
    if (editing) {
      updateSchedule(editing, form);
      toast.success('Schedule updated');
    } else {
      createSchedule(form);
      toast.success('Schedule added');
    }
    load();
    resetForm();
  };

  const handleEdit = (s) => {
    setForm({ area: s.area, collection_day: s.collection_day, time_slot: s.time_slot });
    setEditing(s.schedule_id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this schedule?')) return;
    deleteSchedule(id);
    toast.success('Schedule deleted');
    load();
  };

  // Group by day
  const grouped = DAYS.reduce((acc, day) => {
    const items = schedules.filter(s => s.collection_day === day);
    if (items.length > 0) acc[day] = items;
    return acc;
  }, {});

  return (
    <div className="animate-fade-in">
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Manage <span className="gradient-text">Schedules</span></h1>
          <p className="page-subtitle">{schedules.length} collection schedules</p>
        </div>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
          <HiOutlinePlus /> Add Schedule
        </button>
      </div>

      {showForm && (
        <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
          <h3 className="section-heading">{editing ? 'Edit Schedule' : 'Add New Schedule'}</h3>
          <div className="admin-form">
            <div className="form-group">
              <label className="form-label">Area *</label>
              <select className="form-select" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })}>
                <option value="">Select area</option>
                {AREAS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Collection Day *</label>
              <select className="form-select" value={form.collection_day} onChange={e => setForm({ ...form, collection_day: e.target.value })}>
                <option value="">Select day</option>
                {DAYS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Time Slot *</label>
              <select className="form-select" value={form.time_slot} onChange={e => setForm({ ...form, time_slot: e.target.value })}>
                <option value="">Select slot</option>
                <option>9:00 AM - 12:00 PM</option>
                <option>12:00 PM - 3:00 PM</option>
                <option>2:00 PM - 5:00 PM</option>
                <option>3:00 PM - 6:00 PM</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Update' : 'Add'}</button>
              <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {Object.entries(grouped).map(([day, items]) => (
        <div key={day} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: 'var(--primary)' }}>{day}</h3>
          <div className="schedule-grid">
            {items.map(s => (
              <div key={s.schedule_id} className="schedule-card">
                <div className="schedule-card-day">{s.area}</div>
                <div className="schedule-card-time"><HiOutlineClock /> {s.time_slot}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(s)}>
                    <HiOutlinePencil /> Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.schedule_id)}>
                    <HiOutlineTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
