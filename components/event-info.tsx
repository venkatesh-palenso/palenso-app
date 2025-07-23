// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { Calendar, Clock, MapPin, Users } from "lucide-react";

// components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";

// interfaces
import type { Event } from "@/interfaces";

interface EventInfoProps {
  event: Event;
}

const EventInfo = ({ event }: EventInfoProps) => {
  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 * 0.1 }}
    >
      <Card className="h-full cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="default" className="mb-2">
              {event.event_type}
            </Badge>
            <Badge
              variant={event.is_active ? "default" : "secondary"}
              className={
                event.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }
            >
              {event.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>

          <h3 className="text-xl font-semibold mb-4">{event.title}</h3>

          <div className="flex items-center mb-3">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-600 text-sm">{event.start_date}</span>
          </div>

          <div className="flex items-center mb-3">
            <Clock size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-600 text-sm">{event.end_date}</span>
          </div>

          <div className="flex items-center mb-3">
            <MapPin size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-600 text-sm">{event.location}</span>
          </div>

          <div className="flex items-center mb-3">
            <Users size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-600 text-sm">
              {event.max_participants
                ? `${event.max_participants} max participants`
                : "Unlimited participants"}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-6">{event.description}</p>

          {event.tags && event.tags.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {event.tags
                  .split(",")
                  .slice(0, 3)
                  .map((tag: string, tagIndex: number) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag.trim()}
                    </Badge>
                  ))}
                {event.tags.split(",").length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{event.tags.split(",").length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 text-sm">
              Price:{" "}
              {event.registration_fee === 0
                ? "Free"
                : `$${event.registration_fee}`}
            </span>
          </div>

          <Button className="w-full text-white cursor-pointer">
            Register Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventInfo;
