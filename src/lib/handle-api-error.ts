import toast from "react-hot-toast";

type ApiErrorResponse = {
  error?: string | Record<string, string[]>;
};

export function handleApiError(error: unknown): void {
  const errorData: ApiErrorResponse =
    (error as any)?.response?.data || (error as ApiErrorResponse);

  const apiError = errorData?.error || error;

  if (typeof apiError === "object" && apiError !== null) {
    Object.values(apiError).forEach((messages) => {
      if (Array.isArray(messages)) {
        messages.forEach((message) => {
          if (typeof message === "string") {
            toast.error(message);
          }
        });
      }
    });
    return;
  }

  if (typeof apiError === "string") {
    toast.error(apiError);
    return;
  }
}
