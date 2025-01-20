/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Button } from '../../ui/button'
import { useEffect, useState } from 'react'
import { IWithdraw } from '@/types/withdraw.interface'
import { Check, CircleX } from 'lucide-react'
import WithdrawService from '@/services/withdraw/withdraw.service'
import WithdrawEditRow from '../not-payd/WithdrawEditRow'
import WithdrawEditForm from '../not-payd/WithdrawEditForm'
import { SelectPartnerPaydWithdraw } from './SelectPartnerPaydWithdraw'

export const columns: ColumnDef<IWithdraw>[] = [
	{
		accessorKey: 'createdFormatedDate',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Дата создания
				</Button>
			)
		},
		cell: ({ row }) => {
			const withdraw = row.original
			return (
				<span className='text-blue1'>
					<WithdrawEditRow withdraw={withdraw} type='createdFormatedDate' />
				</span>
			)
		},
	},
	{
		accessorKey: 'partner.name',
		header: ({ column }) => {
			const [activeSelectItem, setActiveSelecItem] = useState('Clear')

			useEffect(() => {
				if (activeSelectItem === 'Clear') {
					column.setFilterValue('') // Сбрасываем фильтр
				} else {
					column.setFilterValue(activeSelectItem)
				}
			}, [activeSelectItem, column])

			return (
				<SelectPartnerPaydWithdraw
					className='flex justify-self-center'
					type='normal'
					setActiveSelecItem={setActiveSelecItem}
				/>
			)
		},
		cell: ({ row }) => {
			const withdraw = row.original
			return (
				<span className='text-blue2'>
					{withdraw.partner?.name ?? ''}
				</span>
			)
		},
	},
	{
		accessorKey: 'leadName',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Лид
				</Button>
			)
		},
		cell: ({ row }) => {
			const withdraw = row.original
			return (
				<div className='lowercase text-blue1'>
					{withdraw?.leadName ?? ''}
				</div>
			)
		},
	},
	{
		accessorKey: 'comment',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Комментарий
				</Button>
			)
		},
		cell: ({ row }) => {
			const withdraw = row.original
			return (
				<span className='text-blue1'>
					<WithdrawEditRow withdraw={withdraw} type='comment' />
				</span>
			)
		},
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Сумма
				</Button>
			)
		},
		cell: ({ row }) => {
			const withdraw = row.original
			return (
				<span className='text-blue2 font-semibold'>
					<WithdrawEditRow withdraw={withdraw} type='amount' />
				</span>
			)
		},
	},
	{
		accessorKey: 'isPaydOut',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Выплачено
				</Button>
			)
		},
		cell: ({ row }) => {
			const withdraw = row.original
			const [isEditing, setIsEditing] = useState(false)
			const [isPaydOut, setIsPaydOut] = useState(withdraw.isPaydOut)

			// Функция для обработки двойного клика
			const handleDoubleClick = () => {
				setIsEditing(true)
			}

			// Функция для изменения состояния isPaydOut
			const handleSelection = async (value: boolean) => {
				setIsPaydOut(value)
				await WithdrawService.updateWithdraw({ id: withdraw.id, isPaydOut })
				setIsEditing(false)
				console.log(isPaydOut)
			}

			return (
				<>
					<span
						onDoubleClick={handleDoubleClick}
						className='relative text-blue2 cursor-pointer font-semibold flex justify-self-center'>
						{withdraw?.isPaydOut ? (
							<Check className='w-5 h-auto text-green-500' />
						) : (
							<CircleX className='w-5 h-auto text-red-500' />
						)}
						{isEditing && (
							<div className='absolute bg-white z-50 top-0 -left-3  flex items-center space-x-2'>
								<Check
									className='w-5 h-auto text-green-500 cursor-pointer'
									onClick={() => handleSelection(true)}
								/>
								<CircleX
									className='w-5 h-auto text-red-500 cursor-pointer'
									onClick={() => handleSelection(false)}
								/>
							</div>
						)}
					</span>
				</>
			)
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		cell: ({ row }) => {
			const withdraw = row.original
			const [activeEditWithdraw, setActiveEditWithdraw] = useState(false)

			const handleDeleteWithdraw = async () => {
				await WithdrawService.deleteWithdraw(withdraw.id)
			}

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-4 w-8 p-0'>
							<DotsHorizontalIcon className='size-1 -pt-3 -pb-2' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='text-primary bg-secondary/30 shadow-md shadow-primary backdrop-blur-sm'
						align='end'>
						<DropdownMenuLabel>Действия</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{/* Update Withdraw */}
						<DropdownMenuItem
							onClick={() => {
								setActiveEditWithdraw(true)
							}}
							className='cursor-pointer hover:bg-sidebarText'>
							Изменить
						</DropdownMenuItem>

						{/* Delete Withdraw */}
						<DropdownMenuItem
							className='cursor-pointer hover:bg-sidebarText'
							onClick={handleDeleteWithdraw}>
							Удалить
						</DropdownMenuItem>
					</DropdownMenuContent>

					{activeEditWithdraw && (
						<WithdrawEditForm
							setActiveEditWithdraw={setActiveEditWithdraw}
							withdraw={withdraw}
						/>
					)}
				</DropdownMenu>
			)
		},
	},
]
