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
import { ChevronsUpDown, FileText, Scale, AlertTriangle } from 'lucide-react';

export default function Terms() {
  const termsSections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using Handshake, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "Use License",
      content: "Permission is granted to temporarily download one copy of the materials on Handshake's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title."
    },
    {
      title: "User Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password."
    },
    {
      title: "Prohibited Uses",
      content: "You may not use the service for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. You may not violate any international, federal, provincial or state regulations, rules, laws, or local ordinances."
    },
    {
      title: "Intellectual Property Rights",
      content: "The Service and its original content, features, and functionality are and will remain the exclusive property of Handshake and its licensors. The Service is protected by copyright, trademark, and other laws."
    },
    {
      title: "Termination",
      content: "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation."
    }
  ];

  return (
    <>
      <Head>
        <title>Terms of Service - Handshake</title>
        <meta name="description" content="Read Handshake's terms of service and user agreement" />
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
              <FileText size={64} color="#2563eb" />
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Terms of Service
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
              Agreement to Terms
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              These Terms of Service ("Terms") govern your use of the Handshake platform and services. 
              By accessing or using our service, you agree to be bound by these Terms.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please read these Terms carefully before using our platform. If you disagree with any part of these terms, 
              then you may not access the service.
            </Typography>
          </Card>
        </motion.div>

        {/* Terms Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {termsSections.map((section, index) => (
            <Card key={index} sx={{ mb: 3 }}>
              <Accordion>
                <AccordionSummary expandIcon={<ChevronsUpDown />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Scale size={24} color="#2563eb" />
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

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card sx={{ p: 4, bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <AlertTriangle size={24} color="#f59e0b" />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.dark' }}>
                Important Notice
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              This is a demo application created for educational purposes. The terms and conditions presented here are for demonstration only 
              and do not constitute actual legal agreements. For real applications, please consult with legal professionals.
            </Typography>
          </Card>
        </motion.div>
      </Container>
    </>
  );
} 