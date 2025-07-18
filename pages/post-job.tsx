// react
import React, { ReactElement, useState } from "react";

// framer motion
import { motion, AnimatePresence } from "framer-motion";

// lucide icons
import { 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  Plus, 
  X, 
  CheckCircle,
  Briefcase,
  FileText,
  Users,
  Star,
  GraduationCap,
  Heart,
  Code,
  Target
} from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { AuthGuard } from "@/components/auth-guard";

// layout
import RootLayout from "@/layouts/root";

interface JobPosting {
  title: string;
  company: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salary: {
    min: string;
    max: string;
    currency: string;
  };
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  skills: string[];
  department: string;
  remotePolicy: string;
  applicationDeadline: string;
  contactEmail: string;
  contactPhone: string;
}

const PostJobPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [jobData, setJobData] = useState<JobPosting>({
    title: "",
    company: "TechCorp Inc.",
    location: "",
    employmentType: "",
    experienceLevel: "",
    salary: {
      min: "",
      max: "",
      currency: "USD",
    },
    description: "",
    responsibilities: [],
    qualifications: [],
    benefits: [],
    skills: [],
    department: "",
    remotePolicy: "",
    applicationDeadline: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [newResponsibility, setNewResponsibility] = useState("");
  const [newQualification, setNewQualification] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 0, title: "Basic Information", icon: Briefcase },
    { id: 1, title: "Job Details", icon: FileText },
    { id: 2, title: "Requirements", icon: Target },
    { id: 3, title: "Benefits & Skills", icon: Star },
    { id: 4, title: "Contact Information", icon: Users },
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setJobData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSalaryChange = (field: string, value: string) => {
    setJobData((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        [field]: value,
      },
    }));
  };

  const addItem = (type: string, value: string) => {
    if (value.trim()) {
      setJobData((prev) => ({
        ...prev,
        [type]: [...(prev[type as keyof JobPosting] as string[]), value.trim()],
      }));
      // Clear the input
      switch (type) {
        case "responsibilities":
          setNewResponsibility("");
          break;
        case "qualifications":
          setNewQualification("");
          break;
        case "benefits":
          setNewBenefit("");
          break;
        case "skills":
          setNewSkill("");
          break;
      }
    }
  };

  const removeItem = (type: string, index: number) => {
    setJobData((prev) => ({
      ...prev,
      [type]: (prev[type as keyof JobPosting] as string[]).filter(
        (_, i) => i !== index
      ),
    }));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return (
          jobData.title &&
          jobData.location &&
          jobData.employmentType &&
          jobData.experienceLevel
        );
      case 1:
        return (
          jobData.description && jobData.department && jobData.remotePolicy
        );
      case 2:
        return (
          jobData.responsibilities.length > 0 &&
          jobData.qualifications.length > 0
        );
      case 3:
        return jobData.benefits.length > 0 && jobData.skills.length > 0;
      case 4:
        return (
          jobData.contactEmail &&
          jobData.contactPhone &&
          jobData.applicationDeadline
        );
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Job posting data:", jobData);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error posting job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((activeStep + 1) / steps.length) * 100;

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Basic Job Information
              </h3>
              <p className="text-muted-foreground">
                Let&apos;s start with the essential details about your job posting
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">
                  Job Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Software Engineer"
                  value={jobData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-base font-medium">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={jobData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-medium">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA"
                    value={jobData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="employmentType" className="text-base font-medium">
                    Employment Type *
                  </Label>
                  <select
                    id="employmentType"
                    value={jobData.employmentType}
                    onChange={(e) => handleInputChange("employmentType", e.target.value)}
                    className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select employment type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel" className="text-base font-medium">
                    Experience Level *
                  </Label>
                  <select
                    id="experienceLevel"
                    value={jobData.experienceLevel}
                    onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                    className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select experience level</option>
                    <option value="Entry-level">Entry-level</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="salaryMin" className="text-base font-medium">
                    Minimum Salary
                  </Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    placeholder="50000"
                    value={jobData.salary.min}
                    onChange={(e) => handleSalaryChange("min", e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryMax" className="text-base font-medium">
                    Maximum Salary
                  </Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    placeholder="80000"
                    value={jobData.salary.max}
                    onChange={(e) => handleSalaryChange("max", e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-base font-medium">
                    Currency
                  </Label>
                  <select
                    id="currency"
                    value={jobData.salary.currency}
                    onChange={(e) => handleSalaryChange("currency", e.target.value)}
                    className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Job Details
              </h3>
              <p className="text-muted-foreground">
                Provide detailed information about the role and responsibilities
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Job Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                  value={jobData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-32 text-base"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-base font-medium">
                    Department *
                  </Label>
                  <Input
                    id="department"
                    placeholder="e.g., Engineering, Marketing, Sales"
                    value={jobData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remotePolicy" className="text-base font-medium">
                    Remote Policy *
                  </Label>
                  <select
                    id="remotePolicy"
                    value={jobData.remotePolicy}
                    onChange={(e) => handleInputChange("remotePolicy", e.target.value)}
                    className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select remote policy</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Requirements
              </h3>
              <p className="text-muted-foreground">
                Define the responsibilities and qualifications for this role
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-base font-medium">Key Responsibilities *</Label>
                <div className="space-y-3">
                  {jobData.responsibilities.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-3 bg-accent rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="flex-1">{item}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem("responsibilities", index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a responsibility..."
                      value={newResponsibility}
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addItem("responsibilities", newResponsibility);
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => addItem("responsibilities", newResponsibility)}
                      disabled={!newResponsibility.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Qualifications *</Label>
                <div className="space-y-3">
                  {jobData.qualifications.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-3 bg-accent rounded-lg"
                    >
                      <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="flex-1">{item}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem("qualifications", index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a qualification..."
                      value={newQualification}
                      onChange={(e) => setNewQualification(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addItem("qualifications", newQualification);
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => addItem("qualifications", newQualification)}
                      disabled={!newQualification.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Benefits & Skills
              </h3>
              <p className="text-muted-foreground">
                Highlight the benefits you offer and the skills you&apos;re looking for
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-base font-medium">Benefits *</Label>
                <div className="space-y-3">
                  {jobData.benefits.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-3 bg-accent rounded-lg"
                    >
                      <Heart className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="flex-1">{item}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem("benefits", index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a benefit..."
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addItem("benefits", newBenefit);
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => addItem("benefits", newBenefit)}
                      disabled={!newBenefit.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Required Skills *</Label>
                <div className="space-y-3">
                  {jobData.skills.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-3 bg-accent rounded-lg"
                    >
                      <Code className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="flex-1">{item}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem("skills", index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addItem("skills", newSkill);
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => addItem("skills", newSkill)}
                      disabled={!newSkill.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Contact Information
              </h3>
              <p className="text-muted-foreground">
                Provide contact details for applicants to reach out
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-base font-medium">
                    Contact Email *
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="hr@company.com"
                    value={jobData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-base font-medium">
                    Contact Phone *
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={jobData.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationDeadline" className="text-base font-medium">
                  Application Deadline *
                </Label>
                <Input
                  id="applicationDeadline"
                  type="date"
                  value={jobData.applicationDeadline}
                  onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                  className="h-12 text-base"
                />
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-banner-vibrant mb-4">
            Job Posted Successfully!
          </h2>
          <p className="text-banner-glow mb-8">
            Your job posting has been published and is now visible to potential candidates.
          </p>
          <div className="space-y-4">
            <Button className="w-full" size="lg">
              View Job Posting
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              Post Another Job
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-banner-vibrant mb-4">
            Post a New Job
          </h1>
          <p className="text-lg text-banner-glow">
            Create an engaging job posting to attract top talent
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-banner-glow">
              Step {activeStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-banner-vibrant font-bold">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="relative">
            <Progress value={progress} className="h-3 progress-shiny" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200 to-cyan-200 opacity-30"></div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 ${
                index < steps.length - 1 ? "flex-1" : ""
              }`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all shadow-lg ${
                  index <= activeStep
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-500 text-white shadow-blue-500/50"
                    : "bg-white border-gray-300 text-gray-500 shadow-gray-200"
                }`}
              >
                {index < activeStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <step.icon className="w-6 h-6" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 transition-all rounded-full ${
                    index < activeStep 
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500" 
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {renderStepContent(activeStep)}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="lg">
              Save Draft
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid(activeStep) || isSubmitting}
                size="lg"
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Posting Job...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Post Job
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!isStepValid(activeStep)}
                size="lg"
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap with AuthGuard for employer role
const ProtectedPostJobPage = () => (
  <AuthGuard requiredRole="employer">
    <PostJobPage />
  </AuthGuard>
);

ProtectedPostJobPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default ProtectedPostJobPage;
