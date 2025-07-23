// next
import Head from "next/head";
import Link from "next/link";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import {
  FileText,
  Scale,
  AlertTriangle,
  CheckCircle,
  Shield,
  Users,
  Sparkles,
} from "lucide-react";

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
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4">
                    Terms of Service
                  </h1>
                  <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                    Last updated: March 2024
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              {/* Introduction */}
              <div className="feature-card-handshake p-8 mb-8">
                <h2 className="heading-handshake text-2xl mb-6">
                  Agreement to Terms
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  These Terms of Service (&quot;Terms&quot;) govern your use of
                  the Palenso platform and services. By accessing or using our
                  service, you agree to be bound by these Terms.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  If you disagree with any part of these terms, then you may not
                  access the service. These terms apply to all visitors, users,
                  and others who access or use the service.
                </p>
              </div>

              {/* Terms Sections */}
              <div className="feature-card-handshake p-8">
                <h2 className="heading-handshake text-2xl mb-6 text-center">
                  Terms & Conditions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {termsSections.map((section, index) => {
                    const IconComponent = section.icon;
                    return (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 last:mb-0"
                      >
                        <AccordionTrigger className="px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {section.title}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <p className="text-muted-foreground leading-relaxed">
                            {section.content}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>

              {/* Contact Section */}
              <div className="feature-card-handshake p-8 mt-8">
                <h2 className="heading-handshake text-2xl mb-6 text-center">
                  Questions About Terms?
                </h2>
                <p className="text-muted-foreground text-center mb-6">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="text-center">
                  <Link
                    href="/help"
                    className="btn-handshake inline-flex items-center"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

Terms.getLayout = Layouts.Public;
