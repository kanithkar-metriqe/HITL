import Title from "@/components/ui/title"
import { journalEntryColumns, type JournalEntry } from "./journal-entry.columns"
import { DataTable } from "./table"

const data = [
  {
    "id": "1",
    "accountName": "6000-System Expenses",
    "type": "Debit",
    "amount": 1400,
    "taxCode": "18%",
    "taxRate": 252,
    "description": "This is a Sample Description from Bank",
    "netAmount": 1652
  },
  {
    "id": "2",
    "accountName": "21212-System Expenses",
    "type": "Credit",
    "amount": 400,
    "taxCode": "",
    "taxRate": 0,
    "description": "This is a Sample Description from GL",
    "netAmount": 1000
  }
]


export default function JETable() {
  return (
    <div className="py-10">
      <Title intent="h6" className="font-semibold border-b pb-1 border-mt-border">Journal Entry</Title>

      <DataTable
        data={data as JournalEntry[]}
        columns={journalEntryColumns}
      />
    </div>
  )
}
