export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
        },
        {
            name: 'clerkId',
            title: 'Clerk ID',
            type: 'string',
        },
        {
            name: 'comment',
            title: 'Comment',
            type: 'text',
        },
        {
            name: 'blog',
            title: 'Blog',
            type: 'reference',
            to: [{ type: 'blog' }],
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'comment',
        },
    },
}