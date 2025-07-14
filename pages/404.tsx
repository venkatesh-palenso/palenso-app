import React from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  ArrowLeft,
  Search,
  Building,
  Calendar,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Custom404() {
  const quickLinks = [
    { label: 'Jobs', href: '/jobs', icon: Search },
    { label: 'Companies', href: '/companies', icon: Building },
    { label: 'Events', href: '/events', icon: Calendar },
    { label: 'Resources', href: '/resources', icon: BookOpen },
  ];

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4'>
      <div className='max-w-4xl mx-auto text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Coming Soon Illustration */}
          <div className='relative mb-8'>
            <div className='w-64 h-64 mx-auto relative'>
              {/* Main circle */}
              <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full animate-pulse'></div>

              {/* Construction elements */}
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='relative'>
                  {/* Crane arm */}
                  <div className='w-32 h-2 bg-primary/60 rounded-full transform rotate-45 origin-left'></div>
                  <div className='w-2 h-16 bg-primary/60 rounded-full absolute top-0 left-0 transform -translate-x-1/2'></div>

                  {/* Building blocks */}
                  <div className='absolute top-8 left-8 w-6 h-6 bg-primary/40 rounded transform rotate-12'></div>
                  <div className='absolute top-12 left-4 w-4 h-4 bg-primary/30 rounded transform -rotate-6'></div>
                  <div className='absolute top-16 left-12 w-5 h-5 bg-primary/50 rounded transform rotate-45'></div>

                  {/* Construction hat */}
                  <div className='absolute -top-4 -left-2 w-8 h-6 bg-yellow-400 rounded-t-full transform rotate-12'></div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className='absolute top-4 right-8 w-3 h-3 bg-primary/30 rounded-full'
              ></motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className='absolute bottom-8 left-4 w-2 h-2 bg-primary/40 rounded-full'
              ></motion.div>
              <motion.div
                animate={{ y: [-5, 15, -5] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className='absolute top-16 left-4 w-2.5 h-2.5 bg-primary/25 rounded-full'
              ></motion.div>
            </div>
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-8'
          >
            <h1 className='text-6xl md:text-8xl font-bold text-primary mb-4'>
              404
            </h1>
            <h2 className='text-2xl md:text-3xl font-semibold text-foreground mb-4'>
              Page Under Construction
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
              Oops! It looks like this page is still being built. Our team is
              working hard to bring you amazing features. In the meantime,
              explore what we already have to offer!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='flex flex-col sm:flex-row gap-4 justify-center mb-12'
          >
            <Link href='/'>
              <Button size='lg' className='flex items-center gap-2'>
                <Home className='h-4 w-4' />
                Go Home
              </Button>
            </Link>
            <Button
              variant='outline'
              size='lg'
              className='flex items-center gap-2'
              onClick={() => window.history.back()}
            >
              <ArrowLeft className='h-4 w-4' />
              Go Back
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='mb-8'
          >
            <h3 className='text-lg font-semibold text-foreground mb-6'>
              Explore Our Platform
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto'>
              {quickLinks.map(link => (
                <Link key={link.href} href={link.href}>
                  <Card className='hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group'>
                    <CardContent className='p-4 text-center'>
                      <link.icon className='h-6 w-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform' />
                      <p className='text-sm font-medium text-foreground'>
                        {link.label}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='text-center'
          >
            <p className='text-sm text-muted-foreground'>
              Can&apos;t find what you&apos;re looking for?{' '}
              <Link href='/help' className='text-primary hover:underline'>
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
