/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { LeadStatusSelect } from '@/components/base/LeadStatusSelect'
import LeadsService from '@/services/leads/lead.service'
import { ILead } from '@/types/lead.interface'
import { CheckCheck, X } from 'lucide-react'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'

interface Props {
   lead: ILead
}

const LeadEditStatus = ({ lead }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
			const [typeState, setTypeState] = useState(lead.status)

			const styleClassName = `${lead.status === 'Новый' ? 'text-green-400' : ''} ${lead.status === 'В работе' ? 'text-orange-400' : ''}
				${lead.status === 'Сделка' ? 'text-blue-400' : ''} ${lead.status === 'Отмена' ? 'text-red-300' : ''}`

			// Ф-ия на двойной клик
			const handleDoubleClick = () => {
				setIsEditing(true)
				setTypeState(lead.status)
			}

			// Ф-ия на сохранение
			const handleSave = async (e: FormEvent) => {
				e.preventDefault()
				await LeadsService.updateLead({
					id: lead.id,
					status: typeState
				})
				setIsEditing(false)
				setTypeState(lead.status)
			}

			// Ф-ия отмены
			const handleCancel = useCallback(() => {
				setIsEditing(false)
				setTypeState(lead.status)
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
					<LeadStatusSelect setActiveSelecItem={setTypeState} type='edit' />
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
					<div className={`lowercase ${styleClassName}`} >{lead.status}</div>
				</div>
			)
			
		}



export default LeadEditStatus