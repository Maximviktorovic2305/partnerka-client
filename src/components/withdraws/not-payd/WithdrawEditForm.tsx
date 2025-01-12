'use client'

import { useState, FormEvent } from 'react'
import { Button } from '../../ui/button'
import { useMutation } from '@tanstack/react-query'
import { IWithdraw } from '@/types/withdraw.interface'
import WithdrawService from '@/services/withdraw/withdraw.service'
import WithdrawEditInput from './WithdrawEditInput'
import { SelectPartner } from '../../base/PartnerSelect'
import WithdrawEditPayd from './WithdrawEditPayd'

interface Props {
	withdraw: IWithdraw
	setActiveEditWithdraw: (active: boolean) => void
}

const WithdrawEditForm = ({ setActiveEditWithdraw, withdraw }: Props) => {
	const [createdFormatedDate, setCreatedFormatedDate] = useState(
		withdraw.createdFormatedDate ?? '',
	)
	const [partnerId, setPartnerId] = useState(withdraw.partnerId ?? '')
	const [comment, setComment] = useState(withdraw.comment ?? '')
	const [amount, setAmount] = useState(withdraw.amount ?? '')
	const [isPaydOut, setIsPaydOut] = useState(withdraw.isPaydOut ?? false)

	console.log(isPaydOut)

	const { mutate } = useMutation({
		mutationFn: () =>
			WithdrawService.updateWithdraw({
				id: withdraw.id,
				createdFormatedDate,
				partnerId: Number(partnerId),
				comment,
				isPaydOut,
				amount: Number(amount),
			}),
		onSuccess: () => {
			setActiveEditWithdraw(false)
		},
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			await mutate()
		} catch (error) {
			console.error('Ошибка обновления выплаты!!!', error)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className='fixed top-2 right-10'>
				<div className='px-5 pt-5 pb-[22%] relative flex flex-col gap-4 z-10 rounded-lg bg-primary/80 backdrop-blur-sm text-primary min-w-[300px] right-10 top-10'>
					<WithdrawEditInput
						className='text-newAccent border-white'
						onChange={setCreatedFormatedDate}
						value={createdFormatedDate}
						name='Дата создания'
						dateBirthday
					/>
					<div className='text-newAccent'>
						<SelectPartner setActiveSelecItem={setPartnerId} type='normal' />
					</div>

					<WithdrawEditInput
						className='text-newAccent border-white'
						value={comment}
						onChange={setComment}
						name='Комментарий'
					/>
					<WithdrawEditInput
						value={String(amount)}
						className='max-w-[200px] text-newAccent border-white'
						onChange={setAmount}
						num
						name='Сумма'
					/>

					<WithdrawEditPayd
						className='text-newAccent border-white flex self-center'
						value={isPaydOut}
						onChange={setIsPaydOut}
					/>
				</div>
				<div className='flex z-50 absolute -bottom-6 right-[20%] items-center gap-3'>
					<Button
						variant='outline'
						className=' bg-secondary text-primary hover:text-white border-none hover:bg-primary duration-200 '
						onClick={() => setActiveEditWithdraw(false)}>
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

export default WithdrawEditForm
