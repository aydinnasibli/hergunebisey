// sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import { blog } from './blog'
import { category } from './blog'
import { blockContent } from './blog'
import { author } from './author'
import { quote } from './quote'
export const schema: { types: SchemaTypeDefinition[] } = {
    types: [blog, category, blockContent, author, quote],
}