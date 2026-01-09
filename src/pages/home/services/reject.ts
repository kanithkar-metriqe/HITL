import { showToastMessage } from "@/components/ui/toast-utils";
import { HITL_API } from "@/lib/api";
import { responseId } from "@/store/store";
import { queryOptions } from "@tanstack/react-query";


export type HitlCase = {
  id: string;
  status: string;
};


async function reject(commend: string): Promise<HitlCase[]> {

  const payload = {
    comments: commend,
    responseId: responseId.value,
  };


  const { data } = await HITL_API.post(
    "/rejectresponse",
    payload,)
  showToastMessage({ message: "Rejected Successfully", type: "Success" });
  return data.data;
}


export function postreject(commend: string) {
  return queryOptions({
    queryKey: ["hitl-reject", commend],
    queryFn: () => reject(commend),
    enabled: !!commend,
  });
}