'use client'

import { useState } from 'react'
import StatisticsSwitch from '../StatisticsSwitch'

const StatisticsTabsContent = () => {
	const [activeSwithItem, setActiveSwithItem] = useState<string>('Сегодня')
	const blockStyle =
		'p-3 flex flex-col shadow-md shadow-secandary gap-2 rounded-lg border border-gray-300'

	return (
		<div className='p-3 rounded-lg bg-white mt-5 m-3 text-left'>
			<StatisticsSwitch setActiveSwithItem={setActiveSwithItem} />

			<div className='flex items-center justify-between flex-wrap mt-10 text-blue2'>
				<div className={blockStyle}>
					<span>Кол-во лидов</span>
					<span className='text-primary font-bold text-2xl'>0</span>
				</div>
				<div className={blockStyle}>
					<span>
						Лиды в статусе <span className='text-green-400'>НОВЫЕ</span>
					</span>
					<span className='font-bold text-2xl text-green-400'>0</span>
				</div>
				<div className={blockStyle}>
					<span>
						Лиды в статусе В <span className='text-orange-400'>РАБОТЕ</span>
					</span>
					<span className='text-orange-400 font-bold text-2xl'>0</span>
				</div>
				<div className={blockStyle}>
					<span>
						Лиды в статусе <span className='text-blue-400'>СДЕЛКА</span>
					</span>
					<span className='text-blue-400 font-bold text-2xl'>0</span>
				</div>
				<div className={blockStyle}>
					<span>
						Лиды в статусе <span className='text-red-300'>ОТМЕНА</span>
					</span>
					<span className='text-red-300 font-bold text-2xl'>0</span>
				</div>
			</div>
		</div>
	)
}

export default StatisticsTabsContent
