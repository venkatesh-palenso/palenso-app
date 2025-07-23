// next
import Head from "next/head";
import Link from "next/link";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import {
  Shield,
  Lock,
  Eye,
  Users,
  Database,
  Settings,
  Sparkles,
} from "lucide-react";

// components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// layout
import { Layouts } from "@/layouts";

export default function Privacy() {
  const privacySections = [
    {
      title: "Information We Collect",
      icon: Database,
      content:
        "We collect information you provide directly to us, such as when you create an account, complete your profile, apply for jobs, or communicate with us. This may include your name, email address, phone number, educational background, work experience, and other professional information.",
    },
    {
      title: "How We Use Your Information",
      icon: Settings,
      content:
        "We use the information we collect to provide, maintain, and improve our services, to communicate with you, to process your job applications, to connect you with employers, and to personalize your experience on our platform.",
    },
    {
      title: "Information Sharing",
      icon: Users,
      content:
        "We may share your information with employers when you apply for jobs, with service providers who help us operate our platform, and in certain legal circumstances. We do not sell your personal information to third parties.",
    },
    {
      title: "Data Security",
      icon: Lock,
      content:
        "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
    },
    {
      title: "Your Rights",
      icon: Eye,
      content:
        "You have the right to access, update, or delete your personal information. You can also control your privacy settings and opt out of certain communications. Contact us if you need assistance with these rights.",
    },
    {
      title: "Cookies and Tracking",
      icon: Shield,
      content:
        "We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.",
    },
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy - Palenso</title>
        <meta
          name="description"
          content="Learn how Palenso protects your privacy and personal information"
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
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4">
                    Privacy Policy
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
                  Your Privacy Matters
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  At Palenso, we are committed to protecting your privacy and
                  ensuring the security of your personal information. This
                  Privacy Policy explains how we collect, use, and safeguard
                  your data when you use our platform.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By using Palenso, you agree to the collection and use of
                  information in accordance with this policy. We will not use or
                  share your information with anyone except as described in this
                  Privacy Policy.
                </p>
              </div>

              {/* Privacy Sections */}
              <div className="feature-card-handshake p-8">
                <h2 className="heading-handshake text-2xl mb-6 text-center">
                  Privacy Information
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {privacySections.map((section, index) => {
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
                  Contact Us
                </h2>
                <p className="text-muted-foreground text-center mb-6">
                  If you have any questions about this Privacy Policy, please
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

Privacy.getLayout = Layouts.Public;
