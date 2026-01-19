import React, { useState, type ReactNode } from "react";
import { ChevronDown, RefreshCw } from "lucide-react";
import metLogo from "../../../public/met-logo.png";
import { useQuery } from "@tanstack/react-query";
import { getFileStatusGrid, getPropertyOptions } from "./services";

// ========== TYPE DEFINITIONS ==========
interface FileUpload {
  id: string;
  fileName: string;
  status: "Completed" | "In Progress" | "Failed" | "Pending";
  uploadDate: string;
  size: string;
}

interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder: string;
}

interface StatusBadgeProps {
  status: FileUpload["status"];
}

interface FilterSectionState {
  selectedName: string;
  selectedPeriod: "daily" | "monthly" | "yearly" | "";
  selectedMonth: string;
  selectedYear: string;
  selectedStartDate: string;
  selectedEndDate: string;
}

type PeriodType = "daily" | "monthly" | "yearly";

// ========== DUMMY DATA ==========
const dummyData: FileUpload[] = [
  {
    id: "1",
    fileName: "BR_Report_2024_Q1.xlsx",
    status: "Completed",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
  },
  {
    id: "2",
    fileName: "BR_Report_2024_Q2.xlsx",
    status: "In Progress",
    uploadDate: "2024-04-10",
    size: "3.1 MB",
  },
  {
    id: "3",
    fileName: "BR_Report_2024_Q3.xlsx",
    status: "Failed",
    uploadDate: "2024-07-05",
    size: "2.8 MB",
  },
  {
    id: "4",
    fileName: "BR_Report_2024_Q4.xlsx",
    status: "Pending",
    uploadDate: "2024-10-20",
    size: "2.9 MB",
  },
  {
    id: "5",
    fileName: "BR_Report_2023_Annual.xlsx",
    status: "Completed",
    uploadDate: "2024-01-10",
    size: "5.2 MB",
  },
  {
    id: "6",
    fileName: "BR_Report_2024_Jan.xlsx",
    status: "Completed",
    uploadDate: "2024-02-01",
    size: "1.9 MB",
  },
  {
    id: "7",
    fileName: "BR_Report_2024_Feb.xlsx",
    status: "In Progress",
    uploadDate: "2024-03-05",
    size: "2.1 MB",
  },
  {
    id: "8",
    fileName: "BR_Report_2024_Mar.xlsx",
    status: "Completed",
    uploadDate: "2024-04-02",
    size: "2.3 MB",
  },
];

