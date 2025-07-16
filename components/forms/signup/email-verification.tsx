import React from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services";
import { RequestEmailCodeForm } from "@/interfaces/auth";
import { User } from "@/interfaces/user";

interface EmailVerificationFormProps {
  onSuccess: () => void;
  userData: User;
  prevStep: () => void;
}

const EmailVerificationForm = ({
  onSuccess,
  userData,
  prevStep,
}: EmailVerificationFormProps) => {
  const { email, id: user_id } = userData;
  const [emailOtp, setEmailOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [emailVerified, setEmailVerified] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmailOtp(value);
    setError(""); // Clear error when user types
  };

  const validateOtp = () => {
    if (!emailOtp.trim()) {
      setError("Please enter the verification code");
      return false;
    }
    if (emailOtp.length !== 6) {
      setError("Please enter a 6-digit verification code");
      return false;
    }
    return true;
  };

  const handleVerifyEmail = async () => {
    if (!validateOtp()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate OTP verification
      await authService.verifyEmailCode({
        email: email as string,
        code: emailOtp,
      });
      setEmailVerified(true);
    } catch (error) {
      setError("Invalid verification code. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmailOTP = async () => {
    setLoading(true);
    setError("");

    try {
      // Simulate resending OTP
      await authService.requestEmailCode({
        email,
        user_id,
      } as RequestEmailCodeForm);

      setCountdown(60);
      setEmailOtp("");
    } catch (error) {
      setError("Failed to resend verification code. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (emailVerified) {
      onSuccess();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <Mail className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Verify Your Email</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          We&apos;ve sent a verification code to{" "}
          <span className="font-medium">{email as string}</span>
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Verification
          </Label>
          {emailVerified && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
        <div className="flex gap-2">
          <Input
            name="emailOtp"
            type="text"
            placeholder="Enter 6-digit code"
            value={emailOtp}
            onChange={handleChange}
            maxLength={6}
            className="flex-1 text-center text-lg tracking-widest border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            disabled={emailVerified}
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleVerifyEmail}
            disabled={loading || emailVerified || !emailOtp}
            className="px-4 border-gray-300 dark:border-gray-600"
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>
        <Button
          type="button"
          variant="link"
          onClick={handleResendEmailOTP}
          disabled={loading || countdown > 0 || emailVerified}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {countdown > 0 ? `Resend in ${countdown}s` : "Resend email code"}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-gray-300 dark:border-gray-600"
          onClick={prevStep}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          type="button"
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
          disabled={!emailVerified}
          onClick={handleContinue}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default EmailVerificationForm;
