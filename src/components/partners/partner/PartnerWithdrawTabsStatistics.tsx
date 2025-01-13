import WithdrawStatisticCard from '@/components/withdraws/WithdrawStatisticCard'
import { useGetPartnerWithdraws } from '@/queries/withdraw'
import { IPartner } from '@/types/partner.interface'

interface Props {
	partner: IPartner | undefined
}

const PartnerWithdrawTabsStatistics = ({ partner }: Props) => {
	const { data } = useGetPartnerWithdraws(partner?.id ?? 0)

	const paydAmount = data?.filter(item => item.isPaydOut === true).reduce((acc, cur) => (cur.amount ? acc + cur.amount : 0), 0)
	const notPaydAmount = data?.filter(item => item.isPaydOut === false).reduce((acc, cur) => (cur.amount ? acc + cur.amount : 0), 0)

	return (
		<div>
			<div className='flex items-center gap-5 mt-5'>
				<WithdrawStatisticCard type='s'
					title='Ожидает выплаты'
					amount={notPaydAmount ?? 0}
				/>
				<WithdrawStatisticCard type='s'
					title='Всего выплачено'
					amount={paydAmount ?? 0}
				/>
			</div>
		</div>
	)
}

export default PartnerWithdrawTabsStatistics
