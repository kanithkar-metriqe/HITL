import Title from "@/components/ui/title";
import { journalEntryColumns, type JournalEntry } from "./journal-entry.columns";
import { DataTable } from "./table";
import { useQuery } from "@tanstack/react-query";
import { getJElDetails } from "../../services/je-details";
import { property_code } from "@/store/store";

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
  }
]



export default function JETable() {
  const { data: newdata } = useQuery(
    getJElDetails(property_code.value)
  );
  console.log(newdata)
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
