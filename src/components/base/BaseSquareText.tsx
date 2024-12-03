import React from 'react'

interface Props {
	children: React.ReactNode
	color?: 'new' | 'inWork' | 'deal' | 'cancel' | ''
	className?: string
}

const BaseSquareText = ({ children, color = '', className = '' }: Props) => {
	const colorClassName = `px-3 py-1.5 min-h-[32px] rounded-lg duration-200 cursor-pointer ${
		color === 'new' && 'bg-[#F7EBED] text-[#FFB3BE] hover:bg-[#F7EBED]/90'}
   ${color === 'inWork' && 'bg-[#DDEB] text-[#50ADDC] hover:bg-[#DDEB]/90'}
   ${color === 'deal' && 'bg-[#D8ECF1] text-[#52C6DC] hover:bg-[#D8ECF1]/90'}
   ${ color === 'cancel' && 'bg-[#F3E0E6] text-[#E46672] hover:bg-[#F3E0E6]/90'}
   ${className} `

	return <div className={colorClassName}>{children}</div>
}

export default BaseSquareText
