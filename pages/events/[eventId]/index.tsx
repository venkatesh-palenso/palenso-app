import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  ExternalLink,
  Linkedin,
  Twitter,
  Facebook,
  CheckCircle,
  FileText,
  Tag,
  Sparkles,
  DollarSign,
} from "lucide-react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layouts } from "@/layouts";
import { eventService } from "@/services";
import Spinner from "@/components/spinner";

const EventDetail = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const {
    data: event,
    isLoading,
    error,
  } = useSWR(
    eventId ? `FETCH_EVENT_${eventId}` : null,
    () => eventService.getEvent(eventId as string),
    { revalidateOnFocus: false },
  );

  if (isLoading) return <Spinner />;
  if (error || !event) {
    return (
      <div className="bg-background overflow-hidden">
        <section className="hero-handshake relative pt-8 pb-16 px-4 overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="relative mr-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4 text-red-600">
                    Event Not Found
                  </h1>
                  <p className="heading-handshake-subtitle text-xl">
                    The event you&apos;re looking for doesn&apos;t exist or has
                    been removed.
                  </p>
                </div>
              </div>
              <Link
                href="/events"
                className="btn-handshake inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "career_fair":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "workshop":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "networking":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "conference":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "seminar":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
      case "hackathon":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "webinar":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <>
      <Head>
        <title>{event.title} - Palenso</title>
        <meta
          name="description"
          content={event.description.substring(0, 160)}
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
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4">
                    Event Details
                  </h1>
                  <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                    Discover amazing opportunities and connect with
                    professionals
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Event Content Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Event Header */}
                  <div className="feature-card-handshake p-8">
                    <div className="flex items-start justify-between mb-6">
                      <Link
                        href="/events"
                        className="flex items-center text-primary hover:text-primary/80 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Events
                      </Link>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Badge
                          className={`${getEventTypeColor(event.event_type)} mb-4`}
                        >
                          {event.event_type.replace("_", " ").toUpperCase()}
                        </Badge>
                        <h1 className="heading-handshake text-3xl mb-4">
                          {event.title}
                        </h1>
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Event Image */}
                      {event.banner_image_url && (
                        <div className="relative h-64 rounded-lg overflow-hidden">
                          <Image
                            src={event.banner_image_url}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Event Details */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {formatDate(event.start_date)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatTime(event.start_date)} -{" "}
                              {formatTime(event.end_date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {event.is_virtual
                                ? "Online Event"
                                : event.location}
                            </p>
                            {event.is_virtual && event.virtual_meeting_url && (
                              <a
                                href={event.virtual_meeting_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline flex items-center"
                              >
                                Join Meeting
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            )}
                          </div>
                        </div>

                        {event.max_participants && (
                          <div className="flex items-center space-x-3">
                            <Users className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                Max Participants
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {event.max_participants} people
                              </p>
                            </div>
                          </div>
                        )}

                        {event.registration_deadline && (
                          <div className="flex items-center space-x-3">
                            <Clock className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                Registration Deadline
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(event.registration_deadline)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {event.tags && (
                        <div className="flex items-center space-x-3">
                          <Tag className="w-5 h-5 text-primary" />
                          <div className="flex flex-wrap gap-2">
                            {event.tags.split(",").map((tag, index) => (
                              <Badge key={index} variant="secondary">
                                {tag.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Requirements */}
                      {event.requirements && (
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Requirements
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {event.requirements}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Registration Card */}
                  <div className="feature-card-handshake p-6">
                    <h3 className="heading-handshake text-xl mb-4">
                      Registration
                    </h3>

                    {event.registration_fee > 0 ? (
                      <div className="flex items-center space-x-2 mb-4">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ${event.registration_fee}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          Free Event
                        </span>
                      </div>
                    )}

                    <Link href={`/events/${eventId}/register`}>
                      <Button className="btn-handshake w-full">
                        Register Now
                      </Button>
                    </Link>

                    {event.is_registration_required && (
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Registration required to attend
                      </p>
                    )}
                  </div>

                  {/* Organizer Info */}
                  <div className="feature-card-handshake p-6">
                    <h3 className="heading-handshake text-xl mb-4">
                      Organizer
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Event Organizer
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Palenso Community
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Share Event */}
                  <div className="feature-card-handshake p-6">
                    <h3 className="heading-handshake text-xl mb-4">
                      Share Event
                    </h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

EventDetail.getLayout = Layouts.Public;
export default EventDetail;
