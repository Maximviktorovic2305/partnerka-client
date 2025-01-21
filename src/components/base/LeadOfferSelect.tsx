'use client'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useGetAllOffers } from '@/queries/offers'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'

interface Props {
	type: 'edit' | 'normal'
	setActiveSelecItem: (value: string) => void
	className?: string
}

export function LeadOfferSelect({
	setActiveSelecItem,
	type = 'normal',
	className,
}: Props) {
	const { data } = useGetAllOffers()
	const [searchTerm, setSearchTerm] = useState('')

	const searchData = data?.filter((offer) =>
		offer.name?.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handleSelectChange = (value: string) => {
		setActiveSelecItem(value)
	}

	if (typeof window == 'undefined') {
		return
	}

	return (
		<Select onValueChange={handleSelectChange}>
			<div>
				{/* <div className='text-[10px] text-left pl-2 text-muted-foreground'>{label}</div> */}
				<SelectTrigger
					className={`${
						type === 'edit' ? 'w-[134px] border-none -my-2' : 'w-[170px]'
					} ${className}`}>
					<SelectValue placeholder='Оффер' />
				</SelectTrigger>
			</div>
			<SelectContent>
				<SelectGroup className='text-primary bg-white'>
					<input
						type='text'
						placeholder='Поиск по названию...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='w-full p-2 mb-2 border-b border-sidebarText outline-none'
					/>
					{searchData?.map((offer) => (
						<SelectItem value={String(offer.name)} key={offer.id ?? uuidv4()}>
							{offer.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
