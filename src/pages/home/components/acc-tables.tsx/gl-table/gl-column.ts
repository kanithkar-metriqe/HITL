// gl-items.table.ts

import type { ColumnDef } from "@tanstack/react-table";

export type GLItem = {
  account_date: string;
  category: string;
  account_code: string;
  account_name: string;
  amount: number;
  transaction_type: string;
};

// export const glItemsData: GLItem[] = [
//   {
//     transactionDate: "01/15/2023",
//     description: "Service Charge",
//     amount: 3052,
//     category: "Cash Variances",
//   },
//   {
//     transactionDate: "02/20/2023",
//     description: "Capital electric bill",
//     amount: 800,
//     category: "Credit Cards Variances",
//   },
// ];

export const glItemsColumns: ColumnDef<GLItem>[] = [
  {
    accessorKey: "account_name",
    header: "Account Name",
    enableSorting: true,
  },
  {
    accessorKey: "account_code",
    header: "Description",
    enableSorting: false,
  },
  {
    
    accessorKey: "account_date",
    header: "Account Date",
    enableSorting: true,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    enableSorting: true,
  },
  {
    accessorKey: "transaction_type",
    header: "Transaction Type",
    enableSorting: false,
  },
];

