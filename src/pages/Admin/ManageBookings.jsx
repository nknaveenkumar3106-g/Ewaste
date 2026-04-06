import { useState, useEffect } from 'react';
import { getBookings, updateBooking, getUsers, AREAS, STATUSES } from '../../services/database';
import { formatPrice } from '../../services/pricing';
import { HiOutlineSearch, HiOutlineFilter } from 'react-icons/hi';
import toast from 'react-hot-toast';
import './AdminPages.css';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);

  const load = () => {
    setBookings(getBookings());
    setUsers(getUsers());
  };

  useEffect(() => { load(); }, []);

  const getUserName = (uid) => users.find(u => u.user_id === uid)?.name || 'Unknown';

  const filtered = bookings
    .filter(b => !areaFilter || b.area === areaFilter)
    .filter(b => !statusFilter || b.status === statusFilter)
    .filter(b => !search || b.device_type.toLowerCase().includes(search.toLowerCase()) || getUserName(b.user_id).toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const handleStatusChange = (bookingId, newStatus) => {
    updateBooking(bookingId, { status: newStatus });
    toast.success(`Status updated to ${newStatus}`);
    load();
  };

  const nextStatus = (current) => {
    const order = ['Pending', 'Scheduled', 'Collected', 'Paid'];
    const idx = order.indexOf(current);
    return idx < order.length - 1 ? order[idx + 1] : null;
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Manage <span className="gradient-text">Bookings</span></h1>
        <p className="page-subtitle">{bookings.length} total bookings</p>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <HiOutlineSearch className="search-icon" />
          <input className="form-input" placeholder="Search by device or user..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-select" style={{ maxWidth: 180 }} value={areaFilter} onChange={e => setAreaFilter(e.target.value)}>
          <option value="">All Areas</option>
          {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select className="form-select" style={{ maxWidth: 160 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Device</th>
              <th>Condition</th>
              <th>Method</th>
              <th>Area</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.booking_id}>
                <td>{getUserName(b.user_id)}</td>
                <td><strong>{b.device_type}</strong></td>
                <td>{b.condition}</td>
                <td>{b.collection_mode}</td>
                <td>{b.area}</td>
                <td><span className={`badge badge-${b.status.toLowerCase()}`}>{b.status}</span></td>
                <td className="text-green">{formatPrice(b.estimated_price)}</td>
                <td>
                  {nextStatus(b.status) && (
                    <button className="btn btn-primary btn-sm"
                      onClick={() => handleStatusChange(b.booking_id, nextStatus(b.status))}>
                      → {nextStatus(b.status)}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
