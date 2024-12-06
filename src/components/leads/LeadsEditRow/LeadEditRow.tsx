'use client'

import LeadsService from '@/services/leads/lead.service'
import { ILead } from '@/types/lead.interface'
import { CheckCheck, X } from 'lucide-react'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'

interface Props {
   type: 'name' | 'createdFormatedDate' | 'updatedFormatedDate' | 'partnerId' | 'sourse' | 'status' | 'offer' | 'amount'
   lead: ILead
}

const LeadEditRow = ({ lead, type }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
	const [typeState, setTypeState] = useState(lead[type])

	// Для type = registerDate
	const handleSetDate = (date: string) => {
		if (date) {
			return date.split('.')[1] + '.' + date.split('.')[0] + '.' + date.split('.')[2]
		}
	}

	// Ф-ия на двойной клик
	const handleDoubleClick = () => {
		setIsEditing(true)
		setTypeState(lead[type])
	}

	// Ф-ия на сохранение
	const handleSave = async (e: FormEvent) => {
		e.preventDefault()
		await LeadsService.updateLead({ id: lead.id, [type]: (type === 'createdFormatedDate' || type === 'updatedFormatedDate') ? handleSetDate(typeState as string) : typeState })
		setIsEditing(false)
		setTypeState(lead[type])
	}

	// Ф-ия отмены
	const handleCancel = useCallback(() => {
		setIsEditing(false)
		setTypeState(lead[type])
	}, [lead, type])

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
			<span className='lowercase'>{lead[type]}</span>
		</div>
	)

}

export default LeadEditRow