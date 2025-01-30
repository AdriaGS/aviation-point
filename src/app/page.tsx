import { Metadata } from 'next';
import Map from '@/components/Map';
import SearchBar from '@/components/SearchBar';
import BlogPosts from '@/components/BlogPosts';

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
          <h1 className='text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100'>Aviation Point</h1>
          <section className='mb-12'>
            <SearchBar />
          </section>
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100'>Aviation Map</h2>
            <Map />
          </section>
          <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100'>Latest Blogs</h2>
            <BlogPosts />
          </section>
        </div>
      </div>
    </div>
  )
}
