import type { NextApiRequest, NextApiResponse } from 'next';

interface VerifyOTPRequest {
  sessionId: string;
  otp: string;
}

interface VerifyOTPResponse {
  success: boolean;
  message: string;
  verified?: boolean;
}

// Mock OTP storage (in a real app, this would be in a database)
const otpSessions = new Map<string, { otp: string; expiresAt: number }>();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyOTPResponse>
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { sessionId, otp }: VerifyOTPRequest = req.body;

    if (!sessionId || !otp) {
      return res
        .status(400)
        .json({ success: false, message: 'Session ID and OTP are required' });
    }

    // Get the stored OTP session
    const session = otpSessions.get(sessionId);

    if (!session) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid session ID' });
    }

    // Check if OTP has expired
    if (Date.now() > session.expiresAt) {
      otpSessions.delete(sessionId);
      return res
        .status(400)
        .json({ success: false, message: 'OTP has expired' });
    }

    // Verify OTP
    if (session.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // OTP is valid - remove it from storage
    otpSessions.delete(sessionId);

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      verified: true,
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
