/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import RefferalLinkService from '@/services/referral-links/referral-links.service'
import { IRefferalLink } from '@/types/refferal-links.interface'
import { CheckCheck, X } from 'lucide-react'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { SelectPartner } from '../base/PartnerSelect'

interface Props {
   reffLink: IRefferalLink
}

const RefLinksEditPartner = ({ reffLink }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
			const [typeState, setTypeState] = useState(reffLink.partnerId)

			// Ф-ия на двойной клик
			const handleDoubleClick = () => {
				setIsEditing(true)
				setTypeState(reffLink.partnerId)
			}

			// Ф-ия на сохранение
			const handleSave = async (e: FormEvent) => {
				e.preventDefault()
				await RefferalLinkService.updateRefferalLink({
					id: reffLink.id,
					partnerId: Number(typeState)
				})
				setIsEditing(false)
				setTypeState(reffLink.partnerId)
			}

			// Ф-ия отмены
			const handleCancel = useCallback(() => {
				setIsEditing(false)
				setTypeState(reffLink.partnerId)
			}, [reffLink])

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
					<SelectPartner setActiveSelecItem={setTypeState} type='edit' />
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
					<div className="lowercase text-blue1" >{reffLink.partner?.name}</div>
				</div>
			)
			
		}



export default RefLinksEditPartner