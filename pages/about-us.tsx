import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Layouts } from "@/layouts"
import { MapPin, Mail, Users, Globe, Award, TrendingUp, Handshake, GraduationCap, Building } from "lucide-react"

const stats = [
  { label: "Students", value: "1M+", icon: Users },
  { label: "Employers", value: "1000+", icon: Globe },
  { label: "Jobs Shared", value: "10K+", icon: TrendingUp },
  { label: "Success Stories", value: "95%", icon: Award }
]

export default function AboutUs() {
  return (
    <div className="min-h-screen hero-handshake">
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-16">

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <Badge className="badge-handshake mb-3 px-4 py-2 text-sm">
            About Palenso
          </Badge>
          <div className="flex items-center justify-center mb-6">
            <Handshake className="w-16 h-16 text-primary mr-4 animate-bounce-glow" />
            <h1 className="heading-handshake-large">
              Palenso&apos;s mission is to democratize access to opportunity
            </h1>
          </div>
          <p className="heading-handshake-subtitle">
            Palenso is the career platform for Gen Z. With a community of 1M students, alumni, employers, and career educators, 
            Palenso&apos;s network is where career advice and discovery turn into first, second, and third jobs. 
            <span className="text-primary font-semibold"> 1000+ </span> 
            companies use Palenso to build their future workforce—from Fortune 500 to federal agencies, 
            school districts to startups, healthcare systems to small businesses. 
            Palenso is built for where you&apos;re going, not where you&apos;ve been.
          </p>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="feature-card-handshake text-center">
                <div className="py-6">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Audience Description */}
        <motion.section 
          className="space-y-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h2 className="heading-handshake text-3xl text-center mb-8">Who We Serve</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-card-handshake text-center">
                  <div className="p-6">
                    <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="heading-handshake text-xl mb-3">Students</h3>
                    <p className="text-muted-foreground">
                      The best place for jobs, career guidance, and community for 1M+ students.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="feature-card-handshake text-center">
                  <div className="p-6">
                    <Building className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="heading-handshake text-xl mb-3">Employers</h3>
                    <p className="text-muted-foreground mb-4">
                      Almost 1000 employers of all sizes find qualified talent fast on Palenso.
                    </p>
                    <Button className="btn-handshake text-sm">
                      Hire top talent →
                    </Button>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="feature-card-handshake text-center">
                  <div className="p-6">
                    <Handshake className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="heading-handshake text-xl mb-3">Career Centers</h3>
                    <p className="text-muted-foreground">
                      The #1 college-to-career network for 1,500+ colleges and institutions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          className="space-y-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-handshake text-3xl mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="feature-card-handshake">
              <div className="p-6">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground">hello@palenso.com</p>
              </div>
            </div>
            <div className="feature-card-handshake">
              <div className="p-6">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Visit Us</h3>
                <p className="text-muted-foreground">Palenso, 5th street,Kakateeya Hills,Madhapur,Hyderabad</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

AboutUs.getLayout = Layouts.Public
