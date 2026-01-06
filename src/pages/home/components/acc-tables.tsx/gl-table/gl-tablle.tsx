import { DefaultTable } from "../default-table";
import { glItemsColumns, glItemsData } from "./gl-column";

export default function GlTable() {
    return (
        <DefaultTable
            wrapperClassName="w-[96%] mx-auto border rounded-lg mt-3"
            tableClassName="mx-auto rounded-lg w-full border border-collapse"
            data={glItemsData}
            columns={glItemsColumns}
        />

    )
}
