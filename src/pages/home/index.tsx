import HITLLogo from "@/components/ui/icons/hitl-icon";
import Analysis from "./components/acc-tables.tsx/main";
import ApprovalDetails from "./components/approval-details";
import BankDetails from "./components/bank-details";
import JETable from "./components/je-table/js-table";
import metLogo from "../../../public/met-logo.png";
import { useSearch } from "@tanstack/react-router";
import {
  property_code,
  reqType,
  responseId,
  taskStatus,
  trackingIdSignal,
} from "@/store/store";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import Title from "@/components/ui/title";
import TickMarkCircle from "@/components/ui/icons/tick-mark-circle";

export default function Home() {
  const query = useSearch({ strict: false }) as {
    responseId?: string;
    property_code?: string;
    trackingId?: string;
    // type?: string;
  };

  useEffect(() => {
    responseId.value = query.responseId ?? "";
    property_code.value = query.property_code ?? "";
    trackingIdSignal.value = query.trackingId ?? "";
    // reqType.value = query.type ?? "";
  }, [query.responseId, query.property_code, query.trackingId]);

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
      {
        taskStatus.value ? <div className="h-[98dvh] flex items-center justify-center">
          <Title className="text-center font-semibold text-[30px] pb-15" intent="h6">
            <TickMarkCircle className="w-12 h-12 mr-3 text-green-700 bg-transparent inline-block" />
            Request already processed, Please contact your administartor
          </Title>
        </div> : <div
          className={cn(
            "p-5 bg-neutral",
            reqType.value === "JE" ? "h-full" : "h-dvh"
          )}
        >
          <ApprovalDetails />
          <BankDetails />
          {reqType.value === "JE" && <JETable />}
          <Analysis />
        </div>
      }


    </>
  );
}
