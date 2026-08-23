import CustomButton from "@/components/custom-button";
import CustomField from "@/components/custom-field";
import DatePickerField from "@/components/date-picker-field";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription } from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EXPENSE_CATEGORY_OPTIONS,
  INCOME_CATEGORY_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/lib/constants";
import {
  createTransactionSchema,
  TransactionFormValues,
} from "@/schemas/transaction";
import {
  createTransaction,
  deleteTransaction,
  NewTransactionData,
  updateTransaction,
} from "@/services/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Transaction, Type } from "../../../prisma/generated/browser";

const CATEGORY_OPTIONS = {
  [Type.INCOME]: INCOME_CATEGORY_OPTIONS,
  [Type.EXPENSE]: EXPENSE_CATEGORY_OPTIONS,
};

const CATEGORY_FIELDS = {
  [Type.INCOME]: "incomeCategory",
  [Type.EXPENSE]: "expenseCategory",
} as const;

type CategoryFieldType = (typeof CATEGORY_FIELDS)[keyof typeof CATEGORY_FIELDS];

interface TransactionFormProps {
  defaultValues?: Transaction;
  onSuccess: () => void;
}

interface CategorySelectorProps {
  type: Type;
  formik: ReturnType<typeof useFormik<TransactionFormValues>>;
  onChange: (field: CategoryFieldType, value: string) => void;
  disabled?: boolean;
}

const CategorySelector = ({
  type,
  formik,
  onChange,
  disabled,
}: CategorySelectorProps) => {
  const categoryField = CATEGORY_FIELDS[type];
  const options = CATEGORY_OPTIONS[type];
  const selectedCategory = formik.values[categoryField];
  const categoryError =
    formik.touched[categoryField] && formik.errors[categoryField];

  return (
    <Field>
      <h3 className="font-medium text-black">Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-2">
        {options.map(
          ({ icon: OpIcon, label, value: OpValue, representativeColor }) => {
            const isSelected = selectedCategory === OpValue;

            return (
              <button
                key={OpValue}
                type="button"
                disabled={disabled}
                onClick={() => onChange(categoryField, OpValue)}
                className="text-center appearance-none flex flex-col flex-1 gap-1.5 items-center justify-center p-2.5 border border-[#E5E5E0] hover:border-[#D1D5DB] rounded-xl text-xs font-medium transition-all text-[#6B7280] hover:bg-gray-field bg-transparent disabled:opacity-50"
                style={
                  isSelected
                    ? {
                        color: representativeColor,
                        borderColor: representativeColor,
                        backgroundColor: `color-mix(in srgb, ${representativeColor} 15%, white)`,
                      }
                    : undefined
                }
              >
                <OpIcon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            );
          },
        )}
      </div>

      {categoryError && (
        <FieldDescription className="text-red-600">
          {categoryError}
        </FieldDescription>
      )}
    </Field>
  );
};

const TransactionForm = ({
  defaultValues,
  onSuccess,
}: TransactionFormProps) => {
  const isEditing = !!defaultValues;
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    onSuccess();
  };

  const handlePromiseToast = (
    promise: Promise<any>,
    messages: { loading: string; successFallback: string },
  ) => {
    toast.promise(promise, {
      loading: messages.loading,
      success: (data) => {
        handleSuccess();
        return data?.message || messages.successFallback;
      },
      error: (err: Error) => err.message,
    });
  };

  const { mutateAsync: saveTransaction, isPending: isSaving } = useMutation({
    mutationFn: (values: NewTransactionData) =>
      isEditing
        ? updateTransaction(defaultValues!.id, values)
        : createTransaction(values),
  });

  const { mutateAsync: executeDelete, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteTransaction(defaultValues!.id),
  });

  const formik = useFormik<TransactionFormValues>({
    initialValues: {
      description: defaultValues?.description ?? "",
      amount: defaultValues?.amount ?? 0,
      type: defaultValues?.type ?? TRANSACTION_TYPE_OPTIONS[0].value,
      date: defaultValues?.date ?? new Date(),
      expenseCategory: defaultValues?.expenseCategory ?? undefined,
      incomeCategory: defaultValues?.incomeCategory ?? undefined,
    },
    validationSchema: toFormikValidationSchema(createTransactionSchema),
    onSubmit: (values) => {
      const payload: NewTransactionData = {
        ...values,
        expenseCategory:
          values.type === Type.EXPENSE
            ? (values.expenseCategory ?? null)
            : null,
        incomeCategory:
          values.type === Type.INCOME ? (values.incomeCategory ?? null) : null,
        description: values.description ?? null,
      };

      handlePromiseToast(saveTransaction(payload), {
        loading: isEditing ? "Saving..." : "Creating...",
        successFallback: "Success!",
      });
    },
  });

  const handleDeleteTransaction = () => {
    handlePromiseToast(executeDelete(), {
      loading: "Deleting...",
      successFallback: "Transaction deleted!",
    });
  };

  const handleChangeCategory = (field: CategoryFieldType, value: string) => {
    formik.setFieldValue(field, value);
    formik.setFieldTouched(field, true);
  };

  const handleTypeChange = (value: string) => {
    formik.setFieldValue("type", value);
    formik.setFieldValue(
      value === Type.INCOME ? "expenseCategory" : "incomeCategory",
      undefined,
    );
  };

  const getFieldError = (field: keyof TransactionFormValues) => {
    const error = formik.errors[field];
    const touched = formik.touched[field];
    return (field === "date" ? error : touched && error)
      ? { children: error as string, errorInField: true }
      : undefined;
  };

  const isPending = isSaving || isDeleting;

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <Tabs
        id="type"
        value={formik.values.type}
        onValueChange={handleTypeChange}
        className="space-y-3"
      >
        <TabsList className="w-full rounded-full bg-[#F5F5F2] p-1.5 h-10.25!">
          {TRANSACTION_TYPE_OPTIONS.map(({ label, value }) => {
            const isTabSelected = formik.values.type === value;
            const tabColor = value === Type.EXPENSE ? "#dc2626" : "#16a34a";

            return (
              <TabsTrigger
                key={value}
                value={value}
                className="h-8 rounded-full text-sm font-medium transition-all text-[#6B7280] hover:text-black"
                style={isTabSelected ? { color: tabColor } : undefined}
              >
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <CustomField
          fieldLabelProps={{ htmlFor: "description", children: "Description" }}
          inputProps={{
            id: "description",
            type: "text",
            placeholder: "e.g. Coffee at Blue Bottle",
            value: formik.values.description || "",
            onChange: formik.handleChange,
            disabled: isPending,
          }}
          fieldDescriptionProps={getFieldError("description")}
        />

        <CustomField
          fieldLabelProps={{ htmlFor: "amount", children: "Amount" }}
          inputProps={{
            id: "amount",
            type: "number",
            placeholder: "0.00",
            value: formik.values.amount || "",
            onChange: formik.handleChange,
            disabled: isPending,
          }}
          fieldDescriptionProps={getFieldError("amount")}
        />

        {TRANSACTION_TYPE_OPTIONS.map(({ value }) => (
          <TabsContent
            key={value}
            value={value}
            className="flex flex-col gap-1"
          >
            <CategorySelector
              type={value as Type}
              formik={formik}
              onChange={handleChangeCategory}
              disabled={isPending}
            />
          </TabsContent>
        ))}

        <DatePickerField
          fieldLabelProps={{ htmlFor: "date", children: "Date" }}
          value={formik.values.date}
          onChange={(date) => formik.setFieldValue("date", date)}
          disabled={(date) => date > new Date() || isPending}
          fieldDescriptionProps={getFieldError("date")}
        />
      </Tabs>

      <div className="flex flex-wrap gap-2 items-center">
        {isEditing && (
          <Button
            type="button"
            onClick={handleDeleteTransaction}
            disabled={isDeleting}
            className="order-1 shrink-0 flex items-center justify-center cursor-pointer bg-red-50 hover:bg-red-100 text-red-600 transition-colors rounded-full w-10 h-10 border border-red-100"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}

        <CustomButton
          type="button"
          variant="outline"
          className="order-2 flex-1 min-w-0"
          onClick={onSuccess}
          disabled={isPending}
        >
          Cancel
        </CustomButton>

        <CustomButton
          type="submit"
          variant="primary"
          className="order-3 basis-full md:basis-0 md:flex-1"
          disabled={isPending}
        >
          {isEditing ? "Save Changes" : "Add Transaction"}
        </CustomButton>
      </div>
    </form>
  );
};

export default TransactionForm;
