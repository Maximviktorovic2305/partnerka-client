'use client'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export enum PartnerStatusEnum {
	Base = 'Базовый',
	Advanced = 'Продвинутый',
	Pro = 'Профессионал',
}

export function PartnersStatusSelect({
	setActiveSelecItem,
}: {
	setActiveSelecItem: (value: string) => void
}) {
	const handleSelectChange = (value: string) => {
		setActiveSelecItem(value)
	}

	return (
		<Select onValueChange={handleSelectChange}>
			<SelectTrigger className='w-[180px] '>
				<SelectValue placeholder='Статус' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup className='text-primary bg-white'>
					<SelectItem value='Clear'>Статус</SelectItem>
					<SelectItem value='Базовый'>{PartnerStatusEnum.Base}</SelectItem>
					<SelectItem value='Продвинутый'>{PartnerStatusEnum.Advanced}</SelectItem>
					<SelectItem value='Профессионал'>{PartnerStatusEnum.Pro}</SelectItem>

				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
