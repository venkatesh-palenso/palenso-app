import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Upload, Save, X, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Label } from "@/components/ui/label";
import { Layouts } from "@/layouts";
import { eventService, mediaService } from "@/services";
import { useUser } from "@/context";

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
}

const CreateEvent = () => {
  const { user } = useUser();
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
        image_url: imageUrl,
        is_virtual: data.is_online,
        virtual_meeting_url: data.online_url,
        max_participants: data.max_attendees,
        is_registration_required: true,
        registration_fee: 0,
        organizer: user?.id,
      };

      await eventService.createEvent(eventData);
      router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const router = useRouter();

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
                      label="Description"
                      name="description"
                      type="textarea"
                      placeholder="Describe your event"
                      register={register}
                      error={errors.description}
                      rows={4}
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
                      required
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="space-y-6">
                    <h2 className="heading-handshake text-2xl mb-4">
                      Date & Time
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        label="Start Date"
                        name="start_date"
                        type="date"
                        setValue={setValue}
                        watch={watch}
                        required
                      />

                      <FormField
                        label="End Date"
                        name="end_date"
                        type="date"
                        setValue={setValue}
                        watch={watch}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        label="Start Time"
                        name="start_time"
                        type="text"
                        placeholder="09:00 AM"
                        register={register}
                        error={errors.start_time}
                        required
                      />

                      <FormField
                        label="End Time"
                        name="end_time"
                        type="text"
                        placeholder="05:00 PM"
                        register={register}
                        error={errors.end_time}
                        required
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-6">
                    <h2 className="heading-handshake text-2xl mb-4">
                      Location
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          id="is_online"
                          {...register("is_online")}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="is_online">
                          This is an online event
                        </Label>
                      </div>

                      {watch("is_online") ? (
                        <FormField
                          label="Online URL"
                          name="online_url"
                          type="url"
                          placeholder="https://meet.google.com/..."
                          register={register}
                          error={errors.online_url}
                        />
                      ) : (
                        <FormField
                          label="Location"
                          name="location"
                          type="text"
                          placeholder="Enter event location"
                          register={register}
                          error={errors.location}
                          required
                        />
                      )}
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-6">
                    <h2 className="heading-handshake text-2xl mb-4">
                      Additional Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        label="Max Attendees"
                        name="max_attendees"
                        type="number"
                        placeholder="100"
                        register={register}
                        error={errors.max_attendees}
                      />

                      <FormField
                        label="Registration Deadline"
                        name="registration_deadline"
                        type="date"
                        setValue={setValue}
                        watch={watch}
                        required
                      />
                    </div>

                    <FormField
                      label="Tags"
                      name="tags"
                      type="text"
                      placeholder="career, networking, technology"
                      register={register}
                      error={errors.tags}
                    />
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

CreateEvent.getLayout = Layouts.Employer;
export default CreateEvent;
