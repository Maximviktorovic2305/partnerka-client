import {
	useGetAllNotPaydWithdraws,
	useGetAllPaydWithdraws,
	useGetPartnerWithdraws,
} from '@/queries/withdraw'
import WithdrawStatisticCard from './WithdrawStatisticCard'
import { IPartner } from '@/types/partner.interface'
import { useUser } from '@/hooks/useSelectors'

interface Props {
	partner?: IPartner
}

const WithdrawTabsStatistics = ({ partner }: Props) => {
	const { isAdmin } = useUser()
	const { data: notPaydData } = useGetAllNotPaydWithdraws()
	const { data: paydData } = useGetAllPaydWithdraws()
	const { data: partnerWithdraws } = useGetPartnerWithdraws(partner?.id ?? 0)

	const partnerNotPayd = partnerWithdraws?.filter(withdraw => withdraw.isPaydOut === false).reduce((acc, item) => item.amount ? acc + item.amount : 0, 0)
	const partnerPayd = partnerWithdraws?.filter(withdraw => withdraw.isPaydOut === true).reduce((acc, item) => item.amount ? acc + item.amount : 0, 0)

	const notPaydAllAmount = notPaydData?.reduce(
		(acc, cur) => (cur.amount ? acc + cur.amount : 0),
		0,
	)
	const paydAllAmount = paydData?.reduce(
		(acc, cur) => (cur.amount ? acc + cur.amount : 0),
		0,
	)

	return (
		<div className=' m-3'>
			<div className='flex items-center gap-5 mt-5'>
				<WithdrawStatisticCard type='l'
					title='Ожидает выплаты'
					amount={(isAdmin ? notPaydAllAmount : partnerNotPayd) ?? 0}
				/>
				<WithdrawStatisticCard type='l'
					title='Всего выплачено'
					amount={(isAdmin ? paydAllAmount : partnerPayd) ?? 0}
				/>
			</div>

			<div className='mt-20 text-xl text-left'>Тут может быть график выплаты партнерам за год</div>
		</div>
	)
}

export default WithdrawTabsStatistics
