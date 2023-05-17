import { z } from "zod";

export const postSchema = z.object({
    text: z.string().optional(),
    mediaUrl: z.string().optional() ,
}).refine(data => {
    if (data.text || data.mediaUrl) {
        return true
    }
    return false
})

export type PostSchema = z.infer<typeof postSchema>
