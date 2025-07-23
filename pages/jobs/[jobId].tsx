// react
import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Building, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  ArrowLeft,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  Briefcase,
  CheckCircle,
  Share2,
  Bookmark,
  Send,
} from "lucide-react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Layouts } from "@/layouts";
import { jobService, companyService } from "@/services";

const JobDetail = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { data: job, isLoading: jobLoading } = useSWR(
    jobId ? ["FETCH_JOB", jobId] : null,
    () => jobService.getJob(jobId as string),
    { revalidateOnFocus: false }
  );

  const { data: company } = useSWR(
    job?.company_id ? ["FETCH_JOB_COMPANY", job.company_id] : null,
    () => job ? companyService.getCompany(job.company_id) : null,
    { revalidateOnFocus: false }
  );

  if (jobLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Job not found</h2>
          <p className="text-gray-600 mb-4">The job you&apos;re looking for doesn&apos;t exist.</p>
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
        <title>{job.title} at {company?.name} - Palenso</title>
        <meta
          name="description"
          content={`Apply for ${job.title} position at ${company?.name}. ${job.description?.substring(0, 160)}...`}
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <div className="mb-6">
              <Link href="/jobs">
                <Button variant="outline" className="btn-secondary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Jobs
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Job Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-2xl font-bold text-gray-900">
                            {job.title}
                          </h1>
                          <Badge className="badge-handshake">
                            {job.job_type.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                          <Building className="w-4 h-4" />
                          <Link 
                            href={`/companies/${company?.id}`}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {company?.name}
                          </Link>
                          {company?.is_verified && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          {job.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                          )}
                          {job.experience_level && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{job.experience_level}</span>
                            </div>
                          )}
                          {(job.salary_min || job.salary_max) && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span className="text-green-600 font-medium">
                                {job.salary_min && job.salary_max ? `${job.salary_min} - ${job.salary_max}` : job.salary_min || job.salary_max} {job.salary_currency}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleBookmark}
                          className={isBookmarked ? "text-blue-600 border-blue-600" : ""}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleShare}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Job Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none">
                      {job.description ? (
                        <div dangerouslySetInnerHTML={{ __html: job.description }} />
                      ) : (
                        <p className="text-gray-600">No description available.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements */}
                {job.requirements && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-gray max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: job.requirements }} />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Apply Button */}
                <Card>
                  <CardContent className="pt-6">
                    <Button 
                      className="w-full btn-handshake mb-4"
                      size="lg"
                      onClick={handleApply}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                    <p className="text-sm text-gray-600 text-center">
                      Applications close on {job.application_deadline ? new Date(job.application_deadline).toLocaleDateString() : 'Not specified'}
                    </p>
                  </CardContent>
                </Card>

                {/* Company Info */}
                {company && (
                  <Card>
                    <CardHeader>
                      <CardTitle>About {company.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {company.logo_url && (
                        <Image
                          src={company.logo_url}
                          alt={`${company.name} logo`}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                        />
                      )}
                      
                      {company.description && (
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {company.description}
                        </p>
                      )}
                      
                      <div className="space-y-2 text-sm">
                        {company.city && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{company.city}, {company.state}, {company.country}</span>
                          </div>
                        )}
                        {company.company_size && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{company.company_size} employees</span>
                          </div>
                        )}
                        {company.founded_year && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Founded {company.founded_year}</span>
                          </div>
                        )}
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        {company.website && (
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <Globe className="w-4 h-4" />
                            <span>Visit Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {company.email && (
                          <a
                            href={`mailto:${company.email}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-700 text-sm"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Contact Email</span>
                          </a>
                        )}
                        {company.phone && (
                          <a
                            href={`tel:${company.phone}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-700 text-sm"
                          >
                            <Phone className="w-4 h-4" />
                            <span>Contact Phone</span>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Job Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Job Type</span>
                      <span className="font-medium">{job.job_type.replace('_', ' ')}</span>
                    </div>
                    {job.experience_level && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Experience Level</span>
                        <span className="font-medium">{job.experience_level}</span>
                      </div>
                    )}
                    {job.location && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Location</span>
                        <span className="font-medium">{job.location}</span>
                      </div>
                    )}
                    {(job.salary_min || job.salary_max) && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Salary</span>
                        <span className="font-medium text-green-600">
                          {job.salary_min && job.salary_max ? `${job.salary_min} - ${job.salary_max}` : job.salary_min || job.salary_max} {job.salary_currency}
                        </span>
                      </div>
                    )}
                    {job.application_deadline && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Application Deadline</span>
                        <span className="font-medium">{new Date(job.application_deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Posted</span>
                      <span className="font-medium">{new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

JobDetail.getLayout = Layouts.Public;

export default JobDetail;
