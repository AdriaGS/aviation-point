import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { BlogPost } from '@/types/blogPost';

export default function BlogPosts({ featuredArticle, blogPosts }: { featuredArticle: string, blogPosts: BlogPost[] }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6'>
      {blogPosts.filter((post) => post.slug !== featuredArticle).slice(0, 2).map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <Card className='overflow-hidden transition-shadow duration-300 hover:shadow-lg h-full flex flex-col'>
            <CardContent className='p-0 h-full flex flex-col'>
              {/* Image Section */}
              <div className='flex-shrink-0'>
                <Image
                  src={post.imagePath || '/blog-images/placeholder.jpg'}
                  alt={post.title}
                  width={200}
                  height={200}
                  className='w-full h-48 object-cover'
                />
              </div>

              {/* Text Section */}
              <div className='p-4 flex flex-col flex-grow'>
                {/* Title */}
                <h3 className='font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100'>
                  {post.title}
                </h3>

                {/* Date (Pushed to the bottom) */}
                <p className='text-sm text-gray-500 dark:text-gray-400 mt-auto'>
                  {post.date}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
