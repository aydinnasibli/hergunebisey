// sanity/schemaTypes/author.ts
export const author = {
    name: 'author',
    title: 'Yazarlar',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'İsim',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Profil Resmi',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'bio',
            title: 'Biyografi',
            type: 'text',
            description: 'Yazar hakkında kısa bir biyografi',
        },
        {
            name: 'position',
            title: 'Pozisyon',
            type: 'string',
            description: 'Yazarın şirketteki pozisyonu veya uzmanlık alanı',
        },
        {
            name: 'socials',
            title: 'Sosyal Medya Hesapları',
            type: 'object',
            fields: [
                { name: 'twitter', title: 'Twitter', type: 'url' },
                { name: 'linkedin', title: 'LinkedIn', type: 'url' },
                { name: 'instagram', title: 'Instagram', type: 'url' },
            ],
        },
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
        },
    },
}