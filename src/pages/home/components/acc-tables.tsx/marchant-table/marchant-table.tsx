import { getMerchant } from "@/pages/home/services/merchant-table";
import { DefaultTable } from "../default-table";
import { merchantDetailsColumns } from "./marchant-column";
import { property_code } from "@/store/store";
import { useQuery } from "@tanstack/react-query";

export default function MarchantTable() {
    const { data } = useQuery(getMerchant(property_code.value));
    return (
        <DefaultTable
            wrapperClassName="w-[96%] mx-auto border rounded-lg flex flex-col gap-4 h-full"
            tableClassName="rounded-lg w-full border border-collapse"
            data={data ?? []}
            columns={merchantDetailsColumns}
        />

    )
}
