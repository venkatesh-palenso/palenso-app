import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
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
import { login } from '@/lib/auth';
import { signIn } from 'next-auth/react';

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
      const { user } = await login(formData.email, formData.password);
      setUser(user);

      // Redirect based on user role
      if (user.role === 'employer') {
        router.push('/post-job');
      } else {
        router.push('/jobs');
      }
    } catch {
      setError('Invalid email or password');
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
              Welcome back
            </CardTitle>
            <CardDescription className='text-center'>
              Sign in to your Palenso account
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
              Sign in with Google
            </Button>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {error && (
                <div className='p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md'>
                  {error}
                </div>
              )}

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
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
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

              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className='mt-6 text-center text-sm'>
              <span className='text-muted-foreground'>
                Don&apos;t have an account?{' '}
              </span>
              <Link
                href='/signup'
                className='font-medium text-primary hover:underline'
              >
                Sign up
              </Link>
            </div>

            <div className='mt-4 text-center'>
              <Link
                href='/forgot-password'
                className='text-sm text-muted-foreground hover:text-primary'
              >
                Forgot your password?
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
