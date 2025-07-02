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
  FormControlLabel,
  Checkbox,
  Divider,
  Avatar,
  InputAdornment,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  const isFormValid = formData.email && formData.password;

  return (
    <>
      <Head>
        <title>Sign In - Handshake</title>
        <meta name="description" content="Sign in to your Handshake account" />
      </Head>

      <Container maxWidth="sm" sx={{ py: 8 }}>
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
                Welcome Back
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Sign in to your Handshake account
              </Typography>
            </Box>

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: <Mail size={20} style={{ marginRight: 8, color: '#64748b' }} />
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <Lock size={20} style={{ marginRight: 8, color: '#64748b' }} />,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    />
                  }
                  label="Remember me"
                />
                <Link href="/forgot-password" style={{ color: '#2563eb', textDecoration: 'none' }}>
                  <Typography variant="body2">
                    Forgot password?
                  </Typography>
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={!isFormValid}
                sx={{ mb: 3 }}
              >
                Sign In
              </Button>
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 4 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Social Login */}
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              >
                Continue with Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              >
                Continue with LinkedIn
              </Button>
            </Box>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Don't have an account?
              </Typography>
              <Link href="/signup" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" fullWidth>
                  Create Account
                </Button>
              </Link>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </>
  );
} 