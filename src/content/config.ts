// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    crediti: z.object({
      cliente: z.string(),
      agenzia: z.string(),
      regista: z.string(),
      casa: z.string(),
      soundDesign: z.string(),
      mix: z.string(),
    }),
    vimeoId: z.number(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    credits: z.string(),
    tags: z.array(z.string()),
  }),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
};
