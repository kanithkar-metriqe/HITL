// pms-details.table.ts

import type { ColumnDef } from "@tanstack/react-table";

export type PMSDetail = {
  date: string;
  amount: string;
};

// export const pmsDetailsData: PMSDetail[] = [
//   {
//     transactionDate: "01/15/2023",
//     cardType: "Service Charge",
//     amount: 3052,
//   },
//   {
//     transactionDate: "06/10/2023",
//     cardType: "Master",
//     amount: 1100,
//   },
// ];

export const pmsDetailsColumns: ColumnDef<PMSDetail>[] = [
  {
    accessorKey: "date",
    header: "Transaction Date",
    enableSorting: false,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    enableSorting: true,
  },
];
