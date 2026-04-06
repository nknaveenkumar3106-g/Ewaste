// CEMS Database Service - localStorage based with seed data

const STORAGE_KEYS = {
  USERS: 'cems_users',
  BOOKINGS: 'cems_bookings',
  HUBS: 'cems_hubs',
  SCHEDULES: 'cems_schedules',
  NOTIFICATIONS: 'cems_notifications',
  INITIALIZED: 'cems_initialized',
};

// Utility
const generateId = () => 'id_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const getCollection = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const setCollection = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// ---- Seed Data ----
const SEED_USERS = [
  {
    user_id: 'admin_001',
    name: 'Admin CEMS',
    email: 'admin@cems.in',
    phone: '9876543210',
    address: 'CEMS Office, Katpadi Road',
    area: 'Katpadi',
    role: 'admin',
    password: 'admin123',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    user_id: 'user_001',
    name: 'Ravi Kumar',
    email: 'ravi@gmail.com',
    phone: '9876500001',
    address: '12, Gandhi Nagar',
    area: 'Gandhi Nagar',
    role: 'user',
    password: 'user123',
    created_at: '2025-06-15T00:00:00Z',
  },
  {
    user_id: 'user_002',
    name: 'Priya Sharma',
    email: 'priya@gmail.com',
    phone: '9876500002',
    address: '45, Sathuvachari Main Road',
    area: 'Sathuvachari',
    role: 'user',
    password: 'user123',
    created_at: '2025-07-20T00:00:00Z',
  },
  {
    user_id: 'user_003',
    name: 'Karthik Subramanian',
    email: 'karthik@gmail.com',
    phone: '9876500003',
    address: '78, Kosapet Street',
    area: 'Kosapet',
    role: 'user',
    password: 'user123',
    created_at: '2025-08-10T00:00:00Z',
  },
  {
    user_id: 'user_004',
    name: 'Deepa Lakshmi',
    email: 'deepa@gmail.com',
    phone: '9876500004',
    address: '23, Thottapalayam',
    area: 'Thottapalayam',
    role: 'user',
    password: 'user123',
    created_at: '2025-09-05T00:00:00Z',
  },
];

const SEED_HUBS = [
  {
    hub_id: 'hub_001',
    name: 'VIT Green Hub',
    type: 'Permanent',
    location: 'VIT University Campus, Katpadi',
    area: 'Katpadi',
    lat: 12.9692,
    lng: 79.1559,
    timings: 'Mon-Sat: 9:00 AM - 6:00 PM',
    active: true,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    hub_id: 'hub_002',
    name: 'Sathuvachari Repair Center',
    type: 'Permanent',
    location: 'Sathuvachari Main Road, Near Bus Stand',
    area: 'Sathuvachari',
    lat: 12.9456,
    lng: 79.1678,
    timings: 'Mon-Fri: 10:00 AM - 5:00 PM',
    active: true,
    created_at: '2025-01-15T00:00:00Z',
  },
  {
    hub_id: 'hub_003',
    name: 'Gandhi Nagar Collection Point',
    type: 'Permanent',
    location: 'Gandhi Nagar Community Hall',
    area: 'Gandhi Nagar',
    lat: 12.9340,
    lng: 79.1425,
    timings: 'Mon-Sat: 8:00 AM - 4:00 PM',
    active: true,
    created_at: '2025-02-01T00:00:00Z',
  },
  {
    hub_id: 'hub_004',
    name: 'Kosapet E-Waste Drop',
    type: 'Permanent',
    location: 'Kosapet Market Area',
    area: 'Kosapet',
    lat: 12.9215,
    lng: 79.1332,
    timings: 'Tue-Sun: 9:00 AM - 5:00 PM',
    active: true,
    created_at: '2025-02-15T00:00:00Z',
  },
  {
    hub_id: 'hub_005',
    name: 'Thottapalayam Temporary Camp',
    type: 'Temporary',
    location: 'Thottapalayam Junction, Near Temple',
    area: 'Thottapalayam',
    lat: 12.9178,
    lng: 79.1498,
    timings: 'Every Sunday: 8:00 AM - 1:00 PM',
    active: true,
    created_at: '2025-03-01T00:00:00Z',
  },
  {
    hub_id: 'hub_006',
    name: 'Katpadi Railway Collection Camp',
    type: 'Temporary',
    location: 'Near Katpadi Railway Station',
    area: 'Katpadi',
    lat: 12.9785,
    lng: 79.1453,
    timings: 'Every Saturday: 9:00 AM - 2:00 PM',
    active: true,
    created_at: '2025-03-10T00:00:00Z',
  },
  {
    hub_id: 'hub_007',
    name: 'Vellore Fort E-Waste Hub',
    type: 'Permanent',
    location: 'Near Vellore Fort, Fort Area',
    area: 'Fort',
    lat: 12.9165,
    lng: 79.1325,
    timings: 'Mon-Sat: 9:00 AM - 6:00 PM',
    active: true,
    created_at: '2025-04-01T00:00:00Z',
  },
  {
    hub_id: 'hub_008',
    name: 'Bagayam Scrap & Repair',
    type: 'Permanent',
    location: 'Bagayam, Vellore',
    area: 'Bagayam',
    lat: 12.9350,
    lng: 79.1220,
    timings: 'Mon-Fri: 10:00 AM - 6:00 PM',
    active: true,
    created_at: '2025-04-15T00:00:00Z',
  },
];

