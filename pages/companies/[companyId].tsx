import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Building, 
  MapPin, 
  Globe, 
  Users, 
  Calendar, 
  Briefcase, 
  ArrowLeft,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  CheckCircle,
} from "lucide-react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layouts } from "@/layouts";
import { companyService, jobService, eventService } from "@/services";

const CompanyDetail = () => {
  const router = useRouter();
  const { companyId } = router.query;

  const { data: company, isLoading: companyLoading } = useSWR(
    companyId ? ["FETCH_COMPANY", companyId] : null,
    () => companyService.getCompany(companyId as string),
    { revalidateOnFocus: false }
  );

  const { data: jobs, isLoading: jobsLoading } = useSWR(
    companyId ? ["FETCH_COMPANY_JOBS", companyId] : null,
    () => jobService.searchJobs({ company_id: companyId as string }),
    { revalidateOnFocus: false }
  );

  const { data: events, isLoading: eventsLoading } = useSWR(
    companyId ? ["FETCH_COMPANY_EVENTS", companyId] : null,
    () => eventService.searchEvents({ company_id: companyId as string }),
    { revalidateOnFocus: false }
  );

  if (companyLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Company not found</h2>
          <p className="text-gray-600 mb-4">The company you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/companies">
            <Button className="btn-handshake">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Companies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{company.name} - Palenso</title>
        <meta
          name="description"
          content={`Learn more about ${company.name}, their culture, job opportunities, and events.`}
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <div className="mb-6">
              <Link href="/companies">
                <Button variant="outline" className="btn-secondary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Companies
                </Button>
              </Link>
            </div>

            {/* Company Header */}
            <div className="dashboard-card-handshake p-8 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="heading-handshake-large text-3xl">
                      {company.name}
                    </h1>
                    {company.is_verified && (
                      <Badge className="badge-handshake">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-6 text-gray-600 mb-4">
                    {company.city && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{company.city}, {company.state}, {company.country}</span>
                      </div>
                    )}
                    {company.company_size && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{company.company_size} employees</span>
                      </div>
                    )}
                    {company.founded_year && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Founded {company.founded_year}</span>
                      </div>
                    )}
                  </div>
                  
                  {company.description && (
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {company.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4">
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {company.email && (
                      <a
                        href={`mailto:${company.email}`}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </a>
                    )}
                    {company.phone && (
                      <a
                        href={`tel:${company.phone}`}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Phone</span>
                      </a>
                    )}
                  </div>
                </div>
                
                {company.logo_url && (
                  <div className="ml-8">
                    <Image
                      src={company.logo_url}
                      alt={`${company.name} logo`}
                      width={96}
                      height={96}
                      className="w-24 h-24 object-contain rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            {(company.linkedin || company.twitter || company.facebook) && (
              <div className="dashboard-card-handshake p-6 mb-8">
                <h3 className="heading-handshake text-lg mb-4">Follow Us</h3>
                <div className="flex items-center gap-4">
                  {company.linkedin && (
                    <a
                      href={company.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {company.twitter && (
                    <a
                      href={company.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-500"
                    >
                      <Twitter className="w-5 h-5" />
                      <span>Twitter</span>
                    </a>
                  )}
                  {company.facebook && (
                    <a
                      href={company.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <Facebook className="w-5 h-5" />
                      <span>Facebook</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Tabs for Jobs and Events */}
            <div className="dashboard-card-handshake p-6">
              <Tabs defaultValue="jobs" className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="jobs" className="flex-1">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Jobs ({jobs?.length || 0})
                  </TabsTrigger>
                  <TabsTrigger value="events" className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Events ({events?.length || 0})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="jobs" className="space-y-4">
                  {jobsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading jobs...</p>
                    </div>
                  ) : jobs && jobs.length > 0 ? (
                    <div className="space-y-4">
                      {jobs.map((job, index) => (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-lg text-gray-900">
                                    {job.title}
                                  </h4>
                                  <Badge className="badge-handshake">
                                    {job.job_type.replace('_', ' ')}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center gap-4 text-gray-600 mb-2">
                                  {job.location && (
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      <span>{job.location}</span>
                                    </div>
                                  )}
                                  {(job.salary_min || job.salary_max) && (
                                    <span className="text-green-600 font-medium">
                                      💰 {job.salary_min && job.salary_max ? `${job.salary_min} - ${job.salary_max}` : job.salary_min || job.salary_max} {job.salary_currency}
                                    </span>
                                  )}
                                </div>
                                
                                {job.description && (
                                  <p className="text-gray-600 text-sm line-clamp-2">
                                    {job.description}
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex gap-2 ml-4">
                                <Link href={`/jobs/${job.id}`}>
                                  <Button className="btn-handshake btn-sm">
                                    View Job
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No jobs available
                      </h3>
                      <p className="text-gray-600">
                        This company doesn&apos;t have any active job postings at the moment.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="events" className="space-y-4">
                  {eventsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading events...</p>
                    </div>
                  ) : events && events.length > 0 ? (
                    <div className="space-y-4">
                      {events.map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-lg text-gray-900">
                                    {event.title}
                                  </h4>
                                  <Badge className="badge-handshake">
                                    {event.event_type}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center gap-4 text-gray-600 mb-2">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(event.start_date).toLocaleDateString()}</span>
                                  </div>
                                  {event.location && (
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      <span>{event.location}</span>
                                    </div>
                                  )}
                                </div>
                                
                                {event.description && (
                                  <p className="text-gray-600 text-sm line-clamp-2">
                                    {event.description}
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex gap-2 ml-4">
                                <Link href={`/events/${event.id}`}>
                                  <Button className="btn-handshake btn-sm">
                                    View Event
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No events available
                      </h3>
                      <p className="text-gray-600">
                        This company doesn&apos;t have any upcoming events at the moment.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

CompanyDetail.getLayout = Layouts.Public;

export default CompanyDetail; 