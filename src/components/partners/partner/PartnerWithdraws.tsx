/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { useUserUnautorized } from '@/hooks/useUserUnautorized'
import { useState, useEffect, useRef } from 'react'
import PartnerWithdrawTabsStatistics from './PartnerWithdrawTabsStatistics'
import PartnerWithdrawsTabs from './PartnerWithdrawsTabs'
import PartnerWithdrawsHistoryTabs from './PartnerWithdrawsHistoryTabs'
import { IPartner } from '@/types/partner.interface'

interface Props {
	partner: IPartner | undefined
}

const PartnerWithdraws = ({ partner }: Props) => {
	const [activeTab, setActiveTab] = useState('statistics')
	const [underlineStyle, setUnderlineStyle] = useState({})
	const underlineRef = useRef(null)
	const statisticsRef = useRef(null)
	const withdrawRef = useRef(null)
	const withdrawsHistoryRef = useRef(null)

	const renderContent = () => {
		switch (activeTab) {
			case 'statistics':
				return <PartnerWithdrawTabsStatistics partner={partner ?? undefined} />
			case 'withdraws':
				return <PartnerWithdrawsTabs partner={partner ?? undefined} />
			case 'withdrawsHistory':
				return <PartnerWithdrawsHistoryTabs partner={partner ?? undefined} />
			default:
				return null
		}
	}

	useUserUnautorized()

	useEffect(() => {
		const activeRef =
			activeTab === 'statistics'
				? statisticsRef.current
				: activeTab === 'withdraws'
				? withdrawRef.current
				: withdrawsHistoryRef.current

		if (activeRef) {
			setUnderlineStyle({
				// @ts-ignore
				width: activeRef.offsetWidth,
				// @ts-ignore
				transform: `translateX(${activeRef.offsetLeft}px)`,
			})
		}
	}, [activeTab])

	return (
		<div className='transition-all duration-300 my-10'>
			<div className='text-[30px] font-bold text-blue2 text-left mb-5 ml-6'>
				Выплаты
			</div>
			<div className='relative flex items-center justify-start  text-blue1 text-xl transition-all duration-300'>
				<button
					ref={statisticsRef}
					className={`p-3 transition-all duration-300 ${
						activeTab === 'statistics' ? 'text-blue1' : 'text-blue2'
					}`}
					onClick={() => setActiveTab('statistics')}>
					Статистика
				</button>
				<button
					ref={withdrawRef}
					className={`p-3 transition-all duration-300 ${
						activeTab === 'withdraws' ? 'text-blue1' : 'text-blue2'
					}`}
					onClick={() => setActiveTab('withdraws')}>
					Заявки на выплату
				</button>
				<button
					ref={withdrawsHistoryRef}
					className={`p-3 transition-all duration-300 ${
						activeTab === 'withdrawsHistory' ? 'text-blue1' : 'text-blue2'
					}`}
					onClick={() => setActiveTab('withdrawsHistory')}>
					Выплаченные
				</button>

				<div
					ref={underlineRef}
					className='absolute h-[3px] bg-blue1 mt-10 transition-all duration-200'
					style={underlineStyle}
				/>
			</div>
			<div className='transition-all duration-300'>{renderContent()}</div>
		</div>
	)
}

export default PartnerWithdraws
