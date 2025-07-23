// react
import { useState, useEffect } from "react";

// next
import Head from "next/head";

// swr
import useSWR from "swr";

// react-hook-form
import { useForm } from "react-hook-form";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { Search, MapPin, Briefcase, Filter, Building } from "lucide-react";

// components
import Spinner from "@/components/spinner";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// services
import { jobService } from "@/services";

// layout
import { Layouts } from "@/layouts";


interface SearchFilters {
  search: string;
  type: string;
  location: string;
  experience: string;
}

const JobsList = () => {
  const { register, watch, setValue } = useForm<SearchFilters>({
    defaultValues: {
      search: "",
      type: "all",
      location: "",
      experience: "",
    },
  });

  const [debouncedFilters, setDebouncedFilters] = useState<SearchFilters>({
    search: "",
    type: "all",
    location: "",
    experience: "",
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
    { value: "all", label: "All Experience Levels" },
    { value: "entry-level", label: "Entry Level" },
    { value: "1-3", label: "1-3 Years" },
    { value: "3-5", label: "3-5 Years" },
    { value: "5+", label: "5+ Years" },
  ];

  const jobTypeOptions = [
    { value: "all", label: "All Job Types" },
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  return (
    <>
      <Head>
        <title>Jobs - Palenso</title>
        <meta
          name="description"
          content="Discover career opportunities and find your next job on Palenso"
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero Section */}
            <div className="hero-handshake p-8 rounded-2xl mb-8">
              <div className="text-center">
                <h1 className="heading-handshake-large text-4xl mb-4">
                  Find Your Dream Job
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover thousands of opportunities from top companies. 
                  Filter by location, experience, and job type to find the perfect match.
                </p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="dashboard-card-handshake p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="heading-handshake text-xl">Search & Filters</h2>
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
                  name="type"
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
                  name="experience"
                  type="select"
                  placeholder="Select experience"
                  options={experienceLevelOptions}
                  setValue={setValue}
                  watch={watch}
                />
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="heading-handshake text-lg">
                  <Briefcase className="w-5 h-5 text-primary mr-2" />
                  Job Opportunities
                </h3>
                {jobs && (
                  <p className="text-sm text-gray-600">
                    {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
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
                      <div className="dashboard-card-handshake p-6 h-full flex flex-col">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <h4 className="font-semibold text-lg text-gray-900 line-clamp-1">
                              {job.title}
                            </h4>
                            <Badge className="badge-handshake flex-shrink-0">
                              {job.job_type.replace('_', ' ')}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600 mb-3">
                            <Building className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm font-medium">Company</span>
                          </div>
                          
                          {job.location && (
                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">{job.location}</span>
                            </div>
                          )}
                          
                          {(job.salary_min || job.salary_max) && (
                            <p className="text-green-600 font-medium mb-3">
                              💰 {job.salary_min && job.salary_max ? `${job.salary_min} - ${job.salary_max}` : job.salary_min || job.salary_max} {job.salary_currency}
                            </p>
                          )}
                          
                          {job.description && (
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                              {job.description}
                            </p>
                          )}
                          
                          {job.required_skills && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {job.required_skills.split(',').slice(0, 2).map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="text-xs">
                                  {skill.trim()}
                                </Badge>
                              ))}
                              {job.required_skills.split(',').length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{job.required_skills.split(',').length - 2} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                          <Button className="btn-handshake btn-sm flex-1">
                            Apply Now
                          </Button>
                          <Button variant="outline" className="btn-secondary btn-sm">
                            Save
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria or check back later for new opportunities.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

JobsList.getLayout = Layouts.Public;

export default JobsList; 