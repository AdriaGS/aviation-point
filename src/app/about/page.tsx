import { Title } from '@/components/ui/title';
import React from 'react';

export default async function AboutPage() {
  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200'>
      <div className='py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
          <div className='p-8 w-full'>
            <Title size='xl' as='h1' className='mb-6'>About Us</Title>
            <p className='text-lg text-gray-700 leading-7'>
              Welcome to our website! We are passionate about providing high-quality, sustainable, and innovative products that elevate your everyday life.
            </p>
            <p className='text-lg text-gray-700 leading-7 mt-4'>
              Our mission is to create solutions that make a positive impact on our customers and the environment. We believe in the power of simplicity, effectiveness, and sustainability.
            </p>
            <p className='text-lg text-gray-700 leading-7 mt-4'>
              Feel free to explore our collection, and if you have any questions, don’t hesitate to reach out!
            </p>
          </div>
        </div>
      </div>
    </div >
  );
};
