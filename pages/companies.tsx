// react
import { useState, useEffect } from "react";

// next
import Head from "next/head";
import Link from "next/link";

// swr
import useSWR from "swr";

// react-hook-form
import { useForm } from "react-hook-form";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { Search, MapPin, Building, Filter, Eye, Users, Globe } from "lucide-react";

// components
import Spinner from "@/components/spinner";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// services
import { companyService } from "@/services";

// layout
import { Layouts } from "@/layouts";

interface SearchFilters {
  search: string;
  industry: string;
  location: string;
}

const CompaniesList = () => {
  const { register, watch, setValue } = useForm<SearchFilters>({
    defaultValues: {
      search: "",
      industry: "all",
      location: "",
    },
  });

  const [debouncedFilters, setDebouncedFilters] = useState<SearchFilters>({
    search: "",
    industry: "all",
    location: "",
  });

  const watchedFilters = watch();

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(watchedFilters);
    }, 500);

    return () => clearTimeout(timer);
  }, [watchedFilters]);

  const { data: companies, isLoading } = useSWR(
    ["FETCH_COMPANIES", debouncedFilters],
    () => companyService.searchCompanies(debouncedFilters),
    { revalidateOnFocus: false },
  );

  const industryOptions = [
    { value: "all", label: "All Industries" },
    { value: "technology", label: "Technology" },
    { value: "e-commerce", label: "E-commerce" },
    { value: "entertainment", label: "Entertainment" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
  ];

  return (
    <>
      <Head>
        <title>Companies - Palenso</title>
        <meta
          name="description"
          content="Explore companies and their job opportunities on Palenso"
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
                  Explore Companies
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover top employers, their culture, and career opportunities. 
                  Find companies that align with your values and career goals.
                </p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="dashboard-card-handshake p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="heading-handshake text-xl">Search & Filters</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="Search Companies"
                  name="search"
                  type="text"
                  placeholder="Company name or keywords"
                  register={register}
                  icon={<Search className="w-4 h-4" />}
                />
                
                <FormField
                  label="Industry"
                  name="industry"
                  type="select"
                  placeholder="Select industry"
                  options={industryOptions}
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
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="heading-handshake text-lg">
                  <Building className="w-5 h-5 text-primary mr-2" />
                  Companies
                </h3>
                {companies && (
                  <p className="text-sm text-gray-600">
                    {companies.length} company{companies.length !== 1 ? 'ies' : ''} found
                  </p>
                )}
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Spinner />
                </div>
              ) : companies && companies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {companies.map((company, index) => (
                    <motion.div
                      key={company.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="dashboard-card-handshake p-6 h-full flex flex-col">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <h4 className="font-semibold text-lg text-gray-900 line-clamp-1">
                              {company.name}
                            </h4>
                            {company.industry && (
                              <Badge className="badge-handshake flex-shrink-0">
                                {company.industry}
                              </Badge>
                            )}
                          </div>
                          
                          {company.city && (
                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">{company.city}, {company.state}</span>
                            </div>
                          )}
                          
                          {company.company_size && (
                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                              <Users className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">{company.company_size} employees</span>
                            </div>
                          )}
                          
                          {company.description && (
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                              {company.description}
                            </p>
                          )}
                          
                          {company.website && (
                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                              <Globe className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm text-blue-600 truncate">{company.website}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-auto pt-4 border-t border-gray-100">
                          <Link href={`/companies/${company.id}`}>
                            <Button className="btn-handshake btn-sm w-full">
                              <Eye className="w-4 h-4 mr-2" />
                              View Company
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No companies found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria or check back later for new companies.
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

CompaniesList.getLayout = Layouts.Public;

export default CompaniesList;
