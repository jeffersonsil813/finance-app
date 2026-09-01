import Container from "@/app/(protected)/profile/_components/container";
import CustomButton from "@/components/custom-button";
import CustomField from "@/components/custom-field";
import { fadeInTransition, fadeInUp } from "@/lib/animations";
import { handleApiError } from "@/lib/handle-api-error";
import { formatDate } from "@/lib/utils";
import { updateUserSchema } from "@/schemas/user";
import { getUser, GetUserResponse, updateUser } from "@/services/user-me";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { motion } from "motion/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";

const MotionContainer = motion.create(Container);

const UserHeader = ({ createdAt, email, initials, name }: GetUserResponse) => {
  return (
    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#F5F5F2]">
      <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shrink-0 shadow-md">
        <span className="text-white text-lg font-semibold tracking-wide">
          {initials}
        </span>
      </div>

      <div className="flex flex-col">
        <h4 className="font-semibold text-black truncate">{name}</h4>
        <span className="text-sm text-[#6B7280] truncate">{email}</span>
        <span className="text-xs text-[#9CA3AF] mt-0.5">
          {`Member since ${formatDate(new Date(createdAt))}`}
        </span>
      </div>
    </div>
  );
};

const UserForm = ({ index }: { index: number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
    },
    validationSchema: toFormikValidationSchema(updateUserSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      await toast.promise(mutateAsync(values), {
        loading: "Saving...",
        success: (data) => {
          toggleIsEditing();
          return data?.message;
        },
        error: (err) => {
          handleApiError(err);
          return null;
        },
      });
    },
  });

  const toggleIsEditing = () => setIsEditing((prev) => !prev);

  const handleCancellationEdition = () => {
    formik.setValues({
      email: userData?.email || "",
      name: userData?.name || "",
    });
    toggleIsEditing();
  };

  return (
    <MotionContainer
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={fadeInTransition(index)}
    >
      {userData && (
        <UserHeader
          createdAt={userData.createdAt}
          name={userData.name}
          email={userData.email}
          initials={userData.initials}
        />
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <CustomField
          fieldLabelProps={{ htmlFor: "name", children: "Full Name" }}
          inputProps={{
            id: "name",
            type: "text",
            placeholder: "Sarah Chen",
            value: formik.values.name,
            onChange: formik.handleChange,
            disabled: !isEditing,
          }}
          fieldDescriptionProps={
            formik.touched.name && formik.errors.name
              ? { children: formik.errors.name, errorInField: true }
              : undefined
          }
        />

        <CustomField
          fieldLabelProps={{ htmlFor: "email", children: "Email Address" }}
          inputProps={{
            id: "email",
            type: "email",
            placeholder: "email@example.com",
            value: formik.values.email,
            onChange: formik.handleChange,
            disabled: !isEditing,
          }}
          fieldDescriptionProps={
            formik.touched.email && formik.errors.email
              ? { children: formik.errors.email, errorInField: true }
              : undefined
          }
        />

        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            <CustomButton variant="outline" onClick={handleCancellationEdition}>
              Cancel
            </CustomButton>
            <CustomButton type="submit" disabled={isPending}>
              Save Changes
            </CustomButton>
          </div>
        ) : (
          <CustomButton
            variant="outline"
            className="text-black mt-4 w-full"
            onClick={toggleIsEditing}
          >
            Edit Profile
          </CustomButton>
        )}
      </form>
    </MotionContainer>
  );
};

export default UserForm;
