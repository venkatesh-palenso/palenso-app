import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, User, Lock, Mail, Phone } from "lucide-react";
import UserInformationForm from "@/components/forms/signup/user-information";
import EmailVerificationForm from "@/components/forms/signup/email-verification";
import MobileVerificationForm from "@/components/forms/signup/mobile-verification";
import SetPasswordForm from "@/components/forms/signup/set-password";
import { User as UserInfo } from "@/interfaces/user";

const SignUpFormWrapper = () => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<UserInfo>({} as UserInfo); // persist data across steps
  const [mainError, setMainError] = useState("");

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSSOLogin = (provider: string) => {
    setMainError(`${provider} login not implemented yet`);
  };

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
    <div className="min-h-screen flex items-center justify-center bg-auth-shiny p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="card-shiny shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-3xl font-bold text-center text-banner-vibrant">
              Create your account
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Join Palenso to connect with opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* SSO Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSSOLogin("google")}
              >
                <svg className="h-5 w-5" viewBox="0 0 48 48">
                  <g>
                    <path
                      fill="#4285F4"
                      d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.68 2.69 30.74 0 24 0 14.82 0 6.71 5.48 2.69 13.44l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.93 37.13 46.1 31.36 46.1 24.55z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.67 28.65c-1.01-2.99-1.01-6.21 0-9.2l-7.98-6.2C.99 17.1 0 20.43 0 24c0 3.57.99 6.9 2.69 10.55l7.98-6.2z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 48c6.74 0 12.68-2.22 16.98-6.05l-7.19-5.59c-2.01 1.35-4.59 2.15-7.79 2.15-6.38 0-11.87-3.63-14.33-8.9l-7.98 6.2C6.71 42.52 14.82 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </g>
                </svg>
                Sign up with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSSOLogin("facebook")}
              >
                <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Sign up with Facebook
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSSOLogin("linkedin")}
              >
                <svg className="h-5 w-5" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Sign up with LinkedIn
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Dynamic Step Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                {navigationSteps.map((stepItem, index) => {
                  const Icon = getStepIcon(stepItem.icon);
                  const isCompleted = step > stepItem.id;
                  const isActive = step === stepItem.id;

                  return (
                    <div key={stepItem.id} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isActive
                            ? "bg-blue-500 text-white shadow-lg"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      {index < navigationSteps.length - 1 && (
                        <div
                          className={`w-12 h-1 mx-2 transition-all duration-300 ${
                            isCompleted
                              ? "bg-green-500"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {step + 1} of {navigationSteps.length}:{" "}
                {navigationSteps[step]?.title}
              </span>
            </div>

            {/* Main Error Display */}
            {mainError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {mainError}
                </p>
              </div>
            )}

            {/* Step Content */}
            <div className="w-full max-w-md mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  {steps[step]}
                </motion.div>
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUpFormWrapper;
