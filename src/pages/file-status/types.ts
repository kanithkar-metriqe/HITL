// ========== TYPE DEFINITIONS ==========
interface FileUpload {
    attachmentId: string;
    propertyName: string;
    status: "Processing" | "Failed";
    propertyCode: string;
    tempLoc: string;
    documentType: string;
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
    labelkey?: string;
    valueKey?: string;
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
    isfetching:boolean
}

type PeriodType = "daily" | "monthly" | "yearly";

interface propertyOptions {
    propertyId : string;
    propertyName : string;
}

export type {
    FileUpload,propertyOptions, FileUploadTableProps, DashboardState, ReportsTableProps, CalendarPopupProps, ReportFile, DropdownOption, CustomDropdownProps, StatusBadgeProps, FilterSectionState, PeriodType
}