import type { ColumnDef } from "@tanstack/react-table"

export type JournalEntry = {
  type: string
  desc: string
  amount: number
  account: string
}


export const journalEntryColumns: ColumnDef<JournalEntry>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'desc',
    header: 'Description',
  },
  {
    accessorKey: 'amount',
    header: 'Amount ($)',
    cell: info => info.getValue<number>().toLocaleString(),
  },
  {
    accessorKey: 'account',
    header: 'Account',
  },
]
