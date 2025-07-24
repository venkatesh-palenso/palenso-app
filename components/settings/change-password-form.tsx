import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Save, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "@/services";
import PasswordField from "./password-field";

const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Current password is required"),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

interface ChangePasswordFormProps {
  onCancel: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onCancel }) => {
  const [passwordsView, setPasswordsView] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await authService.changePassword(data);
      setSuccess("Password changed successfully!");
      reset();
    } catch (err) {
      setError("Failed to change password. Please try again.");
      console.error("Password change error:", err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordView = (key: keyof typeof passwordsView) => () => {
    setPasswordsView((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCancel = () => {
    reset();
    setError("");
    setSuccess("");
    onCancel();
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900 dark:text-white">
          <Lock className="mr-2 h-5 w-5 text-green-500" />
          Change Password
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Error/Success Messages */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Password Fields */}
            <PasswordField
              name="old_password"
              label="Current Password"
              placeholder="Enter your current password"
              register={register}
              error={errors.old_password?.message}
              isVisible={passwordsView.old_password}
              onToggleVisibility={togglePasswordView("old_password")}
            />

            <PasswordField
              name="new_password"
              label="New Password"
              placeholder="Enter your new password"
              register={register}
              error={errors.new_password?.message}
              isVisible={passwordsView.new_password}
              onToggleVisibility={togglePasswordView("new_password")}
            />

            <PasswordField
              name="confirm_password"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              register={register}
              error={errors.confirm_password?.message}
              isVisible={passwordsView.confirm_password}
              onToggleVisibility={togglePasswordView("confirm_password")}
            />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating Password...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Password
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm; 