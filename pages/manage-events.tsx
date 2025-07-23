// react
import React, { useState } from "react";

// next
import Link from "next/link";

// framer motion
import { motion } from "framer-motion";

// lucide icons
import {
  Calendar,
  Plus,
  MapPin,
  Clock,
  Users,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Video,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// layout
import { Layouts } from "@/layouts";

const ManageEventsPage = () => {
  const [events] = useState([
    {
      id: "1",
      title: "Tech Career Fair 2024",
      type: "career_fair",
      location: "San Francisco, CA",
      isVirtual: false,
      status: "active",
      registrations: 45,
      maxParticipants: 100,
      registrationFee: 0,
      startDate: "2024-02-15",
      endDate: "2024-02-15",
    },
    {
      id: "2",
      title: "React Development Workshop",
      type: "workshop",
      location: "Virtual",
      isVirtual: true,
      status: "active",
      registrations: 23,
      maxParticipants: 50,
      registrationFee: 25,
      startDate: "2024-02-20",
      endDate: "2024-02-20",
    },
    {
      id: "3",
      title: "Networking Mixer",
      type: "networking",
      location: "New York, NY",
      isVirtual: false,
      status: "draft",
      registrations: 0,
      maxParticipants: 75,
      registrationFee: 15,
      startDate: "2024-03-01",
      endDate: "2024-03-01",
    },
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      draft: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      expired: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      paused:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      active: CheckCircle,
      draft: Clock,
      expired: XCircle,
      paused: Clock,
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      workshop: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      seminar:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      conference:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      hackathon:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      career_fair:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      networking:
        "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      webinar: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Manage Events
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Manage your events and registrations
                </p>
              </div>
              <Link href="/events/create">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Search and Filter */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search events..."
                        className="pl-10 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl"
                      />
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Events List */}
            <div className="space-y-6">
              {events.map((event, index) => {
                const StatusIcon = getStatusIcon(event.status);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                  {event.title}
                                </h3>
                                <div className="flex items-center gap-2 mb-3">
                                  <Badge
                                    className={getEventTypeColor(event.type)}
                                  >
                                    {event.type.replace("_", " ").toUpperCase()}
                                  </Badge>
                                  <Badge
                                    className={getStatusColor(event.status)}
                                  >
                                    <StatusIcon className="mr-1 h-3 w-3" />
                                    {event.status.charAt(0).toUpperCase() +
                                      event.status.slice(1)}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                                  <div className="flex items-center gap-1">
                                    {event.isVirtual ? (
                                      <Video className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <MapPin className="h-4 w-4 text-red-500" />
                                    )}
                                    {event.location}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {formatDate(event.startDate)}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    {event.registrations}/
                                    {event.maxParticipants}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    {event.registrationFee === 0
                                      ? "Free"
                                      : `$${event.registrationFee}`}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-200 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            >
                              <Users className="mr-2 h-4 w-4" />
                              Registrations
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-200 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Empty State */}
            {events.length === 0 && (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Events Created Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Start creating events to engage with your community
                  </p>
                  <Link href="/events/create">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Event
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

ManageEventsPage.getLayout = Layouts.Employer;

export default ManageEventsPage;
