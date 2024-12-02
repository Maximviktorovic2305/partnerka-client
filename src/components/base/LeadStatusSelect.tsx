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

export enum LeadStatusEnum {
	New = 'Новый',
	InWork = 'В работе',
	Deal = 'Сделка',
	Cancel = 'Отмена' 
}

export function LeadStatusSelect({ setActiveSelecItem, className }: Props) {
	const handleSelectChange = (value: string) => {
		setActiveSelecItem(value)
	}

	return (
		<Select onValueChange={handleSelectChange}>
			<SelectTrigger className={`w-[180px] ${className}`}>
				<SelectValue placeholder='Статус' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup className='text-primary bg-white'>
					<SelectItem value='Clear'>Статус</SelectItem>
					<SelectItem value="New">{LeadStatusEnum.New}</SelectItem>
					<SelectItem value="InWork">{LeadStatusEnum.InWork}</SelectItem>
					<SelectItem value="Deal">{LeadStatusEnum.Deal}</SelectItem>
					<SelectItem value="Cancel">{LeadStatusEnum.Cancel}</SelectItem>

				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
