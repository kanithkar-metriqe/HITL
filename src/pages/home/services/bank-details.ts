import { HITL_API } from "@/lib/api";
import {  property_code, responseId } from "@/store/store";
import { queryOptions } from "@tanstack/react-query";


export type HitlCase = {
  id: string;
  status: string;
};


async function bankDetails(): Promise<HitlCase[]> {

  const payload = {
    property_code: property_code.value,
    responseId: responseId.value,
  };


  const { data } = await HITL_API.post(
    "/fetchbankdata",
    payload,)
  return data.data;
}


export function getBankDetails(property_code: string) {
  return queryOptions({
    queryKey: ["bank-details", property_code],
    queryFn: bankDetails,
  });
}