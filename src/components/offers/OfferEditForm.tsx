'use client'

import { useState, FormEvent } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import PartnerEditInput from '../base/PartnerEditInput'
import { IOffer } from '@/types/offer.interface'
import OfferService from '@/services/offer/offer.service'

interface Props {
	offer: IOffer
	setActiveEditOffer: (active: boolean) => void
}

const OfferEditForm = ({ setActiveEditOffer, offer }: Props) => {
	const [name, setName] = useState(offer.name ?? '')
	const [domain, setDomain] = useState(offer.domain ?? '')
	const [conversions, setConversions] = useState(offer.conversions ?? '')
	const [amount, setAmount] = useState(offer.amount ?? '')


	const { mutate } = useMutation({
		mutationFn: () =>
			OfferService.updateOffer({
				id: offer.id,
            name,
            domain, 
            conversions: Number(conversions), 
            amount: Number(amount),
			}),
		onSuccess: () => {
			setActiveEditOffer(false)
		},
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			await mutate()
		} catch (error) {
			console.error('Ошибка обновления партнера!!!', error)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className='fixed top-2 right-10'>
				<div className='px-5 pt-5 pb-[22%] relative flex flex-col gap-4 z-10 rounded-lg bg-primary/80 backdrop-blur-sm text-primary min-w-[300px] right-10 top-10'>
					<PartnerEditInput
						className='text-newAccent border-white'
						onChange={setName}
						value={name}
						name='Название'
					/>
					<PartnerEditInput
						className='text-newAccent border-white'
						value={domain}
						onChange={setDomain}
						name='Страница'
					/>
					<PartnerEditInput
						value={String(conversions)}
						className='max-w-[200px] text-newAccent border-white'
						onChange={setConversions}
						name='Конверсии'
                  num
					/>
					<PartnerEditInput
						className='text-newAccent border-white'
						value={String(amount)}
						onChange={setAmount}
						name='Сумма'
                  num
					/>

				</div>
				<div className='flex z-50 absolute -bottom-6 right-[20%] items-center gap-3'>
					<Button
						variant='outline'
						className=' bg-secondary text-primary hover:text-white border-none hover:bg-primary duration-200 '
						onClick={() => setActiveEditOffer(false)}>
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

export default OfferEditForm
