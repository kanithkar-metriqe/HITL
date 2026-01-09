import { useQuery } from "@tanstack/react-query";
import { DefaultTable } from "../default-table";
import { pmsDetailsColumns } from "./pms-column";
import { property_code } from "@/store/store";
import { getpmsTable } from "@/pages/home/services/pms-table";

export default function PMSTable() {
    const { data } = useQuery(getpmsTable(property_code.value));
    return (
        <DefaultTable
            wrapperClassName="w-[96%] mx-auto border rounded-lg mt-3"
            tableClassName="mx-auto rounded-lg w-full border border-collapse"
            data={data ?? []}
            columns={pmsDetailsColumns}
        />
    )
}
