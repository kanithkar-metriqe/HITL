import Title from "@/components/ui/title";
import { property_code } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { getJElDetails } from "../services/je-details";
import { getBankDetails } from "../services/bank-details";

const data = {
    "transaction_date": "2025-08-28",
    "category": "Amex",
    "description": "AMERICAN EXPRESS SETTLEMENT XXXXXX2463",
    "bankname": "Starion Bank",
    "ai_matched_gl": 1,
    "amount": "$8,898"
}
export default function BankDetails() {
    const { data: newdata, isLoading, error } = useQuery(
        getBankDetails(property_code.value)
    );
    console.log(newdata)
    return (
        <div className="pt-4">
            <Title intent="h6" className="font-semibold border-b pb-1 border-mt-border">Bank Details</Title>
            <div className="grid grid-cols-1 md:flex gap-8 justify-between w-full py-4 ">
                <div className="grid grid-cols-2 md:flex gap-8">
                    <div>
                        <div className="text-mt-normal text-normal-gray">Transaction Date</div>
                        <Title intent={"h5"} className="font-semibold">{newdata?.transaction_date}</Title>
                    </div>
                    <div>
                        <div className="text-mt-normal text-normal-gray">Category</div>
                        <Title intent={"h5"} className="font-semibold">{newdata?.category}</Title>
                    </div>
                    <div>
                        <div className="text-mt-normal text-normal-gray">Description</div>
                        <Title intent={"h5"} className="font-semibold">{newdata?.description}</Title>
                    </div>
                    <div>
                        <div className="text-mt-normal text-normal-gray">Bank Name</div>
                        <Title intent={"h5"} className="font-semibold">{newdata?.bankname}</Title>
                    </div>
                    <div>
                        <div className="text-mt-normal text-normal-gray">AI Matched GL</div>
                        <Title intent={"h5"} className="font-semibold">{newdata?.ai_matched_gl}</Title>
                    </div>
                </div>
                <div>
                    <div>Amount</div>
                    <Title intent={"h6"} className="font-semibold">{newdata?.amount}</Title>
                </div>
            </div>
        </div>
    )
}
