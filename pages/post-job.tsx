import Head from "next/head";
import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Alert,
  Snackbar
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Building, 
  MapPin, 
  DollarSign, 
  ArrowRight, 
  Save,
  Plus,
  X
} from 'lucide-react';

interface JobPosting {
  title: string;
  company: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salary: {
    min: string;
    max: string;
    currency: string;
  };
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  skills: string[];
  department: string;
  remotePolicy: string;
  applicationDeadline: string;
  contactEmail: string;
  contactPhone: string;
}

export default function PostJob() {
  const [activeStep, setActiveStep] = useState(0);
  const [jobData, setJobData] = useState<JobPosting>({
    title: '',
    company: 'TechCorp Inc.',
    location: '',
    employmentType: '',
    experienceLevel: '',
    salary: {
      min: '',
      max: '',
      currency: 'USD'
    },
    description: '',
    responsibilities: [],
    qualifications: [],
    benefits: [],
    skills: [],
    department: '',
    remotePolicy: '',
    applicationDeadline: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [newResponsibility, setNewResponsibility] = useState('');
  const [newQualification, setNewQualification] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    'Basic Information',
    'Job Details',
    'Requirements',
    'Benefits & Skills',
    'Contact Information'
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSalaryChange = (field: string, value: string) => {
    setJobData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [field]: value
      }
    }));
  };

  const addItem = (type: string, value: string) => {
    if (value.trim()) {
      setJobData(prev => ({
        ...prev,
        [type]: [...prev[type as keyof JobPosting] as string[], value.trim()]
      }));
      // Clear the input
      switch (type) {
        case 'responsibilities':
          setNewResponsibility('');
          break;
        case 'qualifications':
          setNewQualification('');
          break;
        case 'benefits':
          setNewBenefit('');
          break;
        case 'skills':
          setNewSkill('');
          break;
      }
    }
  };

  const removeItem = (type: string, index: number) => {
    setJobData(prev => ({
      ...prev,
      [type]: (prev[type as keyof JobPosting] as string[]).filter((_, i) => i !== index)
    }));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return jobData.title && jobData.location && jobData.employmentType && jobData.experienceLevel;
      case 1:
        return jobData.description && jobData.department && jobData.remotePolicy;
      case 2:
        return jobData.responsibilities.length > 0 && jobData.qualifications.length > 0;
      case 3:
        return jobData.benefits.length > 0 && jobData.skills.length > 0;
      case 4:
        return jobData.contactEmail && jobData.contactPhone && jobData.applicationDeadline;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    console.log('Job posting data:', jobData);
    setShowSuccess(true);
    // Here you would typically send the data to your backend
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>Basic Job Information</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                value={jobData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Senior Software Engineer"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={jobData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Department"
                value={jobData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                placeholder="e.g., Engineering, Marketing, Sales"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={jobData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., San Francisco, CA or Remote"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Employment Type</InputLabel>
                <Select
                  value={jobData.employmentType}
                  label="Employment Type"
                  onChange={(e) => handleInputChange('employmentType', e.target.value)}
                >
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                  <MenuItem value="temporary">Temporary</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Experience Level</InputLabel>
                <Select
                  value={jobData.experienceLevel}
                  label="Experience Level"
                  onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                >
                  <MenuItem value="entry">Entry Level</MenuItem>
                  <MenuItem value="mid">Mid Level</MenuItem>
                  <MenuItem value="senior">Senior Level</MenuItem>
                  <MenuItem value="lead">Lead</MenuItem>
                  <MenuItem value="executive">Executive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Remote Policy</InputLabel>
                <Select
                  value={jobData.remotePolicy}
                  label="Remote Policy"
                  onChange={(e) => handleInputChange('remotePolicy', e.target.value)}
                >
                  <MenuItem value="on-site">On-site only</MenuItem>
                  <MenuItem value="hybrid">Hybrid</MenuItem>
                  <MenuItem value="remote">Remote</MenuItem>
                  <MenuItem value="flexible">Flexible</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Minimum Salary"
                value={jobData.salary.min}
                onChange={(e) => handleSalaryChange('min', e.target.value)}
                placeholder="50000"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Maximum Salary"
                value={jobData.salary.max}
                onChange={(e) => handleSalaryChange('max', e.target.value)}
                placeholder="80000"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={jobData.salary.currency}
                  label="Currency"
                  onChange={(e) => handleSalaryChange('currency', e.target.value)}
                >
                  <MenuItem value="USD">USD ($)</MenuItem>
                  <MenuItem value="EUR">EUR (€)</MenuItem>
                  <MenuItem value="GBP">GBP (£)</MenuItem>
                  <MenuItem value="CAD">CAD (C$)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>Job Description</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Job Description"
                value={jobData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Provide a detailed description of the role, including what the position entails and what the ideal candidate would be doing..."
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>Responsibilities & Qualifications</Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Key Responsibilities</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Add a responsibility"
                  value={newResponsibility}
                  onChange={(e) => setNewResponsibility(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addItem('responsibilities', newResponsibility);
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => addItem('responsibilities', newResponsibility)}
                  disabled={!newResponsibility.trim()}
                >
                  <Plus size={20} />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {jobData.responsibilities.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() => removeItem('responsibilities', index)}
                    deleteIcon={<X size={16} />}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Required Qualifications</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Add a qualification"
                  value={newQualification}
                  onChange={(e) => setNewQualification(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addItem('qualifications', newQualification);
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => addItem('qualifications', newQualification)}
                  disabled={!newQualification.trim()}
                >
                  <Plus size={20} />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {jobData.qualifications.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() => removeItem('qualifications', index)}
                    deleteIcon={<X size={16} />}
                    color="primary"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>Benefits & Skills</Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Benefits & Perks</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Add a benefit"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addItem('benefits', newBenefit);
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => addItem('benefits', newBenefit)}
                  disabled={!newBenefit.trim()}
                >
                  <Plus size={20} />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {jobData.benefits.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() => removeItem('benefits', index)}
                    deleteIcon={<X size={16} />}
                    color="success"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Required Skills</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addItem('skills', newSkill);
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => addItem('skills', newSkill)}
                  disabled={!newSkill.trim()}
                >
                  <Plus size={20} />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {jobData.skills.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() => removeItem('skills', index)}
                    deleteIcon={<X size={16} />}
                    color="secondary"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>Contact Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Email"
                type="email"
                value={jobData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                placeholder="hr@company.com"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Phone"
                value={jobData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Application Deadline"
                type="date"
                value={jobData.applicationDeadline}
                onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Post a Job - Handshake</title>
        <meta name="description" content="Post a new job opening on Handshake" />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Post a Job Opening
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Create a detailed job posting to attract the best candidates
            </Typography>
          </Box>
        </motion.div>

        {/* Stepper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Paper sx={{ p: 3, mb: 4 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Progress indicator */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Step {activeStep + 1} of {steps.length}
              </Typography>
              <Box sx={{ flex: 1, bgcolor: 'grey.200', borderRadius: 1, height: 8 }}>
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    height: '100%',
                    borderRadius: 1,
                    width: `${((activeStep + 1) / steps.length) * 100}%`,
                    transition: 'width 0.3s ease'
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </motion.div>

        {/* Form Content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent sx={{ p: 4 }}>
              {renderStepContent(activeStep)}
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!isStepValid(activeStep)}
                startIcon={<Save size={20} />}
                size="large"
              >
                Post Job
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepValid(activeStep)}
                endIcon={<ArrowRight size={20} />}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>

        {/* Job Preview */}
        {activeStep > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card sx={{ mt: 4 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Job Preview</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Building size={20} color="#64748b" />
                  <Typography variant="h5">{jobData.title || 'Job Title'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <MapPin size={16} color="#64748b" />
                  <Typography variant="body2" color="text.secondary">
                    {jobData.location || 'Location'}
                  </Typography>
                  {jobData.employmentType && (
                    <>
                      <Typography variant="body2" color="text.secondary">•</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {jobData.employmentType}
                      </Typography>
                    </>
                  )}
                </Box>
                {jobData.salary.min && jobData.salary.max && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <DollarSign size={16} color="#64748b" />
                    <Typography variant="body2" color="text.secondary">
                      {jobData.salary.min} - {jobData.salary.max} {jobData.salary.currency}
                    </Typography>
                  </Box>
                )}
                {jobData.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {jobData.description.substring(0, 200)}...
                  </Typography>
                )}
                {jobData.skills.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {jobData.skills.slice(0, 5).map((skill, index) => (
                      <Chip key={index} label={skill} size="small" />
                    ))}
                    {jobData.skills.length > 5 && (
                      <Chip label={`+${jobData.skills.length - 5} more`} size="small" variant="outlined" />
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Job posted successfully! It will be visible to candidates shortly.
        </Alert>
      </Snackbar>
    </>
  );
} 