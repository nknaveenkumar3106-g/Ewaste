import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';
import Navbar from '../../components/Layout/Navbar';
import { FaRecycle } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        toast.success(`Welcome back, ${result.user.name}!`);
        navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        toast.error(result.error);
      }
    }, 500);
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <div className="auth-card glass-card animate-scale-in">
          <div className="auth-header">
            <div className="auth-logo"><FaRecycle /></div>
            <h1>Welcome Back</h1>
            <p>Login to your CEMS account</p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-icon-wrap">
                <HiOutlineMail className="input-icon" />
                <input type="email" className="form-input" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-icon-wrap">
                <HiOutlineLockClosed className="input-icon" />
                <input type={showPw ? 'text' : 'password'} className="form-input" placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" className="input-icon-right" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg auth-submit-btn" disabled={loading}>
              {loading ? <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : 'Login'}
            </button>
          </form>
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register" className="auth-link">Sign Up</Link></p>
          </div>
          <div className="auth-demo-info">
            <p><strong>Demo Accounts:</strong></p>
            <p>User: ravi@gmail.com / user123</p>
            <p>Admin: admin@cems.in / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
