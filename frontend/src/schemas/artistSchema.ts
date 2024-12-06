import { z } from "zod";

export const artistSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
  dob: z
    .string({ required_error: "DOB is required" })
    .min(1, { message: "DOB is required" }),
  gender: z.enum(["m", "f", "o"], { required_error: "Gender is required" }),
  address: z.string().optional(),
  first_release_year: z
    .string({ required_error: "It is required" })
    .min(1, { message: "It is required" }),
  no_of_albums_released: z
    .string({ required_error: "It is required" })
    .min(1, { message: "It is required" }),
});

export type TArtist = z.infer<typeof artistSchema>;
