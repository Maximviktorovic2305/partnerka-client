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

export enum LeadStatusEnum {
	New = 'Новый',
	InWork = 'В работе',
	Deal = 'Сделка',
	Cancel = 'Отмена' 
}

export function LeadStatusSelect({ setActiveSelecItem, type = 'normal', className }: Props) {
	const handleSelectChange = (value: string) => {
		setActiveSelecItem(value)
	}

	return (
		<Select onValueChange={handleSelectChange}>
			<SelectTrigger className={`${type === 'edit' ? 'w-[134px] border-none -my-2' : 'w-[170px]'} ${className}`}>
				<SelectValue placeholder='Статус' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup className='text-primary bg-white'>
					<SelectItem value='Clear'>Статус</SelectItem>
					<SelectItem value="Новый">{LeadStatusEnum.New}</SelectItem>
					<SelectItem value="В работе">{LeadStatusEnum.InWork}</SelectItem>
					<SelectItem value="Сделка">{LeadStatusEnum.Deal}</SelectItem>
					<SelectItem value="Отмена">{LeadStatusEnum.Cancel}</SelectItem>

				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
