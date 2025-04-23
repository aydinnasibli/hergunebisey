// lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Podcast, PodcastCategory } from '@/types/sanity';

// Server-side client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-03-25',
  useCdn: process.env.NODE_ENV === 'production',
})

// Client-side client (for use in React components)
export const clientSide = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-03-25',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

// Helper function for generating image URLs with the Sanity Image Pipeline
const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}


// Update the getBlogPosts function to filter out future posts
export const getBlogPosts = async () => {
  const now = new Date().toISOString();
  return client.fetch(`
    *[_type == "blog" && publishedAt <= $now] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->title,
      "author": author->{name, image, bio}
    }
  `, { now })
}

// Update the client-side function too
export const fetchBlogPosts = async () => {
  const now = new Date().toISOString();
  return clientSide.fetch(`
    *[_type == "blog" && publishedAt <= $now] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->title,
      "author": author->{name, image, bio}
    }
  `, { now })
}

// Also update searchBlogPosts and getBlogPostsByCategory
export const searchBlogPosts = async (query: string) => {
  const now = new Date().toISOString();
  return clientSide.fetch(
    `
    *[_type == "blog" && publishedAt <= $now && (title match $query || excerpt match $query)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->title,
      "author": author->{name, image, bio}
    }
    `,
    { query: `*${query}*`, now } as Record<string, string>
  );
};

export const getBlogPostsByCategory = async (category: string) => {
  const now = new Date().toISOString();
  return clientSide.fetch(`
    *[_type == "blog" && publishedAt <= $now && $category in categories[]->title] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->title,
      "author": author->{name, image, bio}
    }
  `, { category, now })
}





export const getBlogPostBySlug = async (slug: string) => {
  return client.fetch(`
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body,
      mainImage,
      publishedAt,
      "categories": categories[]->title,
      "author": author->{name, image, bio}
    }
  `, { slug })
}

export const getCategories = async () => {
  return client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      description
    }
  `)
}



export const fetchCategories = async () => {
  return clientSide.fetch(`
    *[_type == "category"] {
      _id,
      title,
      description
    }
  `)
}





export async function getPodcasts() {
  const now = new Date().toISOString();
  return clientSide.fetch(`
    *[_type == "podcast" && publishedAt <= $now] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      coverImage,
      duration,
      publishedAt,
      "categories": categories[]->{ id, name },
      "hosts": hosts[]->{ name, image, position }
    }
  `, { now });
}

// Get podcast by slug (for individual podcast page)
export const getPodcastBySlug = async (slug: string): Promise<Podcast | null> => {
  return client.fetch(`
    *[_type == "podcast" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      coverImage,
      duration,
      publishedAt,
      audioFile,
      transcript,
      highlights,
      platforms,
      "categories": categories[]->{ id, name },
      "hosts": hosts[]->{ name, image, bio, position },
      guests
    }
  `, { slug })
}

// Get all podcast categories
export const getPodcastCategories = async (): Promise<PodcastCategory[]> => {
  return client.fetch(`
    *[_type == "podcastCategory"] {
      _id,
      id,
      name,
      description
    }
  `)
}

// Get podcasts by category
export const getPodcastsByCategory = async (categoryId: string) => {
  const now = new Date().toISOString();
  return client.fetch(`
    *[_type == "podcast" && publishedAt <= $now && $categoryId in categories[]->id] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      coverImage,
      duration,
      publishedAt,
      "categories": categories[]->{ id, name },
      "hosts": hosts[]->{ name, image, position }
    }
  `, { categoryId, now })
}

