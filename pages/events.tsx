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
  InputAdornment
} from '@mui/material';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, Users, Clock, Filter } from 'lucide-react';

export default function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');

  const events = [
    {
      id: 1,
      title: "Tech Career Fair 2024",
      type: "Career Fair",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "San Francisco Convention Center",
      attendees: "500+",
      companies: ["Google", "Microsoft", "Apple", "Meta"],
      description: "Join us for the largest tech career fair in the Bay Area. Meet with top tech companies and discover exciting opportunities.",
      registration: "Open",
      price: "Free"
    },
    {
      id: 2,
      title: "Resume Writing Workshop",
      type: "Workshop",
      date: "March 20, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual Event",
      attendees: "100",
      companies: [],
      description: "Learn how to create a compelling resume that stands out to employers. Get tips from career experts.",
      registration: "Open",
      price: "Free"
    },
    {
      id: 3,
      title: "Networking Mixer",
      type: "Networking",
      date: "March 25, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Downtown Seattle",
      attendees: "200",
      companies: ["Amazon", "Microsoft", "Boeing"],
      description: "Connect with professionals in your industry and expand your professional network.",
      registration: "Open",
      price: "$25"
    },
    {
      id: 4,
      title: "Interview Preparation Seminar",
      type: "Seminar",
      date: "April 5, 2024",
      time: "1:00 PM - 3:00 PM",
      location: "Virtual Event",
      attendees: "150",
      companies: [],
      description: "Master the art of interviewing with expert tips and mock interview sessions.",
      registration: "Open",
      price: "Free"
    },
    {
      id: 5,
      title: "Startup Pitch Competition",
      type: "Competition",
      date: "April 12, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Stanford University",
      attendees: "300",
      companies: ["Y Combinator", "Sequoia", "Andreessen Horowitz"],
      description: "Showcase your startup idea to top investors and win funding opportunities.",
      registration: "Open",
      price: "$50"
    },
    {
      id: 6,
      title: "Diversity in Tech Summit",
      type: "Conference",
      date: "April 20, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Los Angeles Convention Center",
      attendees: "800",
      companies: ["Google", "Microsoft", "Apple", "Netflix"],
      description: "Celebrate diversity in technology and connect with inclusive employers.",
      registration: "Open",
      price: "Free"
    }
  ];

  return (
    <>
      <Head>
        <title>Events - Handshake</title>
        <meta name="description" content="Discover career events, workshops, and networking opportunities on Handshake" />
      </Head>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Career Events
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Attend workshops, career fairs, and networking events
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
                  placeholder="Search events"
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
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    value={eventType}
                    label="Event Type"
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="career-fair">Career Fair</MenuItem>
                    <MenuItem value="workshop">Workshop</MenuItem>
                    <MenuItem value="networking">Networking</MenuItem>
                    <MenuItem value="seminar">Seminar</MenuItem>
                    <MenuItem value="conference">Conference</MenuItem>
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
            Showing {events.length} events
          </Typography>
        </Box>

        {/* Events Grid */}
        <Grid container spacing={3}>
          {events.map((event, index) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
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
                        label={event.type} 
                        color="primary" 
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Chip 
                        label={event.registration} 
                        color={event.registration === "Open" ? "success" : "warning"}
                        size="small"
                      />
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                      {event.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Calendar size={16} style={{ marginRight: 4, color: '#64748b' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.date}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Clock size={16} style={{ marginRight: 4, color: '#64748b' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.time}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <MapPin size={16} style={{ marginRight: 4, color: '#64748b' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Users size={16} style={{ marginRight: 4, color: '#64748b' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.attendees} attendees
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {event.description}
                    </Typography>

                    {event.companies.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                          Participating Companies:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {event.companies.slice(0, 3).map((company, companyIndex) => (
                            <Chip
                              key={companyIndex}
                              label={company}
                              size="small"
                              sx={{ bgcolor: 'grey.100' }}
                            />
                          ))}
                          {event.companies.length > 3 && (
                            <Chip
                              label={`+${event.companies.length - 3} more`}
                              size="small"
                              sx={{ bgcolor: 'grey.100' }}
                            />
                          )}
                        </Box>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Price: {event.price}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 'auto' }}
                    >
                      Register Now
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