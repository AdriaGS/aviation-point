import { Title } from '@/components/ui/title';
import React from 'react';
import Image from 'next/image';

export default async function AboutPage() {
  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200'>
      <div className='py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-5xl'>
          <div className='p-8 w-full'>
            <Title size='xl' as='h1' className='mb-6'>About Aviation Point</Title>
            <p className='text-lg text-gray-700 dark:text-gray-300 leading-7'>
              Welcome to <strong>Aviation Point</strong> — your ultimate hub for everything aviation! Whether you are an aviation enthusiast, a frequent traveler, or a professional in the industry, we have created a space where you can stay informed, explore data, and deepen your passion for flight.
            </p>
            <p className='text-lg text-gray-700 dark:text-gray-300 leading-7 mt-4'>
              At <strong>Aviation Point</strong>, we provide real-time flight tracking, historical flight data, airport insights, airline details, and the latest aviation trends. Our goal is to make aviation information easily accessible, whether you are monitoring flights, planning your journey, or simply exploring the world of aviation.
            </p>
            <p className='text-lg text-gray-700 dark:text-gray-300 leading-7 mt-4'>
              Built with precision and powered by a love for aviation, our platform is designed to keep you connected to the skies. Explore, discover, and take flight with <strong>Aviation Point</strong>.
            </p>

            <div className='mt-6 flex justify-center'>
              <Image
                src='/aviation-point-wallpaper.png'
                alt='Aviation Point - Your Hub for Aviation'
                width={800}
                height={400}
                className='rounded-lg shadow-md'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
