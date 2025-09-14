'use client';

import users from '@/lib/users.json';

interface User {
  username: string;
  role: string;
}

export const login = async (username: string, password_input: string) => {
  const user_data = users.find(
    (u) => (u.username === username || u.TIN === username) && u.password === password_input
  );

  if (user_data) {
    const user = { username: user_data.username, role: user_data.role };
    localStorage.setItem('user', JSON.stringify(user));
    return { success: true, user };
  } else {
    return { success: false, error: 'Invalid username or password' };
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getSession = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const userCookie = localStorage.getItem('user');
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch (e) {
      return null;
    }
  }
  return null;
};
