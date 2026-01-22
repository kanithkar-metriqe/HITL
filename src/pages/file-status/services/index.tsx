
import { queryOptions } from "@tanstack/react-query";
import type { XiorError } from "xior";
import type { FileUpload, propertyOptions, ReportFile } from "../types";
import { HITL_FILE_STATUS_API } from "@/lib/api";

export function getPropertyOptions() {
  return queryOptions<
    {
      label: string;
      value: string;
      code:string;
    }[]
  >({
    queryKey: ["property-options"],
    queryFn: async () => {
      try {
        const response = await getTemplateOptionsAPI();
        if (response?.length > 0) {
          return (
            response?.map((t: propertyOptions) => ({
              label: t.propertyName,
              value: t.propertyId,
              code: t.propertyCode
            })) ?? []
          );
        }
      } catch (err: unknown) {
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
  const { data } = await HITL_FILE_STATUS_API.get("test/fetchpropertyDetails");

  if (data?.sucess) {
    return data.data;
  } else {
    return [];
  }
}

export function getFileStatusGrid() {
  return queryOptions<FileUpload[]>({
    queryKey: ["file-status-grid"],
    queryFn: async () => {
      try {
        return await getFileStatusGridAPI();
      } catch (err: unknown) {
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
  const { data } = await HITL_FILE_STATUS_API.get("test/fetchAttachmentDetails");

  if (data?.sucess) {
    return data.data;
  } else {
    return [];
  }
}

export async function triggerDca(payload:any): Promise<any> {

 const postData ={
    "propertyId": payload.selectedPropertyName ?? "",
    "propertyCode": payload.selectedPropertyCode ?? "",
    "scheduleType": payload.selectedPeriod ?? "",
    "month": payload.selectedMonth || null,
    "year": payload.selectedYear || null,
    "date": payload.selectedDate || null
}
  const { data } = await HITL_FILE_STATUS_API.post("/utility/trigger-dca", postData);

  return data;
}


export function getReportsGrid() {
  return queryOptions<ReportFile[]>({
    queryKey: ["reports-grid"],
    queryFn: async () => {
      try {
        return await getReportsGridAPI();
      } catch (err: unknown) {
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

export async function getReportsGridAPI() {
  const { data } = await HITL_FILE_STATUS_API.get("utility/get-reports");

  if (data?.success) {
    return data?.data ?? [];
  } else {
    return [];
  }
}