'use client'
// Запустить для отладки серверного кода
// "dev": "cross-env NODE_OPTIONS='--inspect' next dev",

import { useActions } from '@/hooks/useActions'
import { useUser } from '@/hooks/useSelectors'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {
	const { user } = useUser()
	const { logout } = useActions()
	const router = useRouter()

	const handleLogout = async (e: React.MouseEvent<HTMLSpanElement>) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (e.target.innerText === 'Войти') {
			router.push('/auth')
			router.refresh()
		} else {
			logout()
			router.push('/')
			router.refresh()
		}
	}
	return (
		<header className='py-4 px-5 flex items-center justify-between bg-primary text-sidebarText sm:pl-[22%] md:pl-[17%]'>
			<span className='font-bold uppercase cursor-pointer hover:text-white duration-200'>
				{user?.nickname}
			</span>
			<span className='cursor-pointer hover:text-white duration-200'>
				{user?.userPost}
			</span>
			<span className='cursor-pointer hover:text-white duration-200'>
				{user?.rang}
			</span>
			<span
				onClick={handleLogout}
				className='cursor-pointer hover:text-white duration-200'>
				{user ? 'Выйти' : 'Войти'}
			</span>
		</header>
	)
}

export default Header
