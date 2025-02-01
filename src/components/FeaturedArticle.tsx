import Image from 'next/image';

interface FeaturedArticleProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export function FeaturedArticle({
  title,
  description,
  image,
  link,
}: FeaturedArticleProps) {
  return (
    <div className='relative rounded-lg overflow-hidden shadow-lg'>
      <Image
        src={image}
        alt={title}
        className='w-full h-48 object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
      <div className='absolute bottom-0 left-0 p-6'>
        <h3 className='text-xl font-bold text-white'>{title}</h3>
        <p className='text-sm text-gray-200 mt-2'>{description}</p>
        <a
          href={link}
          className='mt-4 inline-block text-sm font-medium text-white hover:underline'
        >
          Read More →
        </a>
      </div>
    </div>
  );
}