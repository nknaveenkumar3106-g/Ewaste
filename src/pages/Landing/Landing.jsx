import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth';
import { getBookings, getHubs } from '../../services/database';
import Navbar from '../../components/Layout/Navbar';
import {
  HiOutlineTruck, HiOutlineLocationMarker, HiOutlineCurrencyRupee,
  HiOutlineRefresh, HiOutlineShieldCheck, HiOutlineClock,
  HiOutlineGlobe, HiOutlineChartBar, HiOutlineDeviceMobile,
} from 'react-icons/hi';
import { FaRecycle, FaLeaf, FaMobileAlt, FaLaptop, FaBatteryHalf, FaTv } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import './Landing.css';

function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{prefix}{count.toLocaleString('en-IN')}{suffix}</span>;
}

export default function Landing() {
  const user = getCurrentUser();

  return (
    <div className="landing">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="hero-content animate-fade-in-up">
          <div className="hero-badge">
            <FaLeaf /> Eco-Friendly E-Waste Solution
          </div>
          <h1 className="hero-title">
            Turn Your <span className="gradient-text">E-Waste</span> Into<br />
            A Circular Future
          </h1>
          <p className="hero-description">
            CEMS makes e-waste disposal effortless. Schedule a pickup, find nearby hubs,
            and earn instant rewards — all while supporting a repair-first circular economy in Vellore.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="btn btn-primary btn-lg">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
                <Link to="/login" className="btn btn-outline btn-lg">Login</Link>
              </>
            )}
          </div>
          <div className="hero-floating-icons">
            <div className="float-icon float-icon-1 animate-float"><FaMobileAlt /></div>
            <div className="float-icon float-icon-2 animate-float" style={{ animationDelay: '0.5s' }}><FaLaptop /></div>
            <div className="float-icon float-icon-3 animate-float" style={{ animationDelay: '1s' }}><FaBatteryHalf /></div>
            <div className="float-icon float-icon-4 animate-float" style={{ animationDelay: '1.5s' }}><FaTv /></div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" id="how-it-works">
        <div className="section-container">
          <div className="section-header animate-fade-in-up">
            <span className="section-label">Simple Process</span>
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">Three easy steps to responsibly dispose your e-waste</p>
          </div>
          <div className="steps-grid">
            <div className="step-card animate-fade-in-up delay-1">
              <div className="step-number">01</div>
              <div className="step-icon-wrap"><HiOutlineDeviceMobile /></div>
              <h3>Submit Request</h3>
              <p>Select your device type, condition, and preferred disposal method — pickup or drop-off.</p>
            </div>
            <div className="step-card animate-fade-in-up delay-2">
              <div className="step-number">02</div>
              <div className="step-icon-wrap"><HiOutlineTruck /></div>
              <h3>We Collect</h3>
              <p>Our team picks up from your doorstep or you drop at nearby hubs on scheduled days.</p>
            </div>
            <div className="step-card animate-fade-in-up delay-3">
              <div className="step-number">03</div>
              <div className="step-icon-wrap"><HiOutlineCurrencyRupee /></div>
              <h3>Get Rewarded</h3>
              <p>Receive instant payment based on your device type and condition. Repair-first processing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section-dark" id="features">
        <div className="section-container">
          <div className="section-header animate-fade-in-up">
            <span className="section-label">Platform Features</span>
            <h2 className="section-title">Why Choose <span className="gradient-text">CEMS</span></h2>
          </div>
          <div className="features-grid">
            {[
              { icon: <HiOutlineTruck />, title: 'Door-to-Door Pickup', desc: 'Schedule convenient pickups from your home or office.' },
              { icon: <HiOutlineLocationMarker />, title: 'Hub Network', desc: '8+ collection hubs across Vellore — permanent & temporary.' },
              { icon: <HiOutlineCurrencyRupee />, title: 'Instant Pricing', desc: 'Transparent pricing based on device type and condition.' },
              { icon: <HiOutlineRefresh />, title: 'Repair First', desc: 'Working devices are repaired and resold, not scrapped.' },
              { icon: <HiOutlineShieldCheck />, title: 'Safe Disposal', desc: 'Certified recycling for non-repairable electronics.' },
              { icon: <HiOutlineClock />, title: 'Track Status', desc: 'Real-time tracking from booking to payment completion.' },
            ].map((f, i) => (
              <div className={`feature-card glass-card animate-fade-in-up delay-${i % 4 + 1}`} key={i}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section" id="impact">
        <div className="section-container">
          <div className="section-header animate-fade-in-up">
            <span className="section-label">Our Impact</span>
            <h2 className="section-title">Making <span className="gradient-text">Vellore Greener</span></h2>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-value"><AnimatedCounter target={2450} suffix="+" /></div>
              <div className="impact-label">Devices Collected</div>
            </div>
            <div className="impact-card">
              <div className="impact-value"><AnimatedCounter target={1820} suffix=" kg" /></div>
              <div className="impact-label">E-Waste Recycled</div>
            </div>
            <div className="impact-card">
              <div className="impact-value"><AnimatedCounter target={680} /></div>
              <div className="impact-label">Devices Repaired</div>
            </div>
            <div className="impact-card">
              <div className="impact-value"><AnimatedCounter target={12} suffix=" tons" /></div>
              <div className="impact-label">CO₂ Prevented</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-cta">
        <div className="section-container">
          <div className="cta-content animate-fade-in-up">
            <h2 className="cta-title">Ready to Dispose Your E-Waste <span className="gradient-text">Responsibly</span>?</h2>
            <p className="cta-desc">Join hundreds of Vellore residents who are making a difference. It takes just 2 minutes to get started.</p>
            <Link to="/register" className="btn btn-primary btn-lg">Start Now — It's Free</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="brand-icon"><FaRecycle /></div>
            <div>
              <div className="brand-name" style={{ fontSize: 16, letterSpacing: 1 }}>CEMS</div>
              <div className="brand-tagline">Circular E-Waste Management System</div>
            </div>
          </div>
          <div className="footer-text">
            © 2025 CEMS — Vellore. Built for a sustainable tomorrow.
          </div>
        </div>
      </footer>
    </div>
  );
}
