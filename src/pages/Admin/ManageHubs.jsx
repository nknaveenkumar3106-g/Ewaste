import { useState, useEffect } from 'react';
import { getHubs, createHub, updateHub, deleteHub, AREAS } from '../../services/database';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';
import toast from 'react-hot-toast';
import './AdminPages.css';

export default function ManageHubs() {
  const [hubs, setHubs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', type: 'Permanent', location: '', area: '', lat: '', lng: '', timings: '' });

  const load = () => setHubs(getHubs());
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ name: '', type: 'Permanent', location: '', area: '', lat: '', lng: '', timings: '' });
    setEditing(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!form.name || !form.location || !form.area || !form.timings) {
      toast.error('Fill all required fields');
      return;
    }
    const data = { ...form, lat: parseFloat(form.lat) || 12.9165, lng: parseFloat(form.lng) || 79.1325 };
    if (editing) {
      updateHub(editing, data);
      toast.success('Hub updated');
    } else {
      createHub(data);
      toast.success('Hub added');
    }
    load();
    resetForm();
  };

  const handleEdit = (hub) => {
    setForm({
      name: hub.name, type: hub.type, location: hub.location, area: hub.area,
      lat: hub.lat?.toString() || '', lng: hub.lng?.toString() || '', timings: hub.timings,
    });
    setEditing(hub.hub_id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this hub?')) return;
    deleteHub(id);
    toast.success('Hub deleted');
    load();
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Manage <span className="gradient-text">Hubs</span></h1>
          <p className="page-subtitle">{hubs.length} collection points</p>
        </div>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
          <HiOutlinePlus /> Add Hub
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
          <h3 className="section-heading">{editing ? 'Edit Hub' : 'Add New Hub'}</h3>
          <div className="admin-form">
            <div className="form-group">
              <label className="form-label">Hub Name *</label>
              <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Hub name" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Type *</label>
                <select className="form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option>Permanent</option>
                  <option>Temporary</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Area *</label>
                <select className="form-select" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })}>
                  <option value="">Select area</option>
                  {AREAS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Location / Address *</label>
              <input className="form-input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Full address" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Latitude</label>
                <input className="form-input" value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} placeholder="12.9165" />
              </div>
              <div className="form-group">
                <label className="form-label">Longitude</label>
                <input className="form-input" value={form.lng} onChange={e => setForm({ ...form, lng: e.target.value })} placeholder="79.1325" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Timings *</label>
              <input className="form-input" value={form.timings} onChange={e => setForm({ ...form, timings: e.target.value })} placeholder="Mon-Sat: 9:00 AM - 6:00 PM" />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Update Hub' : 'Add Hub'}</button>
              <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Hub List */}
      <div className="hub-mgmt-grid">
        {hubs.map(hub => (
          <div key={hub.hub_id} className="hub-mgmt-card">
            <div className="flex-between" style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>{hub.name}</h3>
              <span className={`badge badge-${hub.type.toLowerCase()}`}>{hub.type}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
              <HiOutlineLocationMarker style={{ verticalAlign: 'middle', marginRight: 4 }} />{hub.location}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
              <HiOutlineClock style={{ verticalAlign: 'middle', marginRight: 4 }} />{hub.timings}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Area: {hub.area}</div>
            <div className="hub-mgmt-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(hub)}>
                <HiOutlinePencil /> Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(hub.hub_id)}>
                <HiOutlineTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
