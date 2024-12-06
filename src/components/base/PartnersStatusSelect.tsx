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

interface Props {
	type: 'edit' | 'normal'
	setActiveSelecItem: (value: string) => void
}

export function PartnersStatusSelect({ setActiveSelecItem, type = 'normal' }: Props) {
	const handleSelectChange = (value: string) => {
		setActiveSelecItem(value)
	}

	return (
		<Select onValueChange={handleSelectChange}>
			<SelectTrigger className={`${type === 'edit' ? 'w-[134px] border-none -my-1' : 'w-[170px]'}`}>
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
