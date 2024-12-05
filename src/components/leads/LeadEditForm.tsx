'use client'

import { useState, FormEvent } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import PartnerEditInput from '../base/PartnerEditInput'
import { ILead } from '@/types/lead.interface'
import { SelectPartner } from '../base/PartnerSelect'
import { LeadSourceSelect } from '../base/LeadSourceSelect'
import { LeadStatusSelect } from '../base/LeadStatusSelect'
import LeadsService from '@/services/leads/lead.service'

interface Props {
	lead: ILead
	setActiveEditLead: (active: boolean) => void
}

const PartnerEditForm = ({ setActiveEditLead, lead }: Props) => {
	const [name, setName] = useState(lead.name ?? '')
	// const [updatedFormatedDate, setUpdatedFormatedDate] = useState(lead.updatedFormatedDate ?? '')
	const [sourse, setSourse] = useState(lead.sourse ?? '')
	const [status, setStatus] = useState(lead.status ?? '')
	const [offer, setOffer] = useState(lead.offer ?? '')   
	const [amount, setAmount] = useState<string | number>(lead.amount ?? 0)
	const [partner, setPartner] = useState<string | number>(lead.partnerId ?? 0)


	const { mutate } = useMutation({
		mutationFn: () =>
			LeadsService.updateLead({
            id: lead.id,
				name,
				// updatedFormatedDate,
				sourse,
				status,
            offer,
				amount: Number(amount),
				partnerId: Number(partner),
			}),
		onSuccess: () => {
			setActiveEditLead(false)
		},
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			await mutate()
		} catch (error) {
			console.error('Ошибка обновления лида!!!', error)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className='fixed top-2 right-10'>
				<div className='px-5 pt-5 pb-[22%] relative z-10 rounded-lg flex flex-col gap-3 bg-primary/80 backdrop-blur-sm text-primary min-w-[300px] right-10 top-10'>
					<PartnerEditInput
					className='text-newAccent border-white'
						onChange={setName}
						value={name}
						name='Имя'
					/>
					<div className='text-newAccent border-white'>
							<SelectPartner
								setActiveSelecItem={setPartner}
							/>
						</div>

               <div className='text-newAccent border-white'>
							<LeadSourceSelect
								setActiveSelecItem={setSourse}
							/>
						</div>

               <div className='text-newAccent border-white'>
							<LeadStatusSelect
								setActiveSelecItem={setStatus}
							/>
						</div>               

               <PartnerEditInput
					className='text-newAccent border-white'
						value={offer}
						onChange={setOffer}
						name='Оффер'
					/>

					<PartnerEditInput
					className='text-newAccent border-white'
						value={String(amount)}
						onChange={setAmount}
						name='Сумма'
					/>

				</div>
				<div className='flex z-50 absolute -bottom-6 right-[20%] items-center gap-3'>
					<Button
						variant='outline'
						className=' bg-secondary text-primary hover:text-white border-none hover:bg-primary duration-200 '
						onClick={() => setActiveEditLead(false)}>
						Отмена
					</Button>
					<Button
						type='submit'
						className=' bg-primary text-muted-foreground hover:text-white duration-200 '>
						Сохранить
					</Button>
				</div>
			</form>
		</div>
	)
}

export default PartnerEditForm
