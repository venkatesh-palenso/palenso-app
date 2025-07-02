import type { NextApiRequest, NextApiResponse } from 'next';

interface SendOTPRequest {
  phoneNumber: string;
}

interface SendOTPResponse {
  success: boolean;
  message: string;
  sessionId?: string;
}

// Mock OTP storage (in a real app, this would be in a database)
const otpSessions = new Map<string, { otp: string; expiresAt: number }>();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SendOTPResponse>
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { phoneNumber }: SendOTPRequest = req.body;

    if (!phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: 'Phone number is required' });
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid phone number format' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create a session ID
    const sessionId = Math.random().toString(36).substring(2, 15);

    // Store OTP with expiration (5 minutes)
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    otpSessions.set(sessionId, { otp, expiresAt });

    // In a real app, you would send the OTP via SMS here
    // For now, we'll just log it to the console
    console.log(`OTP for ${phoneNumber}: ${otp}`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      sessionId,
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
