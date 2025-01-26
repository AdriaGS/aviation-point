import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAllPosts, getPostBySlug } from '@/lib/getPosts';
import { Metadata } from 'next';
import { remark } from 'remark';
import html from 'remark-html';

// Set metadata dynamically based on the post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt || '',
  };
}

// Generate static paths
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound()
  }

  // Convert Markdown content to HTML
  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200'>
      <div className='py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100'>{post.title}</h1>
          <p className='text-sm text-gray-500 dark:text-gray-400 mb-6'>{post.date}</p>
          <Image
            src={post.imagePath || '/blog-images/placeholder.jpg'}
            alt={post.title}
            width={800}
            height={400}
            className='w-full h-64 object-cover rounded-lg mb-6'
          />
          <div className='prose lg:prose-xl dark:prose-invert'>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        </div>
      </div>
    </div>
  )
}

