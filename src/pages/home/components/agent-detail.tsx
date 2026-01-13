import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { useQuery } from '@tanstack/react-query'
import { getagentDetails } from '../services/agent-details'
import { property_code, reqType } from '@/store/store'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { postreject } from '../services/reject'
import { getsubmitState } from '../services/send-approve'

export default function AgentDetails() {
    const [resubmit, setResubmit] = useState("")
    const [inputSubmit, setInputValue] = useState("")
    const [inputStatus, setINputStatus] = useState(false)
    const [submitStatus, setsubmitStatus] = useState("")
    const { data } = useQuery(getagentDetails(property_code.value))
    const { data: newdata } = useQuery(getsubmitState(submitStatus))
    // console.log(newdata)
    const response = data

    const toUsers = response?.toemailusers ?? []
    const ccUsers = response?.ccemailusers ?? []
    const emailMessage = response?.message ?? '';

    useQuery(
        postreject(inputSubmit)
    );

    function handle() {
        setInputValue(resubmit);
        setResubmit("")
        setINputStatus(false)
    }

    function handleSubmit() {
        setsubmitStatus("JE")
    }

    const rejectValue = reqType.value === "JE" ? "Reject" : "Resubmit"
    const approveValue = reqType.value === "JE" ? "Approve" : "Send Mail"
    const dataVal = reqType.value === "JE" ? "Analysis" : "Email Content";
    // const dataVal = reqType.value;
    console.log(reqType.value, "reqType.value");


    return (
        <div className="rounded-md bg-white xl:w-1/3 p-3">
            {/* To & CC */}
            {
                reqType.value !== "JE" && <div className="flex w-full gap-5 bg-mt-gray-680 rounded-md px-3 py-3">
                    <div>
                        <Title intent="h5">To:</Title>
                        <span className='text-mt-normal'>
                            {toUsers?.map(u => u.email).join(', ') || '-'}
                        </span>
                    </div>

                    <div>
                        <Title intent="h5">CC:</Title>
                        <span className='text-mt-normal'>
                            {ccUsers?.map(u => u.email).join(', ') || '-'}
                        </span>
                    </div>
                </div>
            }

            {/* Email Content */}
            <div className="mt-3 pt-2 pb-3 rounded-md px-3 bg-mt-gray-680">
                <Title intent="h5" className="pb-3">
                    {dataVal}
                </Title>
                <p className="text-sm leading-relaxed">
                    {emailMessage}
                </p>
            </div>


            {
                inputStatus && <div className='py-3 bg-white'>
                    <Label htmlFor="resubmitReason" className='text-mt-normal pb-1 font-semibold block'>
                        {
                            reqType.value === "JE" ? "Enter Reject Reason" : "Enter Resubmit Reason"
                        }
                    </Label>
                    <Input placeholder='Enter reason' value={resubmit} onChange={(e) => setResubmit(e.target.value)} className='' />
                </div>
            }
            <div className="pt-4 flex w-full justify-end">
                {
                    inputStatus && <Button variant="default" className="mr-3" onClick={() => setINputStatus(false)}>
                        Back
                    </Button>
                }
                {
                    inputStatus === false ? <Button className="cursor-pointer transition-all" variant="ghost" onClick={() => setINputStatus(true)}>{rejectValue}</Button> : <Button className="cursor-pointer transition-all" variant="ghost" onClick={handle}>{ reqType.value === "JE" ? "Reject" : "Resubmit"}</Button>
                }
                {
                    !inputStatus && <Button variant="default" className="ml-3" onClick={handleSubmit}>
                        {approveValue}
                    </Button>
                }
            </div>
        </div>
    )
}
