import React, { FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import PartnerEditInput from '../base/PartnerEditInput'
import RefferalLinkService from '@/services/referral-links/referral-links.service'
import { SelectPartner } from '../base/PartnerSelect'
import { SelectOffer } from '../base/SelectOffer'

interface Props {
	setIsReffLinkCreatActive: (value: boolean) => void
}

const ReffCreateModal = ({ setIsReffLinkCreatActive }: Props) => {
   const [partner, setPartner] = useState('')
	const [offer, setOffer] = useState('')
	const [name, setName] = useState('')


	const { mutate } = useMutation({
		mutationFn: () =>
			RefferalLinkService.createRefferalLink({
				name,
            partnerId: Number(partner),
            offerId: Number(offer),
			}),
		onSuccess: () => {
			setIsReffLinkCreatActive(false)
		},
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			await mutate()
		} catch (error) {
			console.error('Ошибка создния ссылки', error)
		}
	}

	return (
		<div className='w-full rounded-md mt-5 mb-2 bg-secondary shadow-md shadow-primary text-primary'>
			<form onSubmit={handleSubmit} className='p-3'>
					<div className='flex items-center gap-3 flex-wrap'>
                  <span className='-mt-1'>
						   <SelectPartner type='normal' setActiveSelecItem={setPartner} />
                  </span>

                  <span className='-mt-1'>
                     <SelectOffer type='normal' setActiveSelecItem={setOffer} />
                  </span>

						<PartnerEditInput
							value={name}
							className='max-w-[200px]'
							onChange={setName}
							name='Наименование'
						/>

						<div className='flex items-center gap-3 ml-[5%]'>
							<Button
								variant='outline'
								className=' bg-secondary text-primary hover:text-white border-none hover:bg-primary duration-200 '
								onClick={() => setIsReffLinkCreatActive(false)}>
								Отмена
							</Button>
							<Button
								type='submit'
								className='bg-newAccent text-primary hover:text-white duration-200 '>
								Сохранить
							</Button>
						</div>
					</div>
			</form>
		</div>
	)
}

export default ReffCreateModal
