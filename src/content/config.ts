import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		url: z.string().url().optional(),
		repo: z.string().url().optional(),
        tech: z.array(z.string()).optional(),
        featured: z.boolean().default(false),
	}),
});

export const collections = { projects };
