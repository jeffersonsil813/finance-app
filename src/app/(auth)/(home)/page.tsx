"use client";

import CustomButton from "@/components/custom-button";
import CustomField from "@/components/custom-field";
import PasswordField from "@/components/password-field";
import Subtitle from "@/components/subtitle";
import { loginSchema } from "@/schemas/user";
import { LoginClient } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function Login() {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: LoginClient,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: (values) => {
      toast.promise(
        mutateAsync(values).then(() => {
          router.replace("/dashboard");
        }),
        {
          loading: "Loading...",
          success: "Welcome!",
          error: (err: Error) => err.message,
        },
      );
    },
  });

  return (
    <div className="flex flex-col space-y-7 items-center justify-center">
      <Subtitle text="Sign in to your account" />

      <div className="bg-white rounded-2xl p-6 w-full shadow-md">
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <CustomField
            fieldLabelProps={{ htmlFor: "email", children: "Email" }}
            inputProps={{
              id: "email",
              type: "email",
              placeholder: "email@example.com",
              autoFocus: true,
              value: formik.values.email,
              onChange: formik.handleChange,
            }}
            fieldDescriptionProps={
              formik.touched.email && formik.errors.email
                ? { children: formik.errors.email, errorInField: true }
                : undefined
            }
          />

          <PasswordField
            fieldLabelProps={{ htmlFor: "password", children: "Password" }}
            inputProps={{
              id: "password",
              placeholder: "Password",
              value: formik.values.password,
              onChange: formik.handleChange,
            }}
            fieldDescriptionProps={
              formik.touched.password && formik.errors.password
                ? { children: formik.errors.password, errorInField: true }
                : undefined
            }
          />

          <CustomButton type="submit" disabled={isPending}>
            Sign In
          </CustomButton>
        </form>
      </div>

      <div className="flex items-center justify-center gap-1 -mt-2">
        <Subtitle text="Don't have an account?" />
        <Link
          href="/register"
          className="text-[16px] text-green-600 border-b border-transparent hover:border-green-600 transition cursor-default"
        >
          Create one
        </Link>
      </div>
    </div>
  );
}
