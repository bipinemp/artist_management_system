import { z } from "zod";

export const musicSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" }),
  album_name: z
    .string({ required_error: "Album name is required" })
    .min(1, { message: "Album name is required" }),
  genre: z.enum(["rnb", "country", "classic", "rock", "jazz"], {
    required_error: "Genre is required",
  }),
});

export type TMusic = z.infer<typeof musicSchema>;
