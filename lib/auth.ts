export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: 'student' | 'employer';
  avatar?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Token management
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', token);
};

export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user: User): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('user');
};

// API helper with authentication
export const apiCall = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    removeToken();
    removeUser();
    window.location.href = '/login';
  }

  return response;
};

// Login function
export const login = async (
  email: string,
  password: string
): Promise<{ user: User; tokens: AuthTokens }> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();

  // Store tokens and user data
  setToken(data.tokens.accessToken);
  localStorage.setItem('refreshToken', data.tokens.refreshToken);
  setUser(data.user);

  return data;
};

// Logout function
export const logout = (): void => {
  removeToken();
  removeUser();
  window.location.href = '/';
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getToken() !== null && getUser() !== null;
};
