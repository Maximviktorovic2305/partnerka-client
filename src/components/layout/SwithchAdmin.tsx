'use client'

import { useUser } from '@/hooks/useSelectors'
import UserService from '@/services/user/user.service'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { useDispatch } from 'react-redux'
import { toggleIsAdmin } from '@/store/user/user.slice'
import { useMutation } from '@tanstack/react-query'

const SwithchAdmin = () => {
	const { user } = useUser()
	const [isUserAdmin, setIsUserAdmin] = useState(user?.isAdmin)
	const dispath = useDispatch()

	const { mutate } = useMutation({
		mutationFn: () =>
			UserService.updateUser({
				isAdmin: isUserAdmin,
			}),
	})

	if (typeof window === 'undefined') {
		return
	}

	const handleSelectAdmin = async () => {
		setIsUserAdmin(prev => !prev)
		try {
			mutate()
			dispath(toggleIsAdmin())
		} catch (error) {
			console.error('Ошибка обновления пользователя!!!', error)
		}
	}

	return (
		<div className='flex items-center space-x-2'>
			{user && (
				<Label htmlFor='admin-mode'>
					<span className='text-primary/80'>Я </span>
					{`${isUserAdmin ? 'АДМИНИСТРАТОР' : 'ПАРТНЕР'}`}
				</Label>
			)}
			<Switch
				checked={isUserAdmin}
				onClick={handleSelectAdmin}
				id='admin-mode'
			/>
		</div>
	)
}

export default SwithchAdmin
