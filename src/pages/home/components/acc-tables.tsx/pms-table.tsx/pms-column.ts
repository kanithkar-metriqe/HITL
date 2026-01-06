// pms-details.table.ts

import type { ColumnDef } from "@tanstack/react-table";

export type PMSDetail = {
  transactionDate: string;
  cardType: string;
  amount: number;
};

export const pmsDetailsData: PMSDetail[] = [
  {
    transactionDate: "01/15/2023",
    cardType: "Service Charge",
    amount: 3052,
  },
  {
    transactionDate: "06/10/2023",
    cardType: "Master",
    amount: 1100,
  },
];

export const pmsDetailsColumns: ColumnDef<PMSDetail>[] = [
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    enableSorting: true,
  },
  {
    accessorKey: "cardType",
    header: "Card Type",
    enableSorting: true,
  },
  {
    accessorKey: "amount",
    header: "Amount ($)",
    enableSorting: true,
  },
];
