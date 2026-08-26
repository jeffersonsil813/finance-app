import CustomButton from "@/components/custom-button";
import PasswordField from "@/components/password-field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { handleApiError } from "@/lib/handle-api-error";
import { changePasswordSchema } from "@/schemas/user";
import { changeUserPassword } from "@/services/user-me";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Container from "./container";

const ChangePasswordForm = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: changeUserPassword,
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(changePasswordSchema),
    onSubmit: async (values) => {
      await toast.promise(mutateAsync(values), {
        loading: "Saving...",
        success: (data) => {
          formik.resetForm();
          return data?.message;
        },
        error: (err) => {
          handleApiError(err);
          return null;
        },
      });
    },
  });

  return (
    <Container>
      <Accordion>
        <AccordionItem>
          <AccordionTrigger
            className="text-sm font-semibold text-black p-0"
            style={{ textDecoration: "none" }}
          >
            Change Password
          </AccordionTrigger>
          <AccordionContent className="mt-4 pt-4 pb-0 border-t border-[#F5F5F2]">
            <form onSubmit={formik.handleSubmit} className="space-y-3">
              <PasswordField
                fieldLabelProps={{
                  htmlFor: "currentPassword",
                  children: "Current Password",
                }}
                inputProps={{
                  id: "currentPassword",
                  placeholder: "........",
                  value: formik.values.currentPassword,
                  onChange: formik.handleChange,
                }}
                fieldDescriptionProps={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                    ? {
                        children: formik.errors.currentPassword,
                        errorInField: true,
                      }
                    : undefined
                }
              />

              <PasswordField
                fieldLabelProps={{
                  htmlFor: "newPassword",
                  children: "New Password",
                }}
                inputProps={{
                  id: "newPassword",
                  placeholder: "........",
                  value: formik.values.newPassword,
                  onChange: formik.handleChange,
                }}
                fieldDescriptionProps={
                  formik.touched.newPassword && formik.errors.newPassword
                    ? {
                        children: formik.errors.newPassword,
                        errorInField: true,
                      }
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
                  placeholder: "........",
                  value: formik.values.confirmPassword,
                  onChange: formik.handleChange,
                }}
                fieldDescriptionProps={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? {
                        children: formik.errors.confirmPassword,
                        errorInField: true,
                      }
                    : undefined
                }
              />

              <CustomButton
                variant="black"
                type="submit"
                className="w-full"
                disabled={isPending}
              >
                Update Password
              </CustomButton>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default ChangePasswordForm;
