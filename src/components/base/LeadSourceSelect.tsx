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
	type: 'edit' | 'normal'
}

export enum LeadSourceEnum {
	DirectAdd = 'Прямое добавление',
	ReferrelProgram = 'Реферальная программа',
	Promokod = 'Промокод',
}

export function LeadSourceSelect({ setActiveSelecItem, type = 'normal', className }: Props) {
	const handleSelectChange = (value: string) => {
		setActiveSelecItem(value)
	}

	return (
		<Select onValueChange={handleSelectChange}>
			<SelectTrigger className={`${type === 'edit' ? 'w-[134px] border-none -my-2' : 'w-[170px]'} ${className}`}>
				<SelectValue placeholder='Источник' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup className='text-primary bg-white'>
					<SelectItem value='Clear'>Источник</SelectItem>
					<SelectItem value='Прямое добавление'>{LeadSourceEnum.DirectAdd}</SelectItem>
					<SelectItem value='Реферальная программа'>{LeadSourceEnum.ReferrelProgram}</SelectItem>
					<SelectItem value='Промокод'>{LeadSourceEnum.Promokod}</SelectItem>

				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
