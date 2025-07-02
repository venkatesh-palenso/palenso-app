import type { NextApiRequest, NextApiResponse } from 'next';

interface SignupRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'student' | 'employer';
}

interface SignupResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: 'student' | 'employer';
    avatar: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// Mock user database (in a real app, this would be a database)
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '+1234567890',
    password: 'password123',
    role: 'student' as const,
    avatar: 'JD',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@company.com',
    phoneNumber: '+1987654321',
    password: 'password123',
    role: 'employer' as const,
    avatar: 'JS',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignupResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phoneNumber, password, role }: SignupRequest =
      req.body;

    if (!name || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      phoneNumber,
      password,
      role,
      avatar: name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase(),
    };

    // Add to mock database
    mockUsers.push(newUser);

    // Generate mock tokens
    const tokens = {
      accessToken: `mock-access-token-${newUser.id}-${Date.now()}`,
      refreshToken: `mock-refresh-token-${newUser.id}-${Date.now()}`,
    };

    // Return user data (without password) and tokens
    const response: SignupResponse = {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
        avatar: newUser.avatar,
      },
      tokens,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
