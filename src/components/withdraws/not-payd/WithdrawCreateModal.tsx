import React, { FormEvent, useState } from 'react'
import { Button } from '../../ui/button'
import { useMutation } from '@tanstack/react-query'
import { SelectPartner } from '../../base/PartnerSelect'
import WithdrawService from '@/services/withdraw/withdraw.service'
import WithdrawEditInput from './WithdrawEditInput'

interface Props {
	setIsWithdrawCreateActive: (value: boolean) => void
}

const WithdrawCreateModal = ({ setIsWithdrawCreateActive }: Props) => {
	const [createdFormatedDate, setCreatedFormatedDate] = useState('')
	const [partner, setPartner] = useState<string | number>(0)
	const [comment, setComment] = useState('')
	const [amount, setAmount] = useState<string | number>()

	const { mutate } = useMutation({
		mutationFn: () =>
			WithdrawService.createWithdraw({
				createdFormatedDate,
				partnerId: Number(partner),
				comment,
				amount: Number(amount),
			}),
		onSuccess: () => {
			setIsWithdrawCreateActive(false)
		},
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			await mutate()
		} catch (error) {
			console.error('Ошибка создания выплаты', error)
		}
	}

	return (
		<div className='w-full rounded-md mt-5 mb-2 bg-secondary shadow-md shadow-primary text-primary'>
			<form onSubmit={handleSubmit} className='p-3 flex flex-col'>
				<div className='flex items-center gap-3 justify-between flex-wrap'>
					<WithdrawEditInput
						className='text-primary mt-[1px] border-blue2/70'
						value={createdFormatedDate}
						onChange={setCreatedFormatedDate}
						name='Дата создания'
						dateBirthday
					/>
					<div className='text-primary border-blue2/70'>
						<SelectPartner
							type='normal'
							className='border-blue2/70'
							setActiveSelecItem={setPartner}
						/>
					</div>

					<WithdrawEditInput
						className='text-primary mt-[1px] border-blue2/70'
						value={comment}
						onChange={setComment}
						name='Комментарий'
					/>
					<WithdrawEditInput
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
						onClick={() => setIsWithdrawCreateActive(false)}>
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

export default WithdrawCreateModal
