import CustomButton from "@/components/custom-button";
import CustomField from "@/components/custom-field";
import PasswordField from "@/components/password-field";
import Subtitle from "@/components/subtitle";
import Link from "next/link";

const Register = () => {
  return (
    <div className="flex flex-col space-y-7 items-center justify-center">
      <Subtitle text="Create your account" />

      <div className="bg-white rounded-2xl p-6 w-full shadow-md">
        <form className="flex flex-col gap-4">
          <CustomField
            fieldLabelProps={{ htmlFor: "name", children: "Full Name" }}
            inputProps={{
              id: "name",
              type: "text",
              placeholder: "Sarah Chen",
              autoFocus: true,
            }}
          />

          <CustomField
            fieldLabelProps={{ htmlFor: "email", children: "Email" }}
            inputProps={{
              id: "email",
              type: "email",
              placeholder: "email@example.com",
            }}
          />

          <PasswordField
            fieldLabelProps={{ htmlFor: "password", children: "Password" }}
            inputProps={{
              id: "password",
              placeholder: "Password",
            }}
          />

          <PasswordField
            fieldLabelProps={{
              htmlFor: "confirm-password",
              children: "Confirm Password",
            }}
            inputProps={{
              id: "confirm-password",
              placeholder: "Repeat password",
            }}
          />

          <CustomButton type="submit">Create Account</CustomButton>
        </form>
      </div>

      <div className="flex items-center justify-center gap-1 -mt-2">
        <Subtitle text="Already have an account?" />
        <Link
          href="/"
          className="text-[16px] text-light-green border-b border-transparent hover:border-light-green transition cursor-default"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
