// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { MapPin, Users } from "lucide-react";

// components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// interfaces
import { ICompany } from "@/interfaces/company";

const CompanyInfo = ({ company }: { company: ICompany }) => {
  return (
    <motion.div
      key={company.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 * 0.1 }}
    >
      <Card className="h-full cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start mb-6">
            <Avatar className="w-16 h-16 mr-4 text-xl border">
              <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">{company.name}</h3>
              <p className="text-gray-600 text-sm mb-1">{company.industry}</p>
            </div>
          </div>

          <div className="flex items-center mb-3">
            <MapPin size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-600 text-sm">
              {company.address},{company.city},{company.state},{company.country}
            </span>
          </div>

          <div className="flex items-center mb-3">
            <Users size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-600 text-sm">
              {company.company_size} employees
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-6">{company.description}</p>

          <Button className="w-full text-white cursor-pointer">
            View Jobs
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default CompanyInfo;