const SEED_SCHEDULES = [
  { schedule_id: 'sch_001', area: 'Katpadi', collection_day: 'Monday', time_slot: '9:00 AM - 12:00 PM', active: true },
  { schedule_id: 'sch_002', area: 'Sathuvachari', collection_day: 'Monday', time_slot: '2:00 PM - 5:00 PM', active: true },
  { schedule_id: 'sch_003', area: 'Gandhi Nagar', collection_day: 'Tuesday', time_slot: '9:00 AM - 12:00 PM', active: true },
  { schedule_id: 'sch_004', area: 'Kosapet', collection_day: 'Tuesday', time_slot: '2:00 PM - 5:00 PM', active: true },
  { schedule_id: 'sch_005', area: 'Thottapalayam', collection_day: 'Wednesday', time_slot: '9:00 AM - 12:00 PM', active: true },
  { schedule_id: 'sch_006', area: 'Fort', collection_day: 'Wednesday', time_slot: '2:00 PM - 5:00 PM', active: true },
  { schedule_id: 'sch_007', area: 'Bagayam', collection_day: 'Thursday', time_slot: '9:00 AM - 12:00 PM', active: true },
  { schedule_id: 'sch_008', area: 'Katpadi', collection_day: 'Thursday', time_slot: '2:00 PM - 5:00 PM', active: true },
  { schedule_id: 'sch_009', area: 'Sathuvachari', collection_day: 'Friday', time_slot: '9:00 AM - 12:00 PM', active: true },
  { schedule_id: 'sch_010', area: 'Gandhi Nagar', collection_day: 'Friday', time_slot: '2:00 PM - 5:00 PM', active: true },
];

const SEED_BOOKINGS = [
  {
    booking_id: 'bk_001',
    user_id: 'user_001',
    device_type: 'Laptop',
    condition: 'Working',
    collection_mode: 'Pickup',
    status: 'Paid',
    area: 'Gandhi Nagar',
    estimated_price: 1200,
    hub_id: null,
    scheduled_date: '2025-11-10',
    time_slot: '9:00 AM - 12:00 PM',
    created_at: '2025-11-05T10:00:00Z',
    updated_at: '2025-11-12T14:00:00Z',
  },
  {
    booking_id: 'bk_002',
    user_id: 'user_001',
    device_type: 'Phone',
    condition: 'Damaged',
    collection_mode: 'Permanent Hub',
    status: 'Collected',
    area: 'Gandhi Nagar',
    estimated_price: 250,
    hub_id: 'hub_003',
    scheduled_date: '2025-12-01',
    time_slot: '10:00 AM - 1:00 PM',
    created_at: '2025-11-28T09:00:00Z',
    updated_at: '2025-12-01T16:00:00Z',
  },
  {
    booking_id: 'bk_003',
    user_id: 'user_002',
    device_type: 'TV',
    condition: 'Non-functional',
    collection_mode: 'Pickup',
    status: 'Scheduled',
    area: 'Sathuvachari',
    estimated_price: 500,
    hub_id: null,
    scheduled_date: '2026-04-10',
    time_slot: '2:00 PM - 5:00 PM',
    created_at: '2026-04-01T08:00:00Z',
    updated_at: '2026-04-02T10:00:00Z',
  },
  {
    booking_id: 'bk_004',
    user_id: 'user_003',
    device_type: 'Tablet',
    condition: 'Working',
    collection_mode: 'Temporary Hub',
    status: 'Pending',
    area: 'Kosapet',
    estimated_price: 800,
    hub_id: 'hub_005',
    scheduled_date: '2026-04-12',
    time_slot: '9:00 AM - 12:00 PM',
    created_at: '2026-04-04T11:00:00Z',
    updated_at: '2026-04-04T11:00:00Z',
  },
  {
    booking_id: 'bk_005',
    user_id: 'user_004',
    device_type: 'Appliance',
    condition: 'Parts-only',
    collection_mode: 'Pickup',
    status: 'Pending',
    area: 'Thottapalayam',
    estimated_price: 350,
    hub_id: null,
    scheduled_date: '2026-04-15',
    time_slot: '9:00 AM - 12:00 PM',
    created_at: '2026-04-05T13:00:00Z',
    updated_at: '2026-04-05T13:00:00Z',
  },
  {
    booking_id: 'bk_006',
    user_id: 'user_002',
    device_type: 'Battery',
    condition: 'Damaged',
    collection_mode: 'Permanent Hub',
    status: 'Paid',
    area: 'Sathuvachari',
    estimated_price: 100,
    hub_id: 'hub_002',
    scheduled_date: '2025-10-20',
    time_slot: '10:00 AM - 1:00 PM',
    created_at: '2025-10-15T09:00:00Z',
    updated_at: '2025-10-22T15:00:00Z',
  },
];

const SEED_NOTIFICATIONS = [
  {
    notification_id: 'notif_001',
    user_id: 'user_001',
    type: 'payment',
    title: 'Payment Received',
    message: 'You received ₹1200 for your Laptop (Booking #bk_001).',
    read: true,
    created_at: '2025-11-12T14:00:00Z',
  },
  {
    notification_id: 'notif_002',
    user_id: 'user_002',
    type: 'schedule',
    title: 'Collection Scheduled',
    message: 'Your TV pickup is scheduled for April 10, 2:00 PM - 5:00 PM.',
    read: false,
    created_at: '2026-04-02T10:00:00Z',
  },
  {
    notification_id: 'notif_003',
    user_id: 'user_003',
    type: 'system',
    title: 'Welcome to CEMS!',
    message: 'Start by submitting your first e-waste disposal request.',
    read: false,
    created_at: '2025-08-10T00:00:00Z',
  },
];

