export interface BlogPost {
  slug: string; // Unique identifier for the post
  imagePath: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
}
