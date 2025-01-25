import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/models/BlogPost';

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');

export const getAllPosts = (): BlogPost[] => {
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      imagePath: data.imagePath,
      date: data.date,
      excerpt: data.excerpt || content.slice(0, 150) + '...', // Generate an excerpt if not provided
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export function getPostBySlug(slug: string): BlogPost {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    imagePath: data.imagePath,
    date: data.date,
    excerpt: data.excerpt || content.slice(0, 150) + '...', // Generate an excerpt if not provided
    content,
  };
}
