// react
import React, { useState, useEffect } from 'react';

// next
import Link from 'next/link';
import { useRouter } from 'next/router';

// framer motion
import { motion } from 'framer-motion';

// lucide icons
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  CheckCircle,
  User,
  Building,
  GraduationCap,
} from 'lucide-react';

// components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

// Mock event data
const mockEvent = {
  id: '1',
  title: 'Tech Career Fair 2024',
  description: 'Join us for the biggest tech career fair of the year! Connect with top companies, attend workshops, and discover exciting opportunities in the tech industry.',
  date: '2024-03-15',
  time: '10:00 AM - 6:00 PM',
  location: 'San Francisco Convention Center',
  address: '123 Main Street, San Francisco, CA 94102',
  type: 'Career Fair',
  organizer: 'TechCorp',
  organizerLogo: '/api/placeholder/100/100',
  attendees: 500,
  maxAttendees: 1000,
  price: 0,
  category: 'Technology',
  tags: ['Career Fair', 'Networking', 'Workshops', 'Tech Jobs'],
  agenda: [
    '10:00 AM - Opening Keynote',
    '11:00 AM - Company Presentations',
    '12:00 PM - Networking Lunch',
    '2:00 PM - Workshop Sessions',
    '4:00 PM - Job Interviews',
    '6:00 PM - Closing Remarks',
  ],
  requirements: [
    'Valid student ID or recent graduate certificate',
    'Professional attire recommended',
    'Bring copies of your resume',
    'Business cards (optional)',
  ],
};

const RegisterEventPage: React.FC = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    graduationYear: '',
    currentRole: '',
    company: '',
    dietaryRestrictions: '',
    specialNeeds: '',
    interests: '',
    agreeToTerms: false,
    agreeToMarketing: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle event registration logic here
    console.log('Registering for event:', { eventId, formData });
    // Redirect to confirmation page
    router.push(`/events/${eventId}/confirmation`);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <section className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Link href={`/events/${eventId}`}>
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Event
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Register for Event
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Complete your registration for {mockEvent.title}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Details */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Event Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mockEvent.organizerLogo} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {mockEvent.organizer.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {mockEvent.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Organized by {mockEvent.organizer}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(mockEvent.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4 mr-2" />
                        {mockEvent.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4 mr-2" />
                        {mockEvent.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Users className="h-4 w-4 mr-2" />
                        {mockEvent.attendees} / {mockEvent.maxAttendees} registered
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {mockEvent.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
                        Agenda:
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {mockEvent.agenda.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
                        Requirements:
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {mockEvent.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Registration Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <User className="mr-2 h-5 w-5" />
                          Personal Information
                        </CardTitle>
                        <CardDescription>
                          Your basic contact information
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              placeholder="John"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              placeholder="Doe"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="john.doe@example.com"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Academic/Professional Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <GraduationCap className="mr-2 h-5 w-5" />
                          Academic & Professional Information
                        </CardTitle>
                        <CardDescription>
                          Help us understand your background
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="university">University/Institution</Label>
                            <Input
                              id="university"
                              value={formData.university}
                              onChange={(e) => handleInputChange('university', e.target.value)}
                              placeholder="Stanford University"
                            />
                          </div>
                          <div>
                            <Label htmlFor="major">Major/Field of Study</Label>
                            <Input
                              id="major"
                              value={formData.major}
                              onChange={(e) => handleInputChange('major', e.target.value)}
                              placeholder="Computer Science"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="graduationYear">Graduation Year</Label>
                            <Input
                              id="graduationYear"
                              value={formData.graduationYear}
                              onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                              placeholder="2024"
                            />
                          </div>
                          <div>
                            <Label htmlFor="currentRole">Current Role (if any)</Label>
                            <Input
                              id="currentRole"
                              value={formData.currentRole}
                              onChange={(e) => handleInputChange('currentRole', e.target.value)}
                              placeholder="Student, Intern, etc."
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="company">Current Company (if employed)</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            placeholder="TechCorp"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Additional Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Building className="mr-2 h-5 w-5" />
                          Additional Information
                        </CardTitle>
                        <CardDescription>
                          Help us provide a better experience
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="interests">Areas of Interest</Label>
                          <Textarea
                            id="interests"
                            value={formData.interests}
                            onChange={(e) => handleInputChange('interests', e.target.value)}
                            placeholder="What areas of technology are you most interested in? (e.g., AI, Web Development, Data Science)"
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                          <Input
                            id="dietaryRestrictions"
                            value={formData.dietaryRestrictions}
                            onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                            placeholder="Vegetarian, Vegan, Gluten-free, etc."
                          />
                        </div>

                        <div>
                          <Label htmlFor="specialNeeds">Special Accommodations</Label>
                          <Textarea
                            id="specialNeeds"
                            value={formData.specialNeeds}
                            onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                            placeholder="Any special accommodations you may need..."
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Terms and Conditions */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Terms and Conditions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked: boolean) => handleInputChange('agreeToTerms', checked as boolean)}
                            required
                          />
                          <Label htmlFor="agreeToTerms" className="text-sm">
                            I agree to the event terms and conditions and privacy policy *
                          </Label>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeToMarketing"
                            checked={formData.agreeToMarketing}
                            onCheckedChange={(checked: boolean) => handleInputChange('agreeToMarketing', checked as boolean)}
                          />
                          <Label htmlFor="agreeToMarketing" className="text-sm">
                            I agree to receive updates about future events and opportunities
                          </Label>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Submit */}
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <p>Registration is free for this event</p>
                            <p>You will receive a confirmation email shortly</p>
                          </div>
                          <Button type="submit" size="lg">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Register for Event
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RegisterEventPage; 