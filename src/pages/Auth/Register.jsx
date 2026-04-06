import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth';
import { AREAS } from '../../services/database';
import Navbar from '../../components/Layout/Navbar';
import { FaRecycle } from 'react-icons/fa';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', address: '', area: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.phone || !form.area) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = register(form);
      setLoading(false);
      if (result.success) {
        toast.success('Account created! Welcome to CEMS.');
        navigate('/dashboard');
      } else {
        toast.error(result.error);
      }
    }, 500);
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <div className="auth-card glass-card animate-scale-in" style={{ maxWidth: 480 }}>
          <div className="auth-header">
            <div className="auth-logo"><FaRecycle /></div>
            <h1>Create Account</h1>
            <p>Join CEMS and start recycling</p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <div className="input-icon-wrap">
                  <HiOutlineUser className="input-icon" />
                  <input className="form-input" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <div className="input-icon-wrap">
                  <HiOutlinePhone className="input-icon" />
                  <input className="form-input" name="phone" placeholder="9876543210" value={form.phone} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <div className="input-icon-wrap">
                <HiOutlineMail className="input-icon" />
                <input type="email" className="form-input" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <div className="input-icon-wrap">
                <HiOutlineLockClosed className="input-icon" />
                <input type="password" className="form-input" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <div className="input-icon-wrap">
                <HiOutlineLocationMarker className="input-icon" />
                <input className="form-input" name="address" placeholder="Street address" value={form.address} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Area *</label>
              <select className="form-select" name="area" value={form.area} onChange={handleChange}>
                <option value="">Select your area</option>
                {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-lg auth-submit-btn" disabled={loading}>
              {loading ? <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : 'Create Account'}
            </button>
          </form>
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
