import { HITL_API } from "@/lib/api";
import {  property_code, responseId } from "@/store/store";
import { queryOptions } from "@tanstack/react-query";


export type HitlCase = {
  id: string;
  status: string;
};


async function userApproval(): Promise<HitlCase[]> {

  const payload = {
    property_code: property_code.value,
    responseId: responseId.value,
  };


  const { data } = await HITL_API.post(
    "/fetchmerchanttabledata",
    payload,)
  return data.data;
}


export function getserApproval(property_code: string) {
  return queryOptions({
    queryKey: ["hitl-je-details", property_code],
    queryFn: userApproval,
  });
}