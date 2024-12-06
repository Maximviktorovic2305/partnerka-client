'use client'

import PartnerService from '@/services/partner/partner.service'
import { IPartner } from '@/types/partner.interface'               
import { CheckCheck, X } from 'lucide-react'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'

interface Props {
   type: 'name' | 'registerDate' | 'status' | 'totalAwards' | 'balance' | 'phone' | 'email'
   partner: IPartner
}

const PartnerEditRow = ({ partner, type }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
	const [typeState, setTypeState] = useState(partner[type])

	// Для type = registerDate
	const handleSetDate = (date: string) => {
		if (date) {
			return date.split('.')[1] + '.' + date.split('.')[0] + '.' + date.split('.')[2]
		}
	}

	// Ф-ия на двойной клик
	const handleDoubleClick = () => {
		setIsEditing(true)
		setTypeState(partner[type])
	}

	// Ф-ия на сохранение
	const handleSave = async (e: FormEvent) => {
		e.preventDefault()
		await PartnerService.updatePartner({ id: partner.id, [type]: type === 'registerDate' ? handleSetDate(typeState as string) : typeState })
		setIsEditing(false)
		setTypeState(partner[type])
	}

	// Ф-ия отмены
	const handleCancel = useCallback(() => {
		setIsEditing(false)
		setTypeState(partner[type])
	}, [partner, type])

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
		<form className='flex items-center justify-center'>
			<input
				type='text'
				value={typeState}
				onChange={e => setTypeState((type === 'totalAwards' || type === 'balance') ? +e.target.value : e.target.value)}
				className='border-0 outline-none p-0 m-0 bg-transparent max-w-[70px] transition-all duration-300 ease-in-out'
			/>
			{/* Кнопки */}
			<div className='flex items-center gap-1'>
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
			<span className='lowercase'>{partner[type]}</span>
		</div>
	)

}

export default PartnerEditRow