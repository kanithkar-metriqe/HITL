// merchant-details.table.ts
import type { ColumnDef } from "@tanstack/react-table";

export type MerchantDetail = {
  transactionDate: string;
  submittedAmount: number;
  settlementDate: string;
  settlementAmount: number;
  commission: number;
  discounts: number;
  fees: number;
};

export const merchantDetailsData: MerchantDetail[] = [
  {
    transactionDate: "01/15/2023",
    submittedAmount: 3052,
    settlementDate: "01/15/2023",
    settlementAmount: 3052,
    commission: 3052,
    discounts: 3052,
    fees: 3052,
  },
];

export const merchantDetailsColumns: ColumnDef<MerchantDetail>[] = [
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    enableSorting: true,
  },
  {
    accessorKey: "submittedAmount",
    header: "Submitted Amount",
    enableSorting: true,
  },
  {
    accessorKey: "settlementDate",
    header: "Settlement Date",
    enableSorting: true,
  },
  {
    accessorKey: "settlementAmount",
    header: "Amount ($)",
    enableSorting: true,
  },
  {
    accessorKey: "commission",
    header: "Commission",
    enableSorting: false,
  },
  {
    accessorKey: "discounts",
    header: "Discounts",
    enableSorting: false,
  },
  {
    accessorKey: "fees",
    header: "Fees",
    enableSorting: false,
  },
];
