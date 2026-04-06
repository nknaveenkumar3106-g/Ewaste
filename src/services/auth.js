// CEMS Auth Service
import { getUserByEmail, createUser, getUsers } from './database';

const CURRENT_USER_KEY = 'cems_current_user';

export const login = (email, password) => {
  const user = getUserByEmail(email);
  if (!user) return { success: false, error: 'User not found' };
  if (user.password !== password) return { success: false, error: 'Invalid password' };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { success: true, user };
};

export const register = (userData) => {
  const existing = getUserByEmail(userData.email);
  if (existing) return { success: false, error: 'Email already registered' };
  const user = createUser(userData);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { success: true, user };
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => !!getCurrentUser();
export const isAdmin = () => getCurrentUser()?.role === 'admin';

export const updateCurrentUser = (updates) => {
  const user = getCurrentUser();
  if (!user) return null;
  const updatedUser = { ...user, ...updates };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
  // Also update in users collection
  const users = getUsers();
  const idx = users.findIndex(u => u.user_id === user.user_id);
  if (idx !== -1) {
    users[idx] = updatedUser;
    localStorage.setItem('cems_users', JSON.stringify(users));
  }
  return updatedUser;
};
