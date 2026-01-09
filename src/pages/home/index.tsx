import HITLLogo from "@/components/ui/icons/hitl-icon";
import Analysis from "./components/acc-tables.tsx/main";
import ApprovalDetails from "./components/approval-details";
import BankDetails from "./components/bank-details";
import JETable from "./components/je-table/js-table";
import metLogo from "../../../public/met-logo.png";
import { useSearch } from "@tanstack/react-router";
import { property_code, reqType, responseId } from "@/store/store";

export default function Home() {

  const query = useSearch({ strict: false }) as {
    responseId?: string;
    property_code?: string;
    type?: string;
  };



  responseId.value = query.responseId ?? "";
  property_code.value = query.property_code ?? "";
  reqType.value = query.type ?? "";


  return (
    <>
      <header className="flex justify-between sticky top-0 z-100 bg-white shadow">
        <div>
          <img src={metLogo} alt="Logo" className="h-12 p-5 py-1" />
        </div>
        <div className="flex items-center px-5 gap-1">
          <HITLLogo className="h-8 w-8 text-mt-primary" />
          <span className="font-bold text-mt-primary">HITL Approval</span>
        </div>
      </header>
      <div className="p-5 bg-neutral h-dvh">
        <ApprovalDetails />
        <BankDetails />
        {
          reqType.value === "JE" && <JETable />
        }
        <Analysis />
      </div>
    </>
  );
}
