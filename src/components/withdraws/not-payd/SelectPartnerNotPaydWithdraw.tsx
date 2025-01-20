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

interface Props {
	setActiveSelecItem: (value: string) => void
	className?: string
	type: 'edit' | 'normal'
}

export function SelectPartnerNotPaydWithdraw({ setActiveSelecItem, type = 'normal', className }: Props) {
	const { data: partners } = useGetAllPartners() // Получение данных партнеров

	const data = partners?.filter((partner) =>
		partner.withdraws?.some((withdraw) => withdraw.isPaydOut === false)
	)

	const handleSelectChange = (value: string) => {
		setActiveSelecItem(value)
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
					{data?.map((partner) => (
							<SelectItem value={String(partner.name)} key={partner.id}>
								{partner.name}
							</SelectItem>
						))}
					<SelectItem value='Clear'>Партнер</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}