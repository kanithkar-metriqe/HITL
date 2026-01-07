import Skeleton from "@/components/ui/skeleton"

function LoaderApproval() {
    return (
        <div className="flex gap-8 py-4 bg-white rounded-lg px-5">
            <div>
                <div className="text-normal-gray text-mt-normal">Reconciliation ID</div>
                {/* <Title intent={"h5"} className="font-semibold">{data.formattedId}</Title> */}
                <Skeleton className="h-3 mt-1 rounded-sm w-full " />
            </div>
            <div>
                <div className="text-normal-gray text-mt-normal">Category</div>
                <Skeleton className="h-3 mt-1 rounded-sm w-full " />
            </div>
            <div>
                <div className="text-normal-gray text-mt-normal">Account Name</div>
                <Skeleton className="h-3 mt-1 rounded-sm w-full " />
            </div>
            <div>
                <div className="text-normal-gray text-mt-normal">Account Type</div>
                <Skeleton className="h-3 mt-1 rounded-sm w-full " />                </div>
            <div>
                <div className="text-normal-gray text-mt-normal">Assigned Date</div>
                <Skeleton className="h-3 mt-1 rounded-sm w-full " />
            </div>
            <div>
                <div className="text-normal-gray text-mt-normal">Due Date</div>
                <Skeleton className="h-3 mt-1 rounded-sm w-full " />
            </div>
        </div>
    )
}

export default LoaderApproval