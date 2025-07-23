import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  Send,
  Users,
  Globe,
  FileText,
  Target,
  Award,
  Code,
} from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { jobService } from "@/services";
import { format } from "date-fns";

// Validation Schema
const jobFormSchema = z.object({
  title: z
    .string()
    .min(5, "Job title must be at least 5 characters")
    .max(200, "Job title must be less than 200 characters"),
  description: z
    .string()
    .min(50, "Job description must be at least 50 characters")
    .max(5000, "Job description must be less than 5000 characters"),
  requirements: z
    .string()
    .min(10, "Requirements must be at least 10 characters")
    .max(2000, "Requirements must be less than 2000 characters"),
  responsibilities: z
    .string()
    .min(10, "Responsibilities must be at least 10 characters")
    .max(2000, "Responsibilities must be less than 2000 characters"),
  job_type: z.enum([
    "full_time",
    "part_time",
    "contract",
    "internship",
    "freelance",
  ]),
  experience_level: z.enum(["entry", "mid", "senior", "executive"]),
  location: z
    .string()
    .min(1, "Location is required")
    .max(200, "Location must be less than 200 characters"),
  is_remote: z.boolean(),
  salary_min: z.string().optional(),
  salary_max: z.string().optional(),
  salary_currency: z.string(),
  required_skills: z.string().optional(),
  preferred_skills: z.string().optional(),
  category: z.string().optional(),
  application_deadline: z.string().optional(),
  max_applications: z.string().optional(),
  is_active: z.boolean(),
  is_featured: z.boolean(),
});

type JobFormData = z.infer<typeof jobFormSchema>;

import { EmployerProfile, StudentProfile, Company } from "@/interfaces";

interface PostJobFormProps {
  profile?: (EmployerProfile | StudentProfile) & { company?: Company };
}

const PostJobForm: React.FC<PostJobFormProps> = ({ profile }) => {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    mode: "onChange",
    defaultValues: {
      requirements: "",
      responsibilities: "",
      required_skills: "",
      preferred_skills: "",
      category: "",
      salary_currency: "USD",
      is_remote: false,
      is_active: true,
      is_featured: false,
    },
  });

  const formData = watch();

  const steps = [
    {
      id: 0,
      title: "Job Description",
      icon: Briefcase,
      description: "Fill in the job details and requirements",
    },
    {
      id: 1,
      title: "Preview",
      icon: Eye,
      description: "Review your job posting before publishing",
    },
    {
      id: 2,
      title: "Publish",
      icon: Send,
      description: "Publish your job posting",
    },
  ];

  const jobTypes = [
    { value: "full_time", label: "Full Time" },
    { value: "part_time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
  ];

  const experienceLevels = [
    { value: "entry", label: "Entry Level" },
    { value: "mid", label: "Mid Level" },
    { value: "senior", label: "Senior Level" },
    { value: "executive", label: "Executive Level" },
  ];

  const currencies = [
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
    { value: "INR", label: "INR (₹)" },
  ];

  const categories = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "design", label: "Design" },
    { value: "operations", label: "Operations" },
    { value: "other", label: "Other" },
  ];

  // Helper function to format skills for display
  const formatSkills = (skills: string) => {
    return skills
      ? skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : [];
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: JobFormData) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      const jobData = {
        ...data,
        application_deadline: data.application_deadline
          ? format(data.application_deadline as string, "yyyy-MM-dd")
          : undefined,
        salary_min: data.salary_min ? parseFloat(data.salary_min) : undefined,
        salary_max: data.salary_max ? parseFloat(data.salary_max) : undefined,
        max_applications: data.max_applications
          ? parseInt(data.max_applications)
          : undefined,
      };
      await jobService.createJob(jobData);
      setShowSuccess(true);
      reset();
      setStep(0);
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderJobDescriptionStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* Basic Information Section */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Briefcase className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h3>
            <p className="text-sm text-gray-600">
              Essential details about the position
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Job Title"
            name="title"
            type="text"
            placeholder="e.g., Senior Frontend Developer"
            register={register}
            error={errors.title}
            required
          />

          <FormField
            label="Category"
            name="category"
            type="select"
            placeholder="Select job category"
            options={categories}
            setValue={setValue}
            watch={watch}
            error={errors.category}
          />

          <FormField
            label="Location"
            name="location"
            type="text"
            placeholder="e.g., San Francisco, CA"
            register={register}
            error={errors.location}
            required
          />

          <FormField
            label="Job Type"
            name="job_type"
            type="select"
            placeholder="Select job type"
            options={jobTypes}
            setValue={setValue}
            watch={watch}
            error={errors.job_type}
            required
          />

          <FormField
            label="Experience Level"
            name="experience_level"
            type="select"
            placeholder="Select experience level"
            options={experienceLevels}
            setValue={setValue}
            watch={watch}
            error={errors.experience_level}
            required
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_remote"
              {...register("is_remote")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="is_remote"
              className="text-sm font-medium text-gray-900"
            >
              Remote Position
            </label>
          </div>
        </div>
      </div>

      {/* Salary Information Section */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Salary Information
            </h3>
            <p className="text-sm text-gray-600">
              Compensation details for the position
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Minimum Salary"
            name="salary_min"
            type="text"
            placeholder="50000"
            register={register}
            error={errors.salary_min}
          />

          <FormField
            label="Maximum Salary"
            name="salary_max"
            type="text"
            placeholder="80000"
            register={register}
            error={errors.salary_max}
          />

          <FormField
            label="Currency"
            name="salary_currency"
            type="select"
            placeholder="Select currency"
            options={currencies}
            setValue={setValue}
            watch={watch}
            error={errors.salary_currency}
          />
        </div>
      </div>

      {/* Job Description Section */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-50 rounded-lg">
            <FileText className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Job Description
            </h3>
            <p className="text-sm text-gray-600">
              Detailed information about the role
            </p>
          </div>
        </div>

        <FormField
          label="Job Description"
          name="description"
          type="textarea"
          placeholder="Provide a detailed description of the role, responsibilities, and what makes this position exciting..."
          register={register}
          error={errors.description}
          required
          rows={6}
        />
      </div>

      {/* Requirements & Responsibilities Section */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-50 rounded-lg">
            <Target className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Requirements & Responsibilities
            </h3>
            <p className="text-sm text-gray-600">
              What we&apos;re looking for and what you&apos;ll do
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Requirements"
            name="requirements"
            type="textarea"
            placeholder="List the key requirements for this position..."
            register={register}
            error={errors.requirements}
            required
            rows={6}
          />
          <FormField
            label="Responsibilities"
            name="responsibilities"
            type="textarea"
            placeholder="Describe the main responsibilities of this role..."
            register={register}
            error={errors.responsibilities}
            required
            rows={6}
          />
        </div>
      </div>

      {/* Skills Section */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-teal-50 rounded-lg">
            <Code className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            <p className="text-sm text-gray-600">
              Technical and soft skills needed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Required Skills"
            name="required_skills"
            type="textarea"
            placeholder="e.g., React, TypeScript, Node.js (comma-separated)"
            register={register}
            error={errors.required_skills}
            rows={4}
          />
          <FormField
            label="Preferred Skills"
            name="preferred_skills"
            type="textarea"
            placeholder="e.g., AWS, Docker, GraphQL (comma-separated)"
            register={register}
            error={errors.preferred_skills}
            rows={4}
          />
        </div>
      </div>

      {/* Application Details Section */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-50 rounded-lg">
            <Calendar className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Application Details
            </h3>
            <p className="text-sm text-gray-600">
              Application deadline and limits
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Application Deadline"
            name="application_deadline"
            type="date"
            placeholder="Select deadline"
            setValue={setValue}
            watch={watch}
            error={errors.application_deadline}
          />
          <FormField
            label="Max Applications"
            name="max_applications"
            type="text"
            placeholder="e.g., 100"
            register={register}
            error={errors.max_applications}
          />
        </div>
      </div>

      {/* Job Status Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Award className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Job Status</h3>
            <p className="text-sm text-gray-600">
              Control job visibility and features
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_active"
              {...register("is_active")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="is_active"
              className="text-sm font-medium text-gray-900"
            >
              Active Job Posting
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_featured"
              {...register("is_featured")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="is_featured"
              className="text-sm font-medium text-gray-900"
            >
              Featured Job (Premium placement)
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPreviewStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-gray-900">
                {formData.title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                {profile?.company?.name || "Your Company"}
              </CardDescription>
            </div>
            <Badge
              variant="secondary"
              className="text-sm bg-blue-100 text-blue-800 border-blue-200"
            >
              {formData.job_type?.replace("_", " ")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Job Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{formData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {formData.salary_min && formData.salary_max
                  ? `${formData.salary_min} - ${formData.salary_max} ${formData.salary_currency}`
                  : "Salary not specified"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {formData.experience_level?.replace("_", " ")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {formData.is_remote ? "Remote" : "On-site"}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Job Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">
              {formData.description}
            </p>
          </div>

          {/* Requirements */}
          {formData.requirements && (
            <div>
              <h3 className="font-semibold mb-2">Requirements</h3>
              <div className="text-gray-700 whitespace-pre-wrap">
                {formData.requirements}
              </div>
            </div>
          )}

          {/* Responsibilities */}
          {formData.responsibilities && (
            <div>
              <h3 className="font-semibold mb-2">Responsibilities</h3>
              <div className="text-gray-700 whitespace-pre-wrap">
                {formData.responsibilities}
              </div>
            </div>
          )}

          {/* Required Skills */}
          {formData.required_skills && (
            <div>
              <h3 className="font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {formatSkills(formData.required_skills).map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Preferred Skills */}
          {formData.preferred_skills && (
            <div>
              <h3 className="font-semibold mb-2">Preferred Skills</h3>
              <div className="flex flex-wrap gap-2">
                {formatSkills(formData.preferred_skills).map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Application Details */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Application Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  Deadline: {formData.application_deadline || "Not specified"}
                </span>
              </div>
              {formData.max_applications && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    Max Applications: {formData.max_applications}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderPublishStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {showSuccess ? (
        <Card className="text-center py-12 border border-gray-200">
          <CardContent>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              Job Posted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your job posting has been published and is now live on our
              platform.
            </p>
            <Button onClick={() => setShowSuccess(false)}>
              Post Another Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-gray-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-xl flex items-center gap-2 text-gray-900">
              <Send className="h-6 w-6 text-blue-600" />
              Ready to Publish
            </CardTitle>
            <CardDescription className="text-gray-600">
              Review the information below and click publish to make your job
              posting live.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                What happens next?
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your job will be visible to all job seekers</li>
                <li>• You&apos;ll receive applications in your dashboard</li>
                <li>• You can manage applications and schedule interviews</li>
                <li>• You can edit or pause the job posting anytime</li>
              </ul>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>All required fields are completed</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Job posting preview looks good</span>
            </div>

            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || !isValid}
              className="w-full text-white cursor-pointer"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Publish Job Posting
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return renderJobDescriptionStep();
      case 1:
        return renderPreviewStep();
      case 2:
        return renderPublishStep();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Stepper Header */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-4">
            {steps.map((stepItem, index) => {
              const Icon = stepItem.icon;
              const isCompleted = step > stepItem.id;
              const isActive = step === stepItem.id;

              return (
                <div key={stepItem.id} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-all duration-300 ${
                        isCompleted ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {steps[step]?.title}
          </h2>
          <p className="text-gray-600 mt-1">{steps[step]?.description}</p>
        </div>

        {/* Progress Bar */}
        <Progress value={((step + 1) / steps.length) * 100} className="mb-6" />
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {step < 2 && !showSuccess && (
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={nextStep}
            disabled={step === 0 && !isValid}
            className="flex items-center gap-2 text-white cursor-pointer"
          >
            {step === 1 ? "Publish Job" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostJobForm;
