import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { useQuery } from '@tanstack/react-query'
import { getagentDetails } from '../services/agent-details'
import { property_code } from '@/store/store'

export default function AgentDetails() {
    const { data } = useQuery(getagentDetails(property_code.value))

    const response = data

    const toUsers = response?.toemailusers ?? []
    const ccUsers = response?.ccemailusers ?? []
    const emailMessage = response?.message ?? ''

    return (
        <div className="rounded-md bg-white xl:w-1/3 p-3">
            {/* To & CC */}
            <div className="flex w-full gap-5 bg-mt-gray-680 rounded-md px-3 py-3">
                <div>
                    <Title intent="h5">To:</Title>
                    <span className='text-mt-normal'>
                        {toUsers.map(u => u.email).join(', ') || '-'}
                    </span>
                </div>

                <div>
                    <Title intent="h5">CC:</Title>
                    <span className='text-mt-normal'>
                        {ccUsers.map(u => u.email).join(', ') || '-'}
                    </span>
                </div>
            </div>

            {/* Email Content */}
            <div className="mt-3 pt-2 pb-3 rounded-md px-3 bg-mt-gray-680">
                <Title intent="h5" className="pb-3">
                    Email Content
                </Title>

                <p className="text-sm leading-relaxed">
                    {emailMessage}
                </p>
            </div>

            {/* Actions */}
            <div className="pt-4 flex w-full justify-end">
                <Button variant="ghost">Resubmit</Button>
                <Button variant="default" className="ml-3">
                    Send Mail
                </Button>
            </div>
        </div>
    )
}
