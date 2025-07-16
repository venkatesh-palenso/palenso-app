import Head from "next/head";
import { motion } from "framer-motion";
import { FileText, Scale, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RootLayout from "@/layouts/root";
import { ReactElement } from "react";

export default function Terms() {
  const termsSections = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing and using Palenso, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      title: "Use License",
      content:
        "Permission is granted to temporarily download one copy of the materials on Palenso's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
    },
    {
      title: "User Responsibilities",
      content:
        "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.",
    },
    {
      title: "Prohibited Uses",
      content:
        "You may not use the service for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. You may not violate any international, federal, provincial or state regulations, rules, laws, or local ordinances.",
    },
    {
      title: "Intellectual Property Rights",
      content:
        "The Service and its original content, features, and functionality are and will remain the exclusive property of Palenso and its licensors. The Service is protected by copyright, trademark, and other laws.",
    },
    {
      title: "Termination",
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <FileText size={64} className="text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
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
            <h2 className="text-2xl font-semibold mb-6">Agreement to Terms</h2>
            <p className="text-gray-600 mb-6">
              These Terms of Service (&quot;Terms&quot;) govern your use of the
              Palenso platform and services. By accessing or using our service,
              you agree to be bound by these Terms.
            </p>
            <p className="text-gray-600">
              Please read these Terms carefully before using our platform. If
              you disagree with any part of these terms, then you may not access
              the service.
            </p>
          </Card>
        </motion.div>

        {/* Terms Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {termsSections.map((section, index) => (
              <Card key={index}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="px-6 text-left">
                    <div className="flex items-center gap-3">
                      <Scale size={24} className="text-blue-600" />
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

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-8 bg-amber-50 border-amber-200 border mt-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={24} className="text-amber-600" />
              <h3 className="text-xl font-semibold text-amber-800">
                Important Notice
              </h3>
            </div>
            <p className="text-gray-700">
              This is a demo application created for educational purposes. The
              terms and conditions presented here are for demonstration only and
              do not constitute actual legal agreements. For real applications,
              please consult with legal professionals.
            </p>
          </Card>
        </motion.div>
      </div>
    </>
  );
}

Terms.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
