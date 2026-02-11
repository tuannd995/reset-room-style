export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  benefits: string[];
  affiliateLink?: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  publishedAt: string;
  author: string;
  readTime: number;
}
