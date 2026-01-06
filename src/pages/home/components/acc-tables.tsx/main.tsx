import { AccordionWrapper } from "@/components/ui/accordion-wrapper";
import Title from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import GlTable from "./gl-table/gl-tablle";
import MarchantTable from "./marchant-table/marchant-table";
import PMSTable from "./pms-table.tsx/pms-table";

const data = [
    {
        value: "mec-review",
        title: <Title intent="h4" className="bg-orange-150 w-full text-orange-880 py-4 px-3 rounded-tl-md">Gl Table</Title>,
        content: <GlTable />,
        borderClass:"border-2 border-orange-850 border-b-0 rounded-bl-none rounded-br-none hover:no-underline",
        borderclassChild:"border-2 border-b-0 border-[#AB701C]"
    },
    
    {
        value: "mec-review-1",
        title: <Title intent="h4" className="bg-mt-blue-110 w-full text-mt-blue-880 py-4 px-3 rounded-none">PMS Details</Title>,
        content: <PMSTable />,
        borderClass:"border-mt-blue-880 border-2 rounded-none hover:no-underline",
        borderclassChild:"border-2 border-mt-blue-880 border-b-0 border-t-0"
    },
    {
        value: "mec-review-2",
        title: <Title intent="h4" className="bg-mt-green-100 w-full text-mt-green-880 py-4 px-3 roundeed-none no-underline ">Merchant Details</Title>,
        content: <MarchantTable />,
        borderClass:"border-mt-green-880 border-2 border-t-0 rounded-tl-none rounded-tr-none [&[data-state=open]]:rounded-none hover:no-underline",
        borderclassChild:"border-2 border-mt-green-880 border-t-0"
    },
];

export default function Analysis() {
    return (
        <div className="py-5">
            <Title intent="h6" className="border-b pb-1 font-semibold">BR Agentic Intelligent Analysis</Title>
            <div className="flex w-full gap-2 pt-3">
                <div className="w-2/3 p-4">

                    <AccordionWrapper items={data} />
                </div>

                <div className="rounded-md bg-white w-1/3 p-3">
                    <div className="flex w-full gap-10 bg-mt-gray-680 rounded-md px-3 py-3">
                        <div>
                            <Title intent="h5">To:</Title>
                            <span>Kanithkar Kumar</span>
                        </div>
                        <div>
                            <Title intent="h5">CC:</Title>
                            <span>Naveen, Gopi</span>
                        </div>
                    </div>
                    <div className="mt-3 pt-2 pb-3 rounded-md px-3 bg-mt-gray-680">
                        <Title intent="h5" className="pb-3">Email Content</Title>

                        <p>There is a reconciliation discrepancy where the bank statement on 2025-08-01 reflects a credit of 2293.56, the merchant settlement amount is 2545.65, and the PMS-reported amount for the same date is 2733.61, indicating a clear mismatch between all three amounts and confirming an 'Unmatched - PMS to Merchant Variance' the most likely root cause is inconsistent reporting or processing between the merchant and PMS systems, and this issue is to be handled by the Concerned Team.</p>
                    </div>
                    <div className="pt-4 flex w-full justify-end">
                        <Button variant="ghost" >Resubmit</Button>
                        <Button variant="default" className="ml-3">Send Mail</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
