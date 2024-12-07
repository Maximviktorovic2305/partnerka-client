import React, { FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import PartnerEditInput from '../base/PartnerEditInput'
import LeadsService from '@/services/leads/lead.service'
import { SelectPartner } from '../base/PartnerSelect'
import { LeadSourceSelect } from '../base/LeadSourceSelect'
import { LeadStatusSelect } from '../base/LeadStatusSelect'

interface Props {
	setIsLeadCreatActive: (value: boolean) => void
}

const LeadCreateModal = ({ setIsLeadCreatActive }: Props) => {
	const [name, setName] = useState('')
	const [sourse, setSourse] = useState('')
	const [status, setStatus] = useState('')
	const [offer, setOffer] = useState('')
	const [amount, setAmount] = useState<string | number>(0)
	const [partner, setPartner] = useState<string | number>(0)

	const { mutate } = useMutation({
		mutationFn: () =>
			LeadsService.createLead({
				name,
				sourse,
				status,
				offer,
				amount: Number(amount),
				partnerId: Number(partner),
			}),
		onSuccess: () => {
			setIsLeadCreatActive(false)
		},
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			await mutate()
		} catch (error) {
			console.error('Ошибка создния партнера', error)
		}
	}

	return (
		<div className='w-full rounded-md mt-5 mb-2 bg-secondary shadow-md shadow-primary text-primary'>
			<form onSubmit={handleSubmit} className='p-3 flex flex-col'>
				<div className='flex items-center gap-3 justify-between flex-wrap'>
					<PartnerEditInput
						className='text-primary mt-[1px] border-blue2/70'
						onChange={setName}
						value={name}
						name='Имя'
					/>
					<div className='text-primary border-blue2/70'>
						<SelectPartner type='normal'
							className='border-blue2/70'
							setActiveSelecItem={setPartner}
						/>
					</div>

					<div className='text-primary border-blue2/70'>
						<LeadSourceSelect type='normal'
							className='border-blue2/70'
							setActiveSelecItem={setSourse}
						/>
					</div>

					<div className='text-primary border-blue2/70'>
						<LeadStatusSelect type='normal'
							className='border-blue2/70'
							setActiveSelecItem={setStatus}
						/>
					</div>

					<PartnerEditInput
						className='text-primary mt-[1px] border-blue2/70'
						value={offer}
						onChange={setOffer}
						name='Оффер'
					/>
					<PartnerEditInput
						className='text-primary mt-[1px] border-blue2/70'
						value={String(amount)}
						onChange={setAmount}
						num
						name='Сумма'
					/>
				</div>

				<div className='flex gap-3 mt-3'>
					<Button
						variant='outline'
						className=' bg-secondary text-primary hover:text-white border-none hover:bg-primary duration-200 '
						onClick={() => setIsLeadCreatActive(false)}>
						Отмена
					</Button>
					<Button
						type='submit'
						className='bg-newAccent text-primary hover:text-white duration-200 '>
						Сохранить
					</Button>
				</div>
			</form>
		</div>
	)
}

export default LeadCreateModal
