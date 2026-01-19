import { HITL_API } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";
import type { XiorError } from "xior";

export function getPropertyOptions() {
  return queryOptions<{
    label: string;
    value: string;
  }[]>({
    queryKey: ["property-options"],
    queryFn: async () => {
      try {
        return await getTemplateOptionsAPI();
      }
      catch (err: unknown) {
        const error = err as XiorError;
        if (error?.response?.status === 404) {
          // Normalize 404 -> empty array
          return [];
        }
        throw error;
      }
    },
    retry: 1,
  });
}

export async function getTemplateOptionsAPI() {
  const { data, status } = await HITL_API.post("fetchpropertydetails",{});

  if (status === 200) {
    return data.data
  }
  else {
    return [];
  }
}

export function getFileStatusGrid() {
  return queryOptions<{
    label: string;
    value: string;
  }[]>({
    queryKey: ["file-status-grid"],
    queryFn: async () => {
      try {
        return await getTemplateOptionsAPI();
      }
      catch (err: unknown) {
        const error = err as XiorError;
        if (error?.response?.status === 404) {
          // Normalize 404 -> empty array
          return [];
        }
        throw error;
      }
    },
    retry: 1,
  });
}

export async function getFileStatusGridAPI() {
  const { data, status } = await HITL_API.post("fetchattachmentdetails",{});

  if (status === 200) {
    return data.data
  }
  else {
    return [];
  }
}
