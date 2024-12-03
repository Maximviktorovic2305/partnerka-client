import React, { useState } from 'react'
import './StatisticsSwitch.css'
import { useGetAllLeads } from '@/queries/lead'

interface Props {
   setActiveSwithItem: (value: string) => void
}

const StatisticsSwitch = ({ setActiveSwithItem }: Props) => {
   const { data } = useGetAllLeads({})
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
            <div className='rounded-lg px-5 text-blue1 border border-blue1 cursor-pointer py-3 bg-white shadow-md shadow-secandary'>Лидов за все время: <span className='font-bold'>{ data?.leads?.length }</span></div>
      </div>
	)
}

export default StatisticsSwitch
