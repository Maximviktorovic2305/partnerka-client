interface Props {
	title: string
	amount: number
	type: 's' | 'l'
}

const WithdrawStatisticCard = ({ title, type = 'l', amount }: Props) => {
	return (
		<section className='bg-white rounded p-7 flex flex-col gap-7 text-left'>
			<div
				className={`text-grayDeep leading-7 ${
					type === 's' ? 'text-base' : 'text-2xl'
				}`}>
				{title}
			</div>
			<div
				className={`font-semibold text-blue2 ${
					type === 's' ? 'text-[24px]' : 'text-2xl'
				}`}>
				{amount}
			</div>
		</section>
	)
}

export default WithdrawStatisticCard
