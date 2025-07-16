import Head from "next/head";
import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactElement } from "react";
import RootLayout from "@/layouts/root";

export default function Privacy() {
  const privacySections = [
    {
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you create an account, complete your profile, apply for jobs, or communicate with us. This may include your name, email address, phone number, educational background, work experience, and other professional information.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use the information we collect to provide, maintain, and improve our services, to communicate with you, to process your job applications, to connect you with employers, and to personalize your experience on our platform.",
    },
    {
      title: "Information Sharing",
      content:
        "We may share your information with employers when you apply for jobs, with service providers who help us operate our platform, and in certain legal circumstances. We do not sell your personal information to third parties.",
    },
    {
      title: "Data Security",
      content:
        "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, update, or delete your personal information. You can also control your privacy settings and opt out of certain communications. Contact us if you need assistance with these rights.",
    },
    {
      title: "Cookies and Tracking",
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Shield size={64} className="text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-xl text-gray-600">Last updated: March 2024</p>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              Your Privacy Matters
            </h2>
            <p className="text-gray-600 mb-6">
              At Palenso, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, and safeguard your
              information when you use our platform.
            </p>
            <p className="text-gray-600">
              By using Palenso, you agree to the collection and use of
              information in accordance with this policy. If you have any
              questions about this Privacy Policy, please contact us.
            </p>
          </Card>
        </motion.div>

        {/* Privacy Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {privacySections.map((section, index) => (
              <Card key={index}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="px-6 text-left">
                    <div className="flex items-center gap-3">
                      <Lock size={24} className="text-blue-600" />
                      <span className="font-semibold">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6">
                    <p className="text-gray-600">{section.content}</p>
                  </AccordionContent>
                </AccordionItem>
              </Card>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-8 bg-gray-50 mt-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our privacy
              practices, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">Email: privacy@palenso.com</p>
              <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
              <p className="text-gray-600">
                Address: 123 Career Street, San Francisco, CA 94105
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  );
}

Privacy.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
