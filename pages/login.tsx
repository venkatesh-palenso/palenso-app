import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  AlertCircle,
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
import { User } from '@/lib/auth';
import { signIn } from 'next-auth/react';
import { authService } from '@/services';

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);
      // onSuccess(response.data.user);
      if (response.data) {
        localStorage.setItem(
          'accessToken',
          response.data.access_token as string
        );
        localStorage.setItem(
          'refreshToken',
          response.data.refresh_token as string
        );
      }

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        const user: User = {
          id: response.data.user.id,
          firstName: response.data.user.first_name,
          lastName: response.data.user.last_name,
          email: response.data.user.email,
          phoneNumber: response.data.user.mobile_number,
          role: response.data.user.role,
        };
        setUser(user);
      }

      // Show success message before redirecting
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md'
      >
        <Card className='shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
          <CardHeader className='space-y-1 pb-6'>
            <CardTitle className='text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Welcome back
            </CardTitle>
            <CardDescription className='text-center text-gray-600 dark:text-gray-400'>
              Sign in to your Palenso account
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <Button
              type='button'
              variant='outline'
              className='w-full mb-6 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'
              onClick={handleGoogleSignIn}
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
              Sign in with Google
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t border-gray-300 dark:border-gray-600' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400'>
                  Or continue with
                </span>
              </div>
            </div>

            <AnimatePresence mode='wait'>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2'
                >
                  <AlertCircle className='h-4 w-4 flex-shrink-0' />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium'>
                  Email Address
                </Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleChange}
                    className='pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password' className='text-sm font-medium'>
                  Password
                </Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={handleChange}
                    className='pl-10 pr-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
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

              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Shield className='h-4 w-4 text-green-500' />
                  <span className='text-xs text-gray-500 dark:text-gray-400'>
                    Secure login with encryption
                  </span>
                </div>
                <Link
                  href='/forgot-password'
                  className='text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline'
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3'
                disabled={loading}
              >
                {loading ? (
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    Signing in...
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    Sign in
                    <ArrowRight className='h-4 w-4' />
                  </div>
                )}
              </Button>
            </form>

            <div className='mt-8 text-center text-sm'>
              <span className='text-gray-600 dark:text-gray-400'>
                Don&apos;t have an account?{' '}
              </span>
              <Link
                href='/signup'
                className='font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline'
              >
                Sign up
              </Link>
            </div>

            <div className='text-center'>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                By signing in, you agree to our{' '}
                <Link href='/terms' className='hover:underline'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href='/privacy' className='hover:underline'>
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
