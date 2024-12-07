import React, { FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import PartnerService from '@/services/partner/partner.service'
import PartnerEditInput from '../base/PartnerEditInput'
import { PartnersStatusSelect } from '../base/PartnersStatusSelect'

interface Props {
	setIsPartnerCreatActive: (value: boolean) => void
}

const PartnerCreateModal = ({ setIsPartnerCreatActive }: Props) => {
	const [name, setName] = useState('')
	const [lastname, setLastname] = useState('')
	const [email, setEmail] = useState('')
	const [registerDate, setRegisterDate] = useState('')
	const [phone, setPhone] = useState('')
	const [totalAwards, setTotalAwards] = useState('')
	const [balance, setBalance] = useState('')
	const [status, setStatus] = useState('')

	const { mutate } = useMutation({
		mutationFn: () =>
			PartnerService.createPartner({
				name,
				lastname,
				email,
				registerDate,
				phone,
				balance: Number(balance),
				totalAwards: Number(totalAwards),
				status,
			}),
		onSuccess: () => {
			setIsPartnerCreatActive(false)
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
							name='Имя'
						/>
						<PartnerEditInput
							value={lastname}
							className='max-w-[200px]'
							onChange={setLastname}
							name='Фамилия'
						/>
						<PartnerEditInput
							value={email}
							className='max-w-[200px]'
							onChange={setEmail}
							name='email'
						/>

						<PartnerEditInput
							value={registerDate}
							className='max-w-[200px]'
							onChange={setRegisterDate}
							name='registerDate'
							dateBirthday
						/>
						<PartnerEditInput
							className='max-w-[200px]'
							value={phone}
							onChange={setPhone}
							name='Телефон'
							tel
						/>

							<PartnerEditInput
								value={totalAwards}
								className='max-w-[200px]'
								onChange={setTotalAwards}
								num
								name='Вознаг-ие'
							/>
							<PartnerEditInput
								value={balance}
								num
								className='max-w-[200px] '
								onChange={setBalance}
								name='Баланс'
							/>
							<div className='mb-1'>
								<PartnersStatusSelect type='normal' setActiveSelecItem={setStatus} />
							</div>

						<div className='flex items-center gap-3 ml-[5%]'>
							<Button
								variant='outline'
								className=' bg-secondary text-primary hover:text-white border-none hover:bg-primary duration-200 '
								onClick={() => setIsPartnerCreatActive(false)}>
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

export default PartnerCreateModal
