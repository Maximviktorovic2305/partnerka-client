'use client'

import { ROUTES } from '@/constants/routes'
import {
	CircleDollarSign,
	Handshake,
	Layers3,
	UsersRound,
	Wrench,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
	const pathname = usePathname()
	// Styles
	const linkStyle =
		'pl-2 pr-1 hover:text-white duration-200 hover:bg-black1 py-3 flex items-center gap-3'
	const activeLink = 'bg-black1 text-white border-l-2 border-white'

	return (
		<aside className='min-w-[180px] h-full bg-primary text-sidebarText flex flex-col max-sm:hidden border-r-4 border-grayDeep pt-[20%]'>
			<Link className='px-3' href={ROUTES.home}>
				{/* <Image
					priority
					width={100}
					height={100}
					src='/big-logo.png'
					alt='logo'
					className='mx-auto'
				/> */}
				<div className='text-center text-secondary flex items-center w-full'>
					<span className='border-r border-1 text-sm border-gray-500 pr-2 text-nowrap py-2'>
						Prt-Online
					</span>
					<span className='pl-2 text-wrap text-[10px] text-left leading-3'>
						Кабинет администратора
					</span>
				</div>
			</Link>
			<Link
				href={ROUTES.partners}
				className={`${linkStyle} ${
					pathname.startsWith(ROUTES.partners) && activeLink
				} mt-10`}>
				<UsersRound size={22} className='shadow-md' />
				<span>Партнеры</span>
			</Link>
			<Link
				href={ROUTES.leads}
				className={`${linkStyle} ${
					pathname.startsWith(ROUTES.leads) && activeLink
				}`}>
				<Handshake size={22} className='shadow-md' />
				<span>Лиды</span>
			</Link>
			<Link
				href={ROUTES.offers}
				className={`${linkStyle} ${
					pathname.startsWith(ROUTES.offers) && activeLink
				}`}>
				<CircleDollarSign size={22} />
				<span>Офферы</span>
			</Link>
			<Link
				href={ROUTES.politics}
				className={`${linkStyle} ${
					pathname.startsWith(ROUTES.politics) && activeLink
				}`}>
				<Layers3 size={22} />
				<span>Политики</span>
			</Link>
			<Link
				href={ROUTES.settings}
				className={`${linkStyle} ${
					pathname.startsWith(ROUTES.settings) && activeLink
				}`}>
				<Wrench size={22} />
				<span>Настройки</span>
			</Link>
		</aside>
	)
}

export default Sidebar
