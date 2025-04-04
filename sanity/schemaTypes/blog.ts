// sanity/schemaTypes/blog.ts
// sanity/schemaTypes/blog.ts
export const blog = {
    name: 'blog',
    title: 'Blog Posts',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'author',
            title: 'Yazar',
            type: 'reference',
            to: { type: 'author' },
            description: 'Bu gönderinin yazarını seçin',
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            description: 'A short summary of the blog post',
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        },
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection: any) {
            const { author } = selection
            return { ...selection, subtitle: author ? `Yazar: ${author}` : 'Yazar belirtilmemiş' }
        },
    },
};

// sanity/schemaTypes/category.ts
export const category = {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
    ],
};

// sanity/schemaTypes/blockContent.ts
// sanity/schemaTypes/blockContent.ts
export const blockContent = {
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
        {
            title: 'Block',
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
            ],
            lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' }
            ],
            marks: {
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                ],
                annotations: [
                    {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                            {
                                title: 'URL',
                                name: 'href',
                                type: 'url',
                            },
                        ],
                    },
                ],
            },
        },
        {
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description: 'Important for SEO and accessibility',
                },
                {
                    name: 'alignment',
                    type: 'string',
                    title: 'Alignment',
                    options: {
                        list: [
                            { title: 'Left', value: 'left' },
                            { title: 'Center', value: 'center' },
                            { title: 'Right', value: 'right' },
                        ],
                    },
                },
                {
                    name: 'customSize',
                    type: 'object',
                    title: 'Custom Size',
                    fields: [
                        {
                            name: 'width',
                            type: 'string',
                            title: 'Width',
                        },
                    ],
                },
            ],
        },
    ],
};