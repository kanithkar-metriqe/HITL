import { HITL_API } from "@/lib/api"
import { responseId } from "@/store/store"
import { queryOptions } from "@tanstack/react-query"

export type EmailUser = {
  email: string
  username: string
}

export type AgentDetails = {
  responseId: number
  message: string
  fromAgent: string
  toemailusers: EmailUser[]
  ccemailusers: EmailUser[]
}

async function agentDetails(): Promise<AgentDetails> {
  const payload = {
    responseId: responseId.value,
  }

  const { data } = await HITL_API.post("/fetchhitlagentdata", payload)

  return data.data
}

export function getagentDetails(property_code: string) {
  return queryOptions({
    queryKey: ["hitl-agent-details", property_code],
    queryFn: agentDetails,
  })
}
