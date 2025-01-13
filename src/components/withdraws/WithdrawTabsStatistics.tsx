import {
	useGetAllNotPaydWithdraws,
	useGetAllPaydWithdraws,
} from '@/queries/withdraw'
import WithdrawStatisticCard from './WithdrawStatisticCard'

const WithdrawTabsStatistics = () => {
	const { data: notPaydData } = useGetAllNotPaydWithdraws()
	const { data: paydData } = useGetAllPaydWithdraws()

	const notPaydAmount = notPaydData?.reduce(
		(acc, cur) => (cur.amount ? acc + cur.amount : 0),
		0,
	)
	const paydAmount = paydData?.reduce(
		(acc, cur) => (cur.amount ? acc + cur.amount : 0),
		0,
	)

	return (
		<div className=' m-3'>
			<div className='flex items-center gap-5 mt-5'>
				<WithdrawStatisticCard
					title='Ожидает выплаты'
					amount={notPaydAmount ?? 0}
				/>
				<WithdrawStatisticCard
					title='Всего выплачено'
					amount={paydAmount ?? 0}
				/>
			</div>

			<div className='mt-20 text-xl text-left'>Тут может быть график выплаты партнерам за год</div>
		</div>
	)
}

export default WithdrawTabsStatistics
