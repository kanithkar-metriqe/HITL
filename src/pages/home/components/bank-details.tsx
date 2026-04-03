import Title from "@/components/ui/title";
import { property_code } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { getBankDetails } from "../services/bank-details";
import QueryStateHandler from "@/components/ui/query-state-handler";
import BankDetailsLoader from "./loaders/bank-detail";


export default function BankDetails() {
    const { data: newdata, error, isLoading } = useQuery(
        getBankDetails(property_code.value)
    );

    return (
        <div className="pt-4">
            <Title intent="h6" className="font-semibold border-b pb-1 border-mt-border">Bank Details</Title>
            <QueryStateHandler error={error} isLoading={isLoading} loadingFallback={<BankDetailsLoader />} >

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
                        <div className="px-5 font-semibold">Amount</div>
                        <Title intent={"h6"} className="text-right pr-5">{newdata?.amount}</Title>
                    </div>
                </div>
            </QueryStateHandler>
        </div>
    )
}
