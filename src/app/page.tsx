import { getAllPosts } from '@/lib/getPosts';
import HomeClient from './page.client';
import { BlogPost } from '@/types/blogPost';

export default function Home() {
  const blogPosts: BlogPost[] = getAllPosts();

  return <HomeClient blogPosts={blogPosts} />;
}
