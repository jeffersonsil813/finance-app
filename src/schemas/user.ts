import { z } from "zod";

const passwordSchema = z
  .string({
    error: (issue) =>
      issue.input === undefined
        ? "Password is required"
        : "Password must be a valid string",
  })
  .min(8, "The password must be at least 8 characters long")
  .regex(/(?=(?:.*\d){3,})/, "The password must contain at least 3 numbers")
  .regex(/[A-Z]/, "The password should contain at least 1 uppercase character")
  .regex(
    /[^a-zA-Z0-9]/,
    "The password must contain at least one special character",
  );

export const baseUserSchema = z.object({
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
          ? "Your full name is required"
          : "Your full name must be a valid string",
    })
    .trim()
    .min(1, "Your full name is required")
    .refine(
      (value) => {
        const parts = value.split(/\s+/);
        return parts.length >= 2 && parts.every((part) => part.length >= 2);
      },
      {
        message: "Please enter your full name",
      },
    ),

  password: passwordSchema,
});

export const updateUserSchema = baseUserSchema.partial();

export const loginSchema = baseUserSchema
  .pick({
    email: true,
    password: true,
  })
  .extend({
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Password is required"
            : "Password must be a valid string",
      })
      .min(1, "Password is required"),
  });

export const registerSchema = baseUserSchema
  .extend({
    confirmPassword: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Confirm password is required"
            : "Confirm password must be a valid string",
      })
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Current password is required"
            : "Current password must be a valid string",
      })
      .min(1, "Current password is required"),

    newPassword: passwordSchema,

    confirmPassword: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Confirm password is required"
            : "Confirm password must be a valid string",
      })
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
