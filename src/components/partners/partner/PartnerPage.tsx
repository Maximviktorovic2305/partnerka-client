'use client'

import { useGetPartnerById } from "@/queries/partners"
import PartnerProfile from "./PartnerProfile"
import PartnerLeads from "./PartnerLeads"
import PartnerWithdraws from "./PartnerWithdraws"

interface Props {
   id: number
}

const PartnerPage = ({ id }: Props) => {
  const { data: partner } = useGetPartnerById(id)
  
  if (typeof window === undefined) {
    return
  }

  return (
    <div className="size-full min-h-screen m-3 mt-10">
      <PartnerProfile partner={partner ?? undefined} />
      <PartnerLeads partner={partner ?? undefined} />
      <PartnerWithdraws partner={partner ?? undefined} />
    </div>
  )
}

export default PartnerPage