import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building,
  GraduationCap,
  Phone,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/components/UserProvider';
import { signIn } from 'next-auth/react';

export default function Signup() {
  const router = useRouter();
  const { setUser } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: '' as 'student' | 'employer' | '',
  });
  const [otpData, setOtpData] = useState({
    sessionId: '',
    otp: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create account');
      }

      const { user, tokens } = await response.json();

      // Store tokens and user data
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);

      // Redirect based on user role
      if (user.role === 'employer') {
        router.push('/post-job');
      } else {
        router.push('/jobs');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!formData.phoneNumber) {
      setError('Please enter a phone number first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpData({ ...otpData, sessionId: data.sessionId });
        setError('');
      } else {
        setError(data.message);
      }
    } catch {
      setError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpData.otp) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: otpData.sessionId,
          otp: otpData.otp,
        }),
      });

      const data = await response.json();

      if (data.success && data.verified) {
        setStep(4); // Move to final step
        setError('');
      } else {
        setError(data.message);
      }
    } catch {
      setError('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpData({
      ...otpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleSelect = (role: 'student' | 'employer') => {
    setFormData({
      ...formData,
      role,
    });
    setStep(2);
  };

  const canProceedToStep2 = formData.name && formData.email && formData.role;
  const canSubmit =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md'
      >
        <Card className='shadow-xl'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold text-center'>
              Create your account
            </CardTitle>
            <CardDescription className='text-center'>
              Join Palenso to connect with opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              type='button'
              variant='outline'
              className='w-full mb-4 flex items-center justify-center gap-2'
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              <svg className='h-5 w-5' viewBox='0 0 48 48'>
                <g>
                  <path
                    fill='#4285F4'
                    d='M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.68 2.69 30.74 0 24 0 14.82 0 6.71 5.48 2.69 13.44l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z'
                  />
                  <path
                    fill='#34A853'
                    d='M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.93 37.13 46.1 31.36 46.1 24.55z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M10.67 28.65c-1.01-2.99-1.01-6.21 0-9.2l-7.98-6.2C.99 17.1 0 20.43 0 24c0 3.57.99 6.9 2.69 10.55l7.98-6.2z'
                  />
                  <path
                    fill='#EA4335'
                    d='M24 48c6.74 0 12.68-2.22 16.98-6.05l-7.19-5.59c-2.01 1.35-4.59 2.15-7.79 2.15-6.38 0-11.87-3.63-14.33-8.9l-7.98 6.2C6.71 42.52 14.82 48 24 48z'
                  />
                  <path fill='none' d='M0 0h48v48H0z' />
                </g>
              </svg>
              Sign up with Google
            </Button>

            {/* Step Indicator */}
            <div className='flex items-center justify-center mb-6'>
              <div className='flex items-center space-x-2'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  1
                </div>
                <div className='w-8 h-1 bg-muted'></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  2
                </div>
                <div className='w-8 h-1 bg-muted'></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 3
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  3
                </div>
                <div className='w-8 h-1 bg-muted'></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 4
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  4
                </div>
              </div>
            </div>

            {error && (
              <div className='p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md mb-4'>
                {error}
              </div>
            )}

            {step === 1 ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setStep(2);
                }}
                className='space-y-4'
              >
                <div className='space-y-2'>
                  <Label htmlFor='name'>Full Name</Label>
                  <div className='relative'>
                    <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                    <Input
                      id='name'
                      name='name'
                      type='text'
                      placeholder='Enter your full name'
                      value={formData.name}
                      onChange={handleChange}
                      className='pl-10'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      placeholder='Enter your email'
                      value={formData.email}
                      onChange={handleChange}
                      className='pl-10'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>I am a...</Label>
                  <div className='grid grid-cols-2 gap-4'>
                    <Button
                      type='button'
                      variant={
                        formData.role === 'student' ? 'default' : 'outline'
                      }
                      className='h-20 flex flex-col items-center justify-center space-y-2'
                      onClick={() => handleRoleSelect('student')}
                    >
                      <GraduationCap className='h-6 w-6' />
                      <span className='text-sm'>Student</span>
                    </Button>
                    <Button
                      type='button'
                      variant={
                        formData.role === 'employer' ? 'default' : 'outline'
                      }
                      className='h-20 flex flex-col items-center justify-center space-y-2'
                      onClick={() => handleRoleSelect('employer')}
                    >
                      <Building className='h-6 w-6' />
                      <span className='text-sm'>Employer</span>
                    </Button>
                  </div>
                </div>

                <Button
                  type='submit'
                  className='w-full'
                  disabled={!canProceedToStep2}
                >
                  Continue
                </Button>
              </form>
            ) : step === 2 ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setStep(3);
                }}
                className='space-y-4'
              >
                <div className='space-y-2'>
                  <Label htmlFor='phoneNumber'>Phone Number</Label>
                  <div className='relative'>
                    <Phone className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                    <Input
                      id='phoneNumber'
                      name='phoneNumber'
                      type='tel'
                      placeholder='+1 (555) 123-4567'
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className='pl-10'
                      required
                    />
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    We&apos;ll send a verification code to this number
                  </p>
                </div>

                <div className='flex space-x-2'>
                  <Button
                    type='button'
                    variant='outline'
                    className='flex-1'
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type='submit'
                    className='flex-1'
                    disabled={!formData.phoneNumber}
                  >
                    Continue
                  </Button>
                </div>
              </form>
            ) : step === 3 ? (
              <div className='space-y-4'>
                <div className='text-center'>
                  <MessageSquare className='h-12 w-12 text-primary mx-auto mb-4' />
                  <h3 className='text-lg font-semibold mb-2'>
                    Verify Your Phone
                  </h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    We&apos;ve sent a 6-digit code to {formData.phoneNumber}
                  </p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='otp'>Enter Verification Code</Label>
                  <Input
                    id='otp'
                    name='otp'
                    type='text'
                    placeholder='123456'
                    value={otpData.otp}
                    onChange={handleOtpChange}
                    maxLength={6}
                    className='text-center text-lg tracking-widest'
                  />
                </div>

                <div className='flex space-x-2'>
                  <Button
                    type='button'
                    variant='outline'
                    className='flex-1'
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    type='button'
                    className='flex-1'
                    onClick={handleVerifyOTP}
                    disabled={loading || !otpData.otp}
                  >
                    {loading ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>

                <div className='text-center'>
                  <Button
                    type='button'
                    variant='link'
                    onClick={handleSendOTP}
                    disabled={loading}
                    className='text-sm'
                  >
                    Didn&apos;t receive the code? Resend
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                    <Input
                      id='password'
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Create a password'
                      value={formData.password}
                      onChange={handleChange}
                      className='pl-10 pr-10'
                      required
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword'>Confirm Password</Label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                    <Input
                      id='confirmPassword'
                      name='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm your password'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className='pl-10 pr-10'
                      required
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </div>

                <div className='flex space-x-2'>
                  <Button
                    type='button'
                    variant='outline'
                    className='flex-1'
                    onClick={() => setStep(3)}
                  >
                    Back
                  </Button>
                  <Button
                    type='submit'
                    className='flex-1'
                    disabled={loading || !canSubmit}
                  >
                    {loading ? 'Creating account...' : 'Create account'}
                  </Button>
                </div>
              </form>
            )}

            <div className='mt-6 text-center text-sm'>
              <span className='text-muted-foreground'>
                Already have an account?{' '}
              </span>
              <Link
                href='/login'
                className='font-medium text-primary hover:underline'
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
