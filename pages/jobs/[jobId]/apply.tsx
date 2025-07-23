// react
import React, { useState, useEffect } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/router";

// framer motion
import { motion, AnimatePresence } from "framer-motion";

// lucide icons
import {
  Briefcase,
  ArrowLeft,
  User,
  Building,
  GraduationCap,
  Globe,
  FileText,
  AlertCircle,
  ArrowRight,
  MapPin,
  DollarSign,
  Clock,
} from "lucide-react";

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
import { jobService } from "@/services";

// interfaces
import { Job } from "@/interfaces/job";

// layout
import { Layouts } from "@/layouts";

// context
import { useUser } from "@/context";

// react-hook-form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const applicationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  graduationYear: z.string().optional(),
  currentRole: z.string().optional(),
  company: z.string().optional(),
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters"),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
  agreeToMarketing: z.boolean().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const ApplyJobPage = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
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
      coverLetter: "",
      portfolioUrl: "",
      linkedinUrl: "",
      githubUrl: "",
      agreeToTerms: false,
      agreeToMarketing: false,
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (jobId && typeof jobId === "string") {
      fetchJobDetails(jobId);
    }
  }, [jobId]);

  useEffect(() => {
    if (user) {
      // Prefill form with user data
      setValue("firstName", user.first_name || "");
      setValue("lastName", user.last_name || "");
      setValue("email", user.email || "");
      setValue("phone", user.mobile_number || "");
    }
  }, [user, setValue]);

  const fetchJobDetails = async (id: string) => {
    try {
      setLoading(true);
      const jobData = await jobService.getJob(id);
      setJob(jobData);
    } catch (err) {
      setError("Failed to load job details. Please try again.");
      console.error("Error fetching job:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!job) return;

    setSubmitting(true);
    try {
      // Here you would typically call the application API
      const applicationData = {
        job_id: job.id,
        cover_letter: data.coverLetter,
        portfolio_url: data.portfolioUrl,
        linkedin_url: data.linkedinUrl,
        github_url: data.githubUrl,
      };

      console.log("Applying for job:", { jobId, data, applicationData });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to confirmation page
      router.push(`/jobs/${jobId}/application-confirmation`);
    } catch (err) {
      setError("Application failed. Please try again.");
      console.error("Application error:", err);
    } finally {
      setSubmitting(false);
    }
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
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Job Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error ||
              "The job you're looking for doesn't exist or has been removed."}
          </p>
          <Link href="/jobs">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Browse Jobs
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
                <Link href={`/jobs/${jobId}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Job
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Apply for Job
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Complete your application for {job.title}
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
              {/* Job Details */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-gray-900 dark:text-white">
                        <Briefcase className="mr-2 h-5 w-5 text-blue-500" />
                        Job Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Job Info */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                            {job.title}
                          </h3>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {job.job_type}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          {job.description}
                        </p>

                        {/* Job Details */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Building className="h-4 w-4 text-blue-500" />
                            <div className="text-sm">
                              <p className="font-medium text-gray-900 dark:text-white">
                                Company
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <MapPin className="h-4 w-4 text-red-500" />
                            <div className="text-sm">
                              <p className="font-medium text-gray-900 dark:text-white">
                                Location
                              </p>
                              <p className="text-gray-600 dark:text-gray-300">
                                {job.location}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            <div className="text-sm">
                              <p className="font-medium text-gray-900 dark:text-white">
                                Salary
                              </p>
                              <p className="text-gray-600 dark:text-gray-300">
                                {job.salary_min && job.salary_max
                                  ? `$${job.salary_min} - $${job.salary_max}`
                                  : "Not specified"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Clock className="h-4 w-4 text-purple-500" />
                            <div className="text-sm">
                              <p className="font-medium text-gray-900 dark:text-white">
                                Posted
                              </p>
                              <p className="text-gray-600 dark:text-gray-300">
                                {new Date(job.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Application Form */}
              <div className="lg:col-span-2">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <User className="mr-2 h-5 w-5 text-blue-500" />
                      Application Form
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Please fill in your details to complete the application
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
                            <GraduationCap className="mr-2 h-5 w-5 text-green-500" />
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
                            <Building className="mr-2 h-5 w-5 text-purple-500" />
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

                      {/* Cover Letter */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-orange-500" />
                          Cover Letter
                        </h3>

                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Cover Letter *
                          </label>
                          <Textarea
                            {...register("coverLetter")}
                            placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                            rows={6}
                            className="mt-1 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl"
                          />
                          {errors.coverLetter && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.coverLetter.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Portfolio & Links */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                          <Globe className="mr-2 h-5 w-5 text-teal-500" />
                          Portfolio & Links
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            type="url"
                            label="Portfolio URL"
                            name="portfolioUrl"
                            register={register}
                            error={errors.portfolioUrl}
                            placeholder="https://your-portfolio.com"
                          />
                          <FormField
                            type="url"
                            label="LinkedIn Profile"
                            name="linkedinUrl"
                            register={register}
                            error={errors.linkedinUrl}
                            placeholder="https://linkedin.com/in/your-profile"
                          />
                        </div>

                        <FormField
                          type="url"
                          label="GitHub Profile"
                          name="githubUrl"
                          register={register}
                          error={errors.githubUrl}
                          placeholder="https://github.com/your-username"
                        />
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
                              I would like to receive updates about future job
                              opportunities
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
                              Submitting Application...
                            </div>
                          ) : (
                            <>
                              Submit Application
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

ApplyJobPage.getLayout = Layouts.Student;

export default ApplyJobPage;
