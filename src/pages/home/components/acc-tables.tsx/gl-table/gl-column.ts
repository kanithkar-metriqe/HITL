// gl-items.table.ts

import type { ColumnDef } from "@tanstack/react-table";

export type GLItem = {
  transactionDate: string;
  description: string;
  amount: number;
  category: string;
};

export const glItemsData: GLItem[] = [
  {
    transactionDate: "01/15/2023",
    description: "Service Charge",
    amount: 3052,
    category: "Cash Variances",
  },
  {
    transactionDate: "02/20/2023",
    description: "Capital electric bill",
    amount: 800,
    category: "Credit Cards Variances",
  },
];

export const glItemsColumns: ColumnDef<GLItem>[] = [
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: "Description",
    enableSorting: false,
  },
  {
    accessorKey: "amount",
    header: "Amount ($)",
    enableSorting: true,
  },
  {
    accessorKey: "category",
    header: "Category",
    enableSorting: true,
  },
];
