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

interface Props {
	type: 'edit' | 'normal'               
	setActiveSelecItem: (value: string) => void
	className?: string
}

export function SelectOffer({
	setActiveSelecItem,
	type = 'normal',
	className,
}: Props) {
	const { data } = useGetAllOffers()
	const [searchTerm, setSearchTerm] = useState('')

	const searchData = data?.filter(partner =>
		partner.name?.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handleSelectChange = (value: string) => {
		setActiveSelecItem(value)
	}

	return (
		<Select onValueChange={handleSelectChange}>
			<div>
				<SelectTrigger className={`${type === 'edit' ? 'w-[134px] border-none -my-2' : 'w-[170px]'} ${className}`}>
					<SelectValue placeholder='Оффер' />
				</SelectTrigger>
			</div>
			<SelectContent>
				<SelectGroup className='text-primary bg-white'>
					<input
						type='text'
						placeholder='Поиск по имени...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className='w-full p-2 mb-2 border-b border-sidebarText outline-none'
					/>
					{searchData?.map(offer => (
						<SelectItem value={String(offer.id)} key={offer.id}>
							{offer.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}