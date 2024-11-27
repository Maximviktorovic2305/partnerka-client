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

const SidebarMobile = () => {
	const pathname = usePathname()
	// Styles
	const linkStyle =
		'px-3 hover:text-white duration-200 py-3 flex items-center gap-3'
	const activeLink = 'bg-black1 text-white border-l-2 border-white'

	return (
		<aside className='w-full h-full bg-primary flex flex-col gap-5 pt-[100px] sm:hidden'>
			<Link
				href={ROUTES.partners}
				className={`${linkStyle} ${
					pathname.startsWith(ROUTES.partners) && activeLink
				}`}>
				<UsersRound size={22} className='shadow-md' />
				<span className='max-ssm:hidden'>Партнеры</span>
			</Link>
			<Link
				href={ROUTES.leads}
				className={`${linkStyle} ${
					pathname.startsWith(ROUTES.leads) && activeLink
				}`}>
				<Handshake size={22} className='shadow-md' />
				<span className='max-ssm:hidden'>Лиды</span>
			</Link>
			<Link
				href={ROUTES.offers}
				className={`${linkStyle} ${
					pathname.startsWith(ROUTES.offers) && activeLink
				}`}>
				<CircleDollarSign size={22} />
				<span className='max-ssm:hidden'>Офферы</span>
			</Link>
			<Link
				href={ROUTES.politics}
				className={`${linkStyle} ${
					pathname.startsWith(ROUTES.politics) && activeLink
				}`}>
				<Layers3 size={22} />
				<span className='max-ssm:hidden'>Политики</span>
			</Link>
			<Link
				href={ROUTES.settings}
				className={`${linkStyle} ${
					pathname.startsWith(ROUTES.settings) && activeLink
				}`}>
				<Wrench size={22} />
				<span className='max-ssm:hidden'>Настройки</span>
			</Link>
		</aside>
	)
}

export default SidebarMobile
