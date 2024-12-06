/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { LeadSourceSelect } from '@/components/base/LeadSourceSelect'
import LeadsService from '@/services/leads/lead.service'
import { ILead } from '@/types/lead.interface'
import { CheckCheck, X } from 'lucide-react'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'

interface Props {
   lead: ILead
}

const LeadEditSourse = ({ lead }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
			const [typeState, setTypeState] = useState(lead.sourse)

			const styleClassName = `${lead.sourse === 'Прямое добавление' ? 'text-green-400' : ''} ${lead.sourse === 'Реферальная программа' ? 'text-orange-400' : ''}
		      ${lead.sourse === 'Промокод' ? 'text-blue-400' : ''}`

			// Ф-ия на двойной клик
			const handleDoubleClick = () => {
				setIsEditing(true)
				setTypeState(lead.sourse)
			}

			// Ф-ия на сохранение
			const handleSave = async (e: FormEvent) => {
				e.preventDefault()
				await LeadsService.updateLead({
					id: lead.id,
					sourse: typeState
				})
				setIsEditing(false)
				setTypeState(lead.sourse)
			}

			// Ф-ия отмены
			const handleCancel = useCallback(() => {
				setIsEditing(false)
				setTypeState(lead.sourse)
			}, [lead])

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
					{/* @ts-ignore */ }
					<LeadSourceSelect setActiveSelecItem={setTypeState} />
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
					<div className={`lowercase ${styleClassName}`} >{lead.sourse}</div>
				</div>
			)
		}



export default LeadEditSourse