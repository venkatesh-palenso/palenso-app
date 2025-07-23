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
  Calendar,
  Filter,
  Plus,
  Users,
  Clock,
} from "lucide-react";

// components
import Spinner from "@/components/spinner";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// services
import { eventService } from "@/services";

// layout
import { Layouts } from "@/layouts";

interface SearchFilters {
  search: string;
  type:
    | "Career Fair"
    | "Workshop"
    | "Networking"
    | "Conference"
    | "Webinar"
    | "Hackathon"
    | "all";
  location: string;
}

const EventsList = () => {
  const { register, watch, setValue } = useForm<SearchFilters>({
    defaultValues: {
      search: "",
      type: "all",
      location: "",
    },
  });

  const [debouncedFilters, setDebouncedFilters] = useState<SearchFilters>({
    search: "",
    type: "all",
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

  const { data: events, isLoading } = useSWR(
    ["FETCH_EVENTS", debouncedFilters],
    () => {
      const params = {
        ...debouncedFilters,
        type:
          debouncedFilters.type === "all" ? undefined : debouncedFilters.type,
      };
      return eventService.searchEvents(params);
    },
    { revalidateOnFocus: false },
  );

  const eventTypeOptions = [
    { value: "all", label: "All Types" },
    { value: "career-fair", label: "Career Fair" },
    { value: "workshop", label: "Workshop" },
    { value: "networking", label: "Networking" },
    { value: "seminar", label: "Seminar" },
    { value: "conference", label: "Conference" },
  ];

  return (
    <>
      <Head>
        <title>Events - Palenso</title>
        <meta
          name="description"
          content="Discover career events, workshops, and networking opportunities on Palenso"
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
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4">
                    Discover Events
                  </h1>
                  <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                    Find career fairs, workshops, networking events, and more.
                    Connect with professionals and grow your career.
                  </p>
                  <div className="mt-6">
                    <Link href="/events/create">
                      <Button className="btn-handshake">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Event
                      </Button>
                    </Link>
                  </div>
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
                    label="Search Events"
                    name="search"
                    type="text"
                    placeholder="Event title or keywords"
                    register={register}
                    icon={<Search className="w-4 h-4" />}
                  />

                  <FormField
                    label="Event Type"
                    name="type"
                    type="select"
                    placeholder="Select event type"
                    options={eventTypeOptions}
                    setValue={setValue}
                    watch={watch}
                  />

                  <FormField
                    label="Location"
                    name="location"
                    type="text"
                    placeholder="City, state, or online"
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
                  <Calendar className="w-5 h-5 text-primary mr-2" />
                  Upcoming Events
                </h3>
                {events && (
                  <p className="text-sm text-muted-foreground">
                    {events.length} event{events.length !== 1 ? "s" : ""} found
                  </p>
                )}
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Spinner />
                </div>
              ) : events && events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="feature-card-handshake p-6 h-full flex flex-col hover:scale-105 transition-all duration-500">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <h4 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">
                              {event.title}
                            </h4>
                            <Badge className="badge-handshake flex-shrink-0">
                              {event.event_type}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">
                              {new Date(event.start_date).toLocaleDateString()}
                            </span>
                          </div>

                          {event.location && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          )}

                          {event.max_participants && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                              <Users className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">
                                {event.max_participants} spots
                              </span>
                            </div>
                          )}

                          {event.description && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                              {event.description}
                            </p>
                          )}

                          {event.registration_deadline && (
                            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm mb-4">
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span>
                                Registration closes{" "}
                                {new Date(
                                  event.registration_deadline,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                          <Link href={`/events/${event.id}`}>
                            <Button className="btn-handshake btn-sm flex-1">
                              View Event
                            </Button>
                          </Link>
                          <Link href={`/events/${event.id}/register`}>
                            <Button
                              variant="outline"
                              className="btn-secondary btn-sm"
                            >
                              Register
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No events found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Try adjusting your search criteria or check back later for
                    new events.
                  </p>
                  <Link href="/events/create">
                    <Button className="btn-handshake">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Event
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

EventsList.getLayout = Layouts.Public;

export default EventsList;
