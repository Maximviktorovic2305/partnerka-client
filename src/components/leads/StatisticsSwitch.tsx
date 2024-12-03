import React, { useState } from 'react'
import './StatisticsSwitch.css'

interface Props {
   setActiveSwithItem: (value: string) => void
}

const StatisticsSwitch = ({ setActiveSwithItem }: Props) => {
   
	const [activeIndex, setActiveIndex] = useState(0)
	const options = ['Сегодня', 'Вчера', '7 дней', '30 дней', 'Указать период']

	return (
		<div className='switcher-container shadow-md shadow-secandary'>
			<div
				className='active-indicator'
				style={{ left: `${activeIndex * 100}%` }}
			/>
			{options.map((option, index) => (
				<div
					key={index}
					className={`option ${activeIndex === index ? 'active' : ''}`}
					onClick={(e) => {
                  setActiveIndex(index)
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  setActiveSwithItem(e.target.innerText)
                  }}>
					{option}
				</div>
			))}
		</div>
	)
}

export default StatisticsSwitch
