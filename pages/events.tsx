import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Users, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layouts } from "@/layouts";

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("all");
  const [location, setLocation] = useState("");

  const events = [
    {
      id: 1,
      title: "Tech Career Fair 2024",
      type: "Career Fair",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "San Francisco Convention Center",
      attendees: "500+",
      companies: ["Google", "Microsoft", "Apple", "Meta"],
      description:
        "Join us for the largest tech career fair in the Bay Area. Meet with top tech companies and discover exciting opportunities.",
      registration: "Open",
      price: "Free",
    },
    {
      id: 2,
      title: "Resume Writing Workshop",
      type: "Workshop",
      date: "March 20, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual Event",
      attendees: "100",
      companies: [],
      description:
        "Learn how to create a compelling resume that stands out to employers. Get tips from career experts.",
      registration: "Open",
      price: "Free",
    },
    {
      id: 3,
      title: "Networking Mixer",
      type: "Networking",
      date: "March 25, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Downtown Seattle",
      attendees: "200",
      companies: ["Amazon", "Microsoft", "Boeing"],
      description:
        "Connect with professionals in your industry and expand your professional network.",
      registration: "Open",
      price: "$25",
    },
    {
      id: 4,
      title: "Interview Preparation Seminar",
      type: "Seminar",
      date: "April 5, 2024",
      time: "1:00 PM - 3:00 PM",
      location: "Virtual Event",
      attendees: "150",
      companies: [],
      description:
        "Master the art of interviewing with expert tips and mock interview sessions.",
      registration: "Open",
      price: "Free",
    },
    {
      id: 5,
      title: "Startup Pitch Competition",
      type: "Competition",
      date: "April 12, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Stanford University",
      attendees: "300",
      companies: ["Y Combinator", "Sequoia", "Andreessen Horowitz"],
      description:
        "Showcase your startup idea to top investors and win funding opportunities.",
      registration: "Open",
      price: "$50",
    },
    {
      id: 6,
      title: "Diversity in Tech Summit",
      type: "Conference",
      date: "April 20, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Los Angeles Convention Center",
      attendees: "800",
      companies: ["Google", "Microsoft", "Apple", "Netflix"],
      description:
        "Celebrate diversity in technology and connect with inclusive employers.",
      registration: "Open",
      price: "Free",
    },
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-2">Career Events</h1>
            <p className="text-xl text-gray-600 mb-8">
              Attend workshops, career fairs, and networking events
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Input
                      placeholder="Search events"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <Select value={eventType} onValueChange={setEventType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="career-fair">Career Fair</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="seminar">Seminar</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3">
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Input
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Button className="w-full h-14">
                    <Filter size={20} className="mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">Showing {events.length} events</p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="default" className="mb-2">
                        {event.type}
                      </Badge>
                      <Badge
                        variant={
                          event.registration === "Open"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          event.registration === "Open"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {event.registration}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">
                      {event.title}
                    </h3>

                    <div className="flex items-center mb-3">
                      <Calendar size={16} className="text-gray-500 mr-2" />
                      <span className="text-gray-600 text-sm">
                        {event.date}
                      </span>
                    </div>

                    <div className="flex items-center mb-3">
                      <Clock size={16} className="text-gray-500 mr-2" />
                      <span className="text-gray-600 text-sm">
                        {event.time}
                      </span>
                    </div>

                    <div className="flex items-center mb-3">
                      <MapPin size={16} className="text-gray-500 mr-2" />
                      <span className="text-gray-600 text-sm">
                        {event.location}
                      </span>
                    </div>

                    <div className="flex items-center mb-3">
                      <Users size={16} className="text-gray-500 mr-2" />
                      <span className="text-gray-600 text-sm">
                        {event.attendees} attendees
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-6">
                      {event.description}
                    </p>

                    {event.companies.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold mb-2">
                          Participating Companies:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {event.companies
                            .slice(0, 3)
                            .map((company, companyIndex) => (
                              <Badge
                                key={companyIndex}
                                variant="secondary"
                                className="text-xs"
                              >
                                {company}
                              </Badge>
                            ))}
                          {event.companies.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{event.companies.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600 text-sm">
                        Price: {event.price}
                      </span>
                    </div>

                    <Button className="w-full">Register Now</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Events.getLayout = Layouts.Public;
