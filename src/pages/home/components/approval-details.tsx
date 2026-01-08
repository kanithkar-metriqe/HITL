import Title from "@/components/ui/title";
import { useQuery } from "@tanstack/react-query";
import { getApprovalDetails } from "../services/approval-api";
import { property_code } from "@/store/store";

// const data = {
//     "responseId": 54,
//     "formattedId": "HITL-054",
//     "category": "JE Posting",
//     "assigneddate": "2025-12-05",
//     "duedate": "2025-12-06"
// }

export default function ApprovalDetails() {
    const { data: newdata } = useQuery(
        getApprovalDetails(property_code.value)
    );

    
    console.log(newdata)
    return (
        <div>
            <Title intent="h6" className="pb-4 font-semibold">Approvals</Title>
            <div className="grid grid-cols-2 md:flex  gap-8 py-4 bg-white rounded-lg px-5">
                <div className="">
                    <div className="text-normal-gray text-mt-normal">Reconciliation ID</div>
                    <Title intent={"h5"} className="font-semibold">{newdata?.formattedId}</Title>
                </div>
                <div className="">
                    <div className="text-normal-gray text-mt-normal">Category</div>
                    <Title intent="h5" className="font-semibold">{newdata?.category}</Title>
                </div>
                <div className="">
                    <div className="text-normal-gray text-mt-normal">Account Name</div>
                    <Title intent="h5" className="font-semibold">Bank of America</Title>
                </div>
                <div className="">
                    <div className="text-normal-gray text-mt-normal">Account Type</div>
                    <Title intent="h5" className="font-semibold">Operating Account</Title>
                </div>
                <div className="">
                    <div className="text-normal-gray text-mt-normal">Assigned Date</div>
                    <Title intent="h5" className="font-semibold">{newdata?.assigneddate}</Title>
                </div>
                <div className="">
                    <div className="text-normal-gray text-mt-normal">Due Date</div>
                    <Title intent="h5" className="font-semibold">{newdata?.duedate}</Title>
                </div>
            </div>
        </div>
    )
}
