import { DefaultTable } from "../default-table";
import { merchantDetailsColumns, merchantDetailsData } from "./marchant-column";

export default function MarchantTable() {
    return (
        <DefaultTable
            wrapperClassName="w-[96%] mx-auto border rounded-lg flex flex-col gap-4 h-full"
            tableClassName="mx-auto rounded-lg w-full border border-collapse"
            data={merchantDetailsData}
            columns={merchantDetailsColumns}
        />

    )
}
