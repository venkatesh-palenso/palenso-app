import React, { FC } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  MapPin,
  Globe,
  Upload,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Card, CardContent } from "@/components/ui/card";
import { mediaService, userService } from "@/services";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

// Zod schema for user profile validation
const userProfileSchema = z.object({
  // Basic Information
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

  last_name: z
    .string()
    .min(1, "Last name must be at least 1 character")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),

  mobile_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),

  // Personal Information
  date_of_birth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 13 && age <= 100;
    }, "You must be between 13 and 100 years old"),

  gender: z
    .enum(["male", "female", "other", "prefer_not_to_say"])
    .refine((val) => val !== undefined, {
      message: "Please select a gender",
    }),

  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be less than 50 characters"),

  state: z
    .string()
    .min(2, "State must be at least 2 characters")
    .max(50, "State must be less than 50 characters"),

  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must be less than 50 characters"),

  // Bio
  bio: z
    .string()
    .min(50, "Bio must be at least 50 characters")
    .max(500, "Bio must be less than 500 characters")
    .optional(),

  // Social Links
  linkedin: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .startsWith("https://", "URL must start with https://")
    .optional()
    .or(z.literal("")),

  github: z
    .string()
    .url("Please enter a valid GitHub URL")
    .startsWith("https://", "URL must start with https://")
    .optional()
    .or(z.literal("")),

  twitter: z
    .string()
    .url("Please enter a valid Twitter URL")
    .startsWith("https://", "URL must start with https://")
    .optional()
    .or(z.literal("")),

  website: z
    .string()
    .url("Please enter a valid website URL")
    .startsWith("https://", "URL must start with https://")
    .optional()
    .or(z.literal("")),

  // Profile Image
  profile_picture_url: z.string().optional(),

  is_email_verified: z.boolean().optional(),
  is_mobile_verified: z.boolean().optional(),
});

type UserProfileFormData = z.infer<typeof userProfileSchema>;

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  is_email_verified: boolean;
  is_mobile_verified: boolean;
  profile: {
    gender: "male" | "female" | "other" | "prefer_not_to_say";
    bio: string;
    city: string;
    state: string;
    country: string;
    linkedin: string;
    github: string;
    twitter: string;
    website: string;
    profile_picture_url: string;
    date_of_birth: string;
  };
}

const UserProfileForm: FC<{ data: UserProfile }> = ({ data: userProfile }) => {
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      first_name: userProfile.first_name || "",
      last_name: userProfile.last_name || "",
      email: userProfile.email || "",
      mobile_number: userProfile.mobile_number || "",
      is_email_verified: userProfile.is_email_verified || false,
      is_mobile_verified: userProfile.is_mobile_verified || false,
      gender: userProfile.profile.gender || "prefer_not_to_say",
      bio: userProfile.profile.bio || "",
      city: userProfile.profile.city || "",
      state: userProfile.profile.state || "",
      country: userProfile.profile.country || "",
      linkedin: userProfile.profile.linkedin || "",
      github: userProfile.profile.github || "",
      twitter: userProfile.profile.twitter || "",
      website: userProfile.profile.website || "",
      profile_picture_url: userProfile.profile.profile_picture_url || "",
      date_of_birth: userProfile.profile.date_of_birth || "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const onSubmitForm = async (data: UserProfileFormData) => {
    try {
      const payload = { ...data };

      if (avatarFile) {
        try {
          const formData = new FormData();
          formData.append("file", avatarFile);
          formData.append("asset_type", "profile_picture");
          const response = await mediaService.uploadFile(formData);
          payload["profile_picture_url"] = response.display_url;
        } catch (error) {
          console.log("failed to upload avatar:", error);
        }
      }
      try {
        payload["date_of_birth"] = format(
          payload["date_of_birth"],
          "yyyy-MM-dd",
        );
        await userService.updateProfile(userProfile.id, payload);
        reset();
      } catch (error) {
        console.log("failed to update profile:", error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer_not_to_say", label: "Prefer not to say" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="card-elevated">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Basic Information
              </h3>
              <hr className="border-gray-200" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  type="text"
                  label="First Name"
                  name="first_name"
                  placeholder="Enter your first name"
                  register={register}
                  error={errors.first_name}
                  required
                />
                <FormField
                  type="text"
                  label="Last Name"
                  name="last_name"
                  placeholder="Enter your last name"
                  register={register}
                  error={errors.last_name}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  type="email"
                  label="Email Address"
                  name="email"
                  placeholder="your.email@example.com"
                  register={register}
                  error={errors.email}
                  required
                />
                <FormField
                  type="phone"
                  label="Phone Number"
                  name="mobile_number"
                  placeholder="+1 (555) 123-4567"
                  setValue={setValue}
                  watch={watch}
                  error={errors.mobile_number}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  type="date"
                  label="Date of Birth"
                  name="date_of_birth"
                  setValue={setValue}
                  watch={watch}
                  error={errors.date_of_birth}
                  required
                />
                <FormField
                  type="select"
                  label="Gender"
                  name="gender"
                  placeholder="Select gender"
                  options={genderOptions}
                  setValue={setValue}
                  watch={watch}
                  error={errors.gender}
                  required
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Address Information
              </h3>

              <hr className="border-gray-200" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  type="text"
                  label="City"
                  name="city"
                  placeholder="City"
                  register={register}
                  error={errors.city}
                  required
                />
                <FormField
                  type="text"
                  label="State/Province"
                  name="state"
                  placeholder="State"
                  register={register}
                  error={errors.state}
                  required
                />
                <FormField
                  type="text"
                  label="Country"
                  name="country"
                  placeholder="Country"
                  register={register}
                  error={errors.country}
                  required
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                About You
              </h3>

              <hr className="border-gray-200" />

              <FormField
                type="textarea"
                label="Bio"
                name="bio"
                placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                register={register}
                error={errors.bio}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                {watch("bio")?.length || 0}/500 characters
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Social Links
              </h3>

              <hr className="border-gray-200" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  type="url"
                  label="LinkedIn URL"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/..."
                  register={register}
                  error={errors.linkedin}
                />
                <FormField
                  type="url"
                  label="GitHub URL"
                  name="github"
                  placeholder="https://github.com/..."
                  register={register}
                  error={errors.github}
                />
                <FormField
                  type="url"
                  label="Twitter"
                  name="twitter"
                  placeholder="https://twitter.com/..."
                  register={register}
                  error={errors.twitter}
                />
                <FormField
                  type="url"
                  label="Personal Website"
                  name="website"
                  placeholder="https://yourwebsite.com"
                  register={register}
                  error={errors.website}
                />
              </div>
            </div>

            {/* Profile Image */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Profile Image
              </h3>

              <hr className="border-gray-200" />

              <div className="space-y-2">
                <Label
                  htmlFor="avatar"
                  className="text-sm font-medium text-foreground"
                >
                  Upload Profile Picture (Optional)
                </Label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="avatar"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Choose Image
                    </label>
                  </div>
                  {avatarFile && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      {avatarFile.name}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Recommended: Square image, 512x512px or larger, PNG or JPG
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:flex-none"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Saving Profile...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Save Profile
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfileForm;
