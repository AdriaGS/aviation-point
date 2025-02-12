import { getAllPosts } from '@/lib/getPosts';
import HomeClient from './page.client';
import { BlogPost } from '@/types/blogPost';
import { Metadata } from 'next';

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
  const blogPosts: BlogPost[] = getAllPosts();

  return <HomeClient blogPosts={blogPosts} />;
}
