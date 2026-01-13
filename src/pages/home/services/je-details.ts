import { HITL_API } from "@/lib/api";
import { property_code } from "@/store/store";
import { queryOptions } from "@tanstack/react-query";


export type HitlCase = {
  id: string;
  status: string;
};


async function jelDetails(): Promise<HitlCase[]> {

  const payload = {
    property_code: property_code.value,
    responseId: 458,
  };


  const { data } = await HITL_API.post(
    "/fetchjedata",
    payload,)
  return data.data;
}


export function getJElDetails(property_code: string, reqType:string) {
 
  return queryOptions({
    queryKey: ["hitl-je-details", property_code],
    queryFn: jelDetails,
    enabled:!!reqType,
  });
}