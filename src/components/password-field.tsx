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

  const { errorInField, ...restDescriptionProps } = fieldDescriptionProps ?? {};

  return (
    <Field>
      <FieldLabel className="max-w-fit" {...fieldLabelProps}>
        {fieldLabelProps.children}
      </FieldLabel>

      <div className="relative">
        <Input
          type={fieldType}
          className="bg-gray-field rounded-full h-10 focus-visible:border-green-600 focus-visible:ring-green-600/20 focus-visible:ring-2 pr-10"
          {...inputProps}
        />

        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500/70 hover:text-gray-500 transition-colors"
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
        <FieldDescription
          className={errorInField ? "text-red-600" : ""}
          {...restDescriptionProps}
        >
          {fieldDescriptionProps.children}
        </FieldDescription>
      )}
    </Field>
  );
};

export default PasswordField;
