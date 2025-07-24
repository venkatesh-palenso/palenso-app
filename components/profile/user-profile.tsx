// react
import { FC, useState } from "react";

// next
import Image from "next/image";

// framer-motion
import { motion } from "framer-motion";

// react hook form
import { useForm } from "react-hook-form";

// lucide icons
import { CheckCircle, Edit3, Save, Upload, User } from "lucide-react";

// date fns
import { format } from "date-fns";

// interface
import { IUserProfile } from "@/interfaces";

// components
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";

// services
import { mediaService, userService } from "@/services";

interface IFormState {
  mode: "view" | "edit";
  preview: string | null;
  file: File | null;
}
const UserProfile: FC<{ data: IUserProfile; mutate: () => void }> = ({
  data,
  mutate,
}) => {
  const [formState, setFormState] = useState<IFormState>({
    mode: "view",
    preview: data.profile_picture_url || null,
    file: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<IUserProfile>({
    defaultValues: {
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      email: data.email || "",
      mobile_number: data.mobile_number || "",
      date_of_birth: data.date_of_birth
        ? format(new Date(data.date_of_birth), "yyyy-MM-dd")
        : "",
      gender: data.gender || undefined,
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      bio: data.bio || "",
      linkedin: data.linkedin || "",
      github: data.github || "",
      twitter: data.twitter || "",
      website: data.website || "",
    },
  });

  const handleFormState = (mode: "view" | "edit") => {
    setFormState({
      ...formState,
      mode,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormState((prevState) => ({
          ...prevState,
          file,
          preview: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitForm = async (payload: IUserProfile) => {
    console.log(payload, formState);
    try {
      // Update avatar if changed
      if (formState.file) {
        // Handle avatar upload logic here
        const formData = new FormData();
        formData.append("file", formState.file);
        formData.append("asset_type", "profile_picture");
        const response = await mediaService.uploadFile(formData);
        payload["profile_picture_url"] = response.display_url;
      }
      payload["date_of_birth"] = payload["date_of_birth"]
        ? format(new Date(payload["date_of_birth"]), "yyyy-MM-dd")
        : "";
      // Update user profile
      const response = await userService.updateProfile(data.user_id, payload);

      setFormState({
        mode: "view",
        file: null,
        preview: null,
      });

      reset({ ...response });
      mutate();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Check if form is dirty or avatar has changed
  const hasChanges = isDirty || formState.file !== null;
  const isEditing = formState.mode === "edit";

  let avatarUrl = data.profile_picture_url ?? "/default-avatar.png";
  if (isEditing && formState.preview) {
    avatarUrl = formState.preview;
  }
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

          {isEditing ? (
            <Button
              onClick={() => {
                handleFormState("view");
                reset();
              }}
              className="btn-secondary"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          ) : (
            <Button
              onClick={() => handleFormState("edit")}
              className="btn-secondary"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
          {/* Avatar Section */}
          <div className="text-center">
            <div className="relative inline-block group">
              {isEditing ? (
                <label className="cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 mx-auto mb-4 relative">
                    {data.profile_picture_url || formState.preview ? (
                      <Image
                        src={avatarUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-semibold text-primary">
                          {data.first_name.charAt(0).toUpperCase()}
                          {data.last_name.charAt(0).toUpperCase()}
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
                  {formState.preview || data.profile_picture_url ? (
                    <Image
                      src={
                        formState.preview ||
                        data.profile_picture_url ||
                        "/default-avatar.png"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-primary">
                        {data.first_name.charAt(0).toUpperCase()}
                        {data.last_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {formState.file && (
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
              rightIcon={
                data.is_email_verified ? (
                  <CheckCircle className="text-green-500 w-5 h-5" />
                ) : undefined
              }
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
              rightIcon={
                data.is_mobile_verified ? (
                  <CheckCircle className="text-green-500 w-5 h-5" />
                ) : undefined
              }
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
              placeholder="Enter your city"
              register={register}
              error={errors.city}
              required
              disabled={!isEditing}
            />

            <FormField
              type="text"
              label="State"
              name="state"
              placeholder="Enter your state"
              register={register}
              error={errors.state}
              required
              disabled={!isEditing}
            />

            <FormField
              type="text"
              label="Country"
              name="country"
              placeholder="Enter your country"
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
                  handleFormState("view");
                  reset();
                }}
                className="btn-secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !hasChanges}
                className="btn-handshake"
              >
                {isSubmitting ? (
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
export default UserProfile;
