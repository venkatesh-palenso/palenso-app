// react
import { useState, useEffect } from "react";

// next
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// swr
import useSWR from "swr";

// react-hook-form
import { useForm } from "react-hook-form";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  Building,
  Bookmark,
  Share2,
  Check,
} from "lucide-react";

// components
import Spinner from "@/components/spinner";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// services
import { jobService } from "@/services";

// layout
import { Layouts } from "@/layouts";

// interfaces
import { JobSearchParams } from "@/interfaces";

// context
import { useUser } from "@/context";

const JobsList = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useUser();
  const { register, watch, setValue } = useForm<JobSearchParams>({
    defaultValues: {
      search: "",
      job_type: undefined,
      location: "",
      experience_level: undefined,
    },
  });

  const [debouncedFilters, setDebouncedFilters] = useState<JobSearchParams>({
    search: "",
    job_type: undefined,
    location: "",
    experience_level: undefined,
  });

  const watchedFilters = watch();

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(watchedFilters);
    }, 500);

    return () => clearTimeout(timer);
  }, [watchedFilters]);

  const { data: jobs, isLoading } = useSWR(
    ["FETCH_JOBS", debouncedFilters],
    () => jobService.searchJobs(debouncedFilters),
    { revalidateOnFocus: false },
  );

  const experienceLevelOptions = [
    { value: "entry", label: "Entry Level" },
    { value: "mid", label: "Mid Level" },
    { value: "senior", label: "Senior Level" },
    { value: "executive", label: "Executive Level" },
  ];

  const jobTypeOptions = [
    { value: "full_time", label: "Full-time" },
    { value: "part_time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
  ];

  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);

  const handleSaveJob = (jobId: string) => () => {
    if (!isLoggedIn) {
      router.push(
        `/login?returnUrl=${encodeURIComponent(window.location.href)}`,
      );
      return;
    }

    if (user?.role !== "student") {
      console.log("Only students can save jobs");
      return;
    }

    try {
      console.log("Saving job:", jobId);
      // TODO: Implement save job API call
    } catch (error) {
      console.log("error while saving job", error);
    }
  };

  const handleShareJob = (jobId: string) => async () => {
    try {
      const jobUrl = `${window.location.origin}/jobs/${jobId}`;

      if (navigator.share) {
        await navigator.share({
          title: "Check out this job opportunity",
          text: "I found an interesting job opportunity on Palenso",
          url: jobUrl,
        });
      } else {
        await navigator.clipboard.writeText(jobUrl);
        setCopiedJobId(jobId);
        setTimeout(() => setCopiedJobId(null), 2000);
      }
    } catch (error) {
      console.error("Error sharing job:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Jobs - Palenso</title>
        <meta
          name="description"
          content="Discover career opportunities and find your next job on Palenso"
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
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4">
                    Find Your Dream Job
                  </h1>
                  <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                    Discover thousands of opportunities from top companies
                    worldwide
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="feature-card-handshake p-6 mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-primary" />
                  <h2 className="heading-handshake text-xl">
                    Search & Filters
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <FormField
                    label="Search Jobs"
                    name="search"
                    type="text"
                    placeholder="Job title, company, or keywords"
                    register={register}
                    icon={<Search className="w-4 h-4" />}
                  />

                  <FormField
                    label="Job Type"
                    name="job_type"
                    type="select"
                    placeholder="Select job type"
                    options={jobTypeOptions}
                    setValue={setValue}
                    watch={watch}
                  />

                  <FormField
                    label="Location"
                    name="location"
                    type="text"
                    placeholder="City, state, or remote"
                    register={register}
                    icon={<MapPin className="w-4 h-4" />}
                  />

                  <FormField
                    label="Experience Level"
                    name="experience_level"
                    type="select"
                    placeholder="Select experience"
                    options={experienceLevelOptions}
                    setValue={setValue}
                    watch={watch}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
          <div className="container mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="heading-handshake text-lg">
                  <Briefcase className="w-5 h-5 text-primary mr-2" />
                  Job Opportunities
                </h3>
                {jobs && (
                  <p className="text-sm text-muted-foreground">
                    {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
                  </p>
                )}
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Spinner />
                </div>
              ) : jobs && jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="feature-card-handshake p-6 h-full flex flex-col hover:scale-105 transition-all duration-500">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <h4 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">
                              {job.title}
                            </h4>
                            <Badge className="badge-handshake flex-shrink-0">
                              {job.job_type.replace("_", " ")}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                            <Building className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm font-medium">Company</span>
                          </div>

                          {job.location && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">{job.location}</span>
                            </div>
                          )}

                          {(job.salary_min || job.salary_max) && (
                            <p className="text-green-600 dark:text-green-400 font-medium mb-3">
                              💰{" "}
                              {job.salary_min && job.salary_max
                                ? `${job.salary_min} - ${job.salary_max}`
                                : job.salary_min || job.salary_max}{" "}
                              {job.salary_currency}
                            </p>
                          )}

                          {job.description && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                              {job.description}
                            </p>
                          )}

                          {job.required_skills && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {job.required_skills
                                .split(",")
                                .slice(0, 2)
                                .map((skill, skillIndex) => (
                                  <Badge
                                    key={skillIndex}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {skill.trim()}
                                  </Badge>
                                ))}
                              {job.required_skills.split(",").length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{job.required_skills.split(",").length - 2}{" "}
                                  more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                          <Link href={`/jobs/${job.id}`}>
                            <Button className="btn-handshake btn-sm flex-1">
                              View Job
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            className="btn-secondary btn-sm"
                            onClick={handleShareJob(job.id)}
                            title={
                              copiedJobId === job.id
                                ? "Link copied!"
                                : "Share job"
                            }
                          >
                            {copiedJobId === job.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Share2 className="w-4 h-4" />
                            )}
                          </Button>
                          {isLoggedIn && user?.role === "student" && (
                            <Button
                              variant="outline"
                              className="btn-secondary btn-sm"
                              onClick={handleSaveJob(job.id)}
                              title="Save job"
                            >
                              <Bookmark className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search criteria or check back later for
                    new opportunities.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

JobsList.getLayout = Layouts.Public;

export default JobsList;