// ========== CUSTOM DROPDOWN COMPONENT ==========
const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
}): ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {options.map((option: DropdownOption) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-900 first:rounded-t-lg last:rounded-b-lg whitespace-nowrap"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ========== STATUS BADGE COMPONENT ==========
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }): ReactNode => {
  const statusStyles: Record<FileUpload["status"], string> = {
    Completed: "bg-green-100 text-green-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Failed: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

// ========== TABLE COMPONENT ==========
interface FileUploadTableProps {
  data: FileUpload[];
}

const FileUploadTable: React.FC<FileUploadTableProps> = ({
  data,
}): ReactNode => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize: number = 5;

  const startIndex: number = currentPage * pageSize;
  const endIndex: number = startIndex + pageSize;
  const paginatedData: FileUpload[] = data.slice(startIndex, endIndex);

  const totalPages: number = Math.ceil(data.length / pageSize);
  const startRow: number = startIndex + 1;
  const endRow: number = Math.min(endIndex, data.length);

  const handleRefresh = (): void => {
    console.log("Refreshing table...");
  };

  return (
    <div className="space-y-4 flex flex-col h-full">
      {/* Header with Title and Refresh Button */}
      <div className="flex justify-between items-center shrink-0">
        <h3 className="text-lg font-semibold text-gray-900">
          File Uploading Status
        </h3>
        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Refresh"
        >
          <RefreshCw size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden flex-1 flex flex-col">
        <div className="overflow-y-auto flex-1">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Size
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row: FileUpload, idx: number) => (
                <tr
                  key={row.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b border-gray-200 hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {row.fileName}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {row.uploadDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {row.size}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4 flex-shrink-0">
        <div className="text-sm text-gray-600">
          Showing {startRow} - {endRow} of {data.length}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(0)}
            disabled={currentPage === 0}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            First
          </button>

          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Previous
          </button>

          <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
            }
            disabled={currentPage === totalPages - 1}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Next
          </button>

          <button
            onClick={() => setCurrentPage(totalPages - 1)}
            disabled={currentPage === totalPages - 1}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== FILTER SECTION COMPONENT ==========
const FilterSection: React.FC = (): ReactNode => {
  const [state, setState] = useState<FilterSectionState>({
    selectedName: "",
    selectedPeriod: "",
    selectedMonth: "",
    selectedYear: "",
    selectedStartDate: "",
    selectedEndDate: "",
  });

  const nameOptions: DropdownOption[] = [
    { label: "Property 1", value: "prop1" },
    { label: "Property 2", value: "prop2" },
    { label: "Property 3", value: "prop3" },
    { label: "Property 4", value: "prop4" },
  ];

  const periodOptions: DropdownOption[] = [
    { label: "Daily", value: "daily" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
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
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
  ];

  const handleNameChange = (value: string): void => {
    setState((prev) => ({ ...prev, selectedName: value }));
  };

  const handlePeriodChange = (value: string): void => {
    setState((prev) => ({
      ...prev,
      selectedPeriod: value as PeriodType | "",
      selectedMonth: "",
      selectedYear: "",
      selectedStartDate: "",
      selectedEndDate: "",
    }));
  };

  const handleMonthChange = (value: string): void => {
    setState((prev) => ({ ...prev, selectedMonth: value }));
  };

  const handleYearChange = (value: string): void => {
    setState((prev) => ({ ...prev, selectedYear: value }));
  };

  const handleStartDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setState((prev) => ({ ...prev, selectedStartDate: e.target.value }));
  };

  const handleEndDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setState((prev) => ({ ...prev, selectedEndDate: e.target.value }));
  };

  const isAllSelected: boolean =
    !!state.selectedName &&
    !!state.selectedPeriod &&
    ((state.selectedPeriod === "monthly" &&
      !!state.selectedMonth &&
      !!state.selectedYear) ||
      (state.selectedPeriod === "yearly" && !!state.selectedYear) ||
      (state.selectedPeriod === "daily" &&
        !!state.selectedStartDate &&
        !!state.selectedEndDate));

  const handleSubmit = (): void => {
    if (isAllSelected) {
      console.log({
        name: state.selectedName,
        period: state.selectedPeriod,
        month: state.selectedMonth,
        year: state.selectedYear,
        startDate: state.selectedStartDate,
        endDate: state.selectedEndDate,
      });
      alert("Filters submitted successfully!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Name Selection */}
      <CustomDropdown
        label="Name"
        value={state.selectedName}
        onChange={handleNameChange}
        options={nameOptions}
        placeholder="Select Property"
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={state.selectedStartDate}
              onChange={handleStartDateChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={state.selectedEndDate}
              onChange={handleEndDateChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
interface DashboardState {
  activeTab: "br" | "reports";
}

const Dashboard: React.FC = (): ReactNode => {
  const [state, setState] = useState<DashboardState>({
    activeTab: "br",
  });

  const handleTabChange = (tab: "br" | "reports"): void => {
    setState({ activeTab: tab });
  };

    /* ------------------------------ API Function ------------------------------ */
    const { data : propertyOptions , isFetching : isPropertyFetching }
    = useQuery(getPropertyOptions());
    console.log("🚀 ~ Dashboard ~ isFetching:", isPropertyFetching);
    console.warn("🚀 ~ Dashboard ~ data:", propertyOptions);

    const { data : fileStatusGrid , isFetching : isFileStatusGridFetching }
    = useQuery(getFileStatusGrid());
    console.log("🚀 ~ Dashboard ~ isFetching:", isFileStatusGridFetching);
    console.warn("🚀 ~ Dashboard ~ data:", fileStatusGrid);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex justify-between sticky top-0 z-100 bg-white shadow">
        <div>
          <img src={metLogo} alt="Logo" className="h-12 p-5 py-1" />
        </div>
      </header>
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col p-8">
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
                  <FileUploadTable data={dummyData} />
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
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Reports section coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
