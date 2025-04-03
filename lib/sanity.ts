// lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-03-25', // use current date in format YYYY-MM-DD
  useCdn: process.env.NODE_ENV === 'production',
})

// Helper function for generating image URLs with the Sanity Image Pipeline
const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

// Helper functions for fetching data
export const getBlogPosts = async () => {
  return client.fetch(`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->title
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
      "categories": categories[]->title
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
// Add this function to lib/sanity.ts
export const getLatestBlogPostsForCarousel = async (limit = 5) => {
  return client.fetch(`
    *[_type == "blog"] | order(publishedAt desc)[0..${limit - 1}] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->title
    }
  `)
}