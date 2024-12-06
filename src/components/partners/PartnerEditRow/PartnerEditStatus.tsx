'use client'

import { PartnersStatusSelect } from '@/components/base/PartnersStatusSelect'
import PartnerService from '@/services/partner/partner.service'
import { IPartner } from '@/types/partner.interface'               
import { CheckCheck, X } from 'lucide-react'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'

interface Props {
   partner: IPartner
}

const PartnerEditStatus = ({ partner }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
			const [typeState, setTypeState] = useState(partner.status)

			// Ф-ия на двойной клик
			const handleDoubleClick = () => {
				setIsEditing(true)
				setTypeState(partner.status)
			}

			// Ф-ия на сохранение
			const handleSave = async (e: FormEvent) => {
				e.preventDefault()
				await PartnerService.updatePartner({
					id: partner.id,
					status: typeState
				})
				setIsEditing(false)
				setTypeState(partner.status)
			}

			// Ф-ия отмены
			const handleCancel = useCallback(() => {
				setIsEditing(false)
				setTypeState(partner.status)
			}, [partner])

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
					<PartnersStatusSelect setActiveSelecItem={setTypeState} />
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
					<span className={`lowercase ${partner.status === 'Базовый' && 'text-gray-400'} ${partner.status === 'Продвинутый' && 'text-blue-400'} ${partner.status === 'Профессионал' && 'text-green-400'}`}>{partner.status}</span>
				</div>
			)
		}



export default PartnerEditStatus