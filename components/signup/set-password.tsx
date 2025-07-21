// react
import React from "react";

// next
import { useRouter } from "next/router";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// services
import { authService } from "@/services";

// interfaces
import { User } from "@/interfaces/user";

// context
import { useUser } from "@/context";

interface SetPasswordFormProps {
  userData: User;
  prevStep: () => void;
}

const SetPasswordForm = ({ userData, prevStep }: SetPasswordFormProps) => {
  const router = useRouter();
  const { mutateUser } = useUser();

  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call to set password
      await authService.completeUserRegistration({
        user_id: userData.id as string,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });

      await mutateUser();

      router.push("/dashboard");
    } catch (error) {
      console.error("Error setting password:", error);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    !loading;

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Create Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            className={`pl-10 pr-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 ${
              errors.password ? "border-red-500 dark:border-red-400" : ""
            }`}
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                password: validatePassword(formData.password),
              }))
            }
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Must be at least 8 characters with uppercase, lowercase, number, and
          special character
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`pl-10 pr-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 ${
              errors.confirmPassword ? "border-red-500 dark:border-red-400" : ""
            }`}
            required
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                confirmPassword: validatePassword(formData.confirmPassword),
              }))
            }
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

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
          type="submit"
          className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium"
          disabled={loading || !canSubmit}
        >
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </div>
    </motion.form>
  );
};

export default SetPasswordForm;
