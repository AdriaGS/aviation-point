import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Flight Delays',
    slug: 'understanding-flight-delays',
    date: '2023-05-15',
    image: '/placeholder.svg?height=200&width=200',
    excerpt: 'Learn about the common causes of flight delays and how to deal with them.',
  },
  {
    id: 2,
    title: 'Top 10 Airports for Layovers',
    slug: 'top-10-airports-for-layovers',
    date: '2023-05-10',
    image: '/placeholder.svg?height=200&width=200',
    excerpt: 'Discover the best airports to spend your layover time, featuring great amenities and attractions.',
  },
  {
    id: 3,
    title: 'How to Pack for a Long Flight',
    slug: 'how-to-pack-for-a-long-flight',
    date: '2023-05-05',
    image: '/placeholder.svg?height=200&width=200',
    excerpt: 'Essential tips and tricks for packing efficiently for your next long-haul flight.',
  },
]

export default function BlogPage() {
  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200'>
      <div className='py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100'>Flight Tracker Blog</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className='overflow-hidden transition-shadow duration-300 hover:shadow-lg'>
                  <CardContent className='p-0'>
                    <Image
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      width={200}
                      height={200}
                      className='w-full h-48 object-cover'
                    />
                    <div className='p-4'>
                      <h2 className='font-semibold text-lg mb-1 text-gray-900 dark:text-gray-100'>{post.title}</h2>
                      <p className='text-sm text-gray-500 dark:text-gray-400 mb-2'>{post.date}</p>
                      <p className='text-sm text-gray-600 dark:text-gray-300'>{post.excerpt}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

