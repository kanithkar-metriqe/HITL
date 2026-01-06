import { DefaultTable } from "../default-table";
import { pmsDetailsColumns, pmsDetailsData } from "./pms-column";

export default function PMSTable() {
    return (
        <DefaultTable
            wrapperClassName="w-[96%] mx-auto border rounded-lg mt-3"
            tableClassName="mx-auto rounded-lg w-full border border-collapse"
            data={pmsDetailsData}
            columns={pmsDetailsColumns}
        />

    )
}
