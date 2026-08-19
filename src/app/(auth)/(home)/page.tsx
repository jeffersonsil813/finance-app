import CustomButton from "@/components/custom-button";
import CustomField from "@/components/custom-field";
import PasswordField from "@/components/password-field";
import Subtitle from "@/components/subtitle";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col space-y-7 items-center justify-center">
      <Subtitle text="Sign in to your account" />

      <div className="bg-white rounded-2xl p-6 w-full shadow-md">
        <form className="flex flex-col gap-4">
          <CustomField
            fieldLabelProps={{ htmlFor: "email", children: "Email" }}
            inputProps={{
              id: "email",
              type: "email",
              placeholder: "email@example.com",
              autoFocus: true,
            }}
          />

          <PasswordField
            fieldLabelProps={{ htmlFor: "password", children: "Password" }}
            inputProps={{
              id: "password",
              placeholder: "Password",
            }}
          />

          <CustomButton type="submit">Sign In</CustomButton>
        </form>
      </div>

      <div className="flex items-center justify-center gap-1 -mt-2">
        <Subtitle text="Don't have an account?" />
        <Link
          href="/register"
          className="text-[16px] text-light-green border-b border-transparent hover:border-light-green transition cursor-default"
        >
          Create one
        </Link>
      </div>
    </div>
  );
}
