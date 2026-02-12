/**
 * Supabase database types matching your schema.
 * Update these if your tables have more columns (e.g. description, image on categories).
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Omit<ProfileRow, "created_at"> & { created_at?: string };
        Update: Partial<Omit<ProfileRow, "id">>;
      };
      categories: {
        Row: CategoryRow;
        Insert: Omit<CategoryRow, "created_at"> & { created_at?: string };
        Update: Partial<Omit<CategoryRow, "id" | "created_at">>;
      };
      posts: {
        Row: PostRow;
        Insert: Omit<PostRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<PostRow, "id" | "created_at">>;
      };
      products: {
        Row: ProductRow;
        Insert: Omit<ProductRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<ProductRow, "id" | "created_at">>;
      };
    };
  };
}

export interface ProfileRow {
  id: string;
  email: string | null;
  role: string;
  created_at: string;
}

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  created_at: string;
}

export interface PostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category_id: string;
  seo_title: string | null;
  seo_description: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductRow {
  id: string;
  name: string;
  slug: string;
  image: string;
  short_description: string;
  amazon_link: string | null;
  rating: number | null;
  category_id: string;
  created_at: string;
}
