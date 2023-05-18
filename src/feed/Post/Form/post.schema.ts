import { z } from "zod";

export const postSchema = z.object({
	postId: z.string().uuid().optional(),
	authorId: z.string().uuid().optional(),
	text: z.string().optional(),
	media: z
		.any()
		.optional()
		// .transform(data => data ? data[0] : null),
}).refine(data => { 
    if (data.text || data.media) {
        return true
    }
    return false
})

export type PostSchema = z.infer<typeof postSchema>
