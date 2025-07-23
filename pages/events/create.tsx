import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  ArrowLeft,
  Upload,
  Plus,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  CheckCircle,
  FileText,
  Save,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Layouts } from "@/layouts";
import { eventService, mediaService } from "@/services";

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
    { value: "career-fair", label: "Career Fair" },
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
        formData.append("asset_type", "event");
        const response = await mediaService.uploadFile(formData);
        imageUrl = response.display_url;
      }

              const eventData = {
          ...data,
          event_type: data.event_type as "workshop" | "networking" | "conference" | "seminar" | "hackathon" | "webinar" | "other" | "career_fair",
          tags: data.tags || "",
          is_virtual: data.is_online,
        virtual_meeting_url: data.online_url,
        max_participants: data.max_attendees,
        is_registration_required: true,
        registration_fee: 0,
      };

      await eventService.createEvent(eventData);
      // Redirect to events page or show success message
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Create Event - Palenso</title>
        <meta
          name="description"
          content="Create and host your own career events on Palenso"
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero Section */}
            <div className="hero-handshake p-8 rounded-2xl mb-8">
              <div className="text-center">
                <h1 className="heading-handshake-large text-4xl mb-4">
                  Create Your Event
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Host career fairs, workshops, networking events, and more. 
                  Connect with students and professionals in your industry.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div className="dashboard-card-handshake p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="heading-handshake text-xl">Basic Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Event Title"
                    name="title"
                    type="text"
                    placeholder="Enter event title"
                    register={register}
                    required
                    error={errors.title}
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
                    error={errors.event_type}
                  />
                </div>
                
                <div className="mt-6">
                  <FormField
                    label="Description"
                    name="description"
                    type="textarea"
                    placeholder="Describe your event, what attendees can expect, and any important details..."
                    register={register}
                    rows={4}
                    required
                    error={errors.description}
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="dashboard-card-handshake p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h2 className="heading-handshake text-xl">Date & Time</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Start Date"
                    name="start_date"
                    type="date"
                    setValue={setValue}
                    watch={watch}
                    required
                    error={errors.start_date}
                  />
                  
                  <FormField
                    label="End Date"
                    name="end_date"
                    type="date"
                    setValue={setValue}
                    watch={watch}
                    required
                    error={errors.end_date}
                  />
                  
                  <FormField
                    label="Start Time"
                    name="start_time"
                    type="text"
                    placeholder="e.g., 09:00 AM"
                    register={register}
                    required
                    error={errors.start_time}
                  />
                  
                  <FormField
                    label="End Time"
                    name="end_time"
                    type="text"
                    placeholder="e.g., 05:00 PM"
                    register={register}
                    required
                    error={errors.end_time}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="dashboard-card-handshake p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="heading-handshake text-xl">Location</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      id="is_online"
                      type="checkbox"
                      {...register("is_online")}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <Label htmlFor="is_online" className="text-sm font-medium text-gray-700">
                      This is an online event
                    </Label>
                  </div>
                  
                  {watch("is_online") ? (
                    <FormField
                      label="Online Meeting URL"
                      name="online_url"
                      type="url"
                      placeholder="https://zoom.us/j/..."
                      register={register}
                      error={errors.online_url}
                    />
                  ) : (
                    <FormField
                      label="Event Location"
                      name="location"
                      type="text"
                      placeholder="Enter venue address"
                      register={register}
                      icon={<MapPin className="w-4 h-4" />}
                      required
                      error={errors.location}
                    />
                  )}
                </div>
              </div>

              {/* Event Details */}
              <div className="dashboard-card-handshake p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5 text-primary" />
                  <h2 className="heading-handshake text-xl">Event Details</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Maximum Attendees"
                    name="max_attendees"
                    type="number"
                    placeholder="Leave empty for unlimited"
                    register={register}
                    min={1}
                    error={errors.max_attendees}
                  />
                  
                  <FormField
                    label="Registration Deadline"
                    name="registration_deadline"
                    type="date"
                    setValue={setValue}
                    watch={watch}
                    required
                    error={errors.registration_deadline}
                  />
                </div>
                
                <div className="mt-6">
                  <FormField
                    label="Tags (comma separated)"
                    name="tags"
                    type="text"
                    placeholder="e.g., technology, networking, career development"
                    register={register}
                    error={errors.tags}
                  />
                </div>
              </div>

              {/* Event Image */}
              <div className="dashboard-card-handshake p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Upload className="w-5 h-5 text-primary" />
                  <h2 className="heading-handshake text-xl">Event Image</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      id="event-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="event-image" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </label>
                  </div>
                  
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Event preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="btn-secondary"
                  onClick={() => window.history.back()}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-handshake"
                  disabled={isSubmitting}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Creating..." : "Create Event"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

CreateEvent.getLayout = Layouts.Public;

export default CreateEvent; 