interface Props {
	title: string
	amount: number
}

const WithdrawStatisticCard = ({ title, amount }: Props) => {   
	return (
		<section className='bg-white rounded p-7 flex flex-col gap-7 max-w-[300px] text-left'>
			<div className='text-2xl leading-7 text-grayDeep'>{title}</div>
			<div className='text-[36px] font-semibold text-blue2'>{amount}</div>
		</section>
	)
}

export default WithdrawStatisticCard
