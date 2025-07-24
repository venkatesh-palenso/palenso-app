// react
import { useState } from "react";

// next
import Link from "next/link";

// framer-motion
import { AnimatePresence, motion } from "framer-motion";

// lucide icons
import { User, Lock, Mail, Phone, Sparkles } from "lucide-react";

// components

// forms
import {
  UserInformationForm,
  EmailVerificationForm,
  MobileVerificationForm,
  SetPasswordForm,
} from "@/components/signup";

// interfaces
import { IUser } from "@/interfaces";

// layout
import { Layouts } from "@/layouts";

const SignUpFormWrapper = () => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<IUser>({} as IUser); // persist data across steps
  const [mainError] = useState("");

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case "lock":
        return Lock;
      case "mail":
        return Mail;
      case "phone":
        return Phone;
      default:
        return User;
    }
  };

  const navigationSteps = [
    { id: 0, title: "User Information", icon: "user" },
    { id: 1, title: "Email Verification", icon: "mail" },
    { id: 2, title: "Mobile Verification", icon: "phone" },
    { id: 3, title: "Set Password", icon: "lock" },
  ];

  const steps = [
    <UserInformationForm
      key={step}
      onSuccess={(data) => {
        setUserData(data);
        nextStep();
      }}
    />,
    <EmailVerificationForm
      key={step}
      onSuccess={() => {
        nextStep();
      }}
      userData={userData}
      prevStep={prevStep}
    />,
    <MobileVerificationForm
      key={step}
      onSuccess={() => {
        nextStep();
      }}
      userData={userData}
    />,
    <SetPasswordForm key={step} userData={userData} prevStep={prevStep} />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
              Join Palenso
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create your account and start your career journey
            </p>
          </div>
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              {navigationSteps.map((stepItem, index) => {
                const IconComponent = getStepIcon(stepItem.icon);
                const isActive = step === stepItem.id;
                const isCompleted = step > stepItem.id;

                return (
                  <motion.div
                    key={stepItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex flex-col items-center ${
                      isActive
                        ? "text-blue-600"
                        : isCompleted
                          ? "text-green-600"
                          : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : isCompleted
                            ? "bg-green-500 text-white shadow-lg"
                            : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-center">
                      {stepItem.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((step + 1) / navigationSteps.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {mainError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
              >
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {mainError}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Content */}
          <div className="min-h-[400px]">{steps[step]}</div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpFormWrapper;

SignUpFormWrapper.getLayout = Layouts.Public;
