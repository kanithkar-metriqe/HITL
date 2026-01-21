import React, { useState, type ReactNode, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFileStatusGrid, getPropertyOptions } from "./services";
import type {
  ReportFile,
  DropdownOption,
  FilterSectionState,
  PeriodType,
  DashboardState,
} from "./types";
import CalendarPopup from "@/components/ui/calender";
import CustomDropdown from "@/components/ui/dropdown";
import ReportsTable from "./components/reports-table";
import FileUploadTable from "./components/file-upload";
import metLogo from "../../../public/met-logo.png";

const dummyReportData: ReportFile[] = [
  {
    id: "1",
    fileName: "Annual_Report_2024.pdf",
    uploadDate: "2024-01-15",
    fileUrl: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table.pdf",
  },
  {
    id: "2",
    fileName: "Quarterly_Report_Q1.pdf",
    uploadDate: "2024-04-10",
    fileUrl: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table.pdf",
  },
  {
    id: "3",
    fileName: "Monthly_Report_January.pdf",
    uploadDate: "2024-02-05",
    fileUrl: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table.pdf",
  },
  {
    id: "4",
    fileName: "Monthly_Report_February.pdf",
    uploadDate: "2024-03-05",
    fileUrl: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table.pdf",
  },
  {
    id: "5",
    fileName: "Monthly_Report_March.pdf",
    uploadDate: "2024-04-02",
    fileUrl: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table.pdf",
  },
];

// ========== FILTER SECTION COMPONENT ==========
const FilterSection: React.FC = (): ReactNode => {
  const [state, setState] = useState<FilterSectionState>({
    selectedName: "",
    selectedPeriod: "",
    selectedMonth: "",
    selectedYear: "",
    selectedDate: "",
  });

  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  /* ------------------------------ API Function ------------------------------ */
  const { data: propertyOptions } =
    useQuery(getPropertyOptions());

  const periodOptions: DropdownOption[] = [
    { label: "Day wise", value: "daily" },
    { label: "Monthly", value: "monthly" },
  ];

  const monthOptions: DropdownOption[] = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  const yearOptions: DropdownOption[] = [
    { label: "2026", value: "2026" },
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
  ];

  const handleNameChange = useCallback((value: string): void => {
    setState((prev) => ({ ...prev, selectedName: value }));
  }, []);

  const handlePeriodChange = useCallback((value: string): void => {
    setState((prev) => ({
      ...prev,
      selectedPeriod: value as PeriodType | "",
      selectedMonth: "",
      selectedYear: "",
      selectedDate: "",
    }));
  }, []);

  const handleMonthChange = useCallback((value: string): void => {
    setState((prev) => ({ ...prev, selectedMonth: value }));
  }, []);

  const handleYearChange = useCallback((value: string): void => {
    setState((prev) => ({ ...prev, selectedYear: value }));
  }, []);

  const isAllSelected: boolean = Boolean(
    state.selectedName &&
    state.selectedPeriod &&
    ((state.selectedPeriod === "monthly" &&
      state.selectedMonth &&
      state.selectedYear) ||
      (state.selectedPeriod === "yearly" && state.selectedYear) ||
      (state.selectedPeriod === "daily" && state.selectedDate)),
  );

  const handleSubmit = useCallback((): void => {
    if (isAllSelected) {
      console.log({
        name: state.selectedName,
        period: state.selectedPeriod,
        month: state.selectedMonth,
        year: state.selectedYear,
        date: state.selectedDate,
      });
      alert("Filters submitted successfully!");
    }
  }, [isAllSelected, state]);

  return (
    <div className="space-y-6">
      {/* Name Selection */}
      <CustomDropdown
        label="Property Name"
        value={state.selectedName}
        onChange={handleNameChange}
        options={propertyOptions as DropdownOption[]}
        placeholder="Select Property Name"
      />

      {/* Period Selection */}
      <CustomDropdown
        label="Period"
        value={state.selectedPeriod}
        onChange={handlePeriodChange}
        options={periodOptions}
        placeholder="Select Period"
      />

      {/* Conditional Fields */}
      {state.selectedPeriod === "monthly" && (
        <div className="grid grid-cols-2 gap-4">
          <CustomDropdown
            label="Month"
            value={state.selectedMonth}
            onChange={handleMonthChange}
            options={monthOptions}
            placeholder="Select Month"
          />
          <CustomDropdown
            label="Year"
            value={state.selectedYear}
            onChange={handleYearChange}
            options={yearOptions}
            placeholder="Select Year"
          />
        </div>
      )}

      {state.selectedPeriod === "yearly" && (
        <CustomDropdown
          label="Year"
          value={state.selectedYear}
          onChange={handleYearChange}
          options={yearOptions}
          placeholder="Select Year"
        />
      )}

      {state.selectedPeriod === "daily" && (
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
          >
            <span
              className={state.selectedDate ? "text-gray-900" : "text-gray-500"}
            >
              {state.selectedDate
                ? new Date(
                    state.selectedDate + "T00:00:00",
                  ).toLocaleDateString()
                : "Pick a date"}
            </span>
            <ChevronDown size={16} />
          </button>

          {showCalendar && (
            <CalendarPopup
              value={state.selectedDate}
              onChange={(date) =>
                setState((prev) => ({ ...prev, selectedDate: date }))
              }
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isAllSelected}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          isAllSelected
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        Submit
      </button>
    </div>
  );
};

// ========== MAIN APP COMPONENT ==========

const Dashboard: React.FC = (): ReactNode => {
  const [state, setState] = useState<DashboardState>({
    activeTab: "br",
  });

  const handleTabChange = useCallback((tab: "br" | "reports"): void => {
    setState({ activeTab: tab });
  }, []);

  /* ------------------------------ API Function ------------------------------ */
  const { data: fileStatusGrid, isFetching: isFileStatusGridFetching } =
    useQuery(getFileStatusGrid());

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex justify-between sticky top-0 z-100 bg-white shadow">
        <div>
          <img src={metLogo} alt="Logo" className="h-12 p-5 py-1" />
        </div>
      </header>
      <div className="max-w-8xl mx-auto w-full flex-1 flex flex-col p-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
          <div className="flex gap-8 px-6 border-b border-gray-200">
            <button
              onClick={() => handleTabChange("br")}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                state.activeTab === "br"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              BR
            </button>
            <button
              onClick={() => handleTabChange("reports")}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                state.activeTab === "reports"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Reports
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8 overflow-y-auto flex-1">
            {state.activeTab === "br" && (
              <div className="grid grid-cols-3 gap-8 h-full">
                {/* Left: Table */}
                <div className="col-span-2 flex flex-col overflow-hidden">
                  <FileUploadTable data={fileStatusGrid || []} isfetching={isFileStatusGridFetching}/>
                </div>

                {/* Right: Filters */}
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Filters
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex-1 overflow-y-auto">
                    <FilterSection />
                  </div>
                </div>
              </div>
            )}

            {state.activeTab === "reports" && (
              <div className="w-full h-full">
                <ReportsTable data={dummyReportData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
