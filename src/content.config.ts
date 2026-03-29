import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    author: z.string(),
    authorTitle: z.string(),
    authorAvatar: z.string(),
    authorFollowers: z.number(),
    timestamp: z.string(),
    likes: z.number(),
    reposts: z.number(),
    image: z.string().optional(),
  }),
});

const comments = defineCollection({
  type: 'content',
  schema: z.object({
    postSlug: z.string(),
    commentId: z.string(),
    author: z.string(),
    authorTitle: z.string(),
    authorAvatar: z.string(),
    timestamp: z.string(),
    likes: z.number(),
    parentComment: z.string().nullable(),
    order: z.number(),
  }),
});

export const collections = { posts, comments };
