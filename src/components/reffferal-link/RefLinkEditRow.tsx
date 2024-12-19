'use client'

import OfferService from '@/services/offer/offer.service'
import { IRefferalLink } from '@/types/refferal-links.interface'
import { CheckCheck, X } from 'lucide-react'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'

interface Props {
	type:
		| 'name'
		| 'partnerId'
		| 'localeLinkPath'
		| 'offerId'
		| 'viewUniqueCount'
		| 'viewCount'
		| 'conversions'
		| 'amountToAwait'
		| 'amountToPay'
	reffLink: IRefferalLink
}

const RefLinkEditRow = ({ reffLink, type }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
	const [typeState, setTypeState] = useState(reffLink[type])

	const classStyles = ` ${type === 'viewCount' && 'text-blue3'} ${type === 'viewUniqueCount' && 'text-blue1'} ${type === 'conversions' && 'bg-[#D5EDF1] px-3 text-[#34B3BA] rounded-md'}`

	// Ф-ия на двойной клик
	const handleDoubleClick = () => {
		setIsEditing(true)
		setTypeState(reffLink[type])
	}

	// Ф-ия на сохранение
	const handleSave = async (e: FormEvent) => {
		e.preventDefault()
		await OfferService.updateOffer({ id: reffLink.id, [type]: typeState })
		setIsEditing(false)
		setTypeState(reffLink[type])
	}

	// Ф-ия отмены
	const handleCancel = useCallback(() => {
		setIsEditing(false)
		setTypeState(reffLink[type])
	}, [reffLink, type])

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
						type === 'viewUniqueCount' ||
							type === 'viewCount' ||
							type === 'conversions' || type === 'amountToAwait' || type === 'amountToPay'
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
			<span className={`lowercase ${classStyles}`}>{reffLink[type]}</span>
		</div>
	)
}

export default RefLinkEditRow
