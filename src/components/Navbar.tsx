'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Flight History', href: '/flight-history' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className='sticky top-0 z-100 bg-white dark:bg-gray-800 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center w-full'>
            <Link href='/' className='flex-shrink-0'>
              <Image
                src='/logo-white.png'
                alt='Aviation Point'
                width={200}
                height={200}
                className='h-16 w-16 text-indigo-400'
              />
            </Link>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === item.href
                      ? 'bg-indigo-400 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700'
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              <Button variant='default' className='px-3 py-2 rounded-md text-sm font-medium bg-indigo-400 text-white hover:bg-indigo-500'>
                Log In
              </Button>
              <Button variant='ghost' className='px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700'>
                Sign Up
              </Button>
            </div>
          </div>
          <div className='-mr-2 flex md:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' className='inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  {isOpen ? (
                    <X className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Menu className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-[240px] sm:w-[300px] bg-white dark:bg-gray-800'>
                <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 h-full flex flex-col justify-between'>
                  <div className='mt-6 flex flex-col space-y-4'>
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.href
                          ? 'bg-indigo-400 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700'
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className='flex flex-col space-y-4 mt-6'>
                    <Button variant='default' className='block px-3 py-2 rounded-md text-base font-medium bg-indigo-400 text-white hover:bg-indigo-500'>
                      Log In
                    </Button>
                    <Button variant='ghost' className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700'>
                      Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav >
  )
}
