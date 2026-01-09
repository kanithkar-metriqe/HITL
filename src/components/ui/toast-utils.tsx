import type { ToastContentProps } from "react-toastify";

import { toast } from "react-toastify";

import ToastMessage from "./toast-message";

type ToastMessageProps = {
  message: string;
  type?: "Error" | "Success" | undefined;
};

export function showToastMessage({ type, message }: ToastMessageProps) {
  toast((t: ToastContentProps) => (
    <ToastMessage
      message={message}
      onClose={() => toast.dismiss(t.toastProps.toastId)}
      type={type}
    />
  ), {
    toastId: `${type}`,
  });
}
