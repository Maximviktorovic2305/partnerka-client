'use client'

import OffersWidget from '@/components/offers/OffersWidget'
import ReferralsLinksWidget from '@/components/reffferal-link/ReferralsLinksWidget'
import { useGetCurrentPartner } from '@/hooks/useGetCurrentPartner'
import { useUser } from '@/hooks/useSelectors'
import React from 'react'

const Offers = () => {
	const partner = useGetCurrentPartner()
	const { isAdmin } = useUser()
	return (
		<>
			{isAdmin && <OffersWidget />}
			<ReferralsLinksWidget partner={partner} />
		</> 
	)
}

export default Offers
