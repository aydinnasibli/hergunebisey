// sanity/schemaTypes/podcast.ts
export const podcast = {
    name: 'podcast',
    title: 'Podcast',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Başlık',
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
            name: 'description',
            title: 'Açıklama',
            type: 'text',
            description: 'Podcast bölümü hakkında kısa açıklama',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'duration',
            title: 'Süre',
            type: 'string',
            description: 'Podcast süre formatı (ör: 45-60 dk)',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'publishedAt',
            title: 'Yayınlanma Tarihi',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'coverImage',
            title: 'Kapak Görseli',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'categories',
            title: 'Kategoriler',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: { type: 'podcastCategory' },
                },
            ],
            validation: (Rule: any) => Rule.required().min(1),
        },
        {
            name: 'hosts',
            title: 'Sunucular',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: { type: 'author' },
                },
            ],
        },
        {
            name: 'guests',
            title: 'Konuklar',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'İsim',
                            type: 'string',
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'title',
                            title: 'Unvan',
                            type: 'string',
                        },
                        {
                            name: 'image',
                            title: 'Fotoğraf',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'transcript',
            title: 'Transkript',
            type: 'blockContent',
            description: 'Podcast bölümünün yazılı transkripti',
        },

        {
            name: 'platforms',
            title: 'Platform Linkleri',
            type: 'object',
            fields: [
                { name: 'spotify', title: 'Spotify', type: 'url' },
                { name: 'applePodcasts', title: 'Apple Podcasts', type: 'url' },
                { name: 'googlePodcasts', title: 'Google Podcasts', type: 'url' },
                { name: 'youtube', title: 'YouTube', type: 'url' },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            media: 'coverImage',
        },
    },
};

// Create a separate schema for podcast categories
export const podcastCategory = {
    name: 'podcastCategory',
    title: 'Podcast Kategorileri',
    type: 'document',
    fields: [
        {
            name: 'id',
            title: 'ID',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'name',
            title: 'Kategori Adı',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Açıklama',
            type: 'text',
        },
    ],
};