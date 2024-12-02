'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { IRegisterForm } from '@/types/auth.interface'
import { useState } from 'react'
import { useActions } from '@/hooks/useActions'
import { ROUTES } from '@/constants/routes'
import { useRouter } from 'next/navigation'

const Page = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterForm>()
	const [registerError, setRegisterError] = useState<string | null>(null)
  const { register: registerForm } = useActions()
  const router = useRouter()

	const onSubmit = async (data: IRegisterForm) => {
		setRegisterError('')
		try {
			const response = await registerForm(data)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (response.error && response.error.code === 'ERR_BAD_REQUEST') {
				setRegisterError('Данная почта уже занята')
			} else {
				router.push(ROUTES.home)
				router.refresh()
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='size-full min-h-screen text-muted fixed flex items-center justify-center'>
			<div className='fixed bg-secondary top-0 px-3 left-0 right-0 bottom-0' style={{ backgroundImage: 'url(/fon.png)', backgroundSize: 'cover' }}>
				<div className='flex items-center justify-center shadow-md shadow-primary mt-[10%] rounded-lg bg-blue2 max-w-xl p-5 mx-auto'>
					<form
						className='w-full max-w-[400px] flex flex-col gap-3'
						onSubmit={handleSubmit(onSubmit)}>
						<span className='text-center text-xl'>Регистрация</span>
						<div className='flex flex-col gap-1'>
							<Label className='text-[12px]' htmlFor='name'>
								Имя
							</Label>
							<Input
								className='border-white'
								type='text'
								id='name'
								placeholder='Имя...'
								{...register('name', { required: 'Имя обязательно' })}
							/>
							{errors.name && (
								<span className='text-red-500 text-sm'>
									{errors.name.message}
								</span>
							)}
						</div>
						<div className='flex flex-col gap-1'>
							<Label className='text-[12px]' htmlFor='email'>
								Почта
							</Label>
							<Input
								className='border-white'
								type='email'
								id='email'
								placeholder='Почта...'
								{...register('email', {
									required: 'Почта обязательна',
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: 'Некорректный адрес почты',
									},
								})}
							/>
							{errors.email && (
								<span className='text-red-500 text-sm'>
									{errors.email.message}
								</span>
							)}
						</div>
						<div className='flex flex-col gap-1'>
							<Label className='text-[12px]' htmlFor='password'>
								Пароль
							</Label>
							<Input
								className='border-white'
								type='password'
								id='password'
								placeholder='Пароль...'
								autoComplete='off'
								{...register('password', { required: 'Пароль обязателен' })}
							/>
							{errors.password && (
								<span className='text-red-500 text-sm'>
									{errors.password.message}
								</span>
							)}
						</div>

						{registerError && (
							<span className='text-red-500 text-sm'>{registerError}</span>
						)}

						<Button variant='secondary' type='submit'>
							Регистрация
						</Button>
						<div className='text-[12px] text-center'>
							Есть аккаунт?{' '}
							<Link
								href={'/auth/login'}
								className='text-blue-400 hover:text-blue-500 duration-200 cursor-pointer underline'>
								Войти
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Page
