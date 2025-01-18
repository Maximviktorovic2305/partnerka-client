'use client'

import { useGetCurrentPartner } from '@/hooks/useGetCurrentPartner'
import WithdrawStatisticCard from '../withdraws/WithdrawStatisticCard'
import { useUser } from '@/hooks/useSelectors'
import { useGetPartnerRefferalLinks } from '@/queries/refferal-link'

const HomePage = () => {
	const partner = useGetCurrentPartner()
	const { isAdmin } = useUser()
	const { data: partnerLinks } = useGetPartnerRefferalLinks(partner?.id ?? 0)

	const classNameStatus = `${
		partner?.status === 'Базовый'
			? 'text-grayDeep'
			: partner?.status === 'Продвинутый'
			? 'text-blue1'
			: 'text-green-400'
	}`

	if (isAdmin) {
		return <div>Главная страница для Администратора</div>
	}   

	return (
		<section className='flex flex-col gap-5 m-3'>
			<div className='flex items-center gap-5'>
				<WithdrawStatisticCard
					title='В ожидании выплаты'
					amount={partner?.balanceToAwait ?? 0}
					type='l'
				/>
				<WithdrawStatisticCard
					title='Выплачено'
					amount={partner?.balance ?? 0}
					type='l'
				/>
				<div className='bg-white rounded p-7 flex flex-col gap-7 max-w-[300px] text-left'>
					<div className='text-grayDeep leading-7 text-2xl'>Статус</div>
					<div
						className={`font-semibold text-blue2 text-2xl ${classNameStatus}`}>
						{partner?.status}
					</div>
				</div>
			</div>

			<div className='bg-white min-w-fit rounded p-7 flex flex-col gap-2 max-w-[300px] text-left'>
				<div className='text-2xl text-blue2 font-semibold'>Мои ссылки</div>
				{partnerLinks?.map(link => (
					<div key={link.id}>
						<div className='text-sm text-grayDeep'>{link.name}</div>
						<div className='text-sm text-blue1'>{link.serverLinkPath}</div>
					</div>
				))}
			</div>

		<div className='bg-white min-w-fit rounded p-7 flex flex-col gap-2 max-w-[300px] text-left'>
			<div className='text-xl font-semibold text-blue2'>Последние новости</div>
			<div className='flex flex-col text-sm'>
			<p className='text-grayDeep'>10.09.2024</p>
			<p className='text-blue1'>Новость первая</p>
			<p>Новость с описанием</p>
			</div>
		</div>
		</section>
	)
}

export default HomePage
