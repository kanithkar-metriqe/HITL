import Title from "@/components/ui/title";
import { useQuery } from "@tanstack/react-query";
import { getApprovalDetails } from "../services/approval-api";
import { property_code } from "@/store/store";
import LoaderApproval from "./loaders/approval";
import QueryStateHandler from "@/components/ui/query-state-handler";

// const newdata = {
//     "responseId": 54,
//     "formattedId": "HITL-054",
//     "category": "JE Posting",
//     "assigneddate": "2025-12-05",
//     "duedate": "2025-12-06"
// }

export default function ApprovalDetails() {
  const { data: newdata, error, isLoading } = useQuery(getApprovalDetails(property_code.value));

  return (
    <>
     <Title intent="h6" className="pb-4 font-semibold">
        Approvals
      </Title>
    <QueryStateHandler error={error} isLoading={isLoading} loadingFallback={<LoaderApproval />}>

   
     
      <div className="bg-white rounded-lg flex justify-between items-center">
        <div className="grid grid-cols-2 md:flex  gap-8 py-4   px-5">
          <div className="">
            <div className="text-normal-gray text-mt-normal">
              Reconciliation ID
            </div>
            <Title intent={"h5"} className="font-semibold">
              {newdata?.formattedId}
            </Title>
          </div>
          <div className="">
            <div className="text-normal-gray text-mt-normal">Category</div>
            <Title intent="h5" className="font-semibold">
              {newdata?.category}
            </Title>
          </div>

          <div className="">
            <div className="text-normal-gray text-mt-normal">Assigned Date</div>
            <Title intent="h5" className="font-semibold">
              {newdata?.assigneddate}
            </Title>
          </div>
          <div className="">
            <div className="text-normal-gray text-mt-normal">Due Date</div>
            <Title intent="h5" className="font-semibold">
              {newdata?.duedate}
            </Title>
          </div>
        </div>
        <div className="px-5 ">
          <div className="text-[15px] font-semibold">
            Property Code
          </div>
          <Title intent={"h5"} className="font-normal text-right">
            {property_code.value}
          </Title>
        </div>
      </div>
       </QueryStateHandler>
    </>
  );
}
