// sanity/schemaTypes/quote.ts
export const quote = {
    name: 'quote',
    title: 'Alıntılar',
    type: 'document',
    fields: [
        {
            name: 'content',
            title: 'Alıntı İçeriği',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'author',
            title: 'Yazar',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'type',
            title: 'Alıntı Tipi',
            type: 'string',
            options: {
                list: [
                    { title: 'Günlük', value: 'daily' },
                    { title: 'Haftalık', value: 'weekly' },
                    { title: 'Aylık', value: 'monthly' },
                ],
                layout: 'radio',
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'publishedAt',
            title: 'Yayınlanma Tarihi',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Arka Plan Görseli',
            type: 'image',
            description: 'Alıntının arka planında kullanılacak görsel',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'source',
            title: 'Kaynak',
            type: 'string',
            description: 'Alıntının alındığı kitap, konuşma vb.',
        },
    ],
    preview: {
        select: {
            title: 'content',
            subtitle: 'author',
            media: 'image',
        },
        prepare(selection: any) {
            const { title, subtitle } = selection;
            return {
                ...selection,
                title: title?.length > 50 ? title.substring(0, 50) + '...' : title,
                subtitle: subtitle ? `- ${subtitle}` : '',
            };
        },
    },
};