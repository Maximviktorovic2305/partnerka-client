import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

const page = () => {
	return (
		<div className='size-full min-h-screen text-muted fixed flex items-center justify-center'>
			<div className='fixed bg-secondary top-0 left-0 right-0 bottom-0'>
				<div className='flex items-center justify-center mt-[10%] rounded-lg bg-primary max-w-xl p-5 mx-auto'>
					<div className='w-full max-w-[400px] flex flex-col gap-3'>
						<span className='text-center text-xl'>Вход</span>
						<div className='flex flex-col gap-1'>
							<Label className='text-[12px]' htmlFor='email'>Почта</Label>
							<Input type='email' id='email' placeholder='Почта...' />
						</div>
						<div className='flex flex-col gap-1'>
							<Label className='text-[12px]' htmlFor='password'>Пароль</Label>
							<Input type='password' id='password' placeholder='Пароль...' />
						</div>

						<Button variant='secondary' type='submit'>Войти</Button>
						<div className='text-[12px] text-center'>
							Нет аккаунта?{' '}
							<Link href={'/auth/register'} className='text-blue-400 hover:text-blue-500 duration-200 cursor-pointer underline'>
								Зарегистироваться
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default page
