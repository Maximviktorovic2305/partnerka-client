'use client'

import { useState, FormEvent } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import PartnerEditInput from '../base/PartnerEditInput'
import { IRefferalLink } from '@/types/refferal-links.interface'
import { SelectPartner } from '../base/PartnerSelect'
import RefferalLinkService from '@/services/referral-links/referral-links.service'
import { SelectOffer } from '../base/SelectOffer'

interface Props {
	reffLink: IRefferalLink
	setActiveEditReffLink: (active: boolean) => void
}

const ReffEditForm = ({ setActiveEditReffLink, reffLink }: Props) => {
	const [name, setName] = useState(reffLink.name ?? '')
	const [partner, setPartner] = useState<string | number>(
		reffLink.partnerId ?? 0,
	)
	const [localeLinkPath, setLocaleLinkPath] = useState(
		reffLink.localeLinkPath ?? '',
	)
	const [offerName, setOfferName] = useState(reffLink.offer?.name ?? '')
	const [viewUniqueCount, setViewUniqueCount] = useState(
		reffLink.viewUniqueCount ?? '',
	)
	const [viewCount, setViewCount] = useState(reffLink.viewCount ?? '')
	const [conversions, setConversions] = useState(reffLink.conversions ?? '')
	const [amountToAwait, setAmountToAwait] = useState(
		reffLink.amountToAwait ?? '',
	)
	const [amountToPay, setAmountToPay] = useState(reffLink.amountToPay ?? '')

	const { mutate } = useMutation({
		mutationFn: () =>
			RefferalLinkService.updateRefferalLink({
				id: reffLink.id,
				name,
				partnerId: Number(partner),
            offerId: Number(offerName),
				localeLinkPath,
				viewUniqueCount: Number(viewUniqueCount),
				viewCount: Number(viewCount),
				conversions: Number(conversions),
				amountToAwait: Number(amountToAwait),
				amountToPay: Number(amountToPay),
			}),
		onSuccess: () => {
			setActiveEditReffLink(false)
		},
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			await mutate()
		} catch (error) {
			console.error('Ошибка обновления ссылки!!!', error)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className='fixed top-2 right-10'>
				<div className='px-5 pt-5 pb-[22%] relative flex flex-col gap-4 z-10 rounded-lg bg-primary/80 backdrop-blur-sm text-primary min-w-[300px] right-10 top-10'>
					<PartnerEditInput
						className='text-newAccent border-white placeholder:text-newAccent/50'
						onChange={setName}
						value={name}
						name='Название'
					/>

					<div className='text-newAccent border-white placeholder:text-newAccent/50'>
						<SelectPartner type='normal' setActiveSelecItem={setPartner} />
					</div>

					<PartnerEditInput
						className='text-newAccent border-white placeholder:text-newAccent/50'
						value={localeLinkPath}
						onChange={setLocaleLinkPath}
						name='Ссылка'
					/>         

					<div className='text-newAccent border-white placeholder:text-newAccent/50'>
						<SelectOffer type='normal' setActiveSelecItem={setOfferName} />
					</div>

					<PartnerEditInput
						value={String(viewUniqueCount)}
						className='max-w-[200px] text-newAccent border-white placeholder:text-newAccent/50'
						onChange={setViewUniqueCount}
						name='Переходы уник'
						num
					/>
					<PartnerEditInput
						value={String(viewCount)}
						className='max-w-[200px] text-newAccent border-white placeholder:text-newAccent/50'
						onChange={setViewCount}
						name='Переходы все'
						num
					/>
					<PartnerEditInput
						value={String(conversions)}
						className='max-w-[200px] text-newAccent border-white placeholder:text-newAccent/50'
						onChange={setConversions}
						name='Конверсии'
						num
					/>
					<PartnerEditInput
						value={String(amountToAwait)}
						className='max-w-[200px] text-newAccent border-white placeholder:text-newAccent/50'
						onChange={setAmountToAwait}
						name='Сумма в ожидании'
						num
					/>
					<PartnerEditInput
						value={String(amountToPay)}
						className='max-w-[200px] text-newAccent border-white placeholder:text-newAccent/50'
						onChange={setAmountToPay}
						name='Сумма начислено'
						num
					/>
				</div>
				<div className='flex z-50 absolute -bottom-6 right-[20%] items-center gap-3'>
					<Button
						variant='outline'
						className=' bg-secondary text-primary hover:text-white border-none hover:bg-primary duration-200 '
						onClick={() => setActiveEditReffLink(false)}>
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

export default ReffEditForm
