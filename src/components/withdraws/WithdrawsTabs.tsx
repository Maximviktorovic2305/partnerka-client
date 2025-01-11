import { Wallet } from 'lucide-react'
import { Button } from '../ui/button'

const WithdrawsTabs = () => {
	return (
		<section className='w-full text-primary p-3 rounded-lg bg-white m-3 mt-5'>
			<div className='flex items-center gap-3 transition-all duration-300 ease-in-out justify-self-end'>
				<Button
					variant='outline'
					className='text-blue1 border-blue1 p-5 hover:text-blue1 duration-200 bg-transparent hover:bg-grayDeep/10'>
					{' '}
					<Wallet /> Формирование выплат
				</Button>
			</div>
		</section>
	)
}

export default WithdrawsTabs
