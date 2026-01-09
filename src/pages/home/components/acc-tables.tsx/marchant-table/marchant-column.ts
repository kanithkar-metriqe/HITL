// merchant-details.table.ts
import type { ColumnDef } from "@tanstack/react-table";

export type MerchantDetail = {
  date: string;
  amount: string;
  discount_amount: string;
  fees_and_incentives: number;
  fees: string;
};


export const merchantDetailsColumns: ColumnDef<MerchantDetail>[] = [
  {
    accessorKey: "date",
    header: "Transaction Date",
    enableSorting: true,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    enableSorting: true,
  },
  {
    accessorKey: "discount_amount",
    header: "Discount Amount",
    enableSorting: true,
  },
  {
    accessorKey: "fees_and_incentives",
    header: "Fees & Incentives",
    enableSorting: true,
  },
  {
    accessorKey: "fees",
    header: "Fees",
    enableSorting: false,
  },
];
