import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Check } from 'lucide-react'

interface Props {
	handleWithdrawAll: () => void
}

const WithdrawAllBtn = ({ handleWithdrawAll }: Props) => {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
         <Check
					onClick={handleWithdrawAll}
					className='text-green-300 h-5 w-auto cursor-pointer hover:text-green-500 border border-green-300 hover:border-green-500 rounded-full p-[2px] ml-4 duration-200'
				/>
			</HoverCardTrigger>
			<HoverCardContent className='w-80'>
				Провести все выплаты
			</HoverCardContent>
		</HoverCard>
	)
}

export default WithdrawAllBtn
