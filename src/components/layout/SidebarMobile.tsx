'use client'

import {
	CalendarCog,
	CircleDollarSign,
	MessagesSquare,
	PiggyBank,
	Shirt,
	UsersRound,
	Wrench,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SidebarMobile = () => {
	const pathname = usePathname()
	// Styles
	const linkStyle =
		'px-3 pt-[20%] hover:text-white duration-200 hover:bg-black1 py-3 flex items-center gap-3'
	const activeLink = 'bg-black1 text-white border-l-2 border-white'

	return (
		<aside className='w-full h-full bg-primary text-sidebarText flex flex-col gap-5 pt-[100px] sm:hidden'>
			<Link
				href='/users'
				className={`${linkStyle} ${
					pathname.startsWith('/users') && activeLink
				}`}>
				<UsersRound size={22} className='shadow-md' />
			</Link>
			<Link
				href='/till'
				className={`${linkStyle} ${
					pathname.startsWith('/till') && activeLink
				}`}>
				<CircleDollarSign size={22} />
			</Link>         
			<Link
				href='/club-till'
				className={`${linkStyle} ${
					pathname.startsWith('/club-till') && activeLink
				}`}>
				<PiggyBank size={22} />
			</Link>
			<Link
				href='/property'
				className={`${linkStyle} ${
					pathname.startsWith('/property') && activeLink
				}`}>
				<Wrench size={22} />
			</Link>
			<Link
				href='/warehouse'
				className={`${linkStyle} ${
					pathname.startsWith('/warehouse') && activeLink
				}`}>
				<Shirt size={22} />
			</Link>
			<Link
				href='/calendary'
				className={`${linkStyle} ${
					pathname.startsWith('/calendary') && activeLink
				}`}>
				<CalendarCog size={22} />
			</Link>
			<Link
				href='/chat'
				className={`${linkStyle} ${
					pathname.startsWith('/chat') && activeLink
				}`}>
				<MessagesSquare size={22} />
			</Link>
		</aside>
	)
}

export default SidebarMobile
