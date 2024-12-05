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
	setActiveSelecItem: (value: string) => void
	className?: string
}

export function SelectPartner({
	setActiveSelecItem,
	className
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
				{/* <div className='text-[10px] text-left pl-2 text-muted-foreground'>{label}</div> */}
				<SelectTrigger className={`w-[200px] ${className}`}>
					<SelectValue placeholder='Имя' />
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
