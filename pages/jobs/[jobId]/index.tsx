// react
import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building,
  MapPin,
  Calendar,
  ArrowLeft,
  Mail,
  Globe,
  Briefcase,
  Share2,
  Bookmark,
  Send,
  Sparkles,
} from "lucide-react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layouts } from "@/layouts";
import { jobService, companyService } from "@/services";

const JobDetail = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { data: job, isLoading: jobLoading } = useSWR(
    jobId ? ["FETCH_JOB", jobId] : null,
    () => jobService.getJob(jobId as string),
    { revalidateOnFocus: false },
  );

  const { data: company } = useSWR(
    job?.company_id ? ["FETCH_JOB_COMPANY", job.company_id] : null,
    () => (job ? companyService.getCompany(job.company_id) : null),
    { revalidateOnFocus: false },
  );

  if (jobLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Job not found
          </h2>
          <p className="text-muted-foreground mb-4">
            The job you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/jobs">
            <Button className="btn-handshake">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    // TODO: Implement job application logic
    console.log("Applying for job:", job.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark logic
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job opportunity: ${job.title} at ${company?.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
    }
  };

  return (
    <>
      <Head>
        <title>{job.title} - Palenso</title>
        <meta name="description" content={job.description} />
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
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4">
                    Job Details
                  </h1>
                  <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                    Explore this exciting opportunity and take the next step in
                    your career
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Job Content Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Job Content */}
              <div className="lg:col-span-2">
                <div className="feature-card-handshake p-6">
                  {/* Job Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {job.title}
                      </h2>
                      <div className="flex items-center gap-4 text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          <span>{company?.name || "Company"}</span>
                        </div>
                        {job.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{job.job_type?.replace("_", " ")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBookmark}
                        className={isBookmarked ? "text-primary" : ""}
                      >
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-6">
                    {job.description && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Job Description
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                    )}

                    {(job.salary_min || job.salary_max) && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Salary
                        </h3>
                        <p className="text-green-600 dark:text-green-400 font-medium">
                          {job.salary_min && job.salary_max
                            ? `${job.salary_min} - ${job.salary_max} ${job.salary_currency}`
                            : `${job.salary_min || job.salary_max} ${job.salary_currency}`}
                        </p>
                      </div>
                    )}

                    {job.required_skills && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Required Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {job.required_skills
                            .split(",")
                            .map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill.trim()}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Apply Card */}
                <div className="feature-card-handshake p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Apply for this position
                  </h3>
                  <div className="space-y-3">
                    <Button
                      className="btn-handshake w-full"
                      onClick={handleApply}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button variant="outline" className="btn-secondary w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Recruiter
                    </Button>
                  </div>
                </div>

                {/* Company Info */}
                {company && (
                  <div className="feature-card-handshake p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      About the Company
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{company.name}</span>
                      </div>
                      {company.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                      {company.city && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {company.city}, {company.state}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

JobDetail.getLayout = Layouts.Public;

export default JobDetail;
