/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { SelectPartner } from '@/components/base/PartnerSelect'
import WithdrawService from '@/services/withdraw/withdraw.service'
import { IWithdraw } from '@/types/withdraw.interface'
import { CheckCheck, X } from 'lucide-react'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'

interface Props {
   withdraw: IWithdraw
}

const WithdrawEditPartnerId = ({ withdraw }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
			const [typeState, setTypeState] = useState(withdraw.partnerId)

			// Ф-ия на двойной клик
			const handleDoubleClick = () => {
				setIsEditing(true)
				setTypeState(withdraw.partnerId)
			}

			// Ф-ия на сохранение
			const handleSave = async (e: FormEvent) => {
				e.preventDefault()
				await WithdrawService.updateWithdraw({
					id: withdraw.id,
					partnerId: Number(typeState)
				})
				setIsEditing(false)
				setTypeState(withdraw.partnerId)
			}

			// Ф-ия отмены
			const handleCancel = useCallback(() => {
				setIsEditing(false)
				setTypeState(withdraw.partnerId)
			}, [withdraw])

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
					<SelectPartner type='edit' setActiveSelecItem={setTypeState} />
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
					<span>{withdraw.partner?.name}</span>
				</div>
			)
		}



export default WithdrawEditPartnerId