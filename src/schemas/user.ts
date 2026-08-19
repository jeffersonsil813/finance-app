import { z } from "zod";

const baseUserSchema = z.object({
  email: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Email is required"
          : "Email must be a valid string",
    })
    .min(1, "Email is required")
    .pipe(z.email("Invalid email")),

  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is required"
          : "Name must be a valid string",
    })
    .min(1, "Name is required"),

  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required"
          : "Password must be a valid string",
    })
    .min(8, "The password must be at least 8 characters long")
    .regex(/(?=(?:.*\d){3,})/, "The password must contain at least 3 numbers")
    .regex(
      /[A-Z]/,
      "The password should contain at least 1 uppercase character",
    )
    .regex(
      /[^a-zA-Z0-9]/,
      "The password must contain at least one special character",
    ),
});

export const createUserSchema = baseUserSchema;

export const updateUserSchema = baseUserSchema.omit({ email: true }).partial();
