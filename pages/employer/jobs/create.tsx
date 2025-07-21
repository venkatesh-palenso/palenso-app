// react
import React, { useState } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/router";

// framer motion
import { motion } from "framer-motion";

// lucide icons
import {
  Briefcase,
  DollarSign,
  Users,
  Building,
  ArrowLeft,
  Save,
  Eye,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Layouts } from "@/layouts";

const CreateJobPage = () => {
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    category: "",
    experience: "",
    education: "",
    salaryMin: "",
    salaryMax: "",
    currency: "$",
    period: "yearly",
    remote: false,
    requirements: "",
    benefits: "",
    skills: "",
    deadline: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle job creation logic here
    console.log("Creating job:", formData);
    // Redirect to job management page
    router.push("/employer/jobs");
  };

  const jobTypes = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
  ];

  const categories = [
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "Product",
    "Data Science",
    "DevOps",
    "Customer Support",
    "Finance",
    "HR",
  ];

  const experienceLevels = [
    { value: "entry", label: "Entry Level" },
    { value: "junior", label: "Junior" },
    { value: "mid", label: "Mid Level" },
    { value: "senior", label: "Senior" },
    { value: "lead", label: "Lead" },
    { value: "executive", label: "Executive" },
  ];

  const educationLevels = [
    { value: "high-school", label: "High School" },
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
    { value: "any", label: "Any" },
  ];

  const salaryPeriods = [
    { value: "hourly", label: "Per Hour" },
    { value: "daily", label: "Per Day" },
    { value: "weekly", label: "Per Week" },
    { value: "monthly", label: "Per Month" },
    { value: "yearly", label: "Per Year" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
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
                <Link href="/employer/dashboard">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Create Job Posting
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Post a new job opportunity for students and graduates
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={isPreview ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsPreview(!isPreview)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {isPreview ? "Edit" : "Preview"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Briefcase className="mr-2 h-5 w-5" />
                        Basic Information
                      </CardTitle>
                      <CardDescription>
                        Essential details about the position
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="title">Job Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          placeholder="e.g., Frontend Developer"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Job Description *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="Describe the role, responsibilities, and what you're looking for..."
                          rows={6}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location">Location *</Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) =>
                              handleInputChange("location", e.target.value)
                            }
                            placeholder="e.g., San Francisco, CA"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="type">Job Type *</Label>
                          <Select
                            value={formData.type}
                            onValueChange={(value) =>
                              handleInputChange("type", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                            <SelectContent>
                              {jobTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) =>
                              handleInputChange("category", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="experience">Experience Level *</Label>
                          <Select
                            value={formData.experience}
                            onValueChange={(value) =>
                              handleInputChange("experience", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              {experienceLevels.map((level) => (
                                <SelectItem
                                  key={level.value}
                                  value={level.value}
                                >
                                  {level.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Salary Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="mr-2 h-5 w-5" />
                        Salary Information
                      </CardTitle>
                      <CardDescription>
                        Compensation details for the position
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Label htmlFor="currency">Currency</Label>
                          <Select
                            value={formData.currency}
                            onValueChange={(value) =>
                              handleInputChange("currency", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="$">$ (USD)</SelectItem>
                              <SelectItem value="€">€ (EUR)</SelectItem>
                              <SelectItem value="£">£ (GBP)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="salaryMin">Min Salary</Label>
                          <Input
                            id="salaryMin"
                            type="number"
                            value={formData.salaryMin}
                            onChange={(e) =>
                              handleInputChange("salaryMin", e.target.value)
                            }
                            placeholder="50000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="salaryMax">Max Salary</Label>
                          <Input
                            id="salaryMax"
                            type="number"
                            value={formData.salaryMax}
                            onChange={(e) =>
                              handleInputChange("salaryMax", e.target.value)
                            }
                            placeholder="80000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="period">Period</Label>
                          <Select
                            value={formData.period}
                            onValueChange={(value) =>
                              handleInputChange("period", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {salaryPeriods.map((period) => (
                                <SelectItem
                                  key={period.value}
                                  value={period.value}
                                >
                                  {period.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Requirements & Skills */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="mr-2 h-5 w-5" />
                        Requirements & Skills
                      </CardTitle>
                      <CardDescription>
                        What you&apos;re looking for in candidates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="requirements">Requirements</Label>
                        <Textarea
                          id="requirements"
                          value={formData.requirements}
                          onChange={(e) =>
                            handleInputChange("requirements", e.target.value)
                          }
                          placeholder="List the key requirements for this position..."
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label htmlFor="skills">Skills</Label>
                        <Textarea
                          id="skills"
                          value={formData.skills}
                          onChange={(e) =>
                            handleInputChange("skills", e.target.value)
                          }
                          placeholder="e.g., React, TypeScript, CSS, HTML (comma separated)"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="education">Education</Label>
                        <Select
                          value={formData.education}
                          onValueChange={(value) =>
                            handleInputChange("education", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select education level" />
                          </SelectTrigger>
                          <SelectContent>
                            {educationLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Benefits & Additional Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building className="mr-2 h-5 w-5" />
                        Benefits & Additional Information
                      </CardTitle>
                      <CardDescription>
                        What you offer to candidates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="benefits">Benefits</Label>
                        <Textarea
                          id="benefits"
                          value={formData.benefits}
                          onChange={(e) =>
                            handleInputChange("benefits", e.target.value)
                          }
                          placeholder="List the benefits you offer..."
                          rows={4}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remote"
                          checked={formData.remote}
                          onCheckedChange={(checked: boolean) =>
                            handleInputChange("remote", checked as boolean)
                          }
                        />
                        <Label htmlFor="remote">Remote work available</Label>
                      </div>

                      <div>
                        <Label htmlFor="deadline">Application Deadline</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={formData.deadline}
                          onChange={(e) =>
                            handleInputChange("deadline", e.target.value)
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Preview Card */}
                  {isPreview && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Job Preview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <h3 className="font-semibold text-lg">
                            {formData.title || "Job Title"}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {formData.location || "Location"}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {formData.type && (
                              <Badge variant="secondary">{formData.type}</Badge>
                            )}
                            {formData.category && (
                              <Badge variant="secondary">
                                {formData.category}
                              </Badge>
                            )}
                            {formData.remote && (
                              <Badge variant="secondary">Remote</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                            {formData.description ||
                              "Job description will appear here..."}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button type="submit" className="w-full">
                        <Save className="mr-2 h-4 w-4" />
                        Publish Job
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        Save as Draft
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Tips */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Tips for Better Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li>• Be specific about requirements</li>
                        <li>• Include salary range when possible</li>
                        <li>• Highlight unique benefits</li>
                        <li>• Use clear, engaging descriptions</li>
                        <li>• Set realistic deadlines</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

CreateJobPage.getLayout = Layouts.Employer;

export default CreateJobPage;
