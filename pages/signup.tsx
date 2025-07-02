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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  Grid,
  RadioGroup,
  Radio,
  FormLabel
} from '@mui/material';
import { motion } from 'framer-motion';
import { User, Mail, Lock, School, MapPin, ArrowRight, Building, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function Signup() {
  const [activeStep, setActiveStep] = useState(0);
  const [userRole, setUserRole] = useState<'student' | 'employer' | ''>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    major: '',
    graduationYear: '',
    location: '',
    companyName: '',
    companySize: '',
    industry: '',
    agreeToTerms: false
  });

  const steps = userRole === 'student' 
    ? ['Role Selection', 'Personal Info', 'Education', 'Location']
    : ['Role Selection', 'Personal Info', 'Company Info', 'Location'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return userRole !== '';
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword;
      case 2:
        if (userRole === 'student') {
          return formData.school && formData.major && formData.graduationYear;
        } else {
          return formData.companyName && formData.companySize && formData.industry;
        }
      case 3:
        return formData.location && formData.agreeToTerms;
      default:
        return false;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
              I am a...
            </Typography>
            <RadioGroup
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as 'student' | 'employer')}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card 
                    sx={{ 
                      p: 3, 
                      cursor: 'pointer',
                      border: userRole === 'student' ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      bgcolor: userRole === 'student' ? '#f0f9ff' : 'white'
                    }}
                    onClick={() => setUserRole('student')}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                        <GraduationCap size={32} />
                      </Avatar>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        Student
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Looking for internships and full-time opportunities
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card 
                    sx={{ 
                      p: 3, 
                      cursor: 'pointer',
                      border: userRole === 'employer' ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      bgcolor: userRole === 'employer' ? '#f0f9ff' : 'white'
                    }}
                    onClick={() => setUserRole('employer')}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                        <Building size={32} />
                      </Avatar>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        Employer
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Hiring talent for your organization
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </RadioGroup>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  InputProps={{
                    startAdornment: <User size={20} style={{ marginRight: 8, color: '#64748b' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  InputProps={{
                    startAdornment: <Mail size={20} style={{ marginRight: 8, color: '#64748b' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  InputProps={{
                    startAdornment: <Lock size={20} style={{ marginRight: 8, color: '#64748b' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  InputProps={{
                    startAdornment: <Lock size={20} style={{ marginRight: 8, color: '#64748b' }} />
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        if (userRole === 'student') {
          return (
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="School/University"
                    value={formData.school}
                    onChange={(e) => handleInputChange('school', e.target.value)}
                    InputProps={{
                      startAdornment: <School size={20} style={{ marginRight: 8, color: '#64748b' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Major/Field of Study"
                    value={formData.major}
                    onChange={(e) => handleInputChange('major', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Expected Graduation Year</InputLabel>
                    <Select
                      value={formData.graduationYear}
                      label="Expected Graduation Year"
                      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                    >
                      <MenuItem value="2024">2024</MenuItem>
                      <MenuItem value="2025">2025</MenuItem>
                      <MenuItem value="2026">2026</MenuItem>
                      <MenuItem value="2027">2027</MenuItem>
                      <MenuItem value="2028">2028</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          );
        } else {
          return (
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    InputProps={{
                      startAdornment: <Building size={20} style={{ marginRight: 8, color: '#64748b' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Company Size</InputLabel>
                    <Select
                      value={formData.companySize}
                      label="Company Size"
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                    >
                      <MenuItem value="1-10">1-10 employees</MenuItem>
                      <MenuItem value="11-50">11-50 employees</MenuItem>
                      <MenuItem value="51-200">51-200 employees</MenuItem>
                      <MenuItem value="201-500">201-500 employees</MenuItem>
                      <MenuItem value="501-1000">501-1000 employees</MenuItem>
                      <MenuItem value="1000+">1000+ employees</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Industry"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    placeholder="e.g., Technology, Healthcare, Finance"
                  />
                </Grid>
              </Grid>
            </Box>
          );
        }
      case 3:
        return (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  placeholder="City, State or Country"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  InputProps={{
                    startAdornment: <MapPin size={20} style={{ marginRight: 8, color: '#64748b' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the{' '}
                      <Link href="/terms" style={{ color: '#2563eb', textDecoration: 'none' }}>
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link href="/privacy" style={{ color: '#2563eb', textDecoration: 'none' }}>
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempt:', { userRole, ...formData });
    // Here you would typically send the data to your backend
  };

  return (
    <>
      <Head>
        <title>Sign Up - Handshake</title>
        <meta name="description" content="Create your Handshake account" />
      </Head>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                <User size={32} />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                Join Handshake
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Create your account to get started
              </Typography>
            </Box>

            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Form Content */}
            {renderStepContent(activeStep)}

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!isStepValid(activeStep)}
                  >
                    Create Account
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!isStepValid(activeStep)}
                  >
                    Next
                    <ArrowRight size={20} style={{ marginLeft: 8 }} />
                  </Button>
                )}
              </Box>
            </Box>

            {/* Sign In Link */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link href="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </>
  );
} 