// lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

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

// Helper functions for fetching data - server-side
export const getBlogPosts = async () => {
  return client.fetch(`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->title,
      "author": author->{name, image, bio}
    }
  `)
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


// Client-side helpers for fetching data
export const fetchBlogPosts = async () => {
  return clientSide.fetch(`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->title,
      "author": author->{name, image, bio}
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

export const searchBlogPosts = async (query: string) => {
  return clientSide.fetch(
    `
    *[_type == "blog" && (title match $query || excerpt match $query)] | order(publishedAt desc) {
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
    { query: `*${query}*` } as Record<string, string>
  );
};

export const getBlogPostsByCategory = async (category: string) => {
  return clientSide.fetch(`
    *[_type == "blog" && $category in categories[]->title] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->title,
      "author": author->{name, image, bio}
    }
  `, { category })
}