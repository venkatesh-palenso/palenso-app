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
  Pagination,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Clock, Star, Filter, Send, CheckCircle, Eye } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  logo: string;
  rating: number;
  posted: string;
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  department: string;
  remotePolicy: string;
  applicationDeadline: string;
  contactEmail: string;
  contactPhone: string;
}

interface JobApplication {
  jobId: number;
  status: 'applied' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  appliedDate: string;
  coverLetter: string;
}

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experience, setExperience] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$150k - $200k",
      type: "Full-time",
      experience: "5+ years",
      logo: "G",
      rating: 4.8,
      posted: "2 days ago",
      skills: ["React", "Node.js", "Python", "AWS", "Docker"],
      description: "We are looking for a Senior Software Engineer to join our team and help build scalable web applications. You will work on cutting-edge technologies and collaborate with cross-functional teams.",
      requirements: [
        "5+ years of experience in software development",
        "Strong knowledge of React, Node.js, and Python",
        "Experience with cloud platforms (AWS, GCP)",
        "Excellent problem-solving skills",
        "Bachelor's degree in Computer Science or related field"
      ],
      benefits: [
        "Competitive salary and equity",
        "Health, dental, and vision insurance",
        "401(k) matching",
        "Flexible work hours",
        "Professional development opportunities"
      ],
      department: "Engineering",
      remotePolicy: "Hybrid",
      applicationDeadline: "2024-04-15",
      contactEmail: "hr@google.com",
      contactPhone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      salary: "$130k - $180k",
      type: "Full-time",
      experience: "3+ years",
      logo: "M",
      rating: 4.6,
      posted: "1 day ago",
      skills: ["Product Strategy", "Agile", "Analytics", "User Research"],
      description: "Join our product team to drive the development of innovative software solutions. You will be responsible for product strategy, roadmap planning, and cross-functional collaboration.",
      requirements: [
        "3+ years of product management experience",
        "Strong analytical and strategic thinking",
        "Experience with Agile methodologies",
        "Excellent communication skills",
        "MBA or relevant experience preferred"
      ],
      benefits: [
        "Competitive salary and benefits",
        "Health and wellness programs",
        "Professional development",
        "Work-life balance",
        "Employee stock purchase plan"
      ],
      department: "Product",
      remotePolicy: "Hybrid",
      applicationDeadline: "2024-04-10",
      contactEmail: "hr@microsoft.com",
      contactPhone: "+1 (555) 234-5678"
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Amazon",
      location: "Seattle, WA",
      salary: "$120k - $170k",
      type: "Full-time",
      experience: "2+ years",
      logo: "A",
      rating: 4.7,
      posted: "3 days ago",
      skills: ["Python", "Machine Learning", "SQL", "Statistics"],
      description: "Work on cutting-edge machine learning projects and help drive data-driven decisions across the organization. You will develop models and algorithms to solve complex business problems.",
      requirements: [
        "2+ years of experience in data science",
        "Strong programming skills in Python",
        "Experience with machine learning frameworks",
        "Knowledge of statistics and mathematics",
        "Master's degree in Data Science or related field"
      ],
      benefits: [
        "Competitive salary and equity",
        "Comprehensive health benefits",
        "401(k) with company match",
        "Flexible work arrangements",
        "Learning and development programs"
      ],
      department: "Data Science",
      remotePolicy: "Remote",
      applicationDeadline: "2024-04-20",
      contactEmail: "hr@amazon.com",
      contactPhone: "+1 (555) 345-6789"
    }
  ];

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setShowJobDialog(true);
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplyDialog(true);
  };

  const handleSubmitApplication = () => {
    if (selectedJob && coverLetter.trim()) {
      const newApplication: JobApplication = {
        jobId: selectedJob.id,
        status: 'applied',
        appliedDate: new Date().toISOString().split('T')[0],
        coverLetter: coverLetter
      };
      setApplications(prev => [...prev, newApplication]);
      setShowApplyDialog(false);
      setCoverLetter('');
      setShowSuccess(true);
    }
  };

  const getApplicationStatus = (jobId: number) => {
    const application = applications.find(app => app.jobId === jobId);
    return application?.status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'primary';
      case 'reviewing':
        return 'warning';
      case 'interview':
        return 'info';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = !jobType || job.type.toLowerCase() === jobType.toLowerCase();
    const matchesExperience = !experience || job.experience.toLowerCase().includes(experience.toLowerCase());
    
    return matchesSearch && matchesLocation && matchesType && matchesExperience;
  });

  return (
    <>
      <Head>
        <title>Jobs - Handshake</title>
        <meta name="description" content="Browse and apply to jobs on Handshake" />
      </Head>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Find Your Next Opportunity
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Discover thousands of jobs from top companies
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
                  placeholder="Job title, keywords, or company"
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
                <FormControl fullWidth>
                  <InputLabel>Job Type</InputLabel>
                  <Select
                    value={jobType}
                    label="Job Type"
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="full-time">Full-time</MenuItem>
                    <MenuItem value="part-time">Part-time</MenuItem>
                    <MenuItem value="contract">Contract</MenuItem>
                    <MenuItem value="internship">Internship</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Experience</InputLabel>
                  <Select
                    value={experience}
                    label="Experience"
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <MenuItem value="">All Levels</MenuItem>
                    <MenuItem value="entry">Entry Level</MenuItem>
                    <MenuItem value="mid">Mid Level</MenuItem>
                    <MenuItem value="senior">Senior Level</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </motion.div>

        {/* Job Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Grid container spacing={3}>
            {filteredJobs.map((job, index) => {
              const applicationStatus = getApplicationStatus(job.id);
              return (
                <Grid item xs={12} md={6} lg={4} key={job.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            {job.logo}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {job.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {job.company}
                            </Typography>
                          </Box>
                          {applicationStatus && (
                            <Chip 
                              label={applicationStatus} 
                              color={getStatusColor(applicationStatus) as any}
                              size="small"
                            />
                          )}
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
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Chip label={job.type} size="small" color="primary" />
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Star size={16} style={{ color: '#fbbf24', marginRight: 4 }} />
                            <Typography variant="body2">
                              {job.rating}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                          {job.skills.slice(0, 3).map((skill, skillIndex) => (
                            <Chip key={skillIndex} label={skill} size="small" variant="outlined" />
                          ))}
                          {job.skills.length > 3 && (
                            <Chip label={`+${job.skills.length - 3} more`} size="small" variant="outlined" />
                          )}
                        </Box>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          {job.description.substring(0, 120)}...
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Eye size={16} />}
                            onClick={() => handleJobClick(job)}
                            sx={{ flex: 1 }}
                          >
                            View Details
                          </Button>
                          {!applicationStatus ? (
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<Send size={16} />}
                              onClick={() => handleApply(job)}
                              sx={{ flex: 1 }}
                            >
                              Apply Now
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<CheckCircle size={16} />}
                              disabled
                              sx={{ flex: 1 }}
                            >
                              Applied
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </motion.div>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={5} color="primary" />
        </Box>
      </Container>

      {/* Job Details Dialog */}
      <Dialog
        open={showJobDialog}
        onClose={() => setShowJobDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedJob && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {selectedJob.logo}
                </Avatar>
                <Box>
                  <Typography variant="h5">{selectedJob.title}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {selectedJob.company}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Job Description</Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {selectedJob.description}
                  </Typography>

                  <Typography variant="h6" sx={{ mb: 2 }}>Requirements</Typography>
                  <List dense>
                    {selectedJob.requirements.map((req, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle size={16} color="#2563eb" />
                        </ListItemIcon>
                        <ListItemText primary={req} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>Benefits</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedJob.benefits.map((benefit, index) => (
                      <Chip key={index} label={benefit} color="success" variant="outlined" />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>Job Details</Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Location</Typography>
                        <Typography variant="body1">{selectedJob.location}</Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Salary</Typography>
                        <Typography variant="body1">{selectedJob.salary}</Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Employment Type</Typography>
                        <Typography variant="body1">{selectedJob.type}</Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Experience Level</Typography>
                        <Typography variant="body1">{selectedJob.experience}</Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Remote Policy</Typography>
                        <Typography variant="body1">{selectedJob.remotePolicy}</Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Department</Typography>
                        <Typography variant="body1">{selectedJob.department}</Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Application Deadline</Typography>
                        <Typography variant="body1">{selectedJob.applicationDeadline}</Typography>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="h6" sx={{ mb: 2 }}>Contact Information</Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Email</Typography>
                        <Typography variant="body1">{selectedJob.contactEmail}</Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Phone</Typography>
                        <Typography variant="body1">{selectedJob.contactPhone}</Typography>
                      </Box>

                      {!getApplicationStatus(selectedJob.id) ? (
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<Send size={20} />}
                          onClick={() => {
                            setShowJobDialog(false);
                            handleApply(selectedJob);
                          }}
                          sx={{ mt: 2 }}
                        >
                          Apply Now
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          fullWidth
                          startIcon={<CheckCircle size={20} />}
                          disabled
                          sx={{ mt: 2 }}
                        >
                          Already Applied
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowJobDialog(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Apply Dialog */}
      <Dialog
        open={showApplyDialog}
        onClose={() => setShowApplyDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedJob && (
          <>
            <DialogTitle>
              Apply for {selectedJob.title} at {selectedJob.company}
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Please provide a cover letter explaining why you're interested in this position and how your skills match the requirements.
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={8}
                label="Cover Letter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Dear Hiring Manager, I am writing to express my interest in the [Position] role at [Company]..."
                sx={{ mb: 2 }}
              />

              <Typography variant="body2" color="text.secondary">
                Your resume and profile information will be automatically included with your application.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowApplyDialog(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSubmitApplication}
                disabled={!coverLetter.trim()}
                startIcon={<Send size={20} />}
              >
                Submit Application
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Application submitted successfully! You will receive updates on your application status.
        </Alert>
      </Snackbar>
    </>
  );
} 