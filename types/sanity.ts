// types/sanity.ts
export interface PodcastCategory {
    _id: string;
    id: string;
    name: string;
    description?: string;
}

export interface Author {
    name: string;
    image?: any;
    bio?: string;
    position?: string;
}

export interface Guest {
    name: string;
    title?: string;
    image?: any;
}

export interface PodcastPlatforms {
    spotify?: string;
    applePodcasts?: string;
    googlePodcasts?: string;
    youtube?: string;
}

export interface Highlight {
    title: string;
    timestamp: string;
    description?: string;
}

export interface Podcast {
    _id: string;
    title: string;
    slug: { current: string };
    description: string;
    coverImage?: any;
    duration: string;
    publishedAt: string;
    audioFile?: string;
    transcript?: any;
    highlights?: Highlight[];
    platforms?: PodcastPlatforms;
    categories: PodcastCategory[];
    hosts?: Author[];
    guests?: Guest[];
}
