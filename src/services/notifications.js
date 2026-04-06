// CEMS Notification Service
import { createNotification, getNotificationsByUser, markNotificationRead } from './database';
import toast from 'react-hot-toast';

export const notifyUser = (userId, type, title, message) => {
  createNotification({ user_id: userId, type, title, message });
  toast.success(title, { style: { background: '#1E293B', color: '#F1F5F9', border: '1px solid rgba(148,163,184,0.12)' } });
};

export const getUserNotifications = (userId) => {
  return getNotificationsByUser(userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getUnreadCount = (userId) => {
  return getNotificationsByUser(userId).filter(n => !n.read).length;
};

export const markAsRead = (notificationId) => {
  markNotificationRead(notificationId);
};

export const notifyBookingCreated = (userId, deviceType) => {
  notifyUser(userId, 'system', 'Booking Created', `Your ${deviceType} disposal request has been submitted successfully.`);
};

export const notifyBookingScheduled = (userId, date, timeSlot) => {
  notifyUser(userId, 'schedule', 'Collection Scheduled', `Your pickup is scheduled for ${date}, ${timeSlot}.`);
};

export const notifyBookingCollected = (userId) => {
  notifyUser(userId, 'collection', 'Items Collected', 'Your e-waste has been collected. Payment will be processed soon.');
};

export const notifyPayment = (userId, amount) => {
  notifyUser(userId, 'payment', 'Payment Processed', `₹${amount} has been credited for your e-waste.`);
};
