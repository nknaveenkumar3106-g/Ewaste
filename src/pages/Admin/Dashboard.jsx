import { useEffect, useState } from 'react';
import { getBookings, getHubs, getUsers, getSchedules } from '../../services/database';
import { formatPrice } from '../../services/pricing';
import {
  HiOutlineClipboardList, HiOutlineOfficeBuilding, HiOutlineUserGroup,
  HiOutlineCurrencyRupee, HiOutlineTrendingUp,
} from 'react-icons/hi';
import './AdminPages.css';

export default function AdminDashboard() {
  const [data, setData] = useState({ bookings: [], hubs: [], users: [], schedules: [] });

  useEffect(() => {
    setData({
      bookings: getBookings(),
      hubs: getHubs(),
      users: getUsers().filter(u => u.role === 'user'),
      schedules: getSchedules(),
    });
  }, []);

  const stats = {
    totalBookings: data.bookings.length,
    totalUsers: data.users.length,
    totalHubs: data.hubs.length,
    revenue: data.bookings.filter(b => b.status === 'Paid').reduce((s, b) => s + (b.estimated_price || 0), 0),
  };

  const statusCounts = {
    Pending: data.bookings.filter(b => b.status === 'Pending').length,
    Scheduled: data.bookings.filter(b => b.status === 'Scheduled').length,
    Collected: data.bookings.filter(b => b.status === 'Collected').length,
    Paid: data.bookings.filter(b => b.status === 'Paid').length,
  };

  const maxStatus = Math.max(...Object.values(statusCounts), 1);

  const recentBookings = [...data.bookings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 8);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Admin <span className="gradient-text">Dashboard</span></h1>
        <p className="page-subtitle">System overview and management</p>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        <div className="stat-card animate-fade-in-up delay-1">
          <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}><HiOutlineClipboardList /></div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalBookings}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
        </div>
        <div className="stat-card animate-fade-in-up delay-2">
          <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}><HiOutlineUserGroup /></div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-label">Registered Users</div>
          </div>
        </div>
        <div className="stat-card animate-fade-in-up delay-3">
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}><HiOutlineOfficeBuilding /></div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalHubs}</div>
            <div className="stat-label">Active Hubs</div>
          </div>
        </div>
        <div className="stat-card animate-fade-in-up delay-4">
          <div className="stat-icon" style={{ background: 'rgba(139,92,246,0.12)', color: '#A78BFA' }}><HiOutlineCurrencyRupee /></div>
          <div className="stat-content">
            <div className="stat-value">{formatPrice(stats.revenue)}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>
      </div>

      <div className="admin-grid">
        {/* Status Distribution */}
        <div className="glass-card dashboard-section">
          <h3 className="section-heading">Booking Status Distribution</h3>
          <div className="status-bars">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="status-bar-row">
                <div className="status-bar-label">
                  <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>
                  <span className="status-bar-count">{count}</span>
                </div>
                <div className="status-bar-track">
                  <div className={`status-bar-fill status-fill-${status.toLowerCase()}`}
                    style={{ width: `${(count / maxStatus) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Area Breakdown */}
        <div className="glass-card dashboard-section">
          <h3 className="section-heading">Area-wise Bookings</h3>
          <div className="area-breakdown">
            {[...new Set(data.bookings.map(b => b.area))].map(area => {
              const count = data.bookings.filter(b => b.area === area).length;
              return (
                <div key={area} className="area-row">
                  <span className="area-name">{area}</span>
                  <span className="area-count">{count} booking{count !== 1 ? 's' : ''}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card dashboard-section" style={{ marginTop: 24 }}>
        <h3 className="section-heading">Recent Bookings</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Device</th>
                <th>Method</th>
                <th>Area</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map(b => {
                const u = data.users.find(u => u.user_id === b.user_id) || {};
                return (
                  <tr key={b.booking_id}>
                    <td>{u.name || 'Unknown'}</td>
                    <td><strong>{b.device_type}</strong> ({b.condition})</td>
                    <td>{b.collection_mode}</td>
                    <td>{b.area}</td>
                    <td><span className={`badge badge-${b.status.toLowerCase()}`}>{b.status}</span></td>
                    <td className="text-green">{formatPrice(b.estimated_price)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
