// react
import React, { useState, useEffect } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/router";

// framer motion
import { motion } from "framer-motion";

// lucide icons
import {
  Briefcase,
  User,
  FileText,
  Upload,
  ArrowLeft,
  Send,
  Eye,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  Star,
  Calendar,
  ExternalLink,  
  AlertCircle,
  Sparkles
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { AuthGuard } from "@/components/auth-guard";




// Mock job data
const mockJob = {
  id: "1",
  title: "Senior Frontend Developer",
  description:
    "We are looking for a talented Senior Frontend Developer to join our growing team. You will be responsible for building scalable, user-friendly web applications using modern technologies and best practices.",
  company: {
    name: "TechCorp Solutions",
    logo: "/api/placeholder/100/100",
    location: "San Francisco, CA",
    industry: "Technology",
    size: "500-1000 employees",
    rating: 4.8,
  },
  location: "San Francisco, CA",
  type: "Full-time",
  category: "Engineering",
  salary: {
    min: 120000,
    max: 180000,
    currency: "$",
    period: "yearly",
  },
  requirements: [
    "5+ years of experience with React, TypeScript, and modern JavaScript",
    "Strong understanding of responsive design and cross-browser compatibility",
    "Experience with state management libraries (Redux, Zustand, etc.)",
    "Knowledge of build tools and bundlers (Webpack, Vite, etc.)",
    "Experience with testing frameworks (Jest, React Testing Library)",
    "Excellent communication and collaboration skills",
  ],
  skills: ["React", "TypeScript", "JavaScript", "CSS", "HTML", "Redux", "Jest", "Webpack"],
  experience: "Senior",
  education: "Bachelor's degree",
  remote: "Hybrid",
  postedDate: "2024-03-01",
  applicationDeadline: "2024-04-01",
  benefits: [
    "Competitive salary and equity",
    "Health, dental, and vision insurance",
    "401(k) with company match",
    "Flexible work arrangements",
    "Professional development budget",
    "Unlimited PTO",
  ],
};

const ApplyJobPage: React.FC = () => {

  const router = useRouter();
  const { jobId } = router.query;
  const [mounted, setMounted] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    coverLetter: "",
    resume: null as File | null,
    portfolio: "",
    linkedin: "",
    github: "",
    website: "",
    expectedSalary: "",
    startDate: "",
    additionalInfo: "",
    phone: "",
    email: "",
  });

  const [formProgress, setFormProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Calculate form progress
    const filledFields = Object.values(formData).filter(value => 
      value && (typeof value === 'string' ? value.trim() !== '' : true)
    ).length;
    setFormProgress((filledFields / Object.keys(formData).length) * 100);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Applying for job:", { jobId, formData });
      setShowSuccess(true);
    } catch (error) {
      console.error("Error applying for job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const formatSalary = (salary: typeof mockJob.salary) => {
    const min = salary.min.toLocaleString();
    const max = salary.max.toLocaleString();
    const period = salary.period === "yearly" ? "year" : salary.period;
    return `${salary.currency}${min} - ${salary.currency}${max}/${period}`;
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Application Submitted!
          </h2>
          <p className="text-muted-foreground mb-8">
            Your application for {mockJob.title} has been successfully submitted. We&apos;ll review your application and get back to you soon.
          </p>
          <div className="space-y-4">
            <Button className="w-full" size="lg" onClick={() => router.push('/student/applications')}>
              View My Applications
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={() => router.push('/jobs')}>
              Browse More Jobs
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <section className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Link href={`/jobs/${jobId}`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Job
                  </Button>
                </Link>
                <div>
                  <h1 className="text-4xl font-bold text-foreground">
                    Apply for Position
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Submit your application for {mockJob.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={isPreview ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsPreview(!isPreview)}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {isPreview ? "Edit" : "Preview"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Job Details */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Job Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mockJob.company.logo} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {mockJob.company.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {mockJob.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {mockJob.company.name}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-warning fill-current" />
                          <span className="text-sm text-muted-foreground">
                            {mockJob.company.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        {mockJob.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        {mockJob.type}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {formatSalary(mockJob.salary)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Posted {new Date(mockJob.postedDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-foreground mb-2">
                        Required Skills:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {mockJob.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-foreground mb-2">
                        Benefits:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {mockJob.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-success flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Application Progress</span>
                        <span className="text-primary font-medium">{Math.round(formProgress)}%</span>
                      </div>
                      <Progress value={formProgress} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Application Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Application Form
                    </CardTitle>
                    <CardDescription>
                      Please fill out the form below to apply for this position
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Personal Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-base font-medium">
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className="h-12 text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-base font-medium">
                              Phone Number *
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className="h-12 text-base"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Resume Upload */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <Upload className="w-5 h-5" />
                          Resume
                        </h3>
                        <div className="space-y-2">
                          <Label htmlFor="resume" className="text-base font-medium">
                            Upload Resume *
                          </Label>
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground mb-2">
                              {formData.resume ? formData.resume.name : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-xs text-muted-foreground mb-4">
                              PDF, DOC, DOCX (max 5MB)
                            </p>
                            <Input
                              id="resume"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById('resume')?.click()}
                            >
                              Choose File
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Cover Letter */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Cover Letter
                        </h3>
                        <div className="space-y-2">
                          <Label htmlFor="coverLetter" className="text-base font-medium">
                            Cover Letter *
                          </Label>
                          <Textarea
                            id="coverLetter"
                            placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                            value={formData.coverLetter}
                            onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                            className="min-h-32 text-base"
                          />
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <ExternalLink className="w-5 h-5" />
                          Additional Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="portfolio" className="text-base font-medium">
                              Portfolio URL
                            </Label>
                            <Input
                              id="portfolio"
                              type="url"
                              placeholder="https://your-portfolio.com"
                              value={formData.portfolio}
                              onChange={(e) => handleInputChange("portfolio", e.target.value)}
                              className="h-12 text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="linkedin" className="text-base font-medium">
                              LinkedIn Profile
                            </Label>
                            <Input
                              id="linkedin"
                              type="url"
                              placeholder="https://linkedin.com/in/yourprofile"
                              value={formData.linkedin}
                              onChange={(e) => handleInputChange("linkedin", e.target.value)}
                              className="h-12 text-base"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="github" className="text-base font-medium">
                              GitHub Profile
                            </Label>
                            <Input
                              id="github"
                              type="url"
                              placeholder="https://github.com/yourusername"
                              value={formData.github}
                              onChange={(e) => handleInputChange("github", e.target.value)}
                              className="h-12 text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="website" className="text-base font-medium">
                              Personal Website
                            </Label>
                            <Input
                              id="website"
                              type="url"
                              placeholder="https://your-website.com"
                              value={formData.website}
                              onChange={(e) => handleInputChange("website", e.target.value)}
                              className="h-12 text-base"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Job Preferences */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          Job Preferences
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expectedSalary" className="text-base font-medium">
                              Expected Salary
                            </Label>
                            <Input
                              id="expectedSalary"
                              type="number"
                              placeholder="150000"
                              value={formData.expectedSalary}
                              onChange={(e) => handleInputChange("expectedSalary", e.target.value)}
                              className="h-12 text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="startDate" className="text-base font-medium">
                              Available Start Date
                            </Label>
                            <Input
                              id="startDate"
                              type="date"
                              value={formData.startDate}
                              onChange={(e) => handleInputChange("startDate", e.target.value)}
                              className="h-12 text-base"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Additional Information
                        </h3>
                        <div className="space-y-2">
                          <Label htmlFor="additionalInfo" className="text-base font-medium">
                            Additional Information
                          </Label>
                          <Textarea
                            id="additionalInfo"
                            placeholder="Any additional information you'd like to share..."
                            value={formData.additionalInfo}
                            onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                            className="min-h-24 text-base"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex items-center justify-between pt-6 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <AlertCircle className="w-4 h-4" />
                          All fields marked with * are required
                        </div>
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting || formProgress < 50}
                          className="flex items-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Submit Application
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

// Wrap with AuthGuard for student role
const ProtectedApplyJobPage = () => (
  <AuthGuard requiredRole="student">
    <ApplyJobPage />
  </AuthGuard>
);

export default ProtectedApplyJobPage;
