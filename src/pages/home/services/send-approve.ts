import { HITL_API } from "@/lib/api";
import { responseId, trackingIdSignal } from "@/store/store";
import { queryOptions } from "@tanstack/react-query";

export type HitlCase = {
  responseId: string;
  formattedId: string;
  category: string;
  assigneddate: string;
  duedate: string;
};

async function submitState(): Promise<HitlCase> {
  const payload = {
    // property_code: property_code.value,
    responseId: responseId.value,
    trackingId: trackingIdSignal.value ?? "",
  };

  const { data } = await HITL_API.post("/approveresponse", payload);
  return data.data;
}

export function getsubmitState(submitStatus: string) {
  return queryOptions({
    queryKey: ["hitl-send-approve", submitStatus],
    queryFn: submitState,
    enabled: !!submitStatus,
  });
}
