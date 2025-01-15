'use client'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useGetAllPartners } from '@/queries/partners' // Импорт функции для получения данных партнеров
import { useState } from 'react'

interface Props {
	setActiveSelecItem: (value: string) => void
	className?: string
	type: 'edit' | 'normal'
}

export function SelectPartnerPaydWithdraw({setActiveSelecItem, type = 'normal', className}: Props) {
	const { data: partners } = useGetAllPartners() // Получение данных партнеров
	const [searchTerm, setSearchTerm] = useState('')

	const data = partners?.filter((partner) =>
		partner.withdraws?.some((withdraw) => withdraw.isPaydOut === true)
	)

	const handleSelectChange = (value: string) => {
		setActiveSelecItem(value)

		if (value === 'Clear') {
			setSearchTerm('') // Сброс строки поиска если выбрано "Clear"
		}
	}

	return (
		<Select onValueChange={handleSelectChange}>
			<SelectTrigger
				className={`${
					type === 'edit' ? 'w-[134px] border-none -my-2' : 'w-[170px]'
				} ${className}`}>
				<SelectValue placeholder='Партнер' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup className='text-primary bg-white'>
					<input
						type='text'
						placeholder='Поиск по имени...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='w-full p-2 mb-2 border-b border-sidebarText outline-none'
					/>
					{data
						?.filter((partner) =>
							partner.name?.toLowerCase().includes(searchTerm.toLowerCase()),
						)
						.map((partner) => (
							<SelectItem value={String(partner.id)} key={partner.id}>
								{partner.name}
							</SelectItem>
						))}
					<SelectItem value='Clear'>Очистить</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
