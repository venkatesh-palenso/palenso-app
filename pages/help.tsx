import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Search, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layouts } from "@/layouts";

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I create an account?",
          answer:
            "To create an account, click the 'Sign Up' button on our homepage. You'll need to provide your email address, create a password, and fill in your basic information including your school and major.",
        },
        {
          question: "How do I complete my profile?",
          answer:
            "After creating your account, you can complete your profile by adding your education history, work experience, skills, and uploading your resume. A complete profile increases your chances of being noticed by employers.",
        },
        {
          question: "How do I search for jobs?",
          answer:
            "Use the search bar on the Jobs page to find opportunities by job title, company, or keywords. You can also filter by location, job type, and experience level.",
        },
      ],
    },
    {
      title: "Job Applications",
      faqs: [
        {
          question: "How do I apply for a job?",
          answer:
            "To apply for a job, click on the job posting and then click the 'Apply Now' button. Make sure your profile is complete and your resume is uploaded before applying.",
        },
        {
          question: "How do I track my applications?",
          answer:
            "You can track your applications in your profile under the 'Applications' tab. This will show you the status of all your job applications.",
        },
        {
          question: "Can I withdraw an application?",
          answer:
            "Yes, you can withdraw an application within 24 hours of submitting it. Go to your Applications tab and click the 'Withdraw' button next to the application.",
        },
      ],
    },
    {
      title: "Account & Settings",
      faqs: [
        {
          question: "How do I change my password?",
          answer:
            "Go to your profile settings and click on 'Change Password'. You'll need to enter your current password and then create a new one.",
        },
        {
          question: "How do I update my contact information?",
          answer:
            "You can update your contact information in your profile settings. Click on 'Edit Profile' and modify your email, phone number, or address.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "To delete your account, go to your profile settings and click on 'Delete Account'. Please note that this action cannot be undone.",
        },
      ],
    },
  ];

  const supportOptions = [
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: Mail,
      action: "Send Email",
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      action: "Start Chat",
    },
    {
      title: "Phone Support",
      description: "Call us for immediate assistance",
      icon: Phone,
      action: "Call Now",
    },
  ];

  return (
    <>
      <Head>
        <title>Help Center - Palenso</title>
        <meta
          name="description"
          content="Get help and support for using Palenso"
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
              <HelpCircle size={64} className="text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to your questions and get the support you need
            </p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="p-8 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Search for Help</h2>
              <p className="text-gray-600">
                Can&apos;t find what you&apos;re looking for? Search our help
                articles
              </p>
            </div>
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  placeholder="Search for help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>
          </Card>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="mb-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold p-6 pb-2">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${faqIndex}`}>
                      <AccordionTrigger className="px-6 text-left">
                        <span className="font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6">
                        <p className="text-gray-600">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Still Need Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="p-8 text-center h-full">
                <div className="flex justify-center mb-4">
                  <option.icon size={48} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <Button variant="outline" className="w-full">
                  {option.action}
                </Button>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

Help.getLayout = Layouts.Public;
