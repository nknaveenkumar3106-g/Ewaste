import { useState } from 'react';
import { getHubs } from '../../services/database';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';
import './UserPages.css';

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const permanentIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

const temporaryIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

export default function HubLocator() {
  const [hubs] = useState(getHubs().filter(h => h.active));
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? hubs : hubs.filter(h => h.type === filter);

  // Vellore center coordinates
  const velloreCenter = [12.9165, 79.1325];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Find <span className="gradient-text">Hubs</span></h1>
        <p className="page-subtitle">Locate collection hubs near you in Vellore</p>
      </div>

      <div className="tabs" style={{ maxWidth: 400 }}>
        {['All', 'Permanent', 'Temporary'].map(f => (
          <button key={f} className={`tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="hub-layout">
        {/* Map */}
        <div className="hub-map-container">
          <MapContainer center={velloreCenter} zoom={13} style={{ height: '100%', minHeight: 500 }} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map(hub => (
              <Marker key={hub.hub_id} position={[hub.lat, hub.lng]}
                icon={hub.type === 'Permanent' ? permanentIcon : temporaryIcon}>
                <Popup>
                  <div style={{ minWidth: 180 }}>
                    <strong style={{ fontSize: 14 }}>{hub.name}</strong>
                    <div style={{ marginTop: 6, fontSize: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                        📍 {hub.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                        🕐 {hub.timings}
                      </div>
                      <span style={{
                        display: 'inline-block', padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                        background: hub.type === 'Permanent' ? 'rgba(59,130,246,0.2)' : 'rgba(245,158,11,0.2)',
                        color: hub.type === 'Permanent' ? '#3B82F6' : '#F59E0B',
                      }}>{hub.type}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Hub List */}
        <div className="hub-list">
          {filtered.map(hub => (
            <div key={hub.hub_id} className="hub-card">
              <div className="hub-card-header">
                <span className="hub-card-name">{hub.name}</span>
                <span className={`badge badge-${hub.type.toLowerCase()}`}>{hub.type}</span>
              </div>
              <div className="hub-card-location">
                <HiOutlineLocationMarker style={{ marginRight: 4, verticalAlign: 'middle' }} />
                {hub.location}
              </div>
              <div className="hub-card-timing">
                <HiOutlineClock /> {hub.timings}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
