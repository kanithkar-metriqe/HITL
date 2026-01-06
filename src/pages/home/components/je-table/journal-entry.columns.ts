import type { ColumnDef } from "@tanstack/react-table"

export type JournalEntry = {
  id: string
  accountName: string
  type: 'Debit' | 'Credit'
  amount: number
  taxCode: string
  taxRate: number
  description: string
  netAmount: number
}


export const journalEntryColumns: ColumnDef<JournalEntry>[] = [
  {
    accessorKey: 'accountName',
    header: 'Account Name',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'amount',
    header: 'Amount ($)',
    cell: info => info.getValue<number>().toLocaleString(),
  },
  {
    accessorKey: 'taxCode',
    header: 'Tax Code',
  },
  {
    accessorKey: 'taxRate',
    header: 'Tax Rate',
    cell: info => info.getValue<number>() || '-',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'netAmount',
    header: 'Net Amount',
    cell: info => info.getValue<number>().toLocaleString(),
  },
]
