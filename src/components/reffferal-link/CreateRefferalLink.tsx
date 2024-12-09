'use client'

import { FormEvent, useState } from 'react'
import { SelectPartner } from '../base/PartnerSelect'
import { Button } from '../ui/button'
import RefferalLinkService from '@/services/referral-links/referral-links.service'
import { IRefferalLink } from '@/types/refferal-links.interface'

interface Props {
	partnerId: string
	setPartnerId: (partnerId: string) => void
}

const CreateRefferalLink = ({ partnerId, setPartnerId }: Props) => {
	const [refferalLink, setRefferalLink] = useState<IRefferalLink>()

	const createRefferalLink = async () => {
		const response = await RefferalLinkService.createRefferalLink({
			partnerId: Number(partnerId),
		})
		setRefferalLink(response.data)
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		try {
			await createRefferalLink()
		} catch (error) {
			console.error('Ошибка создния ссылки', error)
		}
	}

	return (
		<>
			<form className='mt-20 flex items-center gap-5' onSubmit={handleSubmit}>
				<SelectPartner type='normal' setActiveSelecItem={setPartnerId} />
				<Button type='submit'>Создать ссылку</Button>
			</form>

			{refferalLink?.id && (
				<div>
					<div className='mb-5 text-primary font-bold'>Созданная ссылка</div>
					<div className='flex flex-col gap-3 mb-5'>
						<div className='flex items-center justify-around'>
							<div>
								<span className='text-primary'>Id реферальной ссылки: </span>
								{refferalLink.id}
							</div>
							<div>
								<span className='text-primary'>Id Партнера: </span>
								{refferalLink.partnerId}
							</div>
							<div>
								<span className='text-primary'>Имя Партнера: </span>
								{refferalLink?.partner?.name}
							</div>
						</div>
						<div>
							<div>{refferalLink.localeLinkPath}</div>
							<div>{refferalLink.serverLinkPath}</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default CreateRefferalLink
