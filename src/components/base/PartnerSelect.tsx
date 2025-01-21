'use client'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useGetAllPartners } from '@/queries/partners'
import { useState } from 'react'

interface Props {
	type: 'edit' | 'normal'               
	setActiveSelecItem: (value: string) => void
	className?: string
}

export function SelectPartner({
	setActiveSelecItem,
	type = 'normal',
	className,
}: Props) {
	const { data } = useGetAllPartners()
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
					<SelectValue placeholder='Партнер' />
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
					{searchData?.map(partner => (
						<SelectItem value={String(partner.id)} key={partner.id}>
							{partner.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
