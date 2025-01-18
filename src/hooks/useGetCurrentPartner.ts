'use client'

import { useGetPartnerByEmail } from '@/queries/partners'
import { useUser } from './useSelectors'
import { useEffect, useState } from 'react'
import { IPartner } from '@/types/partner.interface'

export function useGetCurrentPartner() {
	const { user } = useUser()
	const [partner, setPartner] = useState<IPartner | undefined>(undefined)
	const { data } = useGetPartnerByEmail(user?.email ?? '')

	useEffect(() => {
		if (user?.email) {
			setPartner(data)
		}
	}, [data, user?.email])

	return partner
}
