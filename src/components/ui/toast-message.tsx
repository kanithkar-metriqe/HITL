import { X } from "lucide-react";

import { Button } from "./button";
import TickMarkCircle from "./icons/tick-mark-circle";
import { cn } from "@/lib/utils";

type ToastMessageProps = {
  className?: string;
  heading?: string;
  message: string;
  onClose?: () => void;
  type?: "Error" | "Success";
};

/**
 * ToastMessage component displays a notification message with optional heading, icon, and close button.
 *
 * @param {string} [className] - Additional CSS classes for the toast container.
 * @returns {JSX.Element} The rendered toast message component.
 */
const ToastMessage: React.FC<ToastMessageProps> = ({
  className = "",
  type,
  heading = type,
  message,
  onClose,
}) => {
  const compClass
    = type === "Error"
      ? "border-red-800 w-[420px]"
      : "border-green-800 w-[420px]";
  //* ---------------JSX---------------
  return (
    <div
      className={cn(
        `flex items-start justify-between w-100 bg-white shadow-lg rounded-[5px] p-4 border-l-8`,
        compClass,
        className,
        !type && "p-5",
      )}
    >
      {/* Left Side - Icon & Text */}
      <div className="flex items-center gap-3">
        {type === "Error"
          ? (
              <div className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-error-600">
                <X className="w-4 h-4" />
              </div>
            )
          : (
              <TickMarkCircle className="w-6 h-6 text-green-700 bg-transparent" />
            )}

        <div>
          {heading && <p className="font-semibold text-gray-800">{heading}</p>}

          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>

      {/* Right Side - Small Close Button */}
      <Button
        className="p- z-50 cursor-pointer text-gray-500 transition rounded-full hover:text-gray-800"
        onClick={onClose}
        variant="none"
      >
        <X className="w-3 h-3 z-10" />
      </Button>
    </div>
  );
};

export default ToastMessage;
