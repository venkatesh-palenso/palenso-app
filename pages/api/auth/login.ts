import type { NextApiRequest, NextApiResponse } from 'next';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'employer';
    avatar: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// Mock user database
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'student' as const,
    avatar: 'JD',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@company.com',
    password: 'password123',
    role: 'employer' as const,
    avatar: 'JS',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user in mock database
    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate mock tokens
    const tokens = {
      accessToken: `mock-access-token-${user.id}-${Date.now()}`,
      refreshToken: `mock-refresh-token-${user.id}-${Date.now()}`,
    };

    // Return user data (without password) and tokens
    const response: LoginResponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      tokens,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
