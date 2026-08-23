import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export interface DatePickerFieldProps {
  fieldLabelProps: React.ComponentProps<typeof FieldLabel>;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
  fieldDescriptionProps?: React.ComponentProps<typeof FieldDescription> & {
    errorInField?: boolean;
  };
}

const DatePickerField = ({
  fieldLabelProps,
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  fieldDescriptionProps,
}: DatePickerFieldProps) => {
  const { errorInField, ...restDescriptionProps } = fieldDescriptionProps ?? {};

  return (
    <Field>
      <FieldLabel className="max-w-fit" {...fieldLabelProps}>
        {fieldLabelProps.children}
      </FieldLabel>

      <Popover>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              className={`bg-gray-field rounded-full h-10 justify-start text-left font-normal ${
                !value ? "text-muted-foreground" : ""
              } ${
                errorInField
                  ? "border-red-600"
                  : "focus-visible:border-green-600 focus-visible:ring-green-600/20 focus-visible:ring-2"
              }`}
            />
          }
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "MM/dd/yyyy") : placeholder}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>

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

export default DatePickerField;
