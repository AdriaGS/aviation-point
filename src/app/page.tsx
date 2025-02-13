import Map from '@/components/Map';
import SearchBar from '@/components/SearchBar';
import BlogPosts from '@/components/BlogPosts';
import Image from 'next/image';
import { ActivityIcon, ClockIcon, CloudSunIcon, FacebookIcon, GlobeIcon, InstagramIcon, LinkedinIcon, MapPinIcon, NewspaperIcon, PlaneIcon, XIcon } from 'lucide-react';
import { StatCard } from '@/components/cards/StatCard';
import { FlightBoard } from '@/components/flight/FlightBoard';
import { WeatherCard } from '@/components/cards/WeatherCard';
import { FeaturedArticle } from '@/components/FeaturedArticle';
import { SectionHeader } from '@/components/SectionHeader';
import { Suspense } from 'react';
import { getNearestAirports } from '@/lib/airports';
import { getDepartingFlights } from '@/lib/flights';
import { getWeatherAtLocation } from '@/lib/weather';
import { WeatherData } from '@/types/weather';
import { BlogPost } from '@/types/blogPost';
import { getAllPosts } from '@/lib/getPosts';
import { getUserLocation } from '@/lib/location';

export default async function Home() {
  const location = await getUserLocation();
  const airports = await getNearestAirports(location.latitude, location.longitude);
  const flights = airports[0]?.iataCode ? await getDepartingFlights(airports[0].iataCode) : [];
  const weather = await Promise.all(
    airports.map((airport) => getWeatherAtLocation(airport.latitude, airport.longitude))
  );
  const blogPosts: BlogPost[] = getAllPosts();

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
              flights={flights.map(f => ({
                flight: f.flight?.iata,
                status: f.flightStatus,
                departure: f.departure?.iata,
                arrival: f.arrival?.iata
              }))}
            />
          </section>

          {/* Weather Widget */}
          <section className='mb-12'>
            <SectionHeader
              title='Major Airport Weather'
              icon={<CloudSunIcon className='h-5 w-5' />}
            />
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {weather.map((weather: WeatherData, index: number) => (
                <WeatherCard
                  key={airports[index]?.iataCode}
                  airport={airports[index]?.iataCode}
                  temp={weather.temperature}
                  condition={weather.weatherGroup}
                />
              ))}
            </div>
          </section>

          {/* Blog & News Section */}
          <section className='mb-12'>
            <SectionHeader
              title='Latest Blogs'
              icon={<NewspaperIcon className='h-5 w-5' />}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FeaturedArticle
                title='The Future of Aviation'
                description='Exploring the latest trends in aviation technology.'
                image='/blog-images/the-future-of-aviation/cover.png'
                link='/blog/the-future-of-aviation'
              />
              <BlogPosts blogPosts={blogPosts} featuredArticle='the-future-of-aviation' />
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {/* Logo and Description */}
            <div className='space-y-4'>
              <div className='flex items-center'>
                <Image src='/plane.svg' alt='Plane' width={100} height={100} className='w-8 h-8 text-indigo-400' />
                <span className='ml-2 text-xl font-bold text-gray-900 dark:text-gray-100'>
                  Aviation Point
                </span>
              </div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Your gateway to real-time flight tracking and aviation insights.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className='text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4'>
                Quick Links
              </h3>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='/flight-history'
                    className='text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors'
                  >
                    Flight History
                  </a>
                </li>
                <li>
                  <a
                    href='/airports'
                    className='text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors'
                  >
                    Airports
                  </a>
                </li>
                <li>
                  <a
                    href='/blog'
                    className='text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors'
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href='/about'
                    className='text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors'
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className='text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4'>
                Contact
              </h3>
              <ul className='space-y-2'>
                <li className='text-sm text-gray-500 dark:text-gray-400'>
                  Email: support@aviationpoint.com
                </li>
                <li className='text-sm text-gray-500 dark:text-gray-400'>
                  Phone: +1 (555) 123-4567
                </li>
                <li className='text-sm text-gray-500 dark:text-gray-400'>
                  Address: 123 Aviation Way, Sky City
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className='text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4'>
                Follow Us
              </h3>
              <div className='flex space-x-4'>
                <a
                  href='https://twitter.com'
                  className='text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors'
                >
                  <XIcon className='w-5 h-5' />
                </a>
                <a
                  href='https://facebook.com'
                  className='text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors'
                >
                  <FacebookIcon className='w-5 h-5' />
                </a>
                <a
                  href='https://linkedin.com'
                  className='text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors'
                >
                  <LinkedinIcon className='w-5 h-5' />
                </a>
                <a
                  href='https://instagram.com'
                  className='text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors'
                >
                  <InstagramIcon className='w-5 h-5' />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className='mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 text-center'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              &copy; {new Date().getFullYear()} Aviation Point. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
