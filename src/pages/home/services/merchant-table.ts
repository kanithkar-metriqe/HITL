import { HITL_API } from "@/lib/api";
import {  property_code, responseId } from "@/store/store";
import { queryOptions } from "@tanstack/react-query";
import type { MerchantDetail } from "../components/acc-tables.tsx/marchant-table/marchant-column";


async function merchntFunc(): Promise<MerchantDetail[]> {

  const payload = {
    property_code: property_code.value,
    responseId: responseId.value,
  };


  const { data } = await HITL_API.post(
    "/fetchmerchanttabledata",
    payload,)
  return data.data;
}


export function getMerchant(property_code: string) {
  return queryOptions({
    queryKey: ["hitl-marchant-details", property_code],
    queryFn: merchntFunc,
  });
}