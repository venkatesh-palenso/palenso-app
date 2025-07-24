import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Building, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authService } from "@/services";
import { MediumAvailabilityForm, CreateUserForm } from "@/interfaces/auth";
import { IUser } from "@/interfaces";

interface UserInformationFormProps {
  onSuccess: (data: IUser) => void;
}

const UserInformationForm = ({ onSuccess }: UserInformationFormProps) => {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    role: null as "student" | "employer" | null,
  });
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [emailAvailability, setEmailAvailability] = React.useState<
    Record<string, boolean | string | null>
  >({
    available: false,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRoleSelect = (role: "student" | "employer") => {
    setFormData((prev) => ({ ...prev, role }));
    if (errors.role) {
      setErrors((prev) => ({ ...prev, role: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.role) {
      newErrors.role = "Please select your role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailBlur = async () => {
    try {
      const response = await authService.emailAvailabilty(
        formData.email as MediumAvailabilityForm,
      );
      setEmailAvailability((prev) => ({
        ...prev,
        available: response.available,
        message: response.message,
      }));
    } catch (error) {
      setEmailAvailability((prev) => ({
        ...prev,
        available: false,
        message: "Failed to check email availability",
      }));
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload: CreateUserForm = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        role: formData.role as "student" | "employer",
        channel: "email",
      };
      const response = await authService.createUser(payload);

      onSuccess(response);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.role &&
    emailAvailability.available &&
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            First Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className={`pl-10 border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 ${
                errors.firstName
                  ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                  : ""
              }`}
              required
            />
          </div>
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            Last Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className={`pl-10 border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 ${
                errors.lastName
                  ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                  : ""
              }`}
              required
            />
          </div>
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`pl-10 border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 ${
              errors.email
                ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                : ""
            }`}
            required
            onBlur={handleEmailBlur}
          />
        </div>
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        {emailAvailability.available && (
          <p className="text-xs text-green-500">{emailAvailability.message}</p>
        )}
        {!emailAvailability.available && (
          <p className="text-xs text-red-500">{emailAvailability.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">I am a...</Label>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={formData.role === "student" ? "default" : "outline"}
            className={`h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-200 ${
              formData.role === "student"
                ? "bg-primary hover:bg-primary/90 text-white"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
            onClick={() => handleRoleSelect("student")}
          >
            <GraduationCap className="h-6 w-6" />
            <span className="text-sm font-medium">Student</span>
          </Button>
          <Button
            type="button"
            variant={formData.role === "employer" ? "default" : "outline"}
            className={`h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-200 ${
              formData.role === "employer"
                ? "bg-primary hover:bg-primary/90 text-white"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
            onClick={() => handleRoleSelect("employer")}
          >
            <Building className="h-6 w-6" />
            <span className="text-sm font-medium">Employer</span>
          </Button>
        </div>
        {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
        disabled={!canSubmit}
      >
        {loading ? "Creating account..." : "Continue"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.form>
  );
};

export default UserInformationForm;
