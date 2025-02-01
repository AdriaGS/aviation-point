import { Metadata } from 'next';
import Map from '@/components/Map';
import SearchBar from '@/components/SearchBar';
import BlogPosts from '@/components/BlogPosts';
import Image from 'next/image';
import { ActivityIcon, ClockIcon, CloudSunIcon, GlobeIcon, MapPinIcon, NewspaperIcon, PlaneIcon } from 'lucide-react';
import { StatCard } from '@/components/cards/StatCard';
import { FlightBoard } from '@/components/flight/FlightBoard';
import { WeatherCard } from '@/components/cards/WeatherCard';
import { FeaturedArticle } from '@/components/FeaturedArticle';
import { SectionHeader } from '@/components/SectionHeader';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Aviation Point',
  description: 'Your hub for aviation!',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200'>
      <div className='py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-5xl mx-auto'>
          {/* Hero Section with Animated Plane */}
          <section className='mb-12 text-center'>
            <div className='relative'>
              <h1 className='text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100'>
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-400'>
                  Aviation Point
                </span>
              </h1>
              <div className='absolute inset-0'>
                <Image src='/plane.svg' alt='Plane' width={100} height={100} className='w-24 h-24 absolute top-1/2 left-1/2 translate-x-[200%] -translate-y-1/2' />
              </div>
            </div>
            <p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
              Track live flights, explore aviation data, and stay updated with the latest news
            </p>
          </section>


          {/* Search Section */}
          <section className='mb-12'>
            <Suspense fallback={<div>Loading search bar...</div>}>
              <SearchBar />
            </Suspense>
          </section>

          {/* Quick Stats Grid */}
          <section className='mb-12 grid grid-cols-1 md:grid-cols-3 gap-4'>
            <StatCard
              title='Flights in Air'
              value='45,672'
              icon={<ActivityIcon className='h-6 w-6' />}
              trend='+2.5%'
            />
            <StatCard
              title='Active Airlines'
              value='780'
              icon={<PlaneIcon className='h-6 w-6' />}
            />
            <StatCard
              title='Airports Covered'
              value='4,200+'
              icon={<GlobeIcon className='h-6 w-6' />}
            />
          </section>

          {/* Live Map Section */}
          <section className='mb-12'>
            <SectionHeader
              title='Live Flight Tracker'
              icon={<MapPinIcon className='h-5 w-5' />}
            />
            <div className='rounded-xl overflow-hidden shadow-lg'>
              <Map />
            </div>
          </section>

          {/* Flight Status Board */}
          <section className='mb-12'>
            <SectionHeader
              title='Live Flight Status'
              icon={<ClockIcon className='h-5 w-5' />}
            />
            <FlightBoard
              flights={[
                { flight: 'AA123', status: 'On Time', departure: 'JFK', arrival: 'LAX' },
                { flight: 'DL456', status: 'Delayed', departure: 'ATL', arrival: 'CDG' },
                // ... API data
              ]}
            />
          </section>

          {/* Blog & News Section */}
          <section className='mb-12'>
            <SectionHeader
              title='Latest Aviation News'
              icon={<NewspaperIcon className='h-5 w-5' />}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FeaturedArticle
                title='The Future of Aviation'
                description='Exploring the latest trends in aviation technology.'
                image='/blog-images/placeholder.jpg'
                link='/blog/future-of-aviation'
              />
              <BlogPosts />
            </div>
          </section>

          {/* Weather Widget */}
          <section className='mb-12'>
            <SectionHeader
              title='Major Airport Weather'
              icon={<CloudSunIcon className='h-5 w-5' />}
            />
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <WeatherCard airport='JFK' temp={68} condition='Clear' />
              <WeatherCard airport='LAX' temp={75} condition='Sunny' />
              <WeatherCard airport='DXB' temp={89} condition='Clear' />
              <WeatherCard airport='LHR' temp={55} condition='Cloudy' />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
