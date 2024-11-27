'use client'

import { RootState } from '@/store/store'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useActions } from '@/hooks/useActions'
import { ROUTES } from '@/constants/routes'

const Header = () => {
	const { logout } = useActions()
	const { user } = useSelector((state: RootState) => state.user)
	const router = useRouter()

	const handleLogout = () => {
		logout()
		router.push(`/auth${ROUTES.login}`)
		router.refresh()
	}   

	return (
			<header className='py-4 px-5 w-full flex items-center justify-between bg-primary sm:pl-[22%] md:pl-[17%]'>
				<div className='flex items-center gap-5 ml-auto'>
					<div className='hover:text-white cursor-pointer duration-200'>
						{user && user?.name}
					</div>
					<div className='hover:text-red-400 cursor-pointer duration-200'>
						<LogOut onClick={handleLogout} />
					</div>
				</div>
			</header>
	)
}

export default Header
