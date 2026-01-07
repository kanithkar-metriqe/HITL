import { HITL_API } from "@/lib/api";
import {  property_code, responseId } from "@/store/store";
import { queryOptions } from "@tanstack/react-query";


export type HitlCase = {
  date: string;
  amount: string;
};


async function pmsTable(): Promise<HitlCase[]> {

  const payload = {
    property_code: property_code.value,
    responseId: responseId.value,
  };


  const { data } = await HITL_API.post(
    "/fetchpmstabledata",
    payload,)
  return data.data;
}


export function getpmsTable(property_code: string) {
  return queryOptions({
    queryKey: ["hitl-gl-details", property_code],
    queryFn: pmsTable,
  });
}