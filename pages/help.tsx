// react
import { useState } from "react";

// next
import Head from "next/head";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { HelpCircle, Search, Mail, MessageCircle, Phone, ArrowRight } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// layout
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
                <HelpCircle size={64} className="text-primary animate-bounce-glow" />
              </div>
              <h1 className="heading-handshake-large mb-4">Help Center</h1>
              <p className="heading-handshake-subtitle">
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
            <div className="feature-card-handshake p-8 mb-12">
              <div className="text-center mb-6">
                <h2 className="heading-handshake text-2xl mb-2">Search for Help</h2>
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
                    className="input-handshake pl-10"
                  />
                </div>
                <Button className="btn-handshake">
                  Search
                  <Search className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* FAQ Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-card-handshake mb-6">
                  <div className="p-0">
                    <h3 className="heading-handshake text-xl p-6 pb-2">
                      {category.title}
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${faqIndex}`}>
                          <AccordionTrigger className="px-6 text-left hover:bg-gray-50 rounded-lg mx-2">
                            <span className="font-medium text-gray-900">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Support Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="heading-handshake text-3xl mb-8 text-center">
              Still Need Help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="feature-card-handshake p-8 text-center h-full">
                    <div className="flex justify-center mb-4">
                      <option.icon size={48} className="text-primary" />
                    </div>
                    <h3 className="heading-handshake text-xl mb-2">{option.title}</h3>
                    <p className="text-gray-600 mb-6">{option.description}</p>
                    <Button className="btn-handshake w-full">
                      {option.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

Help.getLayout = Layouts.Public;
