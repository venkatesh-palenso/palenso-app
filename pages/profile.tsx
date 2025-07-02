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
  Avatar,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  User, 
  Upload, 
  Edit, 
  Trash2, 
  Plus, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Heart, 
  BookOpen, 
  Globe,
  Save,
  X
} from 'lucide-react';

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface Language {
  id: string;
  language: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    summary: 'Passionate software engineer with 2+ years of experience in full-stack development. Skilled in React, Node.js, and Python. Looking for opportunities to work on challenging projects and grow my career.',
    resume: null as File | null,
    uploadProgress: 0
  });

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Software Engineer',
      startDate: '2023-01',
      endDate: '2024-01',
      description: 'Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.',
      current: false
    }
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2019-09',
      endDate: '2023-05',
      gpa: '3.8'
    }
  ]);

  const [skills, setSkills] = useState<string[]>(['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git']);
  const [interests, setInterests] = useState<string[]>(['Machine Learning', 'Web Development', 'Open Source', 'Hiking']);
  const [courses, setCourses] = useState<string[]>(['Data Structures & Algorithms', 'Database Systems', 'Software Engineering', 'Machine Learning']);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform using React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      link: 'https://github.com/johndoe/ecommerce'
    }
  ]);

  const [languages, setLanguages] = useState<Language[]>([
    { id: '1', language: 'English', proficiency: 'Native' },
    { id: '2', language: 'Spanish', proficiency: 'Intermediate' }
  ]);

  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setProfileData(prev => ({ ...prev, uploadProgress: progress }));
        if (progress >= 100) {
          clearInterval(interval);
          setProfileData(prev => ({ ...prev, resume: file, uploadProgress: 0 }));
        }
      }, 100);
    }
  };

  const handleAddItem = (type: string) => {
    setOpenDialog(type);
    setEditingItem(null);
  };

  const handleEditItem = (type: string, item: any) => {
    setOpenDialog(type);
    setEditingItem(item);
  };

  const handleDeleteItem = (type: string, id: string) => {
    switch (type) {
      case 'work':
        setWorkExperience(prev => prev.filter(item => item.id !== id));
        break;
      case 'education':
        setEducation(prev => prev.filter(item => item.id !== id));
        break;
      case 'project':
        setProjects(prev => prev.filter(item => item.id !== id));
        break;
      case 'language':
        setLanguages(prev => prev.filter(item => item.id !== id));
        break;
    }
  };

  const handleSaveItem = (type: string, data: any) => {
    switch (type) {
      case 'work':
        if (editingItem) {
          setWorkExperience(prev => prev.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item));
        } else {
          setWorkExperience(prev => [...prev, { ...data, id: Date.now().toString() }]);
        }
        break;
      case 'education':
        if (editingItem) {
          setEducation(prev => prev.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item));
        } else {
          setEducation(prev => [...prev, { ...data, id: Date.now().toString() }]);
        }
        break;
      case 'project':
        if (editingItem) {
          setProjects(prev => prev.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item));
        } else {
          setProjects(prev => [...prev, { ...data, id: Date.now().toString() }]);
        }
        break;
      case 'language':
        if (editingItem) {
          setLanguages(prev => prev.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item));
        } else {
          setLanguages(prev => [...prev, { ...data, id: Date.now().toString() }]);
        }
        break;
    }
    setOpenDialog(null);
    setEditingItem(null);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills & Interests', icon: Code },
    { id: 'projects', label: 'Projects', icon: BookOpen },
    { id: 'languages', label: 'Languages', icon: Globe }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Personal Information</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="LinkedIn"
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="GitHub"
                        value={profileData.github}
                        onChange={(e) => setProfileData(prev => ({ ...prev, github: e.target.value }))}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Professional Summary</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={profileData.summary}
                    onChange={(e) => setProfileData(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="Write a brief summary of your professional background and career goals..."
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Resume Upload</Typography>
                  <Box sx={{ textAlign: 'center', p: 3, border: '2px dashed #e2e8f0', borderRadius: 2 }}>
                    <Upload size={48} style={{ color: '#64748b', marginBottom: 16 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {profileData.resume ? profileData.resume.name : 'Upload your resume (PDF, DOC, DOCX)'}
                    </Typography>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload">
                      <Button variant="outlined" component="span">
                        Choose File
                      </Button>
                    </label>
                    {profileData.uploadProgress > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <LinearProgress variant="determinate" value={profileData.uploadProgress} />
                        <Typography variant="caption">{profileData.uploadProgress}%</Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 'experience':
        return (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Work Experience</Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={20} />}
                  onClick={() => handleAddItem('work')}
                >
                  Add Experience
                </Button>
              </Box>
              <List>
                {workExperience.map((exp) => (
                  <ListItem key={exp.id} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, mb: 2 }}>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography variant="h6">{exp.position}</Typography>
                          <Typography variant="subtitle1" color="primary">{exp.company}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </Typography>
                        </Box>
                      }
                      secondary={exp.description}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleEditItem('work', exp)}>
                        <Edit size={20} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteItem('work', exp.id)}>
                        <Trash2 size={20} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        );

      case 'education':
        return (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Education</Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={20} />}
                  onClick={() => handleAddItem('education')}
                >
                  Add Education
                </Button>
              </Box>
              <List>
                {education.map((edu) => (
                  <ListItem key={edu.id} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, mb: 2 }}>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography variant="h6">{edu.degree} in {edu.field}</Typography>
                          <Typography variant="subtitle1" color="primary">{edu.institution}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {edu.startDate} - {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleEditItem('education', edu)}>
                        <Edit size={20} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteItem('education', edu.id)}>
                        <Trash2 size={20} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        );

      case 'skills':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Skills</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {skills.map((skill, index) => (
                      <Chip key={index} label={skill} color="primary" variant="outlined" />
                    ))}
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="Add a skill and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        setSkills(prev => [...prev, e.currentTarget.value.trim()]);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Interests</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {interests.map((interest, index) => (
                      <Chip key={index} label={interest} color="secondary" variant="outlined" />
                    ))}
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="Add an interest and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        setInterests(prev => [...prev, e.currentTarget.value.trim()]);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Courses</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {courses.map((course, index) => (
                      <Chip key={index} label={course} variant="outlined" />
                    ))}
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="Add a course and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        setCourses(prev => [...prev, e.currentTarget.value.trim()]);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 'projects':
        return (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Projects</Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={20} />}
                  onClick={() => handleAddItem('project')}
                >
                  Add Project
                </Button>
              </Box>
              <Grid container spacing={3}>
                {projects.map((project) => (
                  <Grid item xs={12} md={6} key={project.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 1 }}>{project.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {project.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {project.technologies.map((tech, index) => (
                            <Chip key={index} label={tech} size="small" />
                          ))}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton onClick={() => handleEditItem('project', project)}>
                            <Edit size={16} />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteItem('project', project.id)}>
                            <Trash2 size={16} />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        );

      case 'languages':
        return (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Languages</Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={20} />}
                  onClick={() => handleAddItem('language')}
                >
                  Add Language
                </Button>
              </Box>
              <List>
                {languages.map((lang) => (
                  <ListItem key={lang.id} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, mb: 2 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6">{lang.language}</Typography>
                          <Chip label={lang.proficiency} color="primary" size="small" />
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleEditItem('language', lang)}>
                        <Edit size={20} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteItem('language', lang.id)}>
                        <Trash2 size={20} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Profile - Handshake</title>
        <meta name="description" content="Manage your student profile" />
      </Head>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', mr: 3 }}>
              <User size={32} />
            </Avatar>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {profileData.firstName} {profileData.lastName}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Student Profile
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'contained' : 'text'}
                onClick={() => setActiveTab(tab.id)}
                startIcon={<tab.icon size={20} />}
                sx={{ whiteSpace: 'nowrap' }}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>

        {/* Save Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Save size={20} />}
            sx={{ px: 4 }}
          >
            Save Profile
          </Button>
        </Box>
      </Container>

      {/* Dialogs for adding/editing items */}
      {/* This would include dialog components for work experience, education, projects, and languages */}
    </>
  );
} 