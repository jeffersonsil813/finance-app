import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

export interface CustomFieldProps {
  fieldLabelProps: React.ComponentProps<typeof FieldLabel>;
  inputProps: React.ComponentProps<typeof Input>;
  fieldDescriptionProps?: React.ComponentProps<typeof FieldDescription>;
}

const CustomField = ({
  fieldLabelProps,
  inputProps,
  fieldDescriptionProps,
}: CustomFieldProps) => {
  return (
    <Field>
      <FieldLabel className="max-w-fit" {...fieldLabelProps}>
        {fieldLabelProps.children}
      </FieldLabel>
      <Input
        className="bg-gray-field rounded-full h-10 focus-visible:border-light-green focus-visible:ring-light-green/20 focus-visible:ring-2"
        {...inputProps}
      />
      {fieldDescriptionProps && (
        <FieldDescription {...fieldDescriptionProps}>
          {fieldDescriptionProps.children}
        </FieldDescription>
      )}
    </Field>
  );
};

export default CustomField;
