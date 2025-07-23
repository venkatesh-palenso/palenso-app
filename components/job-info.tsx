// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { MapPin, Users, Building, DollarSign } from "lucide-react";

// components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";

// interfaces
import type { Job } from "@/interfaces";

interface JobInfoProps {
  job: Job;
}

const JobInfo = ({ job }: JobInfoProps) => {
  return (
    <motion.div
      key={job.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 * 0.1 }}
    >
      <Card className="h-full cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="default" className="mb-2">
              {job.job_type}
            </Badge>
            <Badge
              variant={job.is_active ? "default" : "secondary"}
              className={
                job.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }
            >
              {job.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>

          <h3 className="text-xl font-semibold mb-4">{job.title}</h3>

          <div className="flex items-center mb-3">
            <Building size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-600 text-sm">Company ID: {job.company_id}</span>
          </div>

          <div className="flex items-center mb-3">
            <MapPin size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-600 text-sm">{job.location}</span>
          </div>

          <div className="flex items-center mb-3">
            <DollarSign size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-600 text-sm">
              {job.salary_min && job.salary_max 
                ? `$${job.salary_min} - $${job.salary_max} ${job.salary_currency}`
                : 'Salary not specified'
              }
            </span>
          </div>

          <div className="flex items-center mb-3">
            <Users size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-600 text-sm">
              {job.max_applications ? `${job.max_applications} max applications` : 'Unlimited applications'}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-6">{job.description}</p>

          {job.required_skills && job.required_skills.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">
                Required Skills:
              </p>
              <div className="flex flex-wrap gap-2">
                {job.required_skills.split(',').slice(0, 3).map((skill: string, skillIndex: number) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="text-xs"
                  >
                    {skill.trim()}
                  </Badge>
                ))}
                {job.required_skills.split(',').length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{job.required_skills.split(',').length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 text-sm">
              {job.application_deadline 
                ? `Deadline: ${new Date(job.application_deadline).toLocaleDateString()}`
                : 'No deadline'
              }
            </span>
          </div>

          <Button className="w-full text-white cursor-pointer">
            Apply Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobInfo;
