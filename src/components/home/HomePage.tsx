'use client'

import { useGetCurrentPartner } from '@/hooks/useGetCurrentPartner'
import WithdrawStatisticCard from '../withdraws/WithdrawStatisticCard'
import { useUser } from '@/hooks/useSelectors'
import { useGetPartnerRefferalLinks } from '@/queries/refferal-link'

import PartnerStatusCard from './PartnerStatusCard'
import PartnerLinks from './PartnerLinks'
import News from './News'
import Learning from './Learning'

const HomePage = () => {
	const partner = useGetCurrentPartner()
	const { isAdmin } = useUser()
	const { data: partnerLinks } = useGetPartnerRefferalLinks(partner?.id ?? 0)

	if (isAdmin) {
		return <div>Главная страница для Администратора</div>
	}

	return (
		<section className='flex m-3'>
			<div className='w-[70%] flex-1'>
				<div className='flex gap-5 mr-5'>
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
					<PartnerStatusCard status={partner?.status} />
				</div>

				<PartnerLinks className="my-5" links={partnerLinks ?? []} />

				<News />
			</div>

			<Learning />
		</section>
	)
}

export default HomePage
