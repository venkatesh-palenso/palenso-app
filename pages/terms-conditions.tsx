// next
import Head from "next/head";
import Link from "next/link";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { FileText, Scale, AlertTriangle, CheckCircle, Shield, Users } from "lucide-react";

// components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// layouts
import { Layouts } from "@/layouts";

export default function Terms() {
  const termsSections = [
    {
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content:
        "By accessing and using Palenso, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      title: "Use License",
      icon: FileText,
      content:
        "Permission is granted to temporarily download one copy of the materials on Palenso's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
    },
    {
      title: "User Responsibilities",
      icon: Users,
      content:
        "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.",
    },
    {
      title: "Prohibited Uses",
      icon: AlertTriangle,
      content:
        "You may not use the service for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. You may not violate any international, federal, provincial or state regulations, rules, laws, or local ordinances.",
    },
    {
      title: "Intellectual Property Rights",
      icon: Shield,
      content:
        "The Service and its original content, features, and functionality are and will remain the exclusive property of Palenso and its licensors. The Service is protected by copyright, trademark, and other laws.",
    },
    {
      title: "Termination",
      icon: Scale,
      content:
        "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation.",
    },
  ];

  return (
    <>
      <Head>
        <title>Terms of Service - Palenso</title>
        <meta
          name="description"
          content="Read Palenso's terms of service and user agreement"
        />
      </Head>

      <div className="hero-handshake min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <FileText size={64} className="text-primary animate-bounce-glow" />
              </div>
              <h1 className="heading-handshake-large mb-4">Terms of Service</h1>
              <p className="heading-handshake-subtitle">Last updated: March 2024</p>
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="feature-card-handshake p-8 mb-8">
              <h2 className="heading-handshake text-2xl mb-6">Agreement to Terms</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                These Terms of Service (&quot;Terms&quot;) govern your use of the
                Palenso platform and services. By accessing or using our service,
                you agree to be bound by these Terms.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Please read these Terms carefully before using our platform. If
                you disagree with any part of these terms, then you may not access
                the service.
              </p>
            </div>
          </motion.div>

          {/* Terms Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {termsSections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="feature-card-handshake">
                    <AccordionItem value={`item-${index}`} className="border-none">
                      <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50 rounded-lg mx-2">
                        <div className="flex items-center gap-3">
                          <section.icon className="w-6 h-6 text-primary" />
                          <span className="font-semibold text-gray-900">{section.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{section.content}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <div className="feature-card-handshake p-8 text-center">
              <h2 className="heading-handshake text-2xl mb-4">
                Questions About Terms?
              </h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms of Service, 
                please don&apos;t hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="mailto:legal@palenso.com" className="btn-handshake inline-flex items-center justify-center">
                  Contact Legal Team
                  <FileText className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/help" className="btn-secondary inline-flex items-center justify-center">
                  Visit Help Center
                  <Scale className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

Terms.getLayout = Layouts.Public;
