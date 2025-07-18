// react
import React, { useState, useEffect } from 'react';

// next
import { useRouter } from 'next/router';
import Link from 'next/link';

// framer motion
import { motion, AnimatePresence } from 'framer-motion';

// lucide icons
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

// components
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

// services
import { authService } from '@/services';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);

  // Validate token on component mount
  useEffect(() => {
    if (token && typeof token === 'string') {
      // You can add additional token validation here if needed
      setIsValidToken(true);
    } else if (router.isReady && !token) {
      setIsValidToken(false);
      setError('Invalid or missing reset token');
    }
  }, [token, router.isReady]);

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      errors: [
        password.length < minLength && 'At least 8 characters',
        !hasUpperCase && 'One uppercase letter',
        !hasLowerCase && 'One lowercase letter',
        !hasNumbers && 'One number',
        !hasSpecialChar && 'One special character',
      ].filter(Boolean)
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      setError(`Password must contain: ${passwordValidation.errors.join(', ')}`);
      setLoading(false);
      return;
    }

    try {
      await authService.resetPassword({
        token: token as string,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      setSuccess(true);
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'new' | 'confirm') => {
    const value = e.target.value;
    if (field === 'new') {
      setNewPassword(value);
    } else {
      setConfirmPassword(value);
    }
    if (error) setError('');
  };

  if (!isValidToken) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md'
        >
          <Card className='card-shiny shadow-2xl border-0'>
            <CardContent className='p-6 text-center'>
              <AlertCircle className='h-12 w-12 text-red-500 mx-auto mb-4' />
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                Invalid Reset Link
              </h2>
              <p className='text-gray-600 dark:text-gray-400 mb-6'>
                The password reset link is invalid or has expired. Please request a new one.
              </p>
              <Link href='/forgot-password'>
                <Button className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium'>
                  Request New Reset Link
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-auth-shiny p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md'
      >
        <Card className='card-shiny shadow-2xl border-0'>
          <CardHeader className='space-y-1 pb-6'>
            <CardTitle className='text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Reset Password
            </CardTitle>
            <CardDescription className='text-center text-gray-600 dark:text-gray-400'>
              Enter your new password below
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
                  Password reset successfully! Redirecting to login...
                </motion.div>
              )}
            </AnimatePresence>

            {!success ? (
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='newPassword' className='text-sm font-medium'>
                    New Password
                  </Label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                    <Input
                      id='newPassword'
                      name='newPassword'
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder='Enter new password'
                      value={newPassword}
                      onChange={(e) => handlePasswordChange(e, 'new')}
                      className='pl-10 pr-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className='absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    >
                      {showNewPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                  {newPassword && (
                    <div className='text-xs text-gray-500 dark:text-gray-400'>
                      Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword' className='text-sm font-medium'>
                    Confirm Password
                  </Label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                    <Input
                      id='confirmPassword'
                      name='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm new password'
                      value={confirmPassword}
                      onChange={(e) => handlePasswordChange(e, 'confirm')}
                      className='pl-10 pr-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <div className='text-xs text-red-500'>
                      Passwords do not match
                    </div>
                  )}
                </div>

                <Button
                  type='submit'
                  className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3'
                  disabled={loading || !newPassword || !confirmPassword}
                >
                  {loading ? (
                    <div className='flex items-center gap-2'>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      Resetting Password...
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      Reset Password
                      <ArrowRight className='h-4 w-4' />
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <div className='text-center space-y-4'>
                <CheckCircle className='h-12 w-12 text-green-500 mx-auto' />
                <p className='text-gray-600 dark:text-gray-400'>
                  Your password has been successfully reset! You will be redirected to the login page shortly.
                </p>
                <Link href='/login'>
                  <Button className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium'>
                    Go to Login
                  </Button>
                </Link>
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