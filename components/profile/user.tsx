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
  Save,
  Edit3,
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
    .optional()
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
    gender?: "male" | "female" | "other" | "prefer_not_to_say";
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(
    userProfile.profile.profile_picture_url || null
  );
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
    setValue,
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      first_name: userProfile.first_name || "",
      last_name: userProfile.last_name || "",
      email: userProfile.email || "",
      mobile_number: userProfile.mobile_number || "",
      date_of_birth: userProfile.profile.date_of_birth
        ? format(new Date(userProfile.profile.date_of_birth), "yyyy-MM-dd")
        : "",
      gender: userProfile.profile.gender || undefined,
      city: userProfile.profile.city || "",
      state: userProfile.profile.state || "",
      country: userProfile.profile.country || "",
      bio: userProfile.profile.bio || "",
      linkedin: userProfile.profile.linkedin || "",
      github: userProfile.profile.github || "",
      twitter: userProfile.profile.twitter || "",
      website: userProfile.profile.website || "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitForm = async (data: UserProfileFormData) => {
    setIsLoading(true);
    try {
      // Update user profile
      await userService.updateProfile(userProfile.id, data);
      
      // Update avatar if changed
      if (avatarFile) {
        // Handle avatar upload logic here
        // await mediaService.uploadAvatar(avatarFile);
      }
      
      setIsEditing(false);
      setAvatarFile(null);
      reset(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if form is dirty or avatar has changed
  const hasChanges = isDirty || avatarFile !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="feature-card-handshake p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            <h2 className="heading-handshake text-2xl">Personal Information</h2>
          </div>
          <Button
            onClick={() => {
              if (isEditing) {
                // Cancel editing - reset everything
                setIsEditing(false);
                reset();
                setAvatarPreview(userProfile.profile.profile_picture_url || null);
                setAvatarFile(null);
              } else {
                // Start editing
                setIsEditing(true);
              }
            }}
            className="btn-secondary"
          >
            {isEditing ? (
              <>
                <Edit3 className="w-4 h-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
          {/* Avatar Section */}
          <div className="text-center">
            <div className="relative inline-block group">
              {isEditing ? (
                <label className="cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 mx-auto mb-4 relative">
                    {avatarPreview || userProfile.profile.profile_picture_url ? (
                      <img
                        src={avatarPreview || userProfile.profile.profile_picture_url || "/default-avatar.png"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-semibold text-primary">
                          {userProfile.first_name.charAt(0).toUpperCase()}
                          {userProfile.last_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 mx-auto mb-4 relative">
                  {avatarPreview || userProfile.profile.profile_picture_url ? (
                    <img
                      src={avatarPreview || userProfile.profile.profile_picture_url || "/default-avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-primary">
                        {userProfile.first_name.charAt(0).toUpperCase()}
                        {userProfile.last_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {avatarFile && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  New
                </div>
              )}
            </div>
            {isEditing && (
              <p className="text-sm text-gray-600 mt-2">
                Click on your profile picture to change it
              </p>
            )}
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              type="text"
              label="First Name"
              name="first_name"
              register={register}
              error={errors.first_name}
              required
              disabled={!isEditing}
            />

            <FormField
              type="text"
              label="Last Name"
              name="last_name"
              register={register}
              error={errors.last_name}
              required
              disabled={!isEditing}
            />

            <FormField
              type="email"
              label="Email"
              name="email"
              register={register}
              error={errors.email}
              required
              disabled={!isEditing}
              rightIcon={userProfile.is_email_verified ? <CheckCircle className="text-green-500 w-5 h-5" /> : undefined}
            />

            <FormField
              type="phone"
              label="Phone Number"
              name="mobile_number"
              setValue={setValue}
              watch={watch}
              error={errors.mobile_number}
              required
              disabled={!isEditing}
              rightIcon={userProfile.is_mobile_verified ? <CheckCircle className="text-green-500 w-5 h-5" /> : undefined}
            />
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              type="date"
              label="Date of Birth"
              name="date_of_birth"
              setValue={setValue}
              watch={watch}
              error={errors.date_of_birth}
              required
              disabled={!isEditing}
            />

            <FormField
              type="select"
              label="Gender"
              name="gender"
              setValue={setValue}
              watch={watch}
              error={errors.gender}
              required
              placeholder="Select Gender"
              disabled={!isEditing}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
                { value: "prefer_not_to_say", label: "Prefer not to say" },
              ]}
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              type="text"
              label="City"
              name="city"
              register={register}
              error={errors.city}
              required
              disabled={!isEditing}
            />

            <FormField
              type="text"
              label="State"
              name="state"
              register={register}
              error={errors.state}
              required
              disabled={!isEditing}
            />

            <FormField
              type="text"
              label="Country"
              name="country"
              register={register}
              error={errors.country}
              required
              disabled={!isEditing}
            />
          </div>

          {/* Bio */}
          <FormField
            type="textarea"
            label="Bio"
            name="bio"
            register={register}
            error={errors.bio}
            placeholder="Tell us about yourself..."
            rows={4}
            disabled={!isEditing}
          />

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              type="url"
              label="LinkedIn"
              name="linkedin"
              register={register}
              error={errors.linkedin}
              placeholder="https://linkedin.com/in/yourprofile"
              disabled={!isEditing}
            />

            <FormField
              type="url"
              label="GitHub"
              name="github"
              register={register}
              error={errors.github}
              placeholder="https://github.com/yourusername"
              disabled={!isEditing}
            />

            <FormField
              type="url"
              label="Twitter"
              name="twitter"
              register={register}
              error={errors.twitter}
              placeholder="https://twitter.com/yourhandle"
              disabled={!isEditing}
            />

            <FormField
              type="url"
              label="Website"
              name="website"
              register={register}
              error={errors.website}
              placeholder="https://yourwebsite.com"
              disabled={!isEditing}
            />
          </div>

          {/* Submit Button */}
          {isEditing && (
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                  setAvatarPreview(userProfile.profile.profile_picture_url || null);
                  setAvatarFile(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !hasChanges}
                className="btn-handshake"
              >
                {isLoading ? (
                  <div className="loading-handshake w-4 h-4" />
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default UserProfileForm;
