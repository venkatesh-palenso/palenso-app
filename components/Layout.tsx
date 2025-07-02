import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Avatar, Menu, MenuItem, IconButton, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { Search, Bell, MessageCircle, Menu as MenuIcon, User, Building, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null);

  // Mock user data - in a real app, this would come from authentication context
  const [user] = React.useState({
    name: 'John Doe',
    role: 'student', // 'student' or 'employer'
    avatar: 'JD'
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const navItems = [
    { label: 'Jobs', href: '/jobs' },
    { label: 'Companies', href: '/companies' },
    { label: 'Events', href: '/events' },
    { label: 'Resources', href: '/resources' },
  ];

  const userMenuItems = user.role === 'student' 
    ? [
        { label: 'My Profile', href: '/profile', icon: User },
        { label: 'My Applications', href: '/applications', icon: MessageCircle },
        { label: 'Saved Jobs', href: '/saved-jobs', icon: Search },
      ]
    : [
        { label: 'Company Profile', href: '/company-profile', icon: Building },
        { label: 'Post a Job', href: '/post-job', icon: Search },
        { label: 'Manage Jobs', href: '/manage-jobs', icon: MessageCircle },
        { label: 'View Applications', href: '/applications', icon: User },
      ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: 'white', 
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  Handshake
                </Typography>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{
                      color: router.pathname === item.href ? 'primary.main' : 'text.secondary',
                      fontWeight: router.pathname === item.href ? 600 : 500,
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Box>

            {/* Search and Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton sx={{ color: 'text.secondary' }}>
                <Search size={20} />
              </IconButton>
              <IconButton sx={{ color: 'text.secondary' }}>
                <Bell size={20} />
              </IconButton>
              
              {/* User Menu */}
              <IconButton
                onClick={handleUserMenu}
                sx={{ color: 'text.secondary' }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>
                  {user.avatar}
                </Avatar>
              </IconButton>
              
              {/* Mobile Menu */}
              <IconButton
                sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.secondary' }}
                onClick={handleMenu}
              >
                <MenuIcon size={20} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
          }
        }}
      >
        <Box sx={{ px: 2, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {user.role}
          </Typography>
        </Box>
        
        {userMenuItems.map((item) => (
          <MenuItem key={item.href} onClick={handleUserMenuClose}>
            <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}>
              <item.icon size={16} style={{ marginRight: 8 }} />
              {item.label}
            </Link>
          </MenuItem>
        ))}
        
        <MenuItem onClick={handleUserMenuClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
            <LogOut size={16} style={{ marginRight: 8 }} />
            Sign Out
          </Box>
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {navItems.map((item) => (
          <MenuItem key={item.href} onClick={handleClose}>
            <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              {item.label}
            </Link>
          </MenuItem>
        ))}
        <Divider />
        {userMenuItems.map((item) => (
          <MenuItem key={item.href} onClick={handleClose}>
            <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <item.icon size={16} style={{ marginRight: 8 }} />
              {item.label}
            </Link>
          </MenuItem>
        ))}
      </Menu>

      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: 'grey.50',
          borderTop: '1px solid',
          borderColor: 'grey.200',
          py: 4,
          mt: 'auto',
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              © 2024 Handshake. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="/privacy" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                  Privacy Policy
                </Typography>
              </Link>
              <Link href="/terms" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                  Terms of Service
                </Typography>
              </Link>
              <Link href="/help" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                  Help Center
                </Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 