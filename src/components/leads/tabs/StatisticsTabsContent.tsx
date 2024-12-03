'use client'

import { useState } from 'react'
import StatisticsSwitch from '../StatisticsSwitch'
import { useGetAllLeads } from '@/queries/lead'

const StatisticsTabsContent = () => {
  const [activeSwithItem, setActiveSwithItem] = useState<string>('Сегодня')
  const { data } = useGetAllLeads({filterType: activeSwithItem})   
        
	const blockStyle =
		'p-3 flex flex-col shadow-md shadow-secandary gap-2 rounded-lg border border-gray-300'

	return (
		<div className='p-3 rounded-lg bg-white mt-5 m-3 text-left'>
			<StatisticsSwitch setActiveSwithItem={setActiveSwithItem} />

			<div className='flex items-center justify-between flex-wrap mt-10 text-blue2'>
				<div className={blockStyle}>
					<span>Кол-во лидов</span>
					<span className='text-primary font-bold text-2xl'>{ data?.leads?.length }</span>
				</div>
				<div className={blockStyle}>
					<span>
						Лиды в статусе <span className='text-green-400'>НОВЫЕ</span>
					</span>
					<span className='font-bold text-2xl text-green-400'>{ data?.newLeads }</span>
				</div>
				<div className={blockStyle}>
					<span>
						Лиды в статусе <span className='text-orange-400'>В РАБОТЕ</span>
					</span>
					<span className='text-orange-400 font-bold text-2xl'>{ data?.inWorkLeads }</span>
				</div>
				<div className={blockStyle}>
					<span>
						Лиды в статусе <span className='text-blue-400'>СДЕЛКА</span>
					</span>
					<span className='text-blue-400 font-bold text-2xl'>{ data?.dealLeads }</span>
				</div>
				<div className={blockStyle}>
					<span>
						Лиды в статусе <span className='text-red-300'>ОТМЕНА</span>
					</span>
					<span className='text-red-300 font-bold text-2xl'>{ data?.cancelLeads }</span>
				</div>
			</div>
		</div>
	)
}

export default StatisticsTabsContent
