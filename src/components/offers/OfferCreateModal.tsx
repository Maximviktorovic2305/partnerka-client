import React, { FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import PartnerEditInput from '../base/PartnerEditInput'
import OfferService from '@/services/offer/offer.service'

interface Props {
	setIsOfferCreatActive: (value: boolean) => void
}

const OfferCreateModal = ({ setIsOfferCreatActive }: Props) => {
	const [name, setName] = useState('')
	const [domain, setDomain] = useState('')


	const { mutate } = useMutation({
		mutationFn: () =>
			OfferService.createOffer({
				name,
            domain
			}),
		onSuccess: () => {
			setIsOfferCreatActive(false)
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
			<form onSubmit={handleSubmit} className='p-3'>
					<div className='flex items-center gap-3 flex-wrap'>
						<PartnerEditInput
							className='max-w-[200px]'
							onChange={setName}
							value={name}
							name='Название'
						/>
						<PartnerEditInput
							value={domain}
							className='max-w-[200px]'
							onChange={setDomain}
							name='Посадочная страница'
						/>

						<div className='flex items-center gap-3 ml-[5%]'>
							<Button
								variant='outline'
								className=' bg-secondary text-primary hover:text-white border-none hover:bg-primary duration-200 '
								onClick={() => setIsOfferCreatActive(false)}>
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

export default OfferCreateModal
