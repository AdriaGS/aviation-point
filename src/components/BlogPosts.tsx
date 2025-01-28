import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { getAllPosts } from '@/lib/getPosts';
import { BlogPost } from '@/types/blogPost';

export default function BlogPosts() {
  const blogPosts: BlogPost[] = getAllPosts();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {blogPosts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <Card className='overflow-hidden transition-shadow duration-300 hover:shadow-lg'>
            <CardContent className='p-0'>
              <Image
                src={post.imagePath || '/blog-images/placeholder.jpg'}
                alt={post.title}
                width={200}
                height={200}
                className='w-full h-48 object-cover'
              />
              <div className='p-4'>
                <h3 className='font-semibold text-lg mb-1 text-gray-900 dark:text-gray-100'>{post.title}</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{post.date}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
