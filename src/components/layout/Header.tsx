'use client'

import { LogIn, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActions } from '@/hooks/useActions'
import { ROUTES } from '@/constants/routes'
import { useUser } from '@/hooks/useSelectors'
import SwithchAdmin from './SwithchAdmin'
import { useEffect, useState } from 'react'

const Header = () => {
	const { logout } = useActions()
	const { user } = useUser()
	const router = useRouter()
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	const handleLogin = () => {
		router.push(`/auth${ROUTES.login}`)
		router.refresh()
	}

	const handleLogout = () => {
		logout()
		router.push(`/auth${ROUTES.login}`)
		router.refresh()
	}

	if (typeof window === 'undefined') {
		return
	}

	return (
		<header className='py-3 px-5 w-full text-blue1 flex items-center justify-between bg-white sm:pl-[22%] md:pl-[17%]'>
			<div className='flex items-center gap-7 ml-auto'>
				<SwithchAdmin />

				{isClient && (
					<div className={`font-bold text-base cursor-pointer duration-200 ${user && user?.name ? 'text-primary/80 hover:text-primary' : 'opacity-0'}`}>
						{user && user?.name}
					</div>
				)}
				<div className={`cursor-pointer duration-200 ${user && user?.name ? 'hover:text-red-400' : 'hover:text-green-300'}`}>
					{isClient && (user && user?.name ? (
						<LogOut onClick={handleLogout} />
					) : (
						<LogIn onClick={handleLogin} />
					))}
				</div>
			</div>
		</header>
	)
}

export default Header