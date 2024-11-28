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
				status
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
				<div className=''>
					<div className='flex items-center justify-between'>
						<PartnerEditInput
							className='max-w-[200px]'
							onChange={setName}
							value={name}
							name='Имя'
							text='Имя'
						/>
						<PartnerEditInput
							value={lastname}
							className='max-w-[200px]'
							onChange={setLastname}
							name='Фамилия'
							text='Фамилия'
						/>
						<PartnerEditInput
							value={email}
							className='max-w-[200px]'
							onChange={setEmail}
							name='email'
							text='Email'
						/>

						<PartnerEditInput
							value={registerDate}
							className='max-w-[200px]'
							onChange={setRegisterDate}
							name='registerDate'
							dateBirthday
							text='Дата Рег-ии'
						/>
						<PartnerEditInput
							className='max-w-[200px]'
							value={phone}
							onChange={setPhone}
							name='Телефон'
							text='Телефон'
							tel
						/>
					</div>

					<div className='flex items-center justify-between '>
						<PartnerEditInput
							value={totalAwards}
							className='max-w-[200px] '
							onChange={setTotalAwards}
							name='Вознаг-ие'
							text='Вознаг-ие'
						/>
						<PartnerEditInput
							value={balance}
							className='max-w-[200px] '
							onChange={setBalance}
							name='Баланс'
							text='Баланс'
						/>
						<span className='pt-4'>
							<PartnersStatusSelect
								setActiveSelecItem={setStatus}
							/>
						</span>

						<div className='pt-4 flex gap-3'>
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

				</div>
			</form>
		</div>
	)
}

export default PartnerCreateModal
