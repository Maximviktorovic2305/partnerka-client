'use client'

import { useState } from 'react';
import { ROUTES } from '@/constants/routes';
import {
	CircleDollarSign,
	Handshake,
	UsersRound,
	Wrench,
	ChevronLeft,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
	const pathname = usePathname();
	const [isCollapsed, setIsCollapsed] = useState(false);

	const linkStyle =
		`hover:text-white duration-200 hover:bg-black1 my-2 px-2 ${isCollapsed ? 'mb-5 pt-5' : 'flex items-center gap-3 py-3'}`;
	const activeLink = 'bg-black1 text-white border-l-2 border-white';
	const sidebarWidth = isCollapsed ? 'w-[60px]' : 'w-56';  // Устанавливаем ширину в зависимости от состояния

	const itemStyle = `transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`

	return (
		<aside className={`h-full bg-primary text-sidebarText flex flex-col border-r-4 border-grayDeep pt-[20%] transition-all duration-300 ${sidebarWidth}`}>
			{/* Стрелка скрыть */}
			<button 
				className='p-2 cursor-pointer' 
				onClick={() => setIsCollapsed(!isCollapsed)}
			>
				<ChevronLeft size={20} className={`transition-transform duration-200 hover:text-white ${isCollapsed ? 'rotate-180 mb-10' : '-mt-8'}`} />
			</button>

			{/* Логотип и текст */}
			<Link className='px-3 flex text-center pl-5 w-full mb-10' href={ROUTES.home}>
				<div className={`text-center text-secondary duration-200 flex items-center w-full ${isCollapsed ? 'hidden' : ''}`}>
					<span className='border-r border-1 text-base border-gray-500 pr-2 text-nowrap py-2'>
						Prt-Online
					</span>
					<span className={`pl-2 text-wrap text-[12px] text-left leading-3`}>
						Кабинет администратора
					</span>
				</div>
			</Link>

			{/* Ссылки с иконками */}
			<div className="flex flex-col">
				<Link href={ROUTES.partners} className={`${linkStyle} ${pathname.startsWith(ROUTES.partners) && activeLink}`}>
					<UsersRound size={22} className='shadow-md' />
					<span className={itemStyle}>Партнеры</span>
				</Link>
				<Link href={ROUTES.leads} className={`${linkStyle} ${pathname.startsWith(ROUTES.leads) && activeLink}`}>
					<Handshake size={22} className='shadow-md' />
					<span className={itemStyle}>Лиды</span>
				</Link>
				<Link href={ROUTES.offers} className={`${linkStyle} ${pathname.startsWith(ROUTES.offers) && activeLink}`}>
					<CircleDollarSign size={22} />
					<span className={itemStyle}>Офферы</span>
				</Link>
				<Link href={ROUTES.withdraw} className={`${linkStyle} ${pathname.startsWith(ROUTES.withdraw) && activeLink}`}>
					<Wallet size={22} />
					<span className={itemStyle}>Выплаты</span>
				</Link>
				<Link href={ROUTES.settings} className={`${linkStyle} ${pathname.startsWith(ROUTES.settings) && activeLink}`}>
					<Wrench size={22} />
					<span className={itemStyle}>Настройки</span>
				</Link>
			</div>
		</aside>
	);
}

export default Sidebar;
