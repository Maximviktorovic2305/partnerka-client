'use client'

import { useUser } from '@/hooks/useSelectors'
import UserService from '@/services/user/user.service'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { useMutation } from '@tanstack/react-query'
import { useActions } from '@/hooks/useActions'

const SwithchAdmin = () => {
	const { isAdmin } = useUser()
	const { toggleIsAdmin } = useActions()

	const { mutate } = useMutation({
		mutationFn: () =>
			UserService.updateUser({
				isAdmin: !isAdmin,
			}),
	})

	if (typeof window === 'undefined') {
		return
	}

	const handleSelectAdmin = async () => {
		try {
			mutate()
			await toggleIsAdmin()
		} catch (error) {
			console.error('Ошибка обновления пользователя!!!', error)
		}
	}

	if (typeof window === 'undefined') {
		return
	}

	return (
		<div className='flex items-center space-x-2'>
			<Label htmlFor='admin-mode'>
				<span className='text-primary/80'>Я </span>
				{`${isAdmin ? 'АДМИНИСТРАТОР' : 'ПАРТНЕР'}`}
			</Label>
			<Switch checked={isAdmin} onClick={handleSelectAdmin} id='admin-mode' />
		</div>
	)
}

export default SwithchAdmin
