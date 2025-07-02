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
  Button,
  InputAdornment,
  Tabs,
  Tab
} from '@mui/material';
import { motion } from 'framer-motion';
import { Search, FileText, Video, BookOpen, Download, Filter } from 'lucide-react';

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const resources = [
    {
      id: 1,
      title: "Resume Writing Guide",
      type: "Guide",
      category: "Resume",
      description: "Learn how to create a compelling resume that stands out to employers. Includes templates and examples.",
      downloads: "2.5k",
      rating: 4.8,
      format: "PDF",
      size: "2.3 MB"
    },
    {
      id: 2,
      title: "Interview Preparation Tips",
      type: "Video",
      category: "Interview",
      description: "Master common interview questions and learn techniques to ace your next interview.",
      downloads: "1.8k",
      rating: 4.6,
      format: "MP4",
      size: "45 MB"
    },
    {
      id: 3,
      title: "Networking Strategies",
      type: "Guide",
      category: "Networking",
      description: "Build your professional network and create meaningful connections in your industry.",
      downloads: "1.2k",
      rating: 4.7,
      format: "PDF",
      size: "1.8 MB"
    },
    {
      id: 4,
      title: "Salary Negotiation Guide",
      type: "Guide",
      category: "Negotiation",
      description: "Learn how to negotiate your salary and benefits effectively.",
      downloads: "950",
      rating: 4.5,
      format: "PDF",
      size: "3.1 MB"
    },
    {
      id: 5,
      title: "LinkedIn Profile Optimization",
      type: "Video",
      category: "Social Media",
      description: "Optimize your LinkedIn profile to attract recruiters and opportunities.",
      downloads: "1.5k",
      rating: 4.4,
      format: "MP4",
      size: "32 MB"
    },
    {
      id: 6,
      title: "Career Change Guide",
      type: "Guide",
      category: "Career Planning",
      description: "Navigate a successful career transition with step-by-step guidance.",
      downloads: "800",
      rating: 4.9,
      format: "PDF",
      size: "4.2 MB"
    }
  ];

  const categories = [
    { label: "All Resources", value: "all" },
    { label: "Resume", value: "resume" },
    { label: "Interview", value: "interview" },
    { label: "Networking", value: "networking" },
    { label: "Career Planning", value: "career-planning" }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Video size={24} />;
      case 'Guide':
        return <FileText size={24} />;
      default:
        return <BookOpen size={24} />;
    }
  };

  return (
    <>
      <Head>
        <title>Resources - Handshake</title>
        <meta name="description" content="Access career resources, guides, and tools on Handshake" />
      </Head>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Career Resources
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Access guides, templates, and tools to advance your career
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
                  placeholder="Search resources"
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
                  <InputLabel>Resource Type</InputLabel>
                  <Select
                    value={resourceType}
                    label="Resource Type"
                    onChange={(e) => setResourceType(e.target.value)}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="guide">Guides</MenuItem>
                    <MenuItem value="video">Videos</MenuItem>
                    <MenuItem value="template">Templates</MenuItem>
                    <MenuItem value="tool">Tools</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={resourceType}
                    label="Category"
                    onChange={(e) => setResourceType(e.target.value)}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="resume">Resume</MenuItem>
                    <MenuItem value="interview">Interview</MenuItem>
                    <MenuItem value="networking">Networking</MenuItem>
                    <MenuItem value="career-planning">Career Planning</MenuItem>
                  </Select>
                </FormControl>
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

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={(e, newValue) => setTabValue(newValue)}
              variant="scrollable"
              scrollButtons="auto"
            >
              {categories.map((category, index) => (
                <Tab key={index} label={category.label} />
              ))}
            </Tabs>
          </Box>
        </motion.div>

        {/* Results Count */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Showing {resources.length} resources
          </Typography>
        </Box>

        {/* Resources Grid */}
        <Grid container spacing={3}>
          {resources.map((resource, index) => (
            <Grid item xs={12} md={6} lg={4} key={resource.id}>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Chip 
                        label={resource.type} 
                        color="primary" 
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Chip 
                        label={resource.format} 
                        variant="outlined"
                        size="small"
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ mr: 2, color: 'primary.main' }}>
                        {getIcon(resource.type)}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {resource.title}
                      </Typography>
                    </Box>

                    <Chip 
                      label={resource.category} 
                      size="small"
                      sx={{ bgcolor: 'grey.100', mb: 2 }}
                    />

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {resource.description}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Downloads: {resource.downloads}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size: {resource.size}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Rating: ⭐ {resource.rating}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<Download size={20} />}
                      sx={{ mt: 'auto' }}
                    >
                      Download
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