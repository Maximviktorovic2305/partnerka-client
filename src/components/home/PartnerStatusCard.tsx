import { BicepsFlexed, Flower, Snail } from 'lucide-react'

interface Props {
	status?: string
}

const PartnerStatusCard = ({ status }: Props) => {   
   
	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Базовый':
				return <Snail className='text-grayDeep' />
			case 'Продвинутый':
				return <BicepsFlexed className='text-blue1' />
			case 'Профессионал':
				return <Flower className='text-green-400' />
			default:
				return null
		}
	}

	const classNameStatus = `${
		status === 'Базовый'
			? 'text-grayDeep'
			: status === 'Продвинутый'
			? 'text-blue1'
			: 'text-green-400'
	}`

	return (
		<div className='bg-white rounded p-7 flex flex-col gap-7 text-left'>
			<div className='text-grayDeep leading-7 text-2xl'>Статус</div>
			<div className='flex items-center gap-2'>
				{getStatusIcon(status ?? '')}
				<div className={`font-semibold text-2xl ${classNameStatus}`}>
					{status}
				</div>
			</div>
		</div>
	)
}

export default PartnerStatusCard
