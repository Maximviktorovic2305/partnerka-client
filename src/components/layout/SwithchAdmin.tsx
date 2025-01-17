'use client'

import { useUser } from '@/hooks/useSelectors'
import UserService from '@/services/user/user.service'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

const SwithchAdmin = () => {
	const { user } = useUser()
	const [isUserAdmin, setIsUserAdmin] = useState(user?.isAdmin)

	const { mutate } = useMutation({
		mutationFn: () =>
			UserService.updateUser({
				isAdmin: isUserAdmin,
			}),
	})

	const handleSelectAdmin = async () => {
		setIsUserAdmin((prev) => !prev)
		try {
			await mutate()
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
