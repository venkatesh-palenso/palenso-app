import Head from "next/head";
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { motion } from 'framer-motion';
import { ChevronsUpDown, Shield, Lock, Eye, Users } from 'lucide-react';

export default function Privacy() {
  const privacySections = [
    {
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, complete your profile, apply for jobs, or communicate with us. This may include your name, email address, phone number, educational background, work experience, and other professional information."
    },
    {
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, to communicate with you, to process your job applications, to connect you with employers, and to personalize your experience on our platform."
    },
    {
      title: "Information Sharing",
      content: "We may share your information with employers when you apply for jobs, with service providers who help us operate our platform, and in certain legal circumstances. We do not sell your personal information to third parties."
    },
    {
      title: "Data Security",
      content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure."
    },
    {
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information. You can also control your privacy settings and opt out of certain communications. Contact us if you need assistance with these rights."
    },
    {
      title: "Cookies and Tracking",
      content: "We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences."
    }
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy - Handshake</title>
        <meta name="description" content="Learn how Handshake protects your privacy and personal information" />
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
              <Shield size={64} color="#2563eb" />
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Privacy Policy
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Last updated: March 2024
            </Typography>
          </Box>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Your Privacy Matters
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              At Handshake, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              By using Handshake, you agree to the collection and use of information in accordance with this policy. 
              If you have any questions about this Privacy Policy, please contact us.
            </Typography>
          </Card>
        </motion.div>

        {/* Privacy Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {privacySections.map((section, index) => (
            <Card key={index} sx={{ mb: 3 }}>
              <Accordion>
                <AccordionSummary expandIcon={<ChevronsUpDown />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Lock size={24} color="#2563eb" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {section.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" color="text.secondary">
                    {section.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Card>
          ))}
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card sx={{ p: 4, bgcolor: 'grey.50' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Contact Us
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Email: privacy@handshake.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: +1 (555) 123-4567
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address: 123 Career Street, San Francisco, CA 94105
              </Typography>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </>
  );
} 