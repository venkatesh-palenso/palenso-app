import Spinner from "@/components/spinner";
import AccessDenied from "@/components/ui/access-denied";
import { Badge } from "@/components/ui/badge";
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
import { useStudentAccess } from "@/hooks";
import { CreateJobApplicationForm } from "@/interfaces";
import { Layouts } from "@/layouts";
import { jobService } from "@/services";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";

const ApplyJobPage = () => {
  const router = useRouter();
  const { isReady, query } = router;
  const jobId = isReady ? (query.jobId as string) : undefined;

  const { isAuthorized, user } = useStudentAccess();

  const shouldFetch = isReady && isAuthorized && !!jobId;

  const {
    data: jobInfo,
    error,
    isLoading,
    isValidating,
  } = useSWR(
    shouldFetch ? ["job", jobId] : null,
    () => jobService.getJob(jobId!),
    {
      revalidateOnFocus: false,
    },
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateJobApplicationForm>();

  // Router not ready yet — avoid flashing undefined
  if (!isReady) return <Spinner />;

  // Not authorized
  if (!isAuthorized) {
    return (
      <AccessDenied
        title="Access Denied"
        message="Only students can apply for jobs. You don't have permission to access this page."
        primaryAction={{
          label: "Go to Dashboard",
          onClick: () => router.push("/dashboard"),
        }}
        secondaryAction={{
          label: "View Jobs",
          onClick: () => router.push("/jobs"),
        }}
      />
    );
  }

  if (isLoading || isValidating) return <Spinner />;

  if (error) {
    // Render a proper error state
    return (
      <AccessDenied
        title="Something went wrong"
        message="We couldn't load this job. Please try again."
        primaryAction={{
          label: "Back to Jobs",
          onClick: () => router.push("/jobs"),
        }}
      />
    );
  }

  if (!jobInfo) {
    // Optional: handle 404 / not found
    return (
      <AccessDenied
        title="Job not found"
        message="The job you’re looking for doesn't exist or was removed."
        primaryAction={{
          label: "Back to Jobs",
          onClick: () => router.push("/jobs"),
        }}
      />
    );
  }

  const onSubmit = async (data: CreateJobApplicationForm) => {
    try {
      data["available_from"] = data.available_from
        ? format(new Date(data.available_from), "yyyy-MM-dd")
        : "";
      data["job"] = jobId!;
      await jobService.applyForJob(data);
    } catch (err) {
      console.error("Application error:", err);
    }
  };

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
                    Complete your application for {jobInfo.title}
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
                            {jobInfo.title}
                          </h3>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {jobInfo.job_type}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          {jobInfo.description}
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
                                {jobInfo.location}
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
                                {jobInfo.salary_min && jobInfo.salary_max
                                  ? `$${jobInfo.salary_min} - $${jobInfo.salary_max}`
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
                                {new Date(
                                  jobInfo.created_at,
                                ).toLocaleDateString()}
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

                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                  First Name
                                </label>
                              </div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-700 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600">
                                {user?.first_name || "Not provided"}
                              </p>
                            </div>

                            {/* Last Name */}
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                  Last Name
                                </label>
                              </div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-700 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600">
                                {user?.last_name || "Not provided"}
                              </p>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                  Email Address
                                </label>
                              </div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-700 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 break-all">
                                {user?.email || "Not provided"}
                              </p>
                            </div>

                            {/* Contact Number */}
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                  Contact Number
                                </label>
                              </div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-700 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600">
                                {user?.mobile_number || "Not provided"}
                              </p>
                            </div>
                          </div>

                          {/* Info Note */}
                          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-xs text-blue-700 dark:text-blue-300">
                                This information is automatically filled from
                                your profile. You can update it in your{" "}
                                <Link
                                  href="/profile"
                                  className="underline hover:text-blue-800 dark:hover:text-blue-200"
                                >
                                  profile settings
                                </Link>
                                .
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

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
                            {...register("cover_letter")}
                            placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                            rows={6}
                            className="mt-1 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl"
                          />
                          {errors.cover_letter && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.cover_letter.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* expected salary */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                          <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                          Expected Salary
                        </h3>

                        <FormField
                          name="expected_salary"
                          label="Expected Salary"
                          type="number"
                          register={register}
                          error={errors.expected_salary}
                          placeholder="Enter your expected salary"
                        />
                      </div>

                      {/* available from */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-red-500" />
                          Available From
                        </h3>

                        <FormField
                          name="available_from"
                          label="Available From"
                          type="date"
                          watch={watch}
                          setValue={setValue}
                          error={errors.available_from}
                          placeholder="Enter your available from date"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-6">
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
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

ApplyJobPage.getLayout = Layouts.Protected;
export default ApplyJobPage;
