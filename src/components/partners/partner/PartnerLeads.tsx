'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useUserUnautorized } from '@/hooks/useUserUnautorized'
import { useState, useEffect, useRef } from 'react'
import { PartnerLeadsTabsContent } from './tabs/PartnerLeadsTabsContent'
import PartnerStatisticsTabsContent from './tabs/PartnerStatisticsTabsContent'
import { IPartner } from '@/types/partner.interface'

interface Props {
	partner: IPartner | undefined
}

const PartnerLeads = ({ partner }: Props) => {
	const [activeTab, setActiveTab] = useState('leads')
	const [underlineStyle, setUnderlineStyle] = useState({})
	const underlineRef = useRef(null)
	const leadsRef = useRef(null)
	const statisticsRef = useRef(null)

	const renderContent = () => {
		switch (activeTab) {
			case 'leads':
				return <PartnerLeadsTabsContent partner={partner ?? undefined} />
			case 'statistics':
				return <PartnerStatisticsTabsContent partner={partner ?? undefined} />
			default:
				return null
		}
	}

	useUserUnautorized()

	useEffect(() => {
		const activeRef =
			activeTab === 'leads' ? leadsRef.current : statisticsRef.current

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
		<section className='transition-all mt-10 duration-300'>
			<div className='text-[30px] text-blue2 ml-3 font-bold mb-5'>Лиды</div>
			<div className='relative flex items-center justify-start text-blue1 text-xl transition-all duration-300'>
				<button
					ref={leadsRef}
					className={`p-3 transition-all duration-300 ${
						activeTab === 'leads' ? 'text-blue1' : 'text-blue2'
					}`}
					onClick={() => setActiveTab('leads')}>
					Лиды
				</button>
				<button
					ref={statisticsRef}
					className={`p-3 transition-all duration-300 ${
						activeTab === 'statistics' ? 'text-blue1' : 'text-blue2'
					}`}
					onClick={() => setActiveTab('statistics')}>
					Статистика
				</button>

				<div
					ref={underlineRef}
					className='absolute h-[3px] bg-blue1 mt-10 transition-all duration-200'
					style={underlineStyle}
				/>
			</div>
			<div className='transition-all duration-300'>{renderContent()}</div>
		</section>
	)
}

export default PartnerLeads
