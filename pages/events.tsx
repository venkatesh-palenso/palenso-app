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
import { Search, MapPin, Calendar, Filter, Plus, Users, Clock } from "lucide-react";

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
  type: "Career Fair" | "Workshop" | "Networking" | "Conference" | "Webinar" | "Hackathon" | "all";
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
        type: debouncedFilters.type === "all" ? undefined : debouncedFilters.type
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
                  Discover Events
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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

            {/* Search and Filters */}
            <div className="dashboard-card-handshake p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="heading-handshake text-xl">Search & Filters</h2>
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

            {/* Results Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="heading-handshake text-lg">
                  <Calendar className="w-5 h-5 text-primary mr-2" />
                  Upcoming Events
                </h3>
                {events && (
                  <p className="text-sm text-gray-600">
                    {events.length} event{events.length !== 1 ? 's' : ''} found
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
                      <div className="dashboard-card-handshake p-6 h-full flex flex-col">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <h4 className="font-semibold text-lg text-gray-900 line-clamp-1">
                              {event.title}
                            </h4>
                            <Badge className="badge-handshake flex-shrink-0">
                              {event.event_type}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600 mb-3">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">{new Date(event.start_date).toLocaleDateString()}</span>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          )}
                          
                          {event.max_participants && (
                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                              <Users className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">{event.max_participants} spots</span>
                            </div>
                          )}
                          
                          {event.description && (
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                              {event.description}
                            </p>
                          )}
                          
                          {event.registration_deadline && (
                            <div className="flex items-center gap-2 text-orange-600 text-sm mb-4">
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span>Registration closes {new Date(event.registration_deadline).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                          <Link href={`/events/${event.id}`}>
                            <Button className="btn-handshake btn-sm flex-1">
                              View Event
                            </Button>
                          </Link>
                          <Link href={`/events/${event.id}/register`}>
                            <Button variant="outline" className="btn-secondary btn-sm">
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No events found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or check back later for new events.
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
          </motion.div>
        </div>
      </div>
    </>
  );
};

EventsList.getLayout = Layouts.Public;

export default EventsList;
