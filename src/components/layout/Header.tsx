'use client'

import { LogOut } from 'lucide-react'

const Header = () => {
	return (
		<header className='py-4 px-5 w-full flex items-center justify-between bg-primary text-sidebarText sm:pl-[22%] md:pl-[17%]'>
			<div className='flex items-center gap-5 ml-auto'>
				<div className='hover:text-white cursor-pointer duration-200'>Name</div>
				<div className='hover:text-red-400 cursor-pointer duration-200'>
					<LogOut />
				</div>
			</div>
		</header>
	)
}

export default Header
