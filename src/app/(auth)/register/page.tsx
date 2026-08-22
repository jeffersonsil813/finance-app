"use client";

import CustomButton from "@/components/custom-button";
import CustomField from "@/components/custom-field";
import PasswordField from "@/components/password-field";
import Subtitle from "@/components/subtitle";
import { registerSchema } from "@/schemas/user";
import { RegisterClient } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";

const Register = () => {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: RegisterClient,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: (values) => {
      toast.promise(
        mutateAsync(values).then((data) => {
          return data;
        }),
        {
          loading: "Loading...",
          success: (data) => {
            router.push("/");
            return data?.message;
          },
          error: (err: Error) => err.message,
        },
      );
    },
  });

  return (
    <div className="flex flex-col space-y-7 items-center justify-center">
      <Subtitle text="Create your account" />

      <div className="bg-white rounded-2xl p-6 w-full shadow-md">
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <CustomField
            fieldLabelProps={{ htmlFor: "name", children: "Full Name" }}
            inputProps={{
              id: "name",
              type: "text",
              placeholder: "Sarah Chen",
              autoFocus: true,
              value: formik.values.name,
              onChange: formik.handleChange,
            }}
            fieldDescriptionProps={
              formik.touched.name && formik.errors.name
                ? { children: formik.errors.name, errorInField: true }
                : undefined
            }
          />

          <CustomField
            fieldLabelProps={{ htmlFor: "email", children: "Email" }}
            inputProps={{
              id: "email",
              type: "email",
              placeholder: "email@example.com",
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

          <PasswordField
            fieldLabelProps={{
              htmlFor: "confirmPassword",
              children: "Confirm Password",
            }}
            inputProps={{
              id: "confirmPassword",
              placeholder: "Repeat password",
              value: formik.values.confirmPassword,
              onChange: formik.handleChange,
            }}
            fieldDescriptionProps={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? {
                    children: formik.errors.confirmPassword,
                    errorInField: true,
                  }
                : undefined
            }
          />

          <CustomButton type="submit" disabled={isPending}>
            Create Account
          </CustomButton>
        </form>
      </div>

      <div className="flex items-center justify-center gap-1 -mt-2">
        <Subtitle text="Already have an account?" />
        <Link
          href="/"
          className="text-[16px] text-green-600 border-b border-transparent hover:border-green-600 transition cursor-default"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
