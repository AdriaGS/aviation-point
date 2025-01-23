'use client';

import { Title } from '@/components/ui/title';
import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // You can send the data to an API endpoint if needed
    console.log('Form submitted:', formData);
  };

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200'>
      <div className='py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
          <div className='p-8 w-full'>
            <Title size='xl' as='h1' className='mb-6'>Contact Us</Title>
            {!submitted ? (
              <form onSubmit={handleSubmit} className='max-w-lg space-y-4'>
                <div>
                  <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='mt-1 block w-full px-4 py-2 border rounded-md text-gray-900'
                  />
                </div>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='mt-1 block w-full px-4 py-2 border rounded-md text-gray-900'
                  />
                </div>
                <div>
                  <label htmlFor='message' className='block text-sm font-medium text-gray-700'>
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className='mt-1 block w-full px-4 py-2 border rounded-md text-gray-900'
                  />
                </div>
                <button
                  type='submit'
                  className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition'
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className='text-lg text-green-700'>
                Thank you for reaching out! We’ll get back to you soon.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
