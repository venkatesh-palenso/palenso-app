import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Briefcase,
  Building,
  Users,
  Calendar,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/components/UserProvider';

const HomePage: React.FC = () => {
  const { user, isLoggedIn } = useUser();

  const stats = [
    { label: 'Active Jobs', value: '10,000+' },
    { label: 'Companies', value: '500+' },
    { label: 'Students Hired', value: '50,000+' },
    { label: 'Success Rate', value: '85%' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Smart Job Matching',
      description:
        'AI-powered job recommendations based on your skills and preferences',
    },
    {
      icon: Building,
      title: 'Company Insights',
      description: 'Detailed company profiles and culture information',
    },
    {
      icon: Users,
      title: 'Networking',
      description: 'Connect with professionals and alumni in your field',
    },
    {
      icon: Calendar,
      title: 'Career Events',
      description: 'Attend workshops, career fairs, and networking events',
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description:
        'Access career guides, interview tips, and skill development',
    },
    {
      icon: Briefcase,
      title: 'Application Tracking',
      description: 'Track your job applications and interview status',
    },
  ];

  if (isLoggedIn) {
    // Logged-in user dashboard
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
        {/* Hero Section */}
        <section className='pt-20 pb-16 px-4'>
          <div className='container mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className='text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
                Welcome back, {user?.name}! 👋
              </h1>
              <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto'>
                Ready to take the next step in your career? Explore
                opportunities tailored just for you.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                {user?.role === 'student' ? (
                  <>
                    <Link href='/jobs'>
                      <Button size='lg' className='text-lg px-8'>
                        <Search className='mr-2 h-5 w-5' />
                        Browse Jobs
                      </Button>
                    </Link>
                    <Link href='/profile'>
                      <Button
                        variant='outline'
                        size='lg'
                        className='text-lg px-8'
                      >
                        <Users className='mr-2 h-5 w-5' />
                        View Profile
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href='/post-job'>
                      <Button size='lg' className='text-lg px-8'>
                        <Briefcase className='mr-2 h-5 w-5' />
                        Post a Job
                      </Button>
                    </Link>
                    <Link href='/jobs'>
                      <Button
                        variant='outline'
                        size='lg'
                        className='text-lg px-8'
                      >
                        <Search className='mr-2 h-5 w-5' />
                        View Jobs
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className='py-16 px-4'>
          <div className='container mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white'>
              Quick Actions
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
              {user?.role === 'student' ? (
                <>
                  <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
                    <CardHeader>
                      <CardTitle className='flex items-center'>
                        <Search className='mr-2 h-5 w-5 text-primary' />
                        Find Jobs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-muted-foreground mb-4'>
                        Discover opportunities that match your skills and
                        interests
                      </p>
                      <Link href='/jobs'>
                        <Button variant='outline' className='w-full'>
                          Browse Jobs
                          <ArrowRight className='ml-2 h-4 w-4' />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
                    <CardHeader>
                      <CardTitle className='flex items-center'>
                        <Users className='mr-2 h-5 w-5 text-primary' />
                        My Applications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-muted-foreground mb-4'>
                        Track your job applications and interview status
                      </p>
                      <Link href='/applications'>
                        <Button variant='outline' className='w-full'>
                          View Applications
                          <ArrowRight className='ml-2 h-4 w-4' />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
                    <CardHeader>
                      <CardTitle className='flex items-center'>
                        <BookOpen className='mr-2 h-5 w-5 text-primary' />
                        Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-muted-foreground mb-4'>
                        Access career guides and learning materials
                      </p>
                      <Link href='/resources'>
                        <Button variant='outline' className='w-full'>
                          Explore Resources
                          <ArrowRight className='ml-2 h-4 w-4' />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
                    <CardHeader>
                      <CardTitle className='flex items-center'>
                        <Briefcase className='mr-2 h-5 w-5 text-primary' />
                        Post Job
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-muted-foreground mb-4'>
                        Create a new job posting to attract top talent
                      </p>
                      <Link href='/post-job'>
                        <Button variant='outline' className='w-full'>
                          Create Posting
                          <ArrowRight className='ml-2 h-4 w-4' />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
                    <CardHeader>
                      <CardTitle className='flex items-center'>
                        <Users className='mr-2 h-5 w-5 text-primary' />
                        Manage Jobs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-muted-foreground mb-4'>
                        View and manage your active job postings
                      </p>
                      <Link href='/manage-jobs'>
                        <Button variant='outline' className='w-full'>
                          View Jobs
                          <ArrowRight className='ml-2 h-4 w-4' />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
                    <CardHeader>
                      <CardTitle className='flex items-center'>
                        <Building className='mr-2 h-5 w-5 text-primary' />
                        Company Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-muted-foreground mb-4'>
                        Update your company information and branding
                      </p>
                      <Link href='/company-profile'>
                        <Button variant='outline' className='w-full'>
                          Edit Profile
                          <ArrowRight className='ml-2 h-4 w-4' />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Non-logged-in user landing page
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
      {/* Hero Section */}
      <section className='pt-20 pb-16 px-4'>
        <div className='container mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className='text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
              Connect. Grow. Succeed.
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto'>
              Palenso is the #1 platform for students and recent graduates to
              find jobs and internships. Connect with employers, discover
              opportunities, and launch your career.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/signup'>
                <Button size='lg' className='text-lg px-8'>
                  Get Started
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
              <Link href='/login'>
                <Button variant='outline' size='lg' className='text-lg px-8'>
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='text-center'
              >
                <div className='text-3xl md:text-4xl font-bold text-primary mb-2'>
                  {stat.value}
                </div>
                <div className='text-gray-600 dark:text-gray-300'>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white'>
            Why Choose Palenso?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className='h-full hover:shadow-lg transition-shadow'>
                  <CardHeader>
                    <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                      <feature.icon className='h-6 w-6 text-primary' />
                    </div>
                    <CardTitle className='text-xl'>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className='text-base'>
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 px-4'>
        <div className='container mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
              Ready to start your journey?
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto'>
              Join thousands of students and employers who are already using
              Palenso to connect and grow.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/signup'>
                <Button size='lg' className='text-lg px-8'>
                  Create Account
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
              <Link href='/jobs'>
                <Button variant='outline' size='lg' className='text-lg px-8'>
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
