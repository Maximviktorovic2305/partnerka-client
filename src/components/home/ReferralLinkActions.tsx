'use client'

import { useState } from 'react'
import { CheckCheck, Files, QrCode } from 'lucide-react'
import BaseQRModal from '../base/BaseQRModal'


const ReferralLinkActions = ({ link }: { link: string }) => {
	const [copied, setCopied] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(link ?? '')
			console.log('Ссылка скопирована')
			setCopied(true)
			setTimeout(() => {
				setCopied(false)
			}, 1000)
		} catch (err) {
			console.error('Ошибка копирования: ', err)
		}
	}

	return (
		<span className='flex items-center gap-1 text-blue1'>
			{copied ? (
				<CheckCheck className='cursor-pointer size-5 transition-opacity duration-300 opacity-100' />
			) : (
				<Files
					className='cursor-pointer size-5 transition-opacity duration-300 opacity-100'
					onClick={handleCopy}
				/>
			)}
			<QrCode
				className='cursor-pointer size-5'
				onClick={() => setIsModalOpen(true)}
			/>
			<BaseQRModal
				isOpen={isModalOpen}
				onClose={setIsModalOpen}
				link={link ?? ''}
			/>
		</span>
	)
}

export default ReferralLinkActions