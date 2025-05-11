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
            validation: (Rule: any) => Rule.required().min(2).max(500),
            description: 'Alıntı metni (maksimum 500 karakter)'
        },
        {
            name: 'author',
            title: 'Yazar',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
            description: 'Alıntının yazarı'
        },
        {
            name: 'type',
            title: 'Alıntı Tipi',
            type: 'string',
            options: {
                list: [
                    { title: 'Günlük', value: 'daily' },
                    { title: 'Haftalık', value: 'weekly' },
                    { title: 'Aylık', value: 'monthly' }
                ],
                layout: 'radio'
            },
            validation: (Rule: any) => Rule.required(),
            description: 'Alıntının gösterim periyodu'
        },

        {
            name: 'publishedAt',
            title: 'Yayınlanma Tarihi',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
            description: 'Alıntının yayın tarihi. Gelecek bir tarih seçerek alıntıyı ileri bir tarihte yayınlamak için planlayabilirsiniz. Her tip için (günlük, haftalık, aylık) en son yayınlanan alıntı gösterilir.'
        },

        {
            name: 'tags',
            title: 'Etiketler',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            },
            description: 'Alıntı ile ilgili anahtar kelimeler'
        }
    ],
    preview: {
        select: {
            title: 'author',
            subtitle: 'content',
        },
        prepare(selection: any) {
            const { title, subtitle } = selection;
            const truncatedContent = subtitle && subtitle.length > 50
                ? `${subtitle.substring(0, 50)}...`
                : subtitle;

            return {
                ...selection,
                title: `${title}`,
                subtitle: truncatedContent
            };
        }
    }
}