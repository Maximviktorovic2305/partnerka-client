import { BookOpenCheck } from 'lucide-react'
import { Button } from '../ui/button'

const Learning = () => {
	return (
		<div className='w-[30%] h-fit bg-white rounded p-7 flex flex-col gap-4 text-left'>
			<h2 className='text-blue2 font-semibold'>Как заработать больше</h2>
			<div className='flex items-center gap-3'>
				<BookOpenCheck className='text-rose-400 min-w-10 min-h-10 bg-rose-100 rounded-full p-2' />
				<p className='text-grayDeep text-sm '>
					В наших обучающих материалах вы узнаете как заработать больше на
					партнерке
				</p>
			</div>
            <Button>Подробнее</Button>
		</div>
	)
}

export default Learning
