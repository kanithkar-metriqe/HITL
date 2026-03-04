import { QUERY_API } from "@/lib/api";

// ── Types ──────────────────────────────────────────────────────────────────

export interface AskResponse {
  success: boolean;
  trackingId: string;
  status: "processing";
  message: string;
}

export interface QueryResult {
  success: boolean;
  trackingId: string;
  status: "processing" | "completed" | "error";
  answer?: string;
  error?: string;
  processedOn?: string;
}

// ── API calls ──────────────────────────────────────────────────────────────

export async function askQuestion(
  question: string,
  propertyCode?: string
): Promise<AskResponse> {
  const { data } = await QUERY_API.post<AskResponse>("/ask", {
    question,
    ...(propertyCode ? { propertyCode } : {}),
  });
  return data;
}

export async function getQueryResult(
  trackingId: string
): Promise<QueryResult> {
  const { data } = await QUERY_API.get<QueryResult>(`/result/${trackingId}`);
  return data;
}
