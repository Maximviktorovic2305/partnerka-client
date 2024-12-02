'use client'

import { useState, FormEvent } from 'react'
import { Button } from '../ui/button'
import { IPartner } from '@/types/partner.interface'
import { useMutation } from '@tanstack/react-query'
import PartnerService from '@/services/partner/partner.service'
import PartnerEditInput from '../base/PartnerEditInput'
import { PartnersStatusSelect } from '../base/PartnersStatusSelect'

interface Props {
	partner: IPartner
	setActiveEditPartner: (active: boolean) => void
}

const PartnerEditForm = ({ setActiveEditPartner, partner }: Props) => {
  	const [name, setName] = useState(partner.name ?? '')
	const [lastname, setLastname] = useState(partner.lastname ?? '')
	const [registerDate, setRegisterDate] = useState(partner.registerDate ?? '')
	const [status, setStatus] = useState(partner.status ?? '')
	const [totalAwards, setTotalAwards] = useState<string | number>(partner.totalAwards ?? 0)   
	const [balance, setBalance] = useState<string | number>(partner.balance ?? 0)
	const [email, setEmail] = useState(partner.email ?? '')
	const [phone, setPhone] = useState(partner.phone ?? '')


	const { mutate } = useMutation({
		mutationFn: () =>
			PartnerService.updatePartner({
				id: partner.id,
        		phone,
				name,
				lastname,
				status,
				registerDate,
				email,
        		balance: Number(balance),
				totalAwards: Number(totalAwards),
			}),
		onSuccess: () => {
			setActiveEditPartner(false)
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
				<div className='px-5 pt-5 pb-[22%] relative z-10 rounded-lg bg-primary/80 backdrop-blur-sm text-primary min-w-[300px] right-10 top-10'>
					<PartnerEditInput
					className='text-newAccent border-white'
						onChange={setName}
						value={name}
						name='Имя'
						text='Имя'
					/>
					<PartnerEditInput
					className='text-newAccent border-white'
						value={lastname}
						onChange={setLastname}
						name='Фамилия'
						text='Фамилия'
					/>
					<PartnerEditInput
							value={registerDate}
							className='max-w-[200px] text-newAccent border-white'
							onChange={setRegisterDate}
							name='registerDate'
							dateBirthday
							text='Дата Рег-ии'
						/>
					<div className='mt-4 text-newAccent border-white'>
							<PartnersStatusSelect
								setActiveSelecItem={setStatus}
							/>
						</div>

					<PartnerEditInput
					className='text-newAccent border-white'
						value={String(totalAwards)}
						onChange={setTotalAwards}
						name='Возн-ие'
						text='Возн-ие'
					/>
					<PartnerEditInput
					className='text-newAccent border-white'
						value={String(balance)}
						onChange={setBalance}
						name='Баланс'
						text='Баланс'
					/>
					<PartnerEditInput
					className='text-newAccent border-white'
						value={phone}
						onChange={setPhone}
						name='Телефон'
						text='Телефон'
					/>
					<PartnerEditInput         
					className='text-newAccent border-white'
						value={email}
						onChange={setEmail}
						name='Email'
						text='Email'
						tel
					/>
				</div>
				<div className='flex z-50 absolute -bottom-6 right-[20%] items-center gap-3'>
					<Button
						variant='outline'
						className=' bg-secondary text-primary hover:text-white border-none hover:bg-primary duration-200 '
						onClick={() => setActiveEditPartner(false)}>
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
