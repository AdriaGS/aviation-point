import { notFound } from 'next/navigation'
import Image from 'next/image'

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Flight Delays',
    slug: 'understanding-flight-delays',
    date: '2023-05-15',
    image: '/placeholder.svg?height=400&width=800',
    content: 'Content for understanding flight delays...',
  },
  {
    id: 2,
    title: 'Top 10 Airports for Layovers',
    slug: 'top-10-airports-for-layovers',
    date: '2023-05-10',
    image: '/placeholder.svg?height=400&width=800',
    content: 'Content for top 10 airports for layovers...',
  },
  {
    id: 3,
    title: 'How to Pack for a Long Flight',
    slug: 'how-to-pack-for-a-long-flight',
    date: '2023-05-05',
    image: '/placeholder.svg?height=400&width=800',
    content: 'Content for how to pack for a long flight...',
  },
]

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200'>
      <div className='py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100'>{post.title}</h1>
          <p className='text-sm text-gray-500 dark:text-gray-400 mb-6'>{post.date}</p>
          <Image
            src={post.image || '/placeholder.svg'}
            alt={post.title}
            width={800}
            height={400}
            className='w-full h-64 object-cover rounded-lg mb-6'
          />
          <div className='prose lg:prose-xl dark:prose-invert'>
            <p>{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

