'use client'

import { QRCodeSVG } from 'qrcode.react'

interface Props {
	isOpen: boolean
	link: string
	onClose: (value: boolean) => void
}

const BaseModal = ({ isOpen, link, onClose }: Props) => {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white p-4 rounded-md shadow-white shadow flex flex-col gap-5 justify-center items-center'>
				<h2 className='text-lg font-semibold'>Сканируйте QR-код</h2>
				<QRCodeSVG value={link} size={128} fgColor='#132053' />
				<div>
					<p className='mt-2'>
						Переходите по ссылке:{' '}
						<a
							className='text-blue-600 underline'
							href={link}
							target='_blank'
							rel='noopener noreferrer'>
							{link}
						</a>
					</p>
					<button
						onClick={() => onClose(false)}
						className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>
						Закрыть
					</button>
				</div>
			</div>
		</div>
	)
}

export default BaseModal
