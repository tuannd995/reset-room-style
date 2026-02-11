# Room Reset Style

A bedroom-focused lifestyle and product recommendation blog built with Next.js 16, TypeScript, and Tailwind CSS.

## Overview

Room Reset Style is an affiliate content website focused on bedroom styling, lighting, bedding, and small bedroom solutions. The site features SEO-optimized articles, curated product recommendations, and a clean, premium lifestyle brand aesthetic.

## Features

- **SEO-Optimized Blog Posts**: Dynamic routing with proper metadata and semantic HTML
- **Category Pages**: Organized content by bedroom topics (Lighting, Bedding, Small Bedroom, Storage)
- **Product Recommendations**: Featured products with affiliate link placeholders
- **Responsive Design**: Fully responsive layout (mobile, tablet, desktop)
- **Table of Contents**: Auto-generated TOC for blog posts
- **Newsletter Section**: Email subscription form (frontend only)
- **Clean Architecture**: Scalable structure ready for future backend integration

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Font**: Inter (Google Fonts)

## Project Structure

```
src/
├── app/
│   ├── [slug]/              # Dynamic blog post pages
│   ├── category/[slug]/     # Category listing pages
│   ├── about/               # About page
│   ├── privacy-policy/      # Privacy policy page
│   ├── affiliate-disclosure/ # Affiliate disclosure page
│   ├── layout.tsx           # Root layout with Header/Footer
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/
│   ├── Header.tsx           # Site header/navigation
│   ├── Footer.tsx           # Site footer
│   ├── Hero.tsx             # Homepage hero section
│   ├── PostCard.tsx         # Blog post card component
│   ├── CategoryCard.tsx    # Category card component
│   ├── ProductBox.tsx       # Product recommendation box
│   ├── NewsletterSection.tsx # Newsletter signup
│   └── TableOfContents.tsx  # Auto-generated TOC
├── data/
│   └── mockData.ts          # Mock data (posts, categories, products)
├── types/
│   └── index.ts             # TypeScript type definitions
└── utils/
    └── markdown.ts          # Markdown to HTML converter
```

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
pnpm build
```

### Production

```bash
pnpm start
```

## Routes

- `/` - Homepage with hero, categories, latest articles, featured products
- `/[slug]` - Individual blog post pages
- `/category/[slug]` - Category listing pages
- `/about` - About page
- `/privacy-policy` - Privacy policy
- `/affiliate-disclosure` - Affiliate disclosure

## Data Structure

Currently using mock data in `src/data/mockData.ts`. The structure is designed to be easily replaced with a backend API or database (e.g., Supabase) in the future.

### Post Structure

- `slug`: URL-friendly identifier
- `title`: Post title
- `excerpt`: Short description
- `content`: Markdown content
- `featuredImage`: Image URL
- `category`: Category slug
- `publishedAt`: Publication date
- `author`: Author name
- `readTime`: Estimated reading time in minutes

### Category Structure

- `slug`: URL-friendly identifier
- `name`: Display name
- `description`: Category description
- `image`: Category image URL

### Product Structure

- `id`: Unique identifier
- `name`: Product name
- `description`: Product description
- `image`: Product image URL
- `benefits`: Array of benefit strings
- `affiliateLink`: Optional affiliate link (for future use)

## SEO Features

- Proper metadata on all pages
- Semantic HTML structure
- Clean URL structure
- Open Graph tags
- Descriptive alt text placeholders

## Future Enhancements

- Backend integration (Supabase recommended)
- User authentication (if needed)
- Admin dashboard for content management
- Real product images
- Search functionality
- Comments system
- Newsletter backend integration
- Analytics integration

## License

Private project - All rights reserved.
