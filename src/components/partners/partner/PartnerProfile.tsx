'use client'

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from '@/components/ui/button'
import PartnerService from '@/services/partner/partner.service'
import { IPartner } from '@/types/partner.interface'
import { Ellipsis, Trash2, UserPen } from 'lucide-react'
import { useState } from 'react'
import PartnerEditForm from '../PartnerEditForm'

interface Props {
	partner: IPartner | undefined
}

const PartnerProfile = ({ partner }: Props) => {
	const [isEditPartnerModal, setIsEditPartnerModal] = useState(false)

	const deletePartner = async () => {
		await PartnerService.deletePartner(partner?.id ?? 0)
	}

	return (
		<section>
			{/* Title и кнопки */}
			<div className='flex items-center justify-between gap-3'>
				<div className='text-blue2 font-bold ml-3 text-[30px]'>
					Профиль партнера
				</div>
				<div className='flex items-center gap-3'>
					<Button
						onClick={() => setIsEditPartnerModal(true)}
						variant='outline'
						className='text-blue1 border-blue1 p-5 hover:text-blue1 duration-200 bg-transparent hover:bg-grayDeep/10'>
						{' '}
						<UserPen /> Редактировать
					</Button>
					<Button
						onClick={deletePartner}
						variant='outline'
						className='text-red-500 border-red-500 p-5 hover:text-red-600 duration-200 bg-transparent hover:bg-grayDeep/10'>
						{' '}
						<Trash2 />
						Удалить
					</Button>
				</div>
			</div>

			<div className='flex flex-col justify-between gap-7 rounded-lg p-3 py-5 mt-5 bg-white'>
				{/* Первый блок */}
				<div className=' flex items-center gap-3 justify-between'>
					<div className='text-xl text-blue2 font-semibold'>
						{partner?.name ?? ''} {partner?.lastname ?? ''}
					</div>
					<div className='flex items-center gap-3'>
					<div className='flex flex-col text-right'>
							<span className='text-textGray'>В ожидании</span>
							<span className='text-blue2/70 font-semibold text-xl'>
								{partner?.balanceToAwait}
							</span>
						</div>
						<div className='flex flex-col text-right'>
							<span className='text-textGray'>Баланс</span>
							<span className='text-blue2 font-semibold text-xl'>
								{partner?.balance}
							</span>
						</div>
						<Ellipsis className='w-6 text-blue2/50 cursor-pointer hover:bg-gray-200 duration-200 px-1 rounded-full' />
					</div>
				</div>

				{/* Второй блок */}
				<div className='flex min-w-full'>
					<div className='flex flex-col w-[50%]'>
						<span className='text-textGray text-sm'>Статус</span>
						<span className='text-base text-black/70 font-semibold'>
							{partner?.status}
						</span>
					</div>
					<div className='flex flex-col w-[50%]'>
						<span className='text-textGray text-sm'>E-mail</span>
						<span className='text-base text-black/70 font-semibold'>
							{partner?.email}
						</span>
					</div>
				</div>

				{/* Третий блок */}
				<div className='flex min-w-full'>
					<div className='flex flex-col w-[50%]'>
						<span className='text-textGray text-sm'>Дата регистрации</span>
						<span className='text-base text-black/70 font-semibold'>
							{partner?.registerDate}
						</span>
					</div>
					<div className='flex flex-col w-[50%]'>
						<span className='text-textGray text-sm'>Телефон</span>
						<span className='text-base text-black/70 font-semibold'>
							{partner?.phone}
						</span>
					</div>
				</div>
			</div>

		{/* Модальное окно редактирования */}
		{/* @ts-ignore */}
			{isEditPartnerModal && <PartnerEditForm partner={partner} setActiveEditPartner={setIsEditPartnerModal} />}
		</section>
	)
}

export default PartnerProfile
