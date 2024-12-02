'use client'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

interface Props {
	setActiveSelecItem: (value: string) => void
	className?: string
}

export enum LeadSourceEnum {
	DirectAdd = 'Прямое добавление',
	ReferrelProgram = 'Реферальная программа',
	Promokod = 'Промокод',
}

export function LeadSourceSelect({ setActiveSelecItem, className }: Props) {
	const handleSelectChange = (value: string) => {
		setActiveSelecItem(value)
	}

	return (
		<Select onValueChange={handleSelectChange}>
			<SelectTrigger className={`w-[180px] ${className}`}>
				<SelectValue placeholder='Источник' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup className='text-primary bg-white'>
					<SelectItem value='Clear'>Источник</SelectItem>
					<SelectItem value='DirectAdd'>{LeadSourceEnum.DirectAdd}</SelectItem>
					<SelectItem value='ReferrelProgram'>{LeadSourceEnum.ReferrelProgram}</SelectItem>
					<SelectItem value='Promokod'>{LeadSourceEnum.Promokod}</SelectItem>

				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
