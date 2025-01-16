'use client'

import { LogIn, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActions } from '@/hooks/useActions'
import { ROUTES } from '@/constants/routes'
import { useUser } from '@/hooks/useSelectors'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { useMutation } from '@tanstack/react-query'
import UserService from '@/services/user/user.service'

const Header = () => {
	const { logout } = useActions()
	const { user } = useUser()
	const router = useRouter()

	const handleLogin = () => {
		router.push(`/auth${ROUTES.login}`)
		router.refresh()
	}

	const handleLogout = () => {
		logout()
		router.push(`/auth${ROUTES.login}`)
		router.refresh()
	}

	const { mutate } = useMutation({
		mutationFn: () =>
			UserService.updateUser({
            id: user?.id,
				isAdmin: !user?.isAdmin,
			}),
	})

	const handleSelectAdmin = async () => {
		try {
			await mutate()
		} catch (error) {
			console.error('Ошибка обновления пользователя!!!', error)
		}
	}

	return (
		<header className='py-3 px-5 w-full text-blue1 flex items-center justify-between bg-white sm:pl-[22%] md:pl-[17%]'>
			<div className='flex items-center gap-7 ml-auto'>                     

				<div className='flex items-center space-x-2'>
					<Switch onClick={handleSelectAdmin} id='admin-mode' />
					{user && <Label htmlFor='admin-mode'>Я {`${user?.isAdmin ? 'АДМИНИСТРАТОР' : 'ПАРТНЕР'}`}</Label>}
				</div>

				<div className='hover:text-primary font-bold text-base text-primary/80 cursor-pointer duration-200'>
					{user && user?.name}
				</div>
				{user && user?.name ? (
					<div className='hover:text-red-400 cursor-pointer duration-200'>
						<LogOut onClick={handleLogout} />
					</div>
				) : (
					<div className='hover:text-green-300 cursor-pointer duration-200'>
						<LogIn onClick={handleLogin} />
					</div>
				)}
			</div>
		</header>
	)
}

export default Header
