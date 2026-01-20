// ========== TYPE DEFINITIONS ==========
interface FileUpload {
    id: string;
    fileName: string;
    status: "Completed" | "In Progress" | "Failed" | "Pending";
    uploadDate: string;
    size: string;
}

interface ReportFile {
    id: string;
    fileName: string;
    uploadDate: string;
    fileUrl: string;
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
    selectedDate: string;
}

interface CalendarPopupProps {
    value: string;
    onChange: (date: string) => void;
    onClose: () => void;
}

interface ReportsTableProps {
    data: ReportFile[];
}

interface DashboardState {
    activeTab: "br" | "reports";
}

interface FileUploadTableProps {
  data: FileUpload[];
}

type PeriodType = "daily" | "monthly" | "yearly";

export type {
    FileUpload, FileUploadTableProps, DashboardState, ReportsTableProps, CalendarPopupProps, ReportFile, DropdownOption, CustomDropdownProps, StatusBadgeProps, FilterSectionState, PeriodType
}