import Skeleton from "@/components/ui/skeleton";
import Title from "@/components/ui/title";

export default function AgentDetailLoader() {
    return (
        <div className="rounded-md bg-white xl:w-1/3 p-3">
            <div className="flex w-full gap-5 bg-mt-gray-680 rounded-md px-3 py-3">
                <div>
                    <Title intent="h5">To:</Title>
                    <Skeleton className="h-3 mt-1 rounded-sm w-28 " />
                </div>

                <div>
                    <Title intent="h5">CC:</Title>
                    <Skeleton className="h-3 mt-1 rounded-sm w-28" />
                </div>
            </div>
            <div className="mt-3 pt-2 h-72 pb-3 rounded-md px-3 bg-mt-gray-680">
                <Title intent="h5" className="pb-3">
                   <Skeleton className="h-3 mt-1 rounded-sm w-full " />
                </Title>
                <Skeleton className="h-20 mt-1 rounded-sm w-full " />
            </div>
             <div className="pt-4 flex w-full justify-end">
                <Skeleton className="h-10 mt-1 rounded-sm w-24 mr-3 " />
                <Skeleton className="h-10 mt-1 rounded-sm w-24 " />
             </div>
        </div>
    )
}
