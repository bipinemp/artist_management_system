import { z } from "zod";

export const baseRegisterSchema = z.object({
  first_name: z
    .string({ required_error: "First name is required" })
    .min(1, { message: "First name is required" }),
  last_name: z
    .string({ required_error: "Last name is required" })
    .min(1, { message: "Last name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email(),
  phone: z.string().optional(),
  dob: z.string().optional(),
  gender: z
    .enum(["m", "f", "o"], { required_error: "Gender is required" })
    .optional(),
  address: z.string().optional(),
});

export const createUserSchema = baseRegisterSchema.extend({
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password of 8 characters required" }),
});

export type TCreateUser = z.infer<typeof createUserSchema>;
export type TEditUser = z.infer<typeof baseRegisterSchema>;

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

export type TLogin = z.infer<typeof loginSchema>;
