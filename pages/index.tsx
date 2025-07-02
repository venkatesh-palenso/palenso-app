import Head from "next/head";
import { Box, Container, Typography, Button, Grid, Card, CardContent, Avatar, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Search, Building, Users, Calendar, ArrowRight, Star, MapPin, DollarSign } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const featuredJobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$120k - $180k",
      type: "Full-time",
      logo: "G",
      rating: 4.8
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      salary: "$130k - $200k",
      type: "Full-time",
      logo: "M",
      rating: 4.6
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Amazon",
      location: "Seattle, WA",
      salary: "$110k - $170k",
      type: "Full-time",
      logo: "A",
      rating: 4.7
    }
  ];

  const stats = [
    { label: "Active Jobs", value: "50K+", icon: Search },
    { label: "Companies", value: "2K+", icon: Building },
    { label: "Students", value: "1M+", icon: Users },
    { label: "Events", value: "500+", icon: Calendar }
  ];

  return (
    <>
      <Head>
        <title>Handshake - Find Your Dream Job</title>
        <meta name="description" content="Connect with top employers and find your dream job on Handshake" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h1" sx={{ mb: 3, fontWeight: 700 }}>
                  Find Your Dream Job
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Connect with top employers and discover opportunities that match your skills and aspirations.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'grey.100' }
                    }}
                    component={Link}
                    href="/jobs"
                  >
                    Browse Jobs
                    <ArrowRight size={20} style={{ marginLeft: 8 }} />
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                    }}
                    component={Link}
                    href="/companies"
                  >
                    Explore Companies
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    p: 4,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Quick Search
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main' }}>
                      Software Engineering
                    </Button>
                    <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main' }}>
                      Marketing
                    </Button>
                    <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main' }}>
                      Data Science
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div variants={fadeInUp}>
                  <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                          <stat.icon size={28} />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Featured Jobs Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Featured Jobs
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Discover opportunities from top companies
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {featuredJobs.map((job, index) => (
                <Grid item xs={12} md={4} key={job.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            {job.logo}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {job.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {job.company}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <MapPin size={16} style={{ marginRight: 4, color: '#64748b' }} />
                          <Typography variant="body2" color="text.secondary">
                            {job.location}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <DollarSign size={16} style={{ marginRight: 4, color: '#64748b' }} />
                          <Typography variant="body2" color="text.secondary">
                            {job.salary}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip label={job.type} size="small" color="primary" />
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Star size={16} style={{ color: '#fbbf24', marginRight: 4 }} />
                            <Typography variant="body2">
                              {job.rating}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/jobs"
                sx={{ px: 4 }}
              >
                View All Jobs
                <ArrowRight size={20} style={{ marginLeft: 8 }} />
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card sx={{ bgcolor: 'primary.main', color: 'white', p: 6, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
              Ready to Start Your Career?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join millions of students and recent graduates who have found their dream jobs on Handshake.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                '&:hover': { bgcolor: 'grey.100' }
              }}
              component={Link}
              href="/signup"
            >
              Get Started Today
            </Button>
          </Card>
        </motion.div>
      </Container>
    </>
  );
}
