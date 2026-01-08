import { HITL_API } from "@/lib/api";
import {  responseId } from "@/store/store";
import { queryOptions } from "@tanstack/react-query";


export type HitlCase = {
  responseId: string;
  formattedId: string;
  category:string;
  assigneddate:string;
  duedate:string;
};


async function approvalDetails(): Promise<HitlCase> {

  const payload = {
    // property_code: property_code.value,
    responseId: responseId.value,
  };


  const { data } = await HITL_API.post(
    "/fetchhitldata",
    payload,)
  return data.data;
}


export function getApprovalDetails(property_code: string) {
  return queryOptions({
    queryKey: ["hitl-details", property_code],
    queryFn: approvalDetails,
  });
}