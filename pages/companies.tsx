import Head from "next/head";
import { ReactElement, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Users, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RootLayout from "@/layouts/root";

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [industry, setIndustry] = useState("all");
  const [location, setLocation] = useState("");

  const companies = [
    {
      id: 1,
      name: "Google",
      logo: "G",
      industry: "Technology",
      location: "Mountain View, CA",
      employees: "150,000+",
      rating: 4.8,
      reviews: 1250,
      openJobs: 45,
      description:
        "Google is a multinational technology company that specializes in Internet-related services and products.",
      benefits: ["Health Insurance", "401k", "Remote Work", "Free Food"],
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "M",
      industry: "Technology",
      location: "Seattle, WA",
      employees: "200,000+",
      rating: 4.6,
      reviews: 980,
      openJobs: 32,
      description:
        "Microsoft Corporation is an American multinational technology company which produces computer software.",
      benefits: ["Health Insurance", "401k", "Stock Options", "Flexible Hours"],
    },
    {
      id: 3,
      name: "Amazon",
      logo: "A",
      industry: "E-commerce",
      location: "Seattle, WA",
      employees: "1,500,000+",
      rating: 4.4,
      reviews: 2100,
      openJobs: 78,
      description:
        "Amazon is an American multinational technology company focusing on e-commerce, cloud computing, and digital streaming.",
      benefits: ["Health Insurance", "401k", "Career Growth", "Innovation"],
    },
    {
      id: 4,
      name: "Apple",
      logo: "A",
      industry: "Technology",
      location: "Cupertino, CA",
      employees: "160,000+",
      rating: 4.7,
      reviews: 890,
      openJobs: 28,
      description:
        "Apple Inc. is an American multinational technology company that specializes in consumer electronics.",
      benefits: [
        "Health Insurance",
        "401k",
        "Product Discounts",
        "Creative Environment",
      ],
    },
    {
      id: 5,
      name: "Netflix",
      logo: "N",
      industry: "Entertainment",
      location: "Los Gatos, CA",
      employees: "12,000+",
      rating: 4.5,
      reviews: 650,
      openJobs: 15,
      description:
        "Netflix is an American subscription streaming service and production company.",
      benefits: ["Health Insurance", "401k", "Unlimited PTO", "Remote Work"],
    },
    {
      id: 6,
      name: "Meta",
      logo: "M",
      industry: "Technology",
      location: "Menlo Park, CA",
      employees: "87,000+",
      rating: 4.3,
      reviews: 1100,
      openJobs: 52,
      description:
        "Meta Platforms, Inc. is an American multinational technology conglomerate.",
      benefits: ["Health Insurance", "401k", "Social Impact", "Innovation"],
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      <Head>
        <title>Companies - Palenso</title>
        <meta
          name="description"
          content="Explore companies and their job opportunities on Palenso"
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">Explore Companies</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover top employers and their opportunities
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
                    placeholder="Search companies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:col-span-3">
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="e-commerce">E-commerce</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
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
          <p className="text-gray-600">Showing {companies.length} companies</p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start mb-6">
                    <Avatar className="w-16 h-16 mr-4 bg-blue-600 text-white text-xl">
                      <AvatarFallback>{company.logo}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">
                        {company.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        {company.industry}
                      </p>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex">
                          {renderStars(company.rating)}
                        </div>
                        <span className="text-gray-600 text-sm">
                          ({company.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <MapPin size={16} className="text-gray-500 mr-2" />
                    <span className="text-gray-600 text-sm">
                      {company.location}
                    </span>
                  </div>

                  <div className="flex items-center mb-3">
                    <Users size={16} className="text-gray-500 mr-2" />
                    <span className="text-gray-600 text-sm">
                      {company.employees} employees
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-6">
                    {company.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold mb-2">Benefits:</p>
                    <div className="flex flex-wrap gap-2">
                      {company.benefits
                        .slice(0, 3)
                        .map((benefit, benefitIndex) => (
                          <Badge
                            key={benefitIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {benefit}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-600 font-semibold text-sm">
                      {company.openJobs} open jobs
                    </span>
                  </div>

                  <Button className="w-full">View Jobs</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

Companies.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
