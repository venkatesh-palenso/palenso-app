import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight, SkipForward, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { authService } from "@/services";
import { IUser } from "@/interfaces";
import { MediumAvailabilityResponse } from "@/interfaces/auth";

interface MobileVerificationFormProps {
  onSuccess: () => void;
  userData: IUser;
}

const MobileVerificationForm = ({
  onSuccess,
  userData,
}: MobileVerificationFormProps) => {
  const [phoneOtp, setPhoneOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [phoneAvailability, setPhoneAvailability] =
    useState<MediumAvailabilityResponse>({
      available: false,
      message: "",
    });

  const phoneSchema = z.object({
    phoneNumber: z.string().min(1, "Phone number is required"),
  });

  const {
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  // Watch the phone number from the form
  const phoneNumber = watch("phoneNumber");

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneOtp(value);
    setError(""); // Clear error when user types
  };

  const validatePhoneNumber = () => {
    const currentPhoneNumber = getValues("phoneNumber");
    if (!currentPhoneNumber || !currentPhoneNumber.trim()) {
      setError("Please enter your phone number");
      return false;
    }
    if (currentPhoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const validateOtp = () => {
    if (!phoneOtp.trim()) {
      setError("Please enter the verification code");
      return false;
    }
    if (phoneOtp.length !== 6) {
      setError("Please enter a 6-digit verification code");
      return false;
    }
    return true;
  };

  const handlePhoneBlur = async () => {
    const currentPhoneNumber = getValues("phoneNumber");

    // Only check availability if phone number is not empty
    if (!currentPhoneNumber || currentPhoneNumber.trim() === "") {
      return;
    }

    try {
      const response = await authService.mobileAvailabilty({
        mobile_number: currentPhoneNumber,
      });
      setPhoneAvailability((prev) => ({
        ...prev,
        available: response.available,
        message: response.message,
      }));
    } catch (error) {
      console.log("error for mobile availability check", error);
    }
  };

  const handleSendOtp = async () => {
    if (!validatePhoneNumber() || !phoneAvailability.available) {
      return;
    }

    const currentPhoneNumber = getValues("phoneNumber");
    setLoading(true);
    setError("");

    try {
      // Simulate sending OTP
      await authService.requestMobileCode({
        user_id: userData.id as string,
        mobile_number: currentPhoneNumber,
      });

      setOtpSent(true);
      setCountdown(60);
    } catch (error) {
      setError("Failed to send verification code. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhone = async () => {
    if (!validateOtp()) {
      return;
    }

    const currentPhoneNumber = getValues("phoneNumber");
    setLoading(true);
    setError("");

    try {
      // Simulate OTP verification
      await authService.verifyMobileCode({
        medium: "mobile",
        mobile_number: currentPhoneNumber,
        code: phoneOtp,
      });

      setPhoneVerified(true);
    } catch (error) {
      setError("Invalid verification code. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendPhoneOTP = async () => {
    const currentPhoneNumber = getValues("phoneNumber");
    setLoading(true);
    setError("");

    try {
      // Simulate resending OTP
      await authService.requestMobileCode({
        user_id: userData.id as string,
        mobile_number: currentPhoneNumber,
      });

      setCountdown(60);
      setPhoneOtp("");
    } catch (error) {
      setError("Failed to resend verification code. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    onSuccess();
  };

  const handleContinue = () => {
    if (phoneVerified) {
      onSuccess();
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
        onSubmit={(e) => {
          e.preventDefault();
          handleSendOtp();
        }}
        className="space-y-4"
      >
        <div className="text-center">
          <Phone className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Add Your Phone Number</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            We&apos;ll send a verification code to your phone number
          </p>
        </div>

        <div className="space-y-4">
          <FormField
            type="phone"
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter your phone number"
            setValue={setValue}
            watch={watch}
            error={errors.phoneNumber}
            onBlur={handlePhoneBlur}
            className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            We&apos;ll send a verification code to your phone number
          </p>
          {phoneAvailability.available && (
            <p className="text-xs text-green-500">
              {phoneAvailability.message}
            </p>
          )}
          {!phoneAvailability.available && phoneAvailability.message && (
            <p className="text-xs text-red-500">{phoneAvailability.message}</p>
          )}
        </div>

        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleSkip}
          >
            <SkipForward className="h-4 w-4" />
            Skip for now
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3"
            disabled={loading || !phoneNumber || !phoneAvailability.available}
          >
            {loading ? "Sending..." : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
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
      className="space-y-6"
    >
      <div className="text-center">
        <Phone className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Verify Your Phone</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          We&apos;ve sent a verification code to{" "}
          <span className="font-medium">{phoneNumber}</span>
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone Verification
          </Label>
          {phoneVerified && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
        <div className="flex gap-2">
          <Input
            name="phoneOtp"
            type="text"
            placeholder="Enter 6-digit code"
            value={phoneOtp}
            onChange={handleOtpChange}
            maxLength={6}
            className="flex-1 text-center text-lg tracking-widest border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            disabled={phoneVerified}
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleVerifyPhone}
            disabled={loading || phoneVerified || !phoneOtp}
            className="px-4 border-gray-300 dark:border-gray-600"
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>
        <Button
          type="button"
          variant="link"
          onClick={handleResendPhoneOTP}
          disabled={loading || countdown > 0 || phoneVerified}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {countdown > 0 ? `Resend in ${countdown}s` : "Resend SMS code"}
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
          onClick={() => setOtpSent(false)}
        >
          Back
        </Button>

        <Button
          type="button"
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
          disabled={!phoneVerified}
          onClick={handleContinue}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default MobileVerificationForm;
