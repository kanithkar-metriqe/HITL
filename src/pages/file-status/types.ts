// ========== TYPE DEFINITIONS ==========
interface FileUpload {
    attachmentId: string;
    propertyName: string;
    status: "Processing" | "Failed";
    propertyCode: string;
    tempLoc: string;
    documentType: string;
    fileDate: string;
}

interface ReportFile {
    id: string;
    fileName: string;
    uploadDate: string;
    downloadUrl: string;
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
    labelkey?: string;
    valueKey?: string;
}

interface StatusBadgeProps {
    status: FileUpload["status"];
}

interface FilterSectionState {
    selectedPropertyName: string;
    selectedPeriod: "Date" | "Monthly" | "";
    selectedMonth: string;
    selectedYear: string;
    selectedDate: string;
    selectedPropertyCode: string
}

interface CalendarPopupProps {
    value: string;
    onChange: (date: string) => void;
    onClose: () => void;
}

interface DashboardState {
    activeTab: "br" | "reports";
}

interface FileUploadTableProps {
    data: FileUpload[];
    isfetching: boolean
}

type PeriodType = "Date" | "Monthly";

interface propertyOptions {
    propertyId: string;
    propertyName: string;
    propertyCode: string;
}

type MutationError = {
    message?: string;
};

export type {
    FileUpload, MutationError, propertyOptions, FileUploadTableProps, DashboardState, CalendarPopupProps, ReportFile, DropdownOption, CustomDropdownProps, StatusBadgeProps, FilterSectionState, PeriodType
}