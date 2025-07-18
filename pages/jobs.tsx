import React, { ReactElement, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Star,
  Send,
  CheckCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import RootLayout from "@/layouts/root";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  logo: string;
  rating: number;
  posted: string;
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  department: string;
  remotePolicy: string;
  applicationDeadline: string;
  contactEmail: string;
  contactPhone: string;
}

interface JobApplication {
  jobId: number;
  status: "applied" | "reviewing" | "interview" | "accepted" | "rejected";
  appliedDate: string;
  coverLetter: string;
}

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$150k - $200k",
      type: "Full-time",
      experience: "5+ years",
      logo: "G",
      rating: 4.8,
      posted: "2 days ago",
      skills: ["React", "Node.js", "Python", "AWS", "Docker"],
      description:
        "We are looking for a Senior Software Engineer to join our team and help build scalable web applications. You will work on cutting-edge technologies and collaborate with cross-functional teams.",
      requirements: [
        "5+ years of experience in software development",
        "Strong knowledge of React, Node.js, and Python",
        "Experience with cloud platforms (AWS, GCP)",
        "Excellent problem-solving skills",
        "Bachelor's degree in Computer Science or related field",
      ],
      benefits: [
        "Competitive salary and equity",
        "Health, dental, and vision insurance",
        "401(k) matching",
        "Flexible work hours",
        "Professional development opportunities",
      ],
      department: "Engineering",
      remotePolicy: "Hybrid",
      applicationDeadline: "2024-04-15",
      contactEmail: "hr@google.com",
      contactPhone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      salary: "$130k - $180k",
      type: "Full-time",
      experience: "3+ years",
      logo: "M",
      rating: 4.6,
      posted: "1 day ago",
      skills: ["Product Strategy", "Agile", "Analytics", "User Research"],
      description:
        "Join our product team to drive the development of innovative software solutions. You will be responsible for product strategy, roadmap planning, and cross-functional collaboration.",
      requirements: [
        "3+ years of product management experience",
        "Strong analytical and strategic thinking",
        "Experience with Agile methodologies",
        "Excellent communication skills",
        "MBA or relevant experience preferred",
      ],
      benefits: [
        "Competitive salary and benefits",
        "Health and wellness programs",
        "Professional development",
        "Work-life balance",
        "Employee stock purchase plan",
      ],
      department: "Product",
      remotePolicy: "Hybrid",
      applicationDeadline: "2024-04-10",
      contactEmail: "hr@microsoft.com",
      contactPhone: "+1 (555) 234-5678",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Amazon",
      location: "Seattle, WA",
      salary: "$120k - $170k",
      type: "Full-time",
      experience: "2+ years",
      logo: "A",
      rating: 4.7,
      posted: "3 days ago",
      skills: ["Python", "Machine Learning", "SQL", "Statistics"],
      description:
        "Work on cutting-edge machine learning projects and help drive data-driven decisions across the organization. You will develop models and algorithms to solve complex business problems.",
      requirements: [
        "2+ years of experience in data science",
        "Strong programming skills in Python",
        "Experience with machine learning frameworks",
        "Knowledge of statistics and mathematics",
        "Master's degree in Data Science or related field",
      ],
      benefits: [
        "Competitive salary and equity",
        "Comprehensive health benefits",
        "401(k) with company match",
        "Flexible work arrangements",
        "Learning and development programs",
      ],
      department: "Data Science",
      remotePolicy: "Remote",
      applicationDeadline: "2024-04-20",
      contactEmail: "hr@amazon.com",
      contactPhone: "+1 (555) 345-6789",
    },
  ];

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setShowJobDialog(true);
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplyDialog(true);
  };

  const handleSubmitApplication = () => {
    if (selectedJob && coverLetter.trim()) {
      const newApplication: JobApplication = {
        jobId: selectedJob.id,
        status: "applied",
        appliedDate: new Date().toISOString().split("T")[0],
        coverLetter: coverLetter,
      };
      setApplications((prev) => [...prev, newApplication]);
      setShowApplyDialog(false);
      setCoverLetter("");
      setShowSuccess(true);
    }
  };

  const getApplicationStatus = (jobId: number) => {
    const application = applications.find((app) => app.jobId === jobId);
    return application?.status || null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = !jobType || job.type === jobType;
    const matchesExperience = !experience || job.experience === experience;

    return matchesSearch && matchesLocation && matchesType && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold  mb-2">Find Your Dream Job</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover opportunities that match your skills and aspirations
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">All Experience Levels</option>
              <option value="Entry-level">Entry-level</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>
        </Card>

        {/* Job Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => {
            const applicationStatus = getApplicationStatus(job.id);

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="font-semibold text-primary">
                            {job.logo}
                          </span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {job.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {job.rating}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {job.salary}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {job.type} • {job.experience}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 3).map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{job.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {job.posted}
                        </span>
                        {applicationStatus && (
                          <Badge className={getStatusColor(applicationStatus)}>
                            {applicationStatus}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleJobClick(job)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {!applicationStatus && (
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleApply(job)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Apply Now
                        </Button>
                      )}
                      {applicationStatus && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1"
                          disabled
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Applied
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Job Details Dialog */}
        <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedJob && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {selectedJob.title}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedJob.company} • {selectedJob.location}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span className="font-medium">Salary:</span>
                        <span className="ml-2">{selectedJob.salary}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="font-medium">Type:</span>
                        <span className="ml-2">{selectedJob.type}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="font-medium">Location:</span>
                        <span className="ml-2">{selectedJob.location}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="font-medium">Experience:</span>
                        <span className="ml-2">{selectedJob.experience}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">Department:</span>
                        <span className="ml-2">{selectedJob.department}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">Remote Policy:</span>
                        <span className="ml-2">{selectedJob.remotePolicy}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Requirements</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Benefits</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowJobDialog(false)}
                    >
                      Close
                    </Button>
                    {!getApplicationStatus(selectedJob.id) && (
                      <Button
                        onClick={() => {
                          setShowJobDialog(false);
                          handleApply(selectedJob);
                        }}
                      >
                        Apply Now
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Apply Dialog */}
        <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
              <DialogDescription>
                Submit your application for this position
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Write a brief cover letter explaining why you're interested in this position..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowApplyDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitApplication}
                  disabled={!coverLetter.trim()}
                >
                  Submit Application
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Notification */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Application submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

JobsPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default JobsPage;
