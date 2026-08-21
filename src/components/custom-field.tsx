import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

export interface CustomFieldProps {
  fieldLabelProps: React.ComponentProps<typeof FieldLabel>;
  inputProps: React.ComponentProps<typeof Input>;
  fieldDescriptionProps?: React.ComponentProps<typeof FieldDescription> & {
    errorInField?: boolean;
  };
}

const CustomField = ({
  fieldLabelProps,
  inputProps,
  fieldDescriptionProps,
}: CustomFieldProps) => {
  const { errorInField, ...restDescriptionProps } = fieldDescriptionProps ?? {};

  return (
    <Field>
      <FieldLabel className="max-w-fit" {...fieldLabelProps}>
        {fieldLabelProps.children}
      </FieldLabel>
      <Input
        className="bg-gray-field rounded-full h-10 focus-visible:border-green-600 focus-visible:ring-green-600/20 focus-visible:ring-2"
        {...inputProps}
      />
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

export default CustomField;
