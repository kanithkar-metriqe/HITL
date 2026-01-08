import { AccordionWrapper } from "@/components/ui/accordion-wrapper";
import Title from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import GlTable from "./gl-table/gl-tablle";
import MarchantTable from "./marchant-table/marchant-table";
import PMSTable from "./pms-table.tsx/pms-table";
import AgentDetails from "../agent-detail";

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
            <div className="xl:flex w-full gap-2 pt-3">
                <div className="xl:w-2/3 md:p-4">
                    <AccordionWrapper items={data} />
                </div>
                <AgentDetails />
            </div>
        </div>
    );
}
