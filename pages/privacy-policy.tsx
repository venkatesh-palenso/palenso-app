// next
import Head from "next/head";
import Link from "next/link";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { Shield, Lock, Eye, Users, Database, Settings } from "lucide-react";

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
                <Shield size={64} className="text-primary animate-bounce-glow" />
              </div>
              <h1 className="heading-handshake-large mb-4">Privacy Policy</h1>
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
              <h2 className="heading-handshake text-2xl mb-6">
                Your Privacy Matters
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Palenso, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy explains how we collect, use, and safeguard your
                information when you use our platform.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By using Palenso, you agree to the collection and use of
                information in accordance with this policy. If you have any
                questions about this Privacy Policy, please contact us.
              </p>
            </div>
          </motion.div>

          {/* Privacy Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {privacySections.map((section, index) => (
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
                Questions About Privacy?
              </h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about this Privacy Policy or our privacy practices, 
                please don&apos;t hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="mailto:privacy@palenso.com" className="btn-handshake inline-flex items-center justify-center">
                  Email Us
                  <Shield className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/help" className="btn-secondary inline-flex items-center justify-center">
                  Visit Help Center
                  <Lock className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

Privacy.getLayout = Layouts.Public;
