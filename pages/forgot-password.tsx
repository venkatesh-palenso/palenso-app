import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
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

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
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
              Reset Password
            </CardTitle>
            <CardDescription className='text-center text-gray-600 dark:text-gray-400'>
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
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

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='p-4 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2'
                >
                  <CheckCircle className='h-4 w-4 flex-shrink-0' />
                  Password reset email sent! Check your inbox.
                </motion.div>
              )}
            </AnimatePresence>

            {!success ? (
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
                      value={email}
                      onChange={handleChange}
                      className='pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
                      required
                    />
                  </div>
                </div>

                <Button
                  type='submit'
                  className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex items-center gap-2'>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      Sending...
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      Send Reset Link
                      <ArrowRight className='h-4 w-4' />
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <div className='text-center space-y-4'>
                <CheckCircle className='h-12 w-12 text-green-500 mx-auto' />
                <p className='text-gray-600 dark:text-gray-400'>
                  We&apos;ve sent a password reset link to your email address.
                  Please check your inbox and follow the instructions.
                </p>
                <Button
                  onClick={() => {
                    setSuccess(false);
                    setEmail('');
                  }}
                  className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium'
                >
                  Send Another Email
                </Button>
              </div>
            )}

            <div className='text-center'>
              <Link
                href='/login'
                className='inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline'
              >
                <ArrowLeft className='h-4 w-4' />
                Back to Sign In
              </Link>
            </div>

            <div className='text-center'>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Don&apos;t have an account?{' '}
                <Link href='/signup' className='hover:underline'>
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
