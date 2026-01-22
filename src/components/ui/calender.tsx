import type { CalendarPopupProps } from "@/pages/file-status/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";

// ========== CALENDAR POPUP COMPONENT ==========
const CalendarPopup: React.FC<CalendarPopupProps> = ({
  value,
  onChange,
  onClose,
}): ReactNode => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    value ? new Date(value + "T00:00:00") : new Date(),
  );

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth: number = getDaysInMonth(currentMonth);
  const firstDay: number = getFirstDayOfMonth(currentMonth);
  const days: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = (): void => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = (): void => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const handleDayClick = (day: number): void => {
    const year: number = currentMonth.getFullYear();
    const month: string = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const dayStr: string = String(day).padStart(2, "0");
    const dateString: string = `${year}-${month}-${dayStr}`;
    onChange(dateString);
    onClose();
  };

  const isSelected = (day: number): boolean => {
    if (!value) return false;
    const [year, month, dayStr] = value.split("-");
    return (
      parseInt(year) === currentMonth.getFullYear() &&
      parseInt(month) - 1 === currentMonth.getMonth() &&
      parseInt(dayStr) === day
    );
  };

  return (
    <>
      {/* Overlay - Click to close */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Calendar Popup */}
      <div className="fixed z-50 bg-white rounded-lg shadow-xl p-4 border border-gray-200 top-100 left-300 transform -translate-x-1/2 -translate-y-1/2" style={{ minWidth: "300px" }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-900">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => (
            <button
              key={idx}
              onClick={() => day && handleDayClick(day)}
              disabled={!day}
              className={`p-2 text-xs rounded transition-colors ${
                !day
                  ? "text-gray-200 cursor-default"
                  : isSelected(day)
                    ? "bg-blue-600 text-white font-bold"
                    : "bg-gray-50 hover:bg-blue-100 text-gray-900"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CalendarPopup;

// ========== USAGE IN FILTER COMPONENT ==========
// Simply use it as before (no ref passing needed):
//
// {state.selectedPeriod === "daily" && (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       Select Date
//     </label>
//     <button
//       onClick={() => setShowCalendar(!showCalendar)}
//       className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
//     >
//       <span className={state.selectedDate ? "text-gray-900" : "text-gray-500"}>
//         {state.selectedDate ? new Date(state.selectedDate + "T00:00:00").toLocaleDateString() : "Pick a date"}
//       </span>
//       <ChevronDown size={16} />
//     </button>
//
//     {showCalendar && (
//       <CalendarPopup
//         value={state.selectedDate}
//         onChange={(date) => setState((prev) => ({ ...prev, selectedDate: date }))}
//         onClose={() => setShowCalendar(false)}
//       />
//     )}
//   </div>
// )}