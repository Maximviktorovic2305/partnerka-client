'use client'

import OfferService from '@/services/offer/offer.service'
import { IOffer } from '@/types/offer.interface'
import { CheckCheck, X } from 'lucide-react'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'

interface Props {
	type:
		| 'name'
		| 'domain'
		| 'conversions'
		| 'amount'
		| 'status'
		| 'partnersCount'
	offer: IOffer
}

const OfferEditRow = ({ offer, type }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
	const [typeState, setTypeState] = useState(offer[type])

	// Ф-ия на двойной клик
	const handleDoubleClick = () => {
		setIsEditing(true)
		setTypeState(offer[type])
	}

	// Ф-ия на сохранение
	const handleSave = async (e: FormEvent) => {
		e.preventDefault()
		await OfferService.updateOffer({ id: offer.id, [type]: typeState })
		setIsEditing(false)
		setTypeState(offer[type])
	}

	// Ф-ия отмены
	const handleCancel = useCallback(() => {
		setIsEditing(false)
		setTypeState(offer[type])
	}, [offer, type])

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
				onChange={e =>
					setTypeState(
						type === 'amount' ||
							type === 'partnersCount' ||
							type === 'conversions'
							? +e.target.value
							: e.target.value,
					)
				}
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
			<span className={`lowercase ${type === 'conversions' && 'bg-[#E0F4F5] px-3 rounded-md text-[#44B8BF]'}`}>{offer[type]}</span>
		</div>
	)
}

export default OfferEditRow
