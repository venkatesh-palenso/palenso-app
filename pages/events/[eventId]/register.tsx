// react
import React, { useState, useEffect } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/router";

// framer motion
import { motion, AnimatePresence } from "framer-motion";

// lucide icons
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  User,
  Video,
  CreditCard,
  AlertCircle,
  ArrowRight,
  FileText,
  Briefcase,
  School,
} from "lucide-react";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// services
import { eventService } from "@/services";

// interfaces
import { Event, CreateEventRegistrationForm } from "@/interfaces/event";

// layout
import { Layouts } from "@/layouts";

// context
import { useUser } from "@/context";

// react-hook-form
import { useForm } from "react-hook-form";
import Image from "next/image";

const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name must be at least 1 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  graduationYear: z.string().optional(),
  currentRole: z.string().optional(),
  company: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  specialNeeds: z.string().optional(),
  interests: z.string().optional(),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
  agreeToMarketing: z.boolean().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const RegisterEventPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: user?.email || "",
      phone: user?.mobile_number || "",
      university: "",
      major: "",
      graduationYear: "",
      currentRole: "",
      company: "",
      dietaryRestrictions: "",
      specialNeeds: "",
      interests: "",
      agreeToTerms: false,
      agreeToMarketing: false,
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (eventId && typeof eventId === "string") {
      fetchEventDetails(eventId);
    }
  }, [eventId]);

  useEffect(() => {
    if (user) {
      // Prefill form with user data
      setValue("firstName", user.first_name || "");
      setValue("lastName", user.last_name || "");
      setValue("email", user.email || "");
      setValue("phone", user.mobile_number || "");
    }
  }, [user, setValue]);

  const fetchEventDetails = async (id: string) => {
    try {
      setLoading(true);
      const eventData = await eventService.getEvent(id);
      setEvent(eventData);
    } catch (err) {
      setError("Failed to load event details. Please try again.");
      console.error("Error fetching event:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    if (!event) return;

    setSubmitting(true);
    try {
      // Here you would typically call the registration API
      const registrationData: CreateEventRegistrationForm = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        mobile_number: data.phone as string,
        event_id: eventId as string,
        dietary_restrictions: data.dietaryRestrictions,
        special_requirements: data.specialNeeds,
        notes: data.interests,
      };

      await eventService.registerForEvent(registrationData);
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      workshop: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      seminar:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      conference:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      hackathon:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      career_fair:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      networking:
        "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      webinar: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  const isStudent = user?.role === "student";
  const isEmployer = user?.role === "employer";

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Event Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error ||
              "The event you're looking for doesn't exist or has been removed."}
          </p>
          <Link href="/events">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Browse Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Link href={`/events/${eventId}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Event
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Register for Event
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Complete your registration for {event.title}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Details */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-gray-900 dark:text-white">
                        <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                        Event Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Event Banner */}
                      {event.banner_image_url && (
                        <div className="relative h-32 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                          <Image
                            src={event.banner_image_url}
                            alt={event.title}
                            className="w-full h-full object-cover"
                            width={100}
                            height={100}
                          />
                          <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                      )}

                      {/* Event Info */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                            {event.title}
                          </h3>
                          <Badge
                            className={getEventTypeColor(event.event_type)}
                          >
                            {event.event_type.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          {event.description}
                        </p>

                        {/* Event Details */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <div className="text-sm">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {formatDate(event.start_date)}
                              </p>
                              <p className="text-gray-600 dark:text-gray-300">
                                {formatTime(event.start_date)} -{" "}
                                {formatTime(event.end_date)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {event.is_virtual ? (
                              <Video className="h-4 w-4 text-green-500" />
                            ) : (
                              <MapPin className="h-4 w-4 text-red-500" />
                            )}
                            <div className="text-sm">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {event.is_virtual
                                  ? "Virtual Event"
                                  : "In-Person"}
                              </p>
                              <p className="text-gray-600 dark:text-gray-300">
                                {event.location}
                              </p>
                            </div>
                          </div>

                          {event.max_participants && (
                            <div className="flex items-center space-x-3">
                              <Users className="h-4 w-4 text-purple-500" />
                              <div className="text-sm">
                                <p className="font-medium text-gray-900 dark:text-white">
                                  Capacity
                                </p>
                                <p className="text-gray-600 dark:text-gray-300">
                                  {event.max_participants} participants
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center space-x-3">
                            <CreditCard className="h-4 w-4 text-orange-500" />
                            <div className="text-sm">
                              <p className="font-medium text-gray-900 dark:text-white">
                                Registration Fee
                              </p>
                              <p className="text-gray-600 dark:text-gray-300">
                                {event.registration_fee === 0
                                  ? "Free"
                                  : `$${event.registration_fee}`}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        {event.tags && (
                          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                              Tags
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {event.tags.split(",").map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag.trim()}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Registration Form */}
              <div className="lg:col-span-2">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <User className="mr-2 h-5 w-5 text-blue-500" />
                      Registration Form
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Please fill in your details to complete the registration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Error Message */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                          >
                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <span className="text-sm text-red-600 dark:text-red-400">
                              {error}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                          <User className="mr-2 h-5 w-5 text-blue-500" />
                          Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            type="text"
                            label="First Name"
                            name="firstName"
                            register={register}
                            error={errors.firstName}
                            required
                            placeholder="Enter your first name"
                          />
                          <FormField
                            type="text"
                            label="Last Name"
                            name="lastName"
                            register={register}
                            error={errors.lastName}
                            required
                            placeholder="Enter your last name"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            type="email"
                            label="Email Address"
                            name="email"
                            register={register}
                            error={errors.email}
                            required
                            placeholder="john.doe@example.com"
                          />
                          <FormField
                            type="phone"
                            label="Phone Number"
                            name="phone"
                            setValue={setValue}
                            watch={watch}
                            error={errors.phone}
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>

                      {/* Academic Information (for Students) */}
                      {isStudent && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <School className="mr-2 h-5 w-5 text-green-500" />
                            Academic Information
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              type="text"
                              label="University/Institution"
                              name="university"
                              register={register}
                              error={errors.university}
                              placeholder="Your university or institution"
                            />
                            <FormField
                              type="text"
                              label="Major/Field of Study"
                              name="major"
                              register={register}
                              error={errors.major}
                              placeholder="Your major or field of study"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              type="text"
                              label="Graduation Year"
                              name="graduationYear"
                              register={register}
                              error={errors.graduationYear}
                              placeholder="2024"
                            />
                            <FormField
                              type="text"
                              label="Current Role"
                              name="currentRole"
                              register={register}
                              error={errors.currentRole}
                              placeholder="Student, Intern, etc."
                            />
                          </div>
                        </div>
                      )}

                      {/* Professional Information (for Employers) */}
                      {isEmployer && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <Briefcase className="mr-2 h-5 w-5 text-purple-500" />
                            Professional Information
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              type="text"
                              label="Current Role"
                              name="currentRole"
                              register={register}
                              error={errors.currentRole}
                              placeholder="Software Engineer, Manager, etc."
                            />
                            <FormField
                              type="text"
                              label="Company/Organization"
                              name="company"
                              register={register}
                              error={errors.company}
                              placeholder="Your current company or organization"
                            />
                          </div>
                        </div>
                      )}

                      {/* Additional Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-orange-500" />
                          Additional Information
                        </h3>

                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Dietary Restrictions
                          </label>
                          <Textarea
                            {...register("dietaryRestrictions")}
                            placeholder="Any dietary restrictions or preferences"
                            rows={2}
                            className="mt-1 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Special Needs/Requirements
                          </label>
                          <Textarea
                            {...register("specialNeeds")}
                            placeholder="Any special needs or accessibility requirements"
                            rows={2}
                            className="mt-1 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Interests/Goals
                          </label>
                          <Textarea
                            {...register("interests")}
                            placeholder="What are you hoping to learn or achieve from this event?"
                            rows={3}
                            className="mt-1 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="agreeToTerms"
                            checked={watch("agreeToTerms")}
                            onCheckedChange={(checked) =>
                              setValue("agreeToTerms", checked as boolean)
                            }
                            className="mt-1"
                          />
                          <div className="text-sm">
                            <label
                              htmlFor="agreeToTerms"
                              className="text-gray-700 dark:text-gray-300"
                            >
                              I agree to the{" "}
                              <Link
                                href="/terms-conditions"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                Terms and Conditions
                              </Link>{" "}
                              and{" "}
                              <Link
                                href="/privacy-policy"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                Privacy Policy
                              </Link>
                              *
                            </label>
                            {errors.agreeToTerms && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.agreeToTerms.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="agreeToMarketing"
                            checked={watch("agreeToMarketing")}
                            onCheckedChange={(checked) =>
                              setValue("agreeToMarketing", checked as boolean)
                            }
                            className="mt-1"
                          />
                          <div className="text-sm">
                            <label
                              htmlFor="agreeToMarketing"
                              className="text-gray-700 dark:text-gray-300"
                            >
                              I would like to receive updates about future
                              events and opportunities
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-6">
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Processing Registration...
                            </div>
                          ) : (
                            <>
                              Complete Registration
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

RegisterEventPage.getLayout = Layouts.Public;

export default RegisterEventPage;
