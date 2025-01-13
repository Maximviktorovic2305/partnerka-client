'use client'         

import React, { useState } from 'react'
import './StatisticsSwitch.css'
import { useGetPartnerLeads } from '@/queries/lead'
import DateLeadsSelect from '@/components/leads/DateLeadsSelect'
import { IPartner } from '@/types/partner.interface'

interface Props {
	setActiveSwithItem: (value: string) => void
	activeSwithItem: string         
   startDate?: Date
   endDate?: Date
   setStartDate?: (date: Date) => void
   setEndDate?: (date: Date) => void
   partner: IPartner | undefined
}

const PartnerStatisticsSwitch = ({ setActiveSwithItem, activeSwithItem, partner, startDate, endDate, setStartDate, setEndDate }: Props) => {         
   
	const { data } = useGetPartnerLeads({partnerId: partner?.id ?? 0})
	const [activeIndex, setActiveIndex] = useState(0)
	const options = ['Сегодня', 'Вчера', '7 дней', '30 дней', 'Указать период']

	return (
		<div className='w-full flex items-center justify-between'>
			<div className='switcher-container shadow-md shadow-secandary'>
				<div
					className='active-indicator'
					style={{ left: `${activeIndex * 100}%` }}
				/>
				{options.map((option, index) => (
					<div
						key={index}
						className={`option ${activeIndex === index ? 'active' : ''}`}
						onClick={e => {
							setActiveIndex(index)
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							setActiveSwithItem(e.target.innerText)
						}}>
						{option}
					</div>
				))}
				{activeSwithItem === 'Указать период' && <DateLeadsSelect startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} /> }
			</div>
			<div className='rounded-lg px-5 text-blue1 border border-blue1 cursor-pointer py-3 bg-white shadow-md shadow-secandary'>
				Лидов за все время:{' '}
				<span className='font-bold'>{data?.leads?.length}</span>
			</div>
		</div>
	)
}

export default PartnerStatisticsSwitch
