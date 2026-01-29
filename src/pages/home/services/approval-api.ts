import { HITL_API } from "@/lib/api";
import { reqType, responseId, taskStatus, taskStatusText } from "@/store/store";
import { queryOptions } from "@tanstack/react-query";


export type HitlCase = {
  responseId: string;
  formattedId: string;
  category: string;
  assigneddate: string;
  duedate: string;
};


async function approvalDetails(): Promise<HitlCase> {

  const payload = {
    // property_code: property_code.value,
    responseId: responseId.value,
  };


  const { data } = await HITL_API.post(
    "/fetchhitldata",
    payload,)

  reqType.value = data.data?.category === "JE Posting" ? "JE" : "Mail";
  if(!data.success){
    taskStatus.value = true;
    taskStatusText.value = "Request already processed, Please contact your administartor";
  }
  return data.data;
}


export function getApprovalDetails(property_code: string) {
  return queryOptions({
    queryKey: ["hitl-approve", property_code],
    queryFn: approvalDetails,
    enabled:!!property_code,
  });
}