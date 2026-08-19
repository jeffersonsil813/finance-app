"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { CustomFieldProps } from "./custom-field";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

type PasswordFieldProps = CustomFieldProps;

const PasswordField = ({
  fieldLabelProps,
  inputProps,
  fieldDescriptionProps,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const fieldType = showPassword ? "text" : "password";

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Field>
      <FieldLabel className="max-w-fit" {...fieldLabelProps}>
        {fieldLabelProps.children}
      </FieldLabel>

      <div className="relative">
        <Input
          type={fieldType}
          className="bg-gray-field rounded-full h-10 focus-visible:border-light-green focus-visible:ring-light-green/20 focus-visible:ring-2 pr-10"
          {...inputProps}
        />

        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-subtitle/70 hover:text-gray-subtitle transition-colors"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {fieldDescriptionProps && (
        <FieldDescription {...fieldDescriptionProps}>
          {fieldDescriptionProps.children}
        </FieldDescription>
      )}
    </Field>
  );
};

export default PasswordField;
