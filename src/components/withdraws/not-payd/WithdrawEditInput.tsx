import React from 'react'
import { Input } from '../../ui/input'

interface Props {
	name: string
	value: string
	onChange: (value: string) => void
	tel?: boolean
	dateBirthday?: boolean
	className?: string
	num?: boolean
}

const WithdrawEditInput = ({
	num,
	value,
	name,
	onChange,
	tel,
	dateBirthday,
	className,
}: Props) => {
	return (
		<div className='flex flex-col gap-[2px] mb-1 text-primary'>
			<Input
				value={value}
				onChange={e => onChange(e.target.value)}
				type={
					(dateBirthday && 'date') ||
					(tel && 'tel') ||
					(num && 'number') ||
					'text'
				}
				name={name}
				className={`placeholder:text-primary/50 shadow-none -my-1 border-blue2/70 ${
					className ? className : ''
				}`}
				placeholder={`${name}...`}
			/>
		</div>
	)
}

export default WithdrawEditInput
