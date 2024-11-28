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
	Base = 'Base',
	Advanced = 'Advanced',
	Pro = 'Pro',
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
					<SelectItem value='Base'>{PartnerStatusEnum.Base}</SelectItem>
					<SelectItem value='Advanced'>{PartnerStatusEnum.Advanced}</SelectItem>
					<SelectItem value='Pro'>{PartnerStatusEnum.Pro}</SelectItem>

				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
