import Skeleton from "@/components/ui/skeleton";

export default function BankDetailsLoader() {
    return (
        <div className="grid grid-cols-1 md:flex gap-8 justify-between w-full py-4 ">
            <div className="grid grid-cols-2 md:flex gap-8">
                <div>
                    <div className="text-mt-normal text-normal-gray">Transaction Date</div>
                    <Skeleton className="h-3 mt-1 rounded-sm w-full " />
                </div>
                <div>
                    <div className="text-mt-normal text-normal-gray">Category</div>
                    <Skeleton className="h-3 mt-1 rounded-sm w-full " />
                </div>
                <div>
                    <div className="text-mt-normal text-normal-gray">Description</div>
                    <Skeleton className="h-3 mt-1 rounded-sm w-full " />
                </div>
                <div>
                    <div className="text-mt-normal text-normal-gray">Bank Name</div>
                    <Skeleton className="h-3 mt-1 rounded-sm w-full " />
                </div>
                <div>
                    <div className="text-mt-normal text-normal-gray">AI Matched GL</div>
                    <Skeleton className="h-3 mt-1 rounded-sm w-full " />
                </div>
            </div>
            <div>
                <div className="px-5 font-semibold">Amount</div>
                <Skeleton className="h-3 mt-1 rounded-sm w-full " />
            </div>
        </div>
    )
}