// ---- Initialize ----
export const initializeDatabase = () => {
  if (localStorage.getItem(STORAGE_KEYS.INITIALIZED)) return;
  setCollection(STORAGE_KEYS.USERS, SEED_USERS);
  setCollection(STORAGE_KEYS.BOOKINGS, SEED_BOOKINGS);
  setCollection(STORAGE_KEYS.HUBS, SEED_HUBS);
  setCollection(STORAGE_KEYS.SCHEDULES, SEED_SCHEDULES);
  setCollection(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
  localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
};

// ---- CRUD Operations ----

// Users
export const getUsers = () => getCollection(STORAGE_KEYS.USERS);
export const getUserById = (id) => getUsers().find((u) => u.user_id === id);
export const getUserByEmail = (email) => getUsers().find((u) => u.email === email);
export const createUser = (userData) => {
  const users = getUsers();
  const newUser = {
    user_id: generateId(),
    ...userData,
    role: 'user',
    created_at: new Date().toISOString(),
  };
  users.push(newUser);
  setCollection(STORAGE_KEYS.USERS, users);
  return newUser;
};

// Bookings
export const getBookings = () => getCollection(STORAGE_KEYS.BOOKINGS);
export const getBookingById = (id) => getBookings().find((b) => b.booking_id === id);
export const getBookingsByUser = (userId) => getBookings().filter((b) => b.user_id === userId);
export const getBookingsByArea = (area) => getBookings().filter((b) => b.area === area);
export const getBookingsByStatus = (status) => getBookings().filter((b) => b.status === status);
export const createBooking = (bookingData) => {
  const bookings = getBookings();
  const newBooking = {
    booking_id: generateId(),
    ...bookingData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  bookings.push(newBooking);
  setCollection(STORAGE_KEYS.BOOKINGS, bookings);
  return newBooking;
};
export const updateBooking = (id, updates) => {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.booking_id === id);
  if (index === -1) return null;
  bookings[index] = { ...bookings[index], ...updates, updated_at: new Date().toISOString() };
  setCollection(STORAGE_KEYS.BOOKINGS, bookings);
  return bookings[index];
};
export const deleteBooking = (id) => {
  const bookings = getBookings().filter((b) => b.booking_id !== id);
  setCollection(STORAGE_KEYS.BOOKINGS, bookings);
};

// Hubs
export const getHubs = () => getCollection(STORAGE_KEYS.HUBS);
export const getHubById = (id) => getHubs().find((h) => h.hub_id === id);
export const getHubsByType = (type) => getHubs().filter((h) => h.type === type);
export const getHubsByArea = (area) => getHubs().filter((h) => h.area === area);
export const createHub = (hubData) => {
  const hubs = getHubs();
  const newHub = {
    hub_id: generateId(),
    ...hubData,
    active: true,
    created_at: new Date().toISOString(),
  };
  hubs.push(newHub);
  setCollection(STORAGE_KEYS.HUBS, hubs);
  return newHub;
};
export const updateHub = (id, updates) => {
  const hubs = getHubs();
  const index = hubs.findIndex((h) => h.hub_id === id);
  if (index === -1) return null;
  hubs[index] = { ...hubs[index], ...updates };
  setCollection(STORAGE_KEYS.HUBS, hubs);
  return hubs[index];
};
export const deleteHub = (id) => {
  const hubs = getHubs().filter((h) => h.hub_id !== id);
  setCollection(STORAGE_KEYS.HUBS, hubs);
};

// Schedules
export const getSchedules = () => getCollection(STORAGE_KEYS.SCHEDULES);
export const getSchedulesByArea = (area) => getSchedules().filter((s) => s.area === area);
export const createSchedule = (scheduleData) => {
  const schedules = getSchedules();
  const newSchedule = {
    schedule_id: generateId(),
    ...scheduleData,
    active: true,
  };
  schedules.push(newSchedule);
  setCollection(STORAGE_KEYS.SCHEDULES, schedules);
  return newSchedule;
};
export const updateSchedule = (id, updates) => {
  const schedules = getSchedules();
  const index = schedules.findIndex((s) => s.schedule_id === id);
  if (index === -1) return null;
  schedules[index] = { ...schedules[index], ...updates };
  setCollection(STORAGE_KEYS.SCHEDULES, schedules);
  return schedules[index];
};
export const deleteSchedule = (id) => {
  const schedules = getSchedules().filter((s) => s.schedule_id !== id);
  setCollection(STORAGE_KEYS.SCHEDULES, schedules);
};

// Notifications
export const getNotifications = () => getCollection(STORAGE_KEYS.NOTIFICATIONS);
export const getNotificationsByUser = (userId) => getNotifications().filter((n) => n.user_id === userId);
export const createNotification = (data) => {
  const notifications = getNotifications();
  const notif = {
    notification_id: generateId(),
    ...data,
    read: false,
    created_at: new Date().toISOString(),
  };
  notifications.push(notif);
  setCollection(STORAGE_KEYS.NOTIFICATIONS, notifications);
  return notif;
};
export const markNotificationRead = (id) => {
  const notifications = getNotifications();
  const index = notifications.findIndex((n) => n.notification_id === id);
  if (index !== -1) {
    notifications[index].read = true;
    setCollection(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }
};

// Areas list
export const AREAS = [
  'Katpadi', 'Sathuvachari', 'Gandhi Nagar', 'Kosapet',
  'Thottapalayam', 'Fort', 'Bagayam', 'Thorapadi',
  'Kaspa', 'Velapadi', 'Arni Road', 'Salavanpet',
];

export const DEVICE_TYPES = ['Phone', 'Laptop', 'Tablet', 'TV', 'Appliance', 'Battery', 'Cable', 'Other'];
export const CONDITIONS = ['Working', 'Damaged', 'Non-functional', 'Parts-only'];
export const COLLECTION_MODES = ['Pickup', 'Temporary Hub', 'Permanent Hub'];
export const STATUSES = ['Pending', 'Scheduled', 'Collected', 'Paid'];
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
