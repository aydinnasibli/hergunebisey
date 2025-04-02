// sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import { blog } from './blog'
import { category } from './blog'
import { blockContent } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, category, blockContent],
}