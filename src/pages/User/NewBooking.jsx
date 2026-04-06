import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth';
import { createBooking, getHubs, getSchedulesByArea, DEVICE_TYPES, CONDITIONS, COLLECTION_MODES } from '../../services/database';
import { calculatePrice, formatPrice } from '../../services/pricing';
import { notifyBookingCreated } from '../../services/notifications';
import {
  HiOutlineDeviceMobile, HiOutlineTruck, HiOutlineLocationMarker,
  HiOutlineOfficeBuilding, HiOutlineClock, HiOutlineCheck,
} from 'react-icons/hi';
import { FaMobileAlt, FaLaptop, FaTabletAlt, FaTv, FaBlender, FaBatteryHalf, FaPlug, FaCubes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './UserPages.css';

const DEVICE_ICONS = {
  Phone: <FaMobileAlt />, Laptop: <FaLaptop />, Tablet: <FaTabletAlt />,
  TV: <FaTv />, Appliance: <FaBlender />, Battery: <FaBatteryHalf />,
  Cable: <FaPlug />, Other: <FaCubes />,
};

const MODE_ICONS = {
  Pickup: <HiOutlineTruck />,
  'Temporary Hub': <HiOutlineClock />,
  'Permanent Hub': <HiOutlineOfficeBuilding />,
};

const MODE_DESCS = {
  Pickup: 'We come to your doorstep',
  'Temporary Hub': 'Drop at weekend camps',
  'Permanent Hub': 'Visit a local collection center',
};

const CONDITION_DESCS = {
  Working: 'Fully functional, no major issues',
  Damaged: 'Works partially, some damage',
  'Non-functional': 'Does not turn on or work',
  'Parts-only': 'For parts/scrap value only',
};

export default function NewBooking() {
  const user = getCurrentUser();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    device_type: '',
    condition: '',
    collection_mode: '',
    hub_id: null,
    scheduled_date: '',
    time_slot: '',
  });
  const navigate = useNavigate();

  const hubs = getHubs().filter(h => h.active);
  const schedules = getSchedulesByArea(user?.area);
  const price = form.device_type && form.condition ? calculatePrice(form.device_type, form.condition) : 0;

  const canNext = () => {
    if (step === 0) return form.device_type && form.condition;
    if (step === 1) return form.collection_mode;
    if (step === 2) return form.time_slot;
    return true;
  };

  const handleSubmit = () => {
    const booking = createBooking({
      user_id: user.user_id,
      device_type: form.device_type,
      condition: form.condition,
      collection_mode: form.collection_mode,
      status: 'Pending',
      area: user.area,
      estimated_price: price,
      hub_id: form.hub_id,
      scheduled_date: form.scheduled_date || new Date().toISOString().split('T')[0],
      time_slot: form.time_slot,
    });
    notifyBookingCreated(user.user_id, form.device_type);
    toast.success('Booking created successfully!');
    navigate('/my-bookings');
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">New <span className="gradient-text">Booking</span></h1>
        <p className="page-subtitle">Submit your e-waste for disposal</p>
      </div>

      {/* Steps */}
      <div className="steps">
        {['Device Info', 'Disposal Method', 'Schedule', 'Confirm'].map((label, i) => (
          <div key={i} className={`step ${i === step ? 'active' : ''} ${i < step ? 'completed' : ''}`}>
            <div className="step-circle">{i < step ? <HiOutlineCheck /> : i + 1}</div>
            <span className="step-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="booking-form-container">
        {/* Step 0: Device Info */}
        {step === 0 && (
          <div className="animate-fade-in-up">
            <h3 style={{ marginBottom: 16 }}>Select Device Type</h3>
            <div className="device-grid">
              {DEVICE_TYPES.map(d => (
                <button key={d} className={`device-option ${form.device_type === d ? 'selected' : ''}`}
                  onClick={() => setForm({ ...form, device_type: d })}>
                  <div className="device-option-icon">{DEVICE_ICONS[d]}</div>
                  {d}
                </button>
              ))}
            </div>

            <h3 style={{ margin: '24px 0 12px' }}>Device Condition</h3>
            <div className="condition-grid">
              {CONDITIONS.map(c => (
                <button key={c} className={`condition-option ${form.condition === c ? 'selected' : ''}`}
                  onClick={() => setForm({ ...form, condition: c })}>
                  <h4>{c}</h4>
                  <p>{CONDITION_DESCS[c]}</p>
                </button>
              ))}
            </div>

            {form.device_type && form.condition && (
              <div className="price-highlight animate-scale-in" style={{ marginTop: 24 }}>
                Estimated Value: {formatPrice(price)}
              </div>
            )}
          </div>
        )}

        {/* Step 1: Mode */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h3 style={{ marginBottom: 16 }}>Choose Disposal Method</h3>
            <div className="mode-grid">
              {COLLECTION_MODES.map(m => (
                <button key={m} className={`mode-option ${form.collection_mode === m ? 'selected' : ''}`}
                  onClick={() => setForm({ ...form, collection_mode: m, hub_id: null })}>
                  <div className="mode-option-icon">{MODE_ICONS[m]}</div>
                  <h4>{m}</h4>
                  <p>{MODE_DESCS[m]}</p>
                </button>
              ))}
            </div>

            {(form.collection_mode === 'Permanent Hub' || form.collection_mode === 'Temporary Hub') && (
              <div style={{ marginTop: 24 }}>
                <h3 style={{ marginBottom: 12 }}>Select Hub</h3>
                <div className="hub-list" style={{ maxHeight: 300 }}>
                  {hubs.filter(h => form.collection_mode === 'Permanent Hub' ? h.type === 'Permanent' : h.type === 'Temporary')
                    .map(h => (
                      <button key={h.hub_id} className={`hub-card ${form.hub_id === h.hub_id ? 'selected' : ''}`}
                        style={form.hub_id === h.hub_id ? { borderColor: 'var(--primary)' } : {}}
                        onClick={() => setForm({ ...form, hub_id: h.hub_id })}>
                        <div className="hub-card-header">
                          <span className="hub-card-name">{h.name}</span>
                          <span className={`badge badge-${h.type.toLowerCase()}`}>{h.type}</span>
                        </div>
                        <div className="hub-card-location">{h.location}</div>
                        <div className="hub-card-timing"><HiOutlineClock /> {h.timings}</div>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Schedule */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <h3 style={{ marginBottom: 16 }}>Select Time Slot</h3>
            <div className="form-group">
              <label className="form-label">Preferred Date</label>
              <input type="date" className="form-input" value={form.scheduled_date}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setForm({ ...form, scheduled_date: e.target.value })} />
            </div>
            <h4 style={{ marginBottom: 12 }}>Available Slots for {user?.area}</h4>
            <div className="schedule-grid">
              {schedules.length > 0 ? schedules.map(s => (
                <button key={s.schedule_id}
                  className={`schedule-card ${form.time_slot === s.time_slot && form.scheduled_date_day === s.collection_day ? 'highlight' : ''}`}
                  onClick={() => setForm({ ...form, time_slot: s.time_slot, scheduled_date_day: s.collection_day })}>
                  <div className="schedule-card-day">{s.collection_day}</div>
                  <div className="schedule-card-time"><HiOutlineClock /> {s.time_slot}</div>
                  <div className="schedule-card-area"><HiOutlineLocationMarker /> {s.area}</div>
                </button>
              )) : (
                <div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>No predefined slots for your area. Select a custom time:</p>
                  <select className="form-select" value={form.time_slot} onChange={e => setForm({ ...form, time_slot: e.target.value })}>
                    <option value="">Select time slot</option>
                    <option>9:00 AM - 12:00 PM</option>
                    <option>12:00 PM - 3:00 PM</option>
                    <option>3:00 PM - 6:00 PM</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <h3 style={{ marginBottom: 16 }}>Review & Confirm</h3>
            <div className="booking-summary">
              <div className="summary-row">
                <span className="summary-label">Device Type</span>
                <span className="summary-value">{form.device_type}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Condition</span>
                <span className="summary-value">{form.condition}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Disposal Method</span>
                <span className="summary-value">{form.collection_mode}</span>
              </div>
              {form.hub_id && (
                <div className="summary-row">
                  <span className="summary-label">Hub</span>
                  <span className="summary-value">{hubs.find(h => h.hub_id === form.hub_id)?.name}</span>
                </div>
              )}
              <div className="summary-row">
                <span className="summary-label">Time Slot</span>
                <span className="summary-value">{form.time_slot || 'Flexible'}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Area</span>
                <span className="summary-value">{user?.area}</span>
              </div>
              <div className="price-highlight">{formatPrice(price)}</div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="form-actions">
          {step > 0 && (
            <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>Back</button>
          )}
          {step < 3 ? (
            <button className="btn btn-primary" disabled={!canNext()} onClick={() => setStep(step + 1)}>Continue</button>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={handleSubmit}>Confirm Booking</button>
          )}
        </div>
      </div>
    </div>
  );
}
