// react
import { useState } from "react";

// next
import Head from "next/head";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import {
  HelpCircle,
  Search,
  Mail,
  MessageCircle,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";

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

  const filteredFaqs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <>
      <Head>
        <title>Help & Support - Palenso</title>
        <meta
          name="description"
          content="Get help and support for using Palenso platform"
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
                    <HelpCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4">
                    Help & Support
                  </h1>
                  <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                    Find answers to your questions and get the support you need
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
              {/* Search Section */}
              <div className="feature-card-handshake p-8 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-6">
                  <h2 className="heading-handshake text-2xl mb-2">
                    Search for Help
                  </h2>
                  <p className="text-muted-foreground">
                    Find answers to common questions quickly
                  </p>
                </div>
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search for help..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 dark:border-gray-700 focus:border-primary"
                  />
                </div>
              </div>

              {/* Support Options */}
              <div className="feature-card-handshake p-8 mb-8 border border-gray-200 dark:border-gray-700">
                <h2 className="heading-handshake text-2xl mb-6 text-center">
                  Contact Support
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {supportOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <motion.div
                        key={option.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        className="flex flex-col h-full p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex flex-col flex-grow">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">
                            {option.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 text-center flex-grow">
                            {option.description}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full mt-auto border-gray-200 dark:border-gray-700 hover:border-primary"
                        >
                          {option.action}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="feature-card-handshake p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="heading-handshake text-2xl mb-6 text-center">
                  Frequently Asked Questions
                </h2>
                {filteredFaqs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((category, categoryIndex) => (
                      <div key={category.title} className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          {category.title}
                        </h3>
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem
                            key={`${categoryIndex}-${faqIndex}`}
                            value={`${categoryIndex}-${faqIndex}`}
                            className="mb-2 last:mb-0 border border-gray-200 dark:border-gray-700 rounded-lg"
                          >
                            <AccordionTrigger className="px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors border-b border-gray-200 dark:border-gray-700">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </div>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-8 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <p className="text-muted-foreground">
                      No questions found matching your search. Try different
                      keywords or contact our support team.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

Help.getLayout = Layouts.Public;
