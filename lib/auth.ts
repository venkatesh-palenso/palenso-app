export interface User {
  id: string;
  firstName: string;
  lastName: string;
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
