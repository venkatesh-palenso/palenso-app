import React from "react";
import { motion } from "framer-motion";
import { 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  Users, 
  Building,
  Send,
  ArrowRight,
  Globe,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layouts } from "@/layouts";

// Team data
const team = [
  {
    name: "Rahul Vasireddy",
    role: "CEO & Founder",
    bio: "M.S in Enterprise Risk Management from Columbia University. Passionate about democratizing opportunities.",
    avatar: "RV",
    linkedin: "#",
    email: "rahul@palenso.com",
    achievements: ["Columbia MS", "Risk Management", "Entrepreneur"],
  },
  {
    name: "Rohith Vasireddy",
    role: "CTO & Co-Founder",
    bio: "B.Tech in EEE from CBIT. Building scalable platforms that connect talent with opportunity.",
    avatar: "RV",
    linkedin: "#",
    email: "rohith@palenso.com",
    achievements: ["CBIT B.Tech", "Platform Expert", "Tech Leader"],
  }
];

// Contact information
const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch with our team",
    value: "socials@palenso.com",
    link: "mailto:socials@palenso.com",
    color: "from-blue-500 to-purple-500"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our office location",
    value: "Palenso, 5th street, Kakateeya Hills, Madhapur, Hyderabad",
    link: "#",
    color: "from-green-500 to-blue-500"
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "When we're available",
    value: "Monday - Friday: 9:00 AM - 6:00 PM IST",
    link: "#",
    color: "from-orange-500 to-red-500"
  }
];

// Services we offer
const services = [
  {
    title: "For Students",
    description: "Career guidance, job matching, and skill development",
    icon: Users,
    color: "from-blue-500 to-purple-500"
  },
  {
    title: "For Employers",
    description: "Talent sourcing, job posting, and candidate screening",
    icon: Building,
    color: "from-green-500 to-blue-500"
  },
  {
    title: "For Universities",
    description: "Career center tools, analytics, and partnerships",
    icon: Globe,
    color: "from-orange-500 to-red-500"
  }
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 px-4 py-2 text-sm bg-primary/10 text-primary">
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-handshake">
              Let's Build Something Amazing Together
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're a student looking for opportunities, an employer seeking talent, 
              or a university wanting to partner with us, we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      {info.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {info.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <a 
                      href={info.link}
                      className="text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                      {info.value}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 heading-handshake">
              How We Can Help You
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive services designed to connect talent with opportunity
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="group"
              >
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {service.description}
                    </p>
                                         <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                       Learn More
                       <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 heading-handshake">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind Palenso who are dedicated to transforming career opportunities
            </p>
          </motion.div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                    <CardContent className="p-8 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        {member.avatar}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium mb-4">
                        {member.role}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                        {member.bio}
                      </p>
                      
                      {/* Achievements */}
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {member.achievements.map((achievement, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                      </div>

                      {/* Contact Links */}
                      <div className="flex justify-center space-x-4">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            className="text-primary hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-primary/10"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-primary hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-primary/10"
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-2xl p-8 border border-primary/20">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of students and employers who are already using Palenso to connect 
                talent with opportunity. Let's build the future of career development together.
              </p>
                             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                   <Send className="mr-2 h-4 w-4" />
                   Contact Us
                 </Button>
                 <Button variant="outline" className="px-8 py-3">
                   Learn More
                   <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

Contact.getLayout = Layouts.Public; 