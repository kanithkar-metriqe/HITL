import { HITL_API } from "@/lib/api";
import {  property_code, responseId } from "@/store/store";
import { queryOptions } from "@tanstack/react-query";


export type HitlCase = {
  account_date: string;
  account_code: string;
  account_name: string;
  category: string;
  transaction_type: string;
  amount:number;
};


async function glTable(): Promise<HitlCase[]> {

  const payload = {
    property_code: property_code.value,
    responseId: responseId.value,
  };


  const { data } = await HITL_API.post(
    "/fetchgltabledata",
    payload,)
  return data.data;
}


export function getglTable(property_code: string) {
  return queryOptions({
    queryKey: ["hitl-gl-details", property_code],
    queryFn: glTable,
  });
}