import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Bell,
  MessageCircle,
  Menu as MenuIcon,
  User,
  Building,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle';
import { useUser } from './UserProvider';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Jobs', href: '/jobs' },
    { label: 'Companies', href: '/companies' },
    { label: 'Events', href: '/events' },
    { label: 'Resources', href: '/resources' },
  ];

  const userMenuItems =
    user?.role === 'student'
      ? [
          {
            label: 'My Profile',
            href: '/profile',
            icon: User,
          },
          {
            label: 'My Applications',
            href: '/applications',
            icon: MessageCircle,
          },
          { label: 'Saved Jobs', href: '/saved-jobs', icon: Search },
        ]
      : [
          {
            label: 'Company Profile',
            href: '/company-profile',
            icon: Building,
          },
          { label: 'Post a Job', href: '/post-job', icon: Search },
          { label: 'Manage Jobs', href: '/manage-jobs', icon: MessageCircle },
        ];

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Header - Only show for logged-in users */}
      {isLoggedIn && (
        <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <div className='container mx-auto px-4'>
            <div className='flex h-16 items-center justify-between'>
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href='/' className='flex items-center space-x-2'>
                  <span className='text-xl font-bold text-primary'>
                    Palenso
                  </span>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className='hidden md:flex items-center space-x-6'>
                {navItems.map(item => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={
                        router.pathname === item.href ? 'default' : 'ghost'
                      }
                      className='text-sm font-medium'
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </nav>

              {/* Actions */}
              <div className='flex items-center space-x-2'>
                <Button variant='ghost' size='icon'>
                  <Search className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon'>
                  <Bell className='h-4 w-4' />
                </Button>
                <ThemeToggle />

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='relative h-8 w-8 rounded-full'
                    >
                      <Avatar className='h-8 w-8'>
                        <AvatarFallback>{user?.avatar || 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56' align='end' forceMount>
                    <DropdownMenuLabel className='font-normal'>
                      <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>
                          {user?.name}
                        </p>
                        <p className='text-xs leading-none text-muted-foreground capitalize'>
                          {user?.role}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userMenuItems.map(item => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className='flex items-center'>
                          <item.icon className='mr-2 h-4 w-4' />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className='text-destructive'
                      onClick={logout}
                    >
                      <LogOut className='mr-2 h-4 w-4' />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu Button */}
                <Button
                  variant='ghost'
                  size='icon'
                  className='md:hidden'
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <MenuIcon className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className='md:hidden border-t bg-background'>
              <div className='container mx-auto px-4 py-2'>
                <nav className='flex flex-col space-y-2'>
                  {navItems.map(item => (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={
                          router.pathname === item.href ? 'default' : 'ghost'
                        }
                        className='w-full justify-start'
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                  <div className='border-t pt-2 mt-2'>
                    {userMenuItems.map(item => (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant='ghost'
                          className='w-full justify-start'
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className='mr-2 h-4 w-4' />
                          {item.label}
                        </Button>
                      </Link>
                    ))}
                    <Button
                      variant='ghost'
                      className='w-full justify-start text-destructive'
                      onClick={logout}
                    >
                      <LogOut className='mr-2 h-4 w-4' />
                      Sign Out
                    </Button>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </header>
      )}

      {/* Main Content */}
      <main className='flex-1'>{children}</main>

      {/* Footer */}
      <footer className='border-t bg-muted/50'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <p className='text-sm text-muted-foreground'>
              © 2024 Palenso. All rights reserved.
            </p>
            <div className='flex space-x-6'>
              <Link
                href='/privacy'
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Terms of Service
              </Link>
              <Link
                href='/help'
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
