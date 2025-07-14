import React from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  SkipForward,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import type { Value as PhoneValue } from 'react-phone-number-input';
import { authService } from '@/services';

interface MobileVerificationFormProps {
  onSuccess: (data: Record<string, unknown>) => void;
  userData: Record<string, unknown>;
}

const MobileVerificationForm = ({
  onSuccess,
  userData,
}: MobileVerificationFormProps) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [phoneAvailability, setPhoneAvailability] = React.useState<
    Record<string, boolean | string | null>
  >({
    available: false,
    message: '',
  });
  const [phoneOtp, setPhoneOtp] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [otpSent, setOtpSent] = React.useState(false);
  const [phoneVerified, setPhoneVerified] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handlePhoneChange = (value: PhoneValue) => {
    setPhoneNumber(value || '');
    setError(''); // Clear error when user types
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneOtp(value);
    setError(''); // Clear error when user types
  };

  const validatePhoneNumber = () => {
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const validateOtp = () => {
    if (!phoneOtp.trim()) {
      setError('Please enter the verification code');
      return false;
    }
    if (phoneOtp.length !== 6) {
      setError('Please enter a 6-digit verification code');
      return false;
    }
    return true;
  };

  const handlePhoneBlur = async () => {
    const response = await authService.checkPhoneAvailability(phoneNumber);
    setPhoneAvailability(prev => ({
      ...prev,
      available: response.data.available,
      message: response.data.message,
    }));
  };

  const handleSendOtp = async () => {
    if (!validatePhoneNumber() || !phoneAvailability.available) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate sending OTP
      await authService.sendMobileVerification({
        user_id: userData.id as string,
        mobile_number: phoneNumber,
      });

      setOtpSent(true);
      setCountdown(60);
    } catch (error) {
      setError('Failed to send verification code. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhone = async () => {
    if (!validateOtp()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate OTP verification
     await authService.verifyMobile({
        mobile_number: phoneNumber,
        otp: phoneOtp,
      });

      setPhoneVerified(true);
    } catch (error) {
      setError('Invalid verification code. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendPhoneOTP = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate resending OTP
      await authService.sendMobileVerification({
        user_id: userData.id as string,
        mobile_number: phoneNumber,
      });

      setCountdown(60);
      setPhoneOtp('');
    } catch (error) {
      setError('Failed to resend verification code. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    onSuccess({ skipMobile: true });
  };

  const handleContinue = () => {
    if (phoneVerified) {
      onSuccess({ phoneVerified: true });
    }
  };

  // Step 1: Phone number input
  if (!otpSent) {
    return (
      <motion.form
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        onSubmit={e => {
          e.preventDefault();
          handleSendOtp();
        }}
        className='space-y-4'
      >
        <div className='text-center'>
          <Phone className='h-12 w-12 text-blue-500 mx-auto mb-4' />
          <h3 className='text-xl font-semibold mb-2'>Add Your Phone Number</h3>
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-6'>
            We&apos;ll send a verification code to your phone number
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phoneNumber' className='text-sm font-medium'>
            Phone Number
          </Label>
          <div className='relative'>
            <Phone className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
            <PhoneInput
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder='Enter your phone number'
              className='pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
              onBlur={handlePhoneBlur}
            />
          </div>
          {error && <p className='text-xs text-red-500'>{error}</p>}
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            We&apos;ll send a verification code to your phone number
          </p>
          {phoneAvailability.available && (
            <p className='text-xs text-green-500'>
              {phoneAvailability.message}
            </p>
          )}
          {!phoneAvailability.available && (
            <p className='text-xs text-red-500'>{phoneAvailability.message}</p>
          )}
        </div>

        <div className='flex space-x-3'>
          <Button
            type='button'
            variant='outline'
            className='flex-1 flex items-center justify-center gap-2'
            onClick={handleSkip}
          >
            <SkipForward className='h-4 w-4' />
            Skip for now
          </Button>
          <Button
            type='submit'
            className='flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3'
            disabled={loading || !phoneNumber || !phoneAvailability.available}
          >
            {loading ? 'Sending...' : 'Continue'}
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </motion.form>
    );
  }

  // Step 2: OTP verification
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className='space-y-6'
    >
      <div className='text-center'>
        <Phone className='h-12 w-12 text-blue-500 mx-auto mb-4' />
        <h3 className='text-xl font-semibold mb-2'>Verify Your Phone</h3>
        <p className='text-sm text-gray-600 dark:text-gray-400 mb-6'>
          We&apos;ve sent a verification code to{' '}
          <span className='font-medium'>{phoneNumber}</span>
        </p>
      </div>

      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <Label className='text-sm font-medium flex items-center gap-2'>
            <Phone className='h-4 w-4' />
            Phone Verification
          </Label>
          {phoneVerified && <CheckCircle className='h-5 w-5 text-green-500' />}
        </div>
        <div className='flex gap-2'>
          <Input
            name='phoneOtp'
            type='text'
            placeholder='Enter 6-digit code'
            value={phoneOtp}
            onChange={handleOtpChange}
            maxLength={6}
            className='flex-1 text-center text-lg tracking-widest border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
            disabled={phoneVerified}
          />
          <Button
            type='button'
            variant='outline'
            onClick={handleVerifyPhone}
            disabled={loading || phoneVerified || !phoneOtp}
            className='px-4 border-gray-300 dark:border-gray-600'
          >
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
        </div>
        <Button
          type='button'
          variant='link'
          onClick={handleResendPhoneOTP}
          disabled={loading || countdown > 0 || phoneVerified}
          className='text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
        >
          {countdown > 0 ? `Resend in ${countdown}s` : 'Resend SMS code'}
        </Button>
      </div>

      {error && (
        <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
          <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
        </div>
      )}

      <div className='flex space-x-3'>
        <Button
          type='button'
          variant='outline'
          className='flex-1 border-gray-300 dark:border-gray-600'
          onClick={() => setOtpSent(false)}
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back
        </Button>

        <Button
          type='button'
          className='flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium'
          disabled={!phoneVerified}
          onClick={handleContinue}
        >
          Continue
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </motion.div>
  );
};

export default MobileVerificationForm;
