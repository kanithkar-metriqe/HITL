import Analysis from "./components/acc-tables.tsx/main";
import ApprovalDetails from "./components/approval-details";
import BankDetails from "./components/bank-details";
import JETable from "./components/je-table/js-table";

export default function Home() {

  return (
    <div  className="p-5 bg-neutral">
        <ApprovalDetails />
        <BankDetails />
        <JETable />
        <Analysis />
    </div>
  );
}
