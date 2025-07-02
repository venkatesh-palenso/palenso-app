import Head from "next/head";
import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip, 
  Avatar, 
  Button,
  Rating,
  InputAdornment
} from '@mui/material';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, Building, Star, Filter } from 'lucide-react';

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');

  const companies = [
    {
      id: 1,
      name: "Google",
      logo: "G",
      industry: "Technology",
      location: "Mountain View, CA",
      employees: "150,000+",
      rating: 4.8,
      reviews: 1250,
      openJobs: 45,
      description: "Google is a multinational technology company that specializes in Internet-related services and products.",
      benefits: ["Health Insurance", "401k", "Remote Work", "Free Food"]
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "M",
      industry: "Technology",
      location: "Seattle, WA",
      employees: "200,000+",
      rating: 4.6,
      reviews: 980,
      openJobs: 32,
      description: "Microsoft Corporation is an American multinational technology company which produces computer software.",
      benefits: ["Health Insurance", "401k", "Stock Options", "Flexible Hours"]
    },
    {
      id: 3,
      name: "Amazon",
      logo: "A",
      industry: "E-commerce",
      location: "Seattle, WA",
      employees: "1,500,000+",
      rating: 4.4,
      reviews: 2100,
      openJobs: 78,
      description: "Amazon is an American multinational technology company focusing on e-commerce, cloud computing, and digital streaming.",
      benefits: ["Health Insurance", "401k", "Career Growth", "Innovation"]
    },
    {
      id: 4,
      name: "Apple",
      logo: "A",
      industry: "Technology",
      location: "Cupertino, CA",
      employees: "160,000+",
      rating: 4.7,
      reviews: 890,
      openJobs: 28,
      description: "Apple Inc. is an American multinational technology company that specializes in consumer electronics.",
      benefits: ["Health Insurance", "401k", "Product Discounts", "Creative Environment"]
    },
    {
      id: 5,
      name: "Netflix",
      logo: "N",
      industry: "Entertainment",
      location: "Los Gatos, CA",
      employees: "12,000+",
      rating: 4.5,
      reviews: 650,
      openJobs: 15,
      description: "Netflix is an American subscription streaming service and production company.",
      benefits: ["Health Insurance", "401k", "Unlimited PTO", "Remote Work"]
    },
    {
      id: 6,
      name: "Meta",
      logo: "M",
      industry: "Technology",
      location: "Menlo Park, CA",
      employees: "87,000+",
      rating: 4.3,
      reviews: 1100,
      openJobs: 52,
      description: "Meta Platforms, Inc. is an American multinational technology conglomerate.",
      benefits: ["Health Insurance", "401k", "Social Impact", "Innovation"]
    }
  ];

  return (
    <>
      <Head>
        <title>Companies - Handshake</title>
        <meta name="description" content="Explore companies and their job opportunities on Handshake" />
      </Head>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Explore Companies
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Discover top employers and their opportunities
          </Typography>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search companies"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Industry</InputLabel>
                  <Select
                    value={industry}
                    label="Industry"
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    <MenuItem value="">All Industries</MenuItem>
                    <MenuItem value="technology">Technology</MenuItem>
                    <MenuItem value="e-commerce">E-commerce</MenuItem>
                    <MenuItem value="entertainment">Entertainment</MenuItem>
                    <MenuItem value="finance">Finance</MenuItem>
                    <MenuItem value="healthcare">Healthcare</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapPin size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ height: '56px' }}
                  startIcon={<Filter size={20} />}
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </Card>
        </motion.div>

        {/* Results Count */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Showing {companies.length} companies
          </Typography>
        </Box>

        {/* Companies Grid */}
        <Grid container spacing={3}>
          {companies.map((company, index) => (
            <Grid item xs={12} md={6} lg={4} key={company.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card sx={{ 
                  height: '100%', 
                  cursor: 'pointer', 
                  '&:hover': { 
                    transform: 'translateY(-4px)', 
                    boxShadow: 4 
                  },
                  transition: 'all 0.3s ease'
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 3, width: 64, height: 64, fontSize: '1.5rem' }}>
                        {company.logo}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                          {company.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {company.industry}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Rating value={company.rating} precision={0.1} size="small" readOnly />
                          <Typography variant="body2" color="text.secondary">
                            ({company.reviews})
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <MapPin size={16} style={{ marginRight: 4, color: '#64748b' }} />
                      <Typography variant="body2" color="text.secondary">
                        {company.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Users size={16} style={{ marginRight: 4, color: '#64748b' }} />
                      <Typography variant="body2" color="text.secondary">
                        {company.employees} employees
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {company.description}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Benefits:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {company.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                          <Chip
                            key={benefitIndex}
                            label={benefit}
                            size="small"
                            sx={{ bgcolor: 'grey.100' }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                        {company.openJobs} open jobs
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 'auto' }}
                    >
                      View Jobs
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
} 