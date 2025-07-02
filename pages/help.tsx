import Head from "next/head";
import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import { ChevronsUpDown, HelpCircle, Search, Mail, MessageCircle, Phone } from 'lucide-react';

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click the 'Sign Up' button on our homepage. You'll need to provide your email address, create a password, and fill in your basic information including your school and major."
        },
        {
          question: "How do I complete my profile?",
          answer: "After creating your account, you can complete your profile by adding your education history, work experience, skills, and uploading your resume. A complete profile increases your chances of being noticed by employers."
        },
        {
          question: "How do I search for jobs?",
          answer: "Use the search bar on the Jobs page to find opportunities by job title, company, or keywords. You can also filter by location, job type, and experience level."
        }
      ]
    },
    {
      title: "Job Applications",
      faqs: [
        {
          question: "How do I apply for a job?",
          answer: "To apply for a job, click on the job posting and then click the 'Apply Now' button. Make sure your profile is complete and your resume is uploaded before applying."
        },
        {
          question: "How do I track my applications?",
          answer: "You can track your applications in your profile under the 'Applications' tab. This will show you the status of all your job applications."
        },
        {
          question: "Can I withdraw an application?",
          answer: "Yes, you can withdraw an application within 24 hours of submitting it. Go to your Applications tab and click the 'Withdraw' button next to the application."
        }
      ]
    },
    {
      title: "Account & Settings",
      faqs: [
        {
          question: "How do I change my password?",
          answer: "Go to your profile settings and click on 'Change Password'. You'll need to enter your current password and then create a new one."
        },
        {
          question: "How do I update my contact information?",
          answer: "You can update your contact information in your profile settings. Click on 'Edit Profile' and modify your email, phone number, or address."
        },
        {
          question: "How do I delete my account?",
          answer: "To delete your account, go to your profile settings and click on 'Delete Account'. Please note that this action cannot be undone."
        }
      ]
    }
  ];

  const supportOptions = [
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: Mail,
      action: "Send Email"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      action: "Start Chat"
    },
    {
      title: "Phone Support",
      description: "Call us for immediate assistance",
      icon: Phone,
      action: "Call Now"
    }
  ];

  return (
    <>
      <Head>
        <title>Help Center - Handshake</title>
        <meta name="description" content="Get help and support for using Handshake" />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <HelpCircle size={64} color="#2563eb" />
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Help Center
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Find answers to your questions and get the support you need
            </Typography>
          </Box>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card sx={{ p: 4, mb: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Search for Help
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Can't find what you're looking for? Search our help articles
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, maxWidth: 600, mx: 'auto' }}>
              <TextField
                fullWidth
                placeholder="Search for help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search size={20} style={{ marginRight: 8, color: '#64748b' }} />
                }}
              />
              <Button variant="contained">
                Search
              </Button>
            </Box>
          </Card>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} sx={{ mb: 4 }}>
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, p: 3, pb: 1 }}>
                  {category.title}
                </Typography>
                {category.faqs.map((faq, faqIndex) => (
                  <Accordion key={faqIndex}>
                    <AccordionSummary expandIcon={<ChevronsUpDown />}>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
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
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Still Need Help?
          </Typography>
          <Grid container spacing={3}>
            {supportOptions.map((option, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <option.icon size={48} color="#2563eb" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {option.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {option.description}
                  </Typography>
                  <Button variant="outlined" fullWidth>
                    {option.action}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </>
  );
} 