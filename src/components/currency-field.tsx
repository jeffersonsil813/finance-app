import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

export interface CurrencyFieldProps {
  fieldLabelProps: React.ComponentProps<typeof FieldLabel>;
  id: string;
  value: number | undefined;
  onValueChange: (value: number | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  fieldDescriptionProps?: React.ComponentProps<typeof FieldDescription> & {
    errorInField?: boolean;
  };
}

const formatToBRL = (value: number | undefined) => {
  if (value === undefined || value === null || isNaN(value)) return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const CurrencyField = ({
  fieldLabelProps,
  id,
  value,
  onValueChange,
  placeholder = "R$ 0,00",
  disabled,
  fieldDescriptionProps,
}: CurrencyFieldProps) => {
  const { errorInField, ...restDescriptionProps } = fieldDescriptionProps ?? {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");

    if (!digitsOnly) {
      onValueChange(undefined);
      return;
    }

    const floatValue = Number(digitsOnly) / 100;
    onValueChange(floatValue);
  };

  return (
    <Field>
      <FieldLabel className="max-w-fit" {...fieldLabelProps}>
        {fieldLabelProps.children}
      </FieldLabel>

      <input
        id={id}
        name={id}
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={formatToBRL(value)}
        onChange={handleChange}
        disabled={disabled}
        className="bg-gray-field rounded-full h-10 w-full px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-green-600 focus-visible:ring-green-600/20 focus-visible:ring-2 border border-border text-black"
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

export default CurrencyField;
