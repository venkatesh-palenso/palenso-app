import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowLeft,
  Upload,
  Save,
  X,
  Sparkles,
  Shield,
  DollarSign,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Layouts } from "@/layouts";
import { eventService, mediaService } from "@/services";
import { useAdminOrEmployerAccess } from "@/hooks";
import AccessDenied from "@/components/ui/access-denied";

interface EventFormData {
  title: string;
  description: string;
  event_type: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  location: string;
  is_online: boolean;
  online_url?: string;
  max_attendees?: number;
  registration_deadline: string;
  tags?: string;
  is_free: boolean;
  registration_fee?: number;
  currency: string;
}

const CreateEvent = () => {
  const router = useRouter();
  const { isAuthorized, isLoading, user } =
    useAdminOrEmployerAccess("/dashboard");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    defaultValues: {
      is_online: false,
      is_free: false,
      registration_fee: 0,
      currency: "USD",
    },
  });

  const eventTypeOptions = [
    { value: "career_fair", label: "Career Fair" },
    { value: "workshop", label: "Workshop" },
    { value: "networking", label: "Networking Event" },
    { value: "conference", label: "Conference" },
    { value: "seminar", label: "Seminar" },
    { value: "hackathon", label: "Hackathon" },
    { value: "webinar", label: "Webinar" },
    { value: "other", label: "Other" },
  ];

  const currencyOptions = [
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
    { value: "CAD", label: "CAD (C$)" },
    { value: "AUD", label: "AUD (A$)" },
    { value: "INR", label: "INR (₹)" },
  ];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to format date and time into ISO datetime string
  const formatDateTime = (date: string, time: string): string => {
    if (!date || !time) return "";
    const [hours, minutes] = time.split(":");
    const dateObj = new Date(date);
    dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    return dateObj.toISOString();
  };

  const onSubmit = async (data: EventFormData) => {
    try {
      let imageUrl = "";

      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("asset_type", "event_banner");
        const response = await mediaService.uploadFile(formData);
        imageUrl = response.display_url;
      }

      // Format start and end datetime
      const start_datetime = formatDateTime(data.start_date, data.start_time);
      const end_datetime = formatDateTime(data.end_date, data.end_time);

      const eventData = {
        ...data,
        event_type: data.event_type as
          | "workshop"
          | "networking"
          | "conference"
          | "seminar"
          | "hackathon"
          | "webinar"
          | "other"
          | "career_fair",
        banner_image_url: imageUrl,
        is_virtual: data.is_online,
        virtual_meeting_url: data.online_url,
        max_participants: data.max_attendees,
        is_registration_required: true,
        registration_fee: data.is_free ? 0 : data.registration_fee || 0,
        start_datetime,
        end_datetime,
      };

      await eventService.createEvent(eventData);
      router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized access message
  if (!isAuthorized) {
    return (
      <AccessDenied
        title="Access Denied"
        message="Only administrators and employers can create events. You don't have permission to access this page."
        primaryAction={{
          label: "Go to Dashboard",
          onClick: () => router.push("/dashboard"),
        }}
        secondaryAction={{
          label: "View Events",
          onClick: () => router.push("/events"),
        }}
      />
    );
  }

  return (
    <>
      <Head>
        <title>Create Event - Palenso</title>
        <meta
          name="description"
          content="Create a new event on Palenso platform"
        />
      </Head>
      <div className="bg-background overflow-hidden">
        {/* Hero Section */}
        <section className="hero-handshake relative pt-8 pb-16 px-4 overflow-hidden">
          {/* Enhanced Background Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-40 left-0 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-orange-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute -bottom-8 right-20 w-96 h-96 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
          />

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative mr-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4">
                    Create Event
                  </h1>
                  <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                    Share your event with the Palenso community
                  </p>
                  {/* Role indicator */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                      <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        {user?.role === "admin" ? "Administrator" : "Employer"}{" "}
                        Access
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="feature-card-handshake p-8">
                <div className="flex items-center justify-between mb-8">
                  <Link
                    href="/events"
                    className="flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Events
                  </Link>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <h2 className="heading-handshake text-2xl mb-4">
                      Basic Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Event Title"
                        name="title"
                        type="text"
                        placeholder="Enter event title"
                        register={register}
                        error={errors.title}
                        required
                      />

                      <FormField
                        label="Event Type"
                        name="event_type"
                        type="select"
                        placeholder="Select event type"
                        options={eventTypeOptions}
                        setValue={setValue}
                        watch={watch}
                        error={errors.event_type}
                        required
                      />
                    </div>

                    <FormField
                      label="Description"
                      name="description"
                      type="textarea"
                      placeholder="Describe your event..."
                      register={register}
                      error={errors.description}
                      required
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="space-y-6">
                    <h2 className="heading-handshake text-2xl mb-4">
                      Date and Time
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Start Date"
                        name="start_date"
                        type="date"
                        setValue={setValue}
                        watch={watch}
                        error={errors.start_date}
                        required
                      />

                      <FormField
                        label="End Date"
                        name="end_date"
                        type="date"
                        setValue={setValue}
                        watch={watch}
                        error={errors.end_date}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Start Time"
                        name="start_time"
                        type="time"
                        setValue={setValue}
                        watch={watch}
                        error={errors.start_time}
                        required
                      />

                      <FormField
                        label="End Time"
                        name="end_time"
                        type="time"
                        setValue={setValue}
                        watch={watch}
                        error={errors.end_time}
                        required
                      />
                    </div>
                  </div>

                  {/* Location and Registration */}
                  <div className="space-y-6">
                    <h2 className="heading-handshake text-2xl mb-4">
                      Location and Registration
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Location"
                        name="location"
                        type="text"
                        placeholder="Enter event location"
                        register={register}
                        error={errors.location}
                        required
                      />

                      <FormField
                        label="Registration Deadline"
                        name="registration_deadline"
                        type="date"
                        setValue={setValue}
                        watch={watch}
                        error={errors.registration_deadline}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Maximum Attendees"
                        name="max_attendees"
                        type="number"
                        placeholder="100"
                        register={register}
                        error={errors.max_attendees}
                      />

                      <FormField
                        label="Tags"
                        name="tags"
                        type="text"
                        placeholder="tech, networking, career"
                        register={register}
                        error={errors.tags}
                      />
                    </div>
                  </div>

                  {/* Registration Fee */}
                  <div className="space-y-6">
                    <h2 className="heading-handshake text-2xl mb-4 flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-green-600" />
                      Registration Fee
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="is_free"
                          checked={watch("is_free")}
                          onCheckedChange={(checked) => {
                            setValue("is_free", checked as boolean);
                            if (checked) {
                              setValue("registration_fee", 0);
                            }
                          }}
                        />
                        <label
                          htmlFor="is_free"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          This is a free event
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Registration Fee"
                        name="registration_fee"
                        type="number"
                        placeholder="25.00"
                        register={register}
                        error={errors.registration_fee}
                        required={!watch("is_free")}
                        disabled={watch("is_free")}
                      />

                      <FormField
                        label="Currency"
                        name="currency"
                        type="select"
                        placeholder="Select currency"
                        options={currencyOptions}
                        setValue={setValue}
                        watch={watch}
                        error={errors.currency}
                        required={!watch("is_free")}
                        disabled={watch("is_free")}
                      />
                    </div>
                  </div>

                  {/* Event Image */}
                  <div className="space-y-6">
                    <h2 className="heading-handshake text-2xl mb-4">
                      Event Image
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="event-image"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                          <input
                            id="event-image"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>

                      {imagePreview && (
                        <div className="relative">
                          <Image
                            src={imagePreview}
                            alt="Event preview"
                            width={300}
                            height={200}
                            className="rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedImage(null);
                              setImagePreview(null);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4 pt-6">
                    <Link href="/events">
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      className="btn-handshake"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating...
                        </div>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Create Event
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

// Dynamic layout based on user role
CreateEvent.getLayout = Layouts.Protected;

export default CreateEvent;
