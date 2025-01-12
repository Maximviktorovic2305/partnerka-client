'use client'

import WithdrawService from '@/services/withdraw/withdraw.service'
import { IWithdraw } from '@/types/withdraw.interface'
import { CheckCheck, X } from 'lucide-react'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'

interface Props {
   type: 'createdFormatedDate' | 'partnerId' | 'partnerEmail' | 'comment' | 'amount'                               
   withdraw: IWithdraw
}

const WithdrawEditRow = ({ withdraw, type }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
	const [typeState, setTypeState] = useState(withdraw[type])

	// Для type = createdFormatedDate
	const handleSetDate = (date: string) => {
		if (date) {
			return date.split('.')[1] + '.' + date.split('.')[0] + '.' + date.split('.')[2]
		}
	}

	// Ф-ия на двойной клик
	const handleDoubleClick = () => {
		setIsEditing(true)
		setTypeState(withdraw[type])
	}

	// Ф-ия на сохранение
	const handleSave = async (e: FormEvent) => {
		e.preventDefault()
		await WithdrawService.updateWithdraw({ id: withdraw.id, [type]: (type === 'createdFormatedDate') ? handleSetDate(typeState as string) : typeState })
		setIsEditing(false)
		setTypeState(withdraw[type])
	}

	// Ф-ия отмены
	const handleCancel = useCallback(() => {
		setIsEditing(false)
		setTypeState(withdraw[type])
	}, [withdraw, type])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleCancel()
			}
		}

		if (isEditing) {
			window.addEventListener('keydown', handleKeyDown)
		} else {
			window.removeEventListener('keydown', handleKeyDown)
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleCancel, isEditing])

	return isEditing ? (
		<form className='flex items-center justify-center transition-all duration-300 ease-in-out'>
			<input
				type='text'
				value={typeState}
				onChange={e => setTypeState(type === 'amount' ? +e.target.value : e.target.value)}
				className='border-0 outline-none p-0 m-0 bg-transparent max-w-[70px] transition-all duration-300 ease-in-out'
			/>
			{/* Кнопки */}
			<div className='flex items-center gap-1 transition-all duration-300 ease-in-out'>
				<button type='submit' onClick={handleSave}>
					<CheckCheck className='h-4 w-auto cursor-pointer text-green-300 hover:text-green-500 duration-200' />
				</button>
				<button type='button' onClick={handleCancel}>
					<X className='h-4 w-auto cursor-pointer text-red-300 hover:text-red-500 duration-200' />
				</button>
			</div>
		</form>
	) : (
		<div
			className='flex items-center justify-center cursor-pointer'
			onDoubleClick={handleDoubleClick}>
			<span className='lowercase'>{withdraw[type]}</span>
		</div>
	)

}

export default WithdrawEditRow