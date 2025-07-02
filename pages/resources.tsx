import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  Video,
  BookOpen,
  Download,
  Filter,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resourceType, setResourceType] = useState('all');
  const [category, setCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Resume Writing Guide',
      type: 'Guide',
      category: 'Resume',
      description:
        'Learn how to create a compelling resume that stands out to employers. Includes templates and examples.',
      downloads: '2.5k',
      rating: 4.8,
      format: 'PDF',
      size: '2.3 MB',
    },
    {
      id: 2,
      title: 'Interview Preparation Tips',
      type: 'Video',
      category: 'Interview',
      description:
        'Master common interview questions and learn techniques to ace your next interview.',
      downloads: '1.8k',
      rating: 4.6,
      format: 'MP4',
      size: '45 MB',
    },
    {
      id: 3,
      title: 'Networking Strategies',
      type: 'Guide',
      category: 'Networking',
      description:
        'Build your professional network and create meaningful connections in your industry.',
      downloads: '1.2k',
      rating: 4.7,
      format: 'PDF',
      size: '1.8 MB',
    },
    {
      id: 4,
      title: 'Salary Negotiation Guide',
      type: 'Guide',
      category: 'Negotiation',
      description:
        'Learn how to negotiate your salary and benefits effectively.',
      downloads: '950',
      rating: 4.5,
      format: 'PDF',
      size: '3.1 MB',
    },
    {
      id: 5,
      title: 'LinkedIn Profile Optimization',
      type: 'Video',
      category: 'Social Media',
      description:
        'Optimize your LinkedIn profile to attract recruiters and opportunities.',
      downloads: '1.5k',
      rating: 4.4,
      format: 'MP4',
      size: '32 MB',
    },
    {
      id: 6,
      title: 'Career Change Guide',
      type: 'Guide',
      category: 'Career Planning',
      description:
        'Navigate a successful career transition with step-by-step guidance.',
      downloads: '800',
      rating: 4.9,
      format: 'PDF',
      size: '4.2 MB',
    },
  ];

  const categories = [
    { label: 'All Resources', value: 'all' },
    { label: 'Resume', value: 'resume' },
    { label: 'Interview', value: 'interview' },
    { label: 'Networking', value: 'networking' },
    { label: 'Career Planning', value: 'career-planning' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Video size={24} className='text-blue-600' />;
      case 'Guide':
        return <FileText size={24} className='text-blue-600' />;
      default:
        return <BookOpen size={24} className='text-blue-600' />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <>
      <Head>
        <title>Resources - Palenso</title>
        <meta
          name='description'
          content='Access career resources, guides, and tools on Palenso'
        />
      </Head>

      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className='text-4xl font-bold mb-2'>Career Resources</h1>
          <p className='text-xl text-gray-600 mb-8'>
            Access guides, templates, and tools to advance your career
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className='p-6 mb-8'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
              <div className='md:col-span-4'>
                <div className='relative'>
                  <Search
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={20}
                  />
                  <Input
                    placeholder='Search resources'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='pl-10'
                  />
                </div>
              </div>
              <div className='md:col-span-3'>
                <Select value={resourceType} onValueChange={setResourceType}>
                  <SelectTrigger>
                    <SelectValue placeholder='Resource Type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Types</SelectItem>
                    <SelectItem value='guide'>Guides</SelectItem>
                    <SelectItem value='video'>Videos</SelectItem>
                    <SelectItem value='template'>Templates</SelectItem>
                    <SelectItem value='tool'>Tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='md:col-span-3'>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder='Category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Categories</SelectItem>
                    <SelectItem value='resume'>Resume</SelectItem>
                    <SelectItem value='interview'>Interview</SelectItem>
                    <SelectItem value='networking'>Networking</SelectItem>
                    <SelectItem value='career-planning'>
                      Career Planning
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='md:col-span-2'>
                <Button className='w-full h-14'>
                  <Filter size={20} className='mr-2' />
                  Filter
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className='mb-8'>
            <TabsList className='grid w-full grid-cols-5'>
              {categories.map((category, index) => (
                <TabsTrigger key={index} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Results Count */}
        <div className='mb-6'>
          <p className='text-gray-600'>Showing {resources.length} resources</p>
        </div>

        {/* Resources Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className='h-full cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300'>
                <CardContent className='p-6'>
                  <div className='flex justify-between items-start mb-4'>
                    <Badge variant='default' className='mb-2'>
                      {resource.type}
                    </Badge>
                    <Badge variant='outline'>{resource.format}</Badge>
                  </div>

                  <div className='flex items-center mb-4'>
                    <div className='mr-3'>{getIcon(resource.type)}</div>
                    <h3 className='text-xl font-semibold'>{resource.title}</h3>
                  </div>

                  <Badge variant='secondary' className='mb-4'>
                    {resource.category}
                  </Badge>

                  <p className='text-gray-600 text-sm mb-6'>
                    {resource.description}
                  </p>

                  <div className='flex justify-between items-center mb-3'>
                    <span className='text-gray-600 text-sm'>
                      Downloads: {resource.downloads}
                    </span>
                    <span className='text-gray-600 text-sm'>
                      Size: {resource.size}
                    </span>
                  </div>

                  <div className='flex justify-between items-center mb-6'>
                    <div className='flex items-center gap-1'>
                      <span className='text-gray-600 text-sm mr-1'>
                        Rating:
                      </span>
                      <div className='flex'>{renderStars(resource.rating)}</div>
                      <span className='text-gray-600 text-sm ml-1'>
                        {resource.rating}
                      </span>
                    </div>
                  </div>

                  <Button className='w-full'>
                    <Download size={20} className='mr-2' />
                    Download
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
