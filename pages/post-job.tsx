import React, { useState } from 'react';
import { ArrowRight, Save, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

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

const PostJobPage: React.FC = () => {
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
      currency: 'USD',
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
    contactPhone: '',
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
    'Contact Information',
  ];

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setJobData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSalaryChange = (field: string, value: string) => {
    setJobData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [field]: value,
      },
    }));
  };

  const addItem = (type: string, value: string) => {
    if (value.trim()) {
      setJobData(prev => ({
        ...prev,
        [type]: [...(prev[type as keyof JobPosting] as string[]), value.trim()],
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
      [type]: (prev[type as keyof JobPosting] as string[]).filter(
        (_, i) => i !== index
      ),
    }));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return (
          jobData.title &&
          jobData.location &&
          jobData.employmentType &&
          jobData.experienceLevel
        );
      case 1:
        return (
          jobData.description && jobData.department && jobData.remotePolicy
        );
      case 2:
        return (
          jobData.responsibilities.length > 0 &&
          jobData.qualifications.length > 0
        );
      case 3:
        return jobData.benefits.length > 0 && jobData.skills.length > 0;
      case 4:
        return (
          jobData.contactEmail &&
          jobData.contactPhone &&
          jobData.applicationDeadline
        );
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
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>
                Basic Job Information
              </h3>
            </div>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='title'>Job Title</Label>
                <Input
                  id='title'
                  placeholder='e.g., Senior Software Engineer'
                  value={jobData.title}
                  onChange={e => handleInputChange('title', e.target.value)}
                />
              </div>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='company'>Company</Label>
                  <Input
                    id='company'
                    value={jobData.company}
                    onChange={e => handleInputChange('company', e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='location'>Location</Label>
                  <Input
                    id='location'
                    placeholder='e.g., San Francisco, CA'
                    value={jobData.location}
                    onChange={e =>
                      handleInputChange('location', e.target.value)
                    }
                  />
                </div>
              </div>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='employmentType'>Employment Type</Label>
                  <select
                    id='employmentType'
                    value={jobData.employmentType}
                    onChange={e =>
                      handleInputChange('employmentType', e.target.value)
                    }
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <option value=''>Select employment type</option>
                    <option value='Full-time'>Full-time</option>
                    <option value='Part-time'>Part-time</option>
                    <option value='Contract'>Contract</option>
                    <option value='Internship'>Internship</option>
                  </select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='experienceLevel'>Experience Level</Label>
                  <select
                    id='experienceLevel'
                    value={jobData.experienceLevel}
                    onChange={e =>
                      handleInputChange('experienceLevel', e.target.value)
                    }
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <option value=''>Select experience level</option>
                    <option value='Entry-level'>Entry-level</option>
                    <option value='1-3 years'>1-3 years</option>
                    <option value='3-5 years'>3-5 years</option>
                    <option value='5+ years'>5+ years</option>
                  </select>
                </div>
              </div>
              <div className='grid md:grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='salaryMin'>Minimum Salary</Label>
                  <Input
                    id='salaryMin'
                    type='number'
                    placeholder='50000'
                    value={jobData.salary.min}
                    onChange={e => handleSalaryChange('min', e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='salaryMax'>Maximum Salary</Label>
                  <Input
                    id='salaryMax'
                    type='number'
                    placeholder='80000'
                    value={jobData.salary.max}
                    onChange={e => handleSalaryChange('max', e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='currency'>Currency</Label>
                  <select
                    id='currency'
                    value={jobData.salary.currency}
                    onChange={e =>
                      handleSalaryChange('currency', e.target.value)
                    }
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <option value='USD'>USD</option>
                    <option value='EUR'>EUR</option>
                    <option value='GBP'>GBP</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Job Details</h3>
            </div>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='description'>Job Description</Label>
                <Textarea
                  id='description'
                  placeholder='Provide a detailed description of the role...'
                  value={jobData.description}
                  onChange={e =>
                    handleInputChange('description', e.target.value)
                  }
                  rows={6}
                />
              </div>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='department'>Department</Label>
                  <Input
                    id='department'
                    placeholder='e.g., Engineering'
                    value={jobData.department}
                    onChange={e =>
                      handleInputChange('department', e.target.value)
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='remotePolicy'>Remote Policy</Label>
                  <select
                    id='remotePolicy'
                    value={jobData.remotePolicy}
                    onChange={e =>
                      handleInputChange('remotePolicy', e.target.value)
                    }
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <option value=''>Select remote policy</option>
                    <option value='On-site'>On-site</option>
                    <option value='Remote'>Remote</option>
                    <option value='Hybrid'>Hybrid</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Requirements</h3>
            </div>
            <div className='space-y-6'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Responsibilities</Label>
                  <div className='flex gap-2'>
                    <Input
                      placeholder='Add a responsibility...'
                      value={newResponsibility}
                      onChange={e => setNewResponsibility(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          addItem('responsibilities', newResponsibility);
                        }
                      }}
                    />
                    <Button
                      onClick={() =>
                        addItem('responsibilities', newResponsibility)
                      }
                      disabled={!newResponsibility.trim()}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {jobData.responsibilities.map((item, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='flex items-center gap-1'
                      >
                        {item}
                        <button
                          onClick={() => removeItem('responsibilities', index)}
                          className='ml-1 hover:text-destructive'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label>Qualifications</Label>
                  <div className='flex gap-2'>
                    <Input
                      placeholder='Add a qualification...'
                      value={newQualification}
                      onChange={e => setNewQualification(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          addItem('qualifications', newQualification);
                        }
                      }}
                    />
                    <Button
                      onClick={() =>
                        addItem('qualifications', newQualification)
                      }
                      disabled={!newQualification.trim()}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {jobData.qualifications.map((item, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='flex items-center gap-1'
                      >
                        {item}
                        <button
                          onClick={() => removeItem('qualifications', index)}
                          className='ml-1 hover:text-destructive'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Benefits & Skills</h3>
            </div>
            <div className='space-y-6'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Benefits</Label>
                  <div className='flex gap-2'>
                    <Input
                      placeholder='Add a benefit...'
                      value={newBenefit}
                      onChange={e => setNewBenefit(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          addItem('benefits', newBenefit);
                        }
                      }}
                    />
                    <Button
                      onClick={() => addItem('benefits', newBenefit)}
                      disabled={!newBenefit.trim()}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {jobData.benefits.map((item, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='flex items-center gap-1'
                      >
                        {item}
                        <button
                          onClick={() => removeItem('benefits', index)}
                          className='ml-1 hover:text-destructive'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label>Required Skills</Label>
                  <div className='flex gap-2'>
                    <Input
                      placeholder='Add a skill...'
                      value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          addItem('skills', newSkill);
                        }
                      }}
                    />
                    <Button
                      onClick={() => addItem('skills', newSkill)}
                      disabled={!newSkill.trim()}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {jobData.skills.map((item, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='flex items-center gap-1'
                      >
                        {item}
                        <button
                          onClick={() => removeItem('skills', index)}
                          className='ml-1 hover:text-destructive'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>
                Contact Information
              </h3>
            </div>
            <div className='space-y-4'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='contactEmail'>Contact Email</Label>
                  <Input
                    id='contactEmail'
                    type='email'
                    placeholder='hr@company.com'
                    value={jobData.contactEmail}
                    onChange={e =>
                      handleInputChange('contactEmail', e.target.value)
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='contactPhone'>Contact Phone</Label>
                  <Input
                    id='contactPhone'
                    placeholder='+1 (555) 123-4567'
                    value={jobData.contactPhone}
                    onChange={e =>
                      handleInputChange('contactPhone', e.target.value)
                    }
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='applicationDeadline'>
                  Application Deadline
                </Label>
                <Input
                  id='applicationDeadline'
                  type='date'
                  value={jobData.applicationDeadline}
                  onChange={e =>
                    handleInputChange('applicationDeadline', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-muted/30'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Post a Job
          </h1>
          <p className='text-muted-foreground'>
            Create a new job posting to attract top talent
          </p>
        </div>

        <div className='max-w-4xl mx-auto'>
          {/* Progress Steps */}
          <div className='mb-8'>
            <div className='flex items-center justify-between'>
              {steps.map((step, index) => (
                <div key={step} className='flex items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index <= activeStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`ml-2 text-sm ${
                      index <= activeStep
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-4 ${
                        index < activeStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardContent className='p-6'>
              {renderStepContent(activeStep)}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className='flex justify-between mt-6'>
            <Button
              variant='outline'
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid(activeStep)}
              >
                <Save className='mr-2 h-4 w-4' />
                Post Job
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!isStepValid(activeStep)}>
                Next
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            )}
          </div>
        </div>

        {/* Success Notification */}
        {showSuccess && (
          <div className='fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg'>
            Job posted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default PostJobPage;
