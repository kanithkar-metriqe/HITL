import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { CustomDropdownProps, DropdownOption } from "@/pages/file-status/types";

// ========== CUSTOM DROPDOWN COMPONENT ==========
const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
}): ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Find the label that corresponds to the current value
  const selectedLabel: string = options?.find(
    (option: DropdownOption) => option.value === value
  )?.label || placeholder;

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {selectedLabel}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {options?.length > 0 && options.map((option: DropdownOption) => (
            <button
              key={option?.value}
              onClick={() => {
                onChange(option.value); // Pass the VALUE, not the label
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-gray-900 first:rounded-t-lg last:rounded-b-lg whitespace-nowrap transition-colors ${
                option?.value === value
                  ? "bg-blue-100 border-l-4 border-l-blue-600"
                  : "hover:bg-blue-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
