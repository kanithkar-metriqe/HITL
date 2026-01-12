import { useQuery } from "@tanstack/react-query";
import { DefaultTable } from "../default-table";
import { glItemsColumns } from "./gl-column";
import { getglTable } from "@/pages/home/services/gl-table";
import { property_code } from "@/store/store";

export default function GlTable() {
    const { data } = useQuery(getglTable(property_code.value));
    console.log(data)
    return (
        <DefaultTable
            wrapperClassName="w-[95%] border rounded-lg mt-3 max-h-[300px]  overflow-y-scroll"
            tableClassName="mx-auto rounded-lg w-full border border-collapse"
            data={data ?? []}
            columns={glItemsColumns}
        />

    )
}
