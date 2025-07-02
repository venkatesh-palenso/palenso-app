import React, { useState } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    summary:
      'Passionate software engineer with 2+ years of experience in full-stack development. Skilled in React, Node.js, and Python. Looking for opportunities to work on challenging projects and grow my career.',
    resume: null as File | null,
    uploadProgress: 0,
  });

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Software Engineer',
      startDate: '2023-01',
      endDate: '2024-01',
      description:
        'Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.',
      current: false,
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2019-09',
      endDate: '2023-05',
      gpa: '3.8',
    },
  ]);

  const [skills] = useState<string[]>([
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'SQL',
    'Git',
  ]);
  const [interests] = useState<string[]>([
    'Machine Learning',
    'Web Development',
    'Open Source',
    'Hiking',
  ]);
  const [courses] = useState<string[]>([
    'Data Structures & Algorithms',
    'Database Systems',
    'Software Engineering',
    'Machine Learning',
  ]);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-commerce Platform',
      description:
        'Built a full-stack e-commerce platform using React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      link: 'https://github.com/johndoe/ecommerce',
    },
  ]);

  const [languages, setLanguages] = useState<Language[]>([
    { id: '1', language: 'English', proficiency: 'Native' },
    { id: '2', language: 'Spanish', proficiency: 'Intermediate' },
  ]);

  const [, setOpenDialog] = useState<string | null>(null);
  const [, setEditingItem] = useState<unknown>(null);

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
          setProfileData(prev => ({
            ...prev,
            resume: file,
            uploadProgress: 0,
          }));
        }
      }, 100);
    }
  };

  const handleAddItem = (type: string) => {
    setOpenDialog(type);
    setEditingItem(null);
  };

  const handleEditItem = (type: string, item: unknown) => {
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

  return (
    <div className='min-h-screen bg-muted/30'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            My Profile
          </h1>
          <p className='text-muted-foreground'>
            Manage your professional profile and information
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='space-y-6'
        >
          <TabsList className='grid w-full grid-cols-6'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='experience'>Experience</TabsTrigger>
            <TabsTrigger value='education'>Education</TabsTrigger>
            <TabsTrigger value='skills'>Skills</TabsTrigger>
            <TabsTrigger value='projects'>Projects</TabsTrigger>
            <TabsTrigger value='languages'>Languages</TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <User className='h-5 w-5' />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input
                      id='firstName'
                      value={profileData.firstName}
                      onChange={e =>
                        setProfileData(prev => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input
                      id='lastName'
                      value={profileData.lastName}
                      onChange={e =>
                        setProfileData(prev => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      value={profileData.email}
                      onChange={e =>
                        setProfileData(prev => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone</Label>
                    <Input
                      id='phone'
                      value={profileData.phone}
                      onChange={e =>
                        setProfileData(prev => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='location'>Location</Label>
                  <Input
                    id='location'
                    value={profileData.location}
                    onChange={e =>
                      setProfileData(prev => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='summary'>Professional Summary</Label>
                  <Textarea
                    id='summary'
                    value={profileData.summary}
                    onChange={e =>
                      setProfileData(prev => ({
                        ...prev,
                        summary: e.target.value,
                      }))
                    }
                    rows={4}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Resume</Label>
                  <div className='border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center'>
                    <Upload className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
                    <p className='text-sm text-muted-foreground mb-2'>
                      {profileData.resume
                        ? profileData.resume.name
                        : 'Upload your resume'}
                    </p>
                    {profileData.uploadProgress > 0 && (
                      <Progress
                        value={profileData.uploadProgress}
                        className='mb-2'
                      />
                    )}
                    <input
                      type='file'
                      accept='.pdf,.doc,.docx'
                      onChange={handleFileUpload}
                      className='hidden'
                      id='resume-upload'
                    />
                    <Button variant='outline' asChild>
                      <label htmlFor='resume-upload'>Choose File</label>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='experience' className='space-y-6'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <Briefcase className='h-5 w-5' />
                    Work Experience
                  </CardTitle>
                  <Button onClick={() => handleAddItem('work')}>
                    <Plus className='h-4 w-4 mr-2' />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                {workExperience.map(exp => (
                  <div key={exp.id} className='border rounded-lg p-4'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <h3 className='font-semibold'>{exp.position}</h3>
                        <p className='text-muted-foreground'>{exp.company}</p>
                        <p className='text-sm text-muted-foreground'>
                          {exp.startDate} -{' '}
                          {exp.current ? 'Present' : exp.endDate}
                        </p>
                        <p className='text-sm mt-2'>{exp.description}</p>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleEditItem('work', exp)}
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleDeleteItem('work', exp.id)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='education' className='space-y-6'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <GraduationCap className='h-5 w-5' />
                    Education
                  </CardTitle>
                  <Button onClick={() => handleAddItem('education')}>
                    <Plus className='h-4 w-4 mr-2' />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                {education.map(edu => (
                  <div key={edu.id} className='border rounded-lg p-4'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <h3 className='font-semibold'>
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className='text-muted-foreground'>
                          {edu.institution}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {edu.startDate} - {edu.endDate}
                          {edu.gpa && ` • GPA: ${edu.gpa}`}
                        </p>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleEditItem('education', edu)}
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleDeleteItem('education', edu.id)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='skills' className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Code className='h-5 w-5' />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-wrap gap-2'>
                    {skills.map((skill, index) => (
                      <Badge key={index} variant='secondary'>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Heart className='h-5 w-5' />
                    Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-wrap gap-2'>
                    {interests.map((interest, index) => (
                      <Badge key={index} variant='outline'>
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <BookOpen className='h-5 w-5' />
                    Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    {courses.map((course, index) => (
                      <div key={index} className='text-sm'>
                        • {course}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='projects' className='space-y-6'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <Code className='h-5 w-5' />
                    Projects
                  </CardTitle>
                  <Button onClick={() => handleAddItem('project')}>
                    <Plus className='h-4 w-4 mr-2' />
                    Add Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                {projects.map(project => (
                  <div key={project.id} className='border rounded-lg p-4'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <h3 className='font-semibold'>{project.title}</h3>
                        <p className='text-sm text-muted-foreground mt-1'>
                          {project.description}
                        </p>
                        <div className='flex flex-wrap gap-2 mt-2'>
                          {project.technologies.map((tech, index) => (
                            <Badge
                              key={index}
                              variant='secondary'
                              className='text-xs'
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-primary hover:underline text-sm mt-2 inline-block'
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleEditItem('project', project)}
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() =>
                            handleDeleteItem('project', project.id)
                          }
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='languages' className='space-y-6'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <Globe className='h-5 w-5' />
                    Languages
                  </CardTitle>
                  <Button onClick={() => handleAddItem('language')}>
                    <Plus className='h-4 w-4 mr-2' />
                    Add Language
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                {languages.map(lang => (
                  <div key={lang.id} className='border rounded-lg p-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h3 className='font-semibold'>{lang.language}</h3>
                        <p className='text-sm text-muted-foreground'>
                          {lang.proficiency}
                        </p>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleEditItem('language', lang)}
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleDeleteItem('language', lang.id)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
