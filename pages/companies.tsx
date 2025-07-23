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
import {
  Search,
  MapPin,
  Building,
  Filter,
  Eye,
  Users,
  Globe,
} from "lucide-react";

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
                    <Building className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4">
                    Explore Companies
                  </h1>
                  <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                    Discover top companies and their career opportunities
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
            </motion.div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
          <div className="container mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="heading-handshake text-lg">
                  <Building className="w-5 h-5 text-primary mr-2" />
                  Companies
                </h3>
                {companies && (
                  <p className="text-sm text-muted-foreground">
                    {companies.length} company
                    {companies.length !== 1 ? "ies" : ""} found
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
                      <div className="feature-card-handshake p-6 h-full flex flex-col hover:scale-105 transition-all duration-500">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <h4 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">
                              {company.name}
                            </h4>
                            {company.industry && (
                              <Badge className="badge-handshake flex-shrink-0">
                                {company.industry}
                              </Badge>
                            )}
                          </div>

                          {company.city && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">
                                {company.city}, {company.state}
                              </span>
                            </div>
                          )}

                          {company.company_size && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                              <Users className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">
                                {company.company_size} employees
                              </span>
                            </div>
                          )}

                          {company.description && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                              {company.description}
                            </p>
                          )}

                          {company.website && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                              <Globe className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm text-blue-600 dark:text-blue-400 truncate">
                                {company.website}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
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
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No companies found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search criteria or check back later for
                    new companies.
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

CompaniesList.getLayout = Layouts.Public;

export default CompaniesList;
