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
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
	const pathname = usePathname()
	// Styles
	const linkStyle =
		'pl-2 pr-1 hover:text-white duration-200 hover:bg-black1 py-3 flex items-center gap-3'
	const activeLink = 'bg-black1 text-white border-l-2 border-white'

	return (
		<aside className='min-w-[180px] h-full bg-primary text-sidebarText flex flex-col max-sm:hidden'>
			<Link className='px-3' href='/'>
				<Image
					priority
					width={100}
					height={100}
					src='/big-logo.png'
					alt='logo'
					className='mx-auto'
				/>
			</Link>
			<Link
				href='/users'
				className={`${linkStyle} ${
					pathname.startsWith('/users') && activeLink
				}`}>
				<UsersRound size={22} className='shadow-md' />
				<span>Состав клуба</span>
			</Link>
			<Link
				href='/till'
				className={`${linkStyle} ${
					pathname.startsWith('/till') && activeLink
				}`}>
				<CircleDollarSign size={22} />
				<span>Казна моя</span>
			</Link>
			<Link
				href='/club-till'
				className={`${linkStyle} ${
					pathname.startsWith('/club-till') && activeLink
				}`}>
				<PiggyBank size={22} />
				<span>Казна клуба</span>
			</Link>
			<Link
				href='/property'
				className={`${linkStyle} ${
					pathname.startsWith('/property') && activeLink
				}`}>
				<Wrench size={22} />
				<span>Имущество</span>
			</Link>
			<Link
				href='/warehouse'
				className={`${linkStyle} ${
					pathname.startsWith('/warehouse') && activeLink
				}`}>
				<Shirt size={22} />
				<span>Склад</span>
			</Link>
			<Link
				href='/calendary'
				className={`${linkStyle} ${
					pathname.startsWith('/calendary') && activeLink
				}`}>
				<CalendarCog size={22} />
				<span>Календарь</span>
			</Link>
			<Link
				href='/chat'
				className={`${linkStyle} ${
					pathname.startsWith('/chat') && activeLink
				}`}>
				<MessagesSquare size={22} />
				<span>Чат</span>
			</Link>
		</aside>
	)
}

export default Sidebar
