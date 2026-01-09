import { HITL_API } from "@/lib/api";
import {  property_code, responseId } from "@/store/store";
import { queryOptions } from "@tanstack/react-query";
import type { PMSDetail } from "../components/acc-tables.tsx/pms-table.tsx/pms-column";



async function pmsTable(): Promise<PMSDetail[]> {

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
    queryKey: ["hitl-pms-details", property_code],
    queryFn: pmsTable,
  });
}