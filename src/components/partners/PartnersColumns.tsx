/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table'
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { IPartner } from '@/types/partner.interface'
import { Button } from '../ui/button'
import PartnerEditForm from './PartnerEditForm'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import PartnerService from '@/services/partner/partner.service'
import { PartnersStatusSelect } from '../base/PartnersStatusSelect'
import { useGetPartnerLeads } from '@/queries/lead'
import BaseSquareText from '../base/BaseSquareText'
import PartnerEditRow from './PartnerEditRow'
import { CheckCheck, X } from 'lucide-react'

export const columns: ColumnDef<IPartner>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Имя
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return <PartnerEditRow partner={partner} type='name' />
		},
	},
	{
		accessorKey: 'registerDate',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Дата Рег-и
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return <PartnerEditRow partner={partner} type='registerDate' />
		},
	},
	{
		accessorKey: 'leads',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Кол-во лидов
				</Button>
			)
		},
		cell: ({ row }) => {
			const { data } = useGetPartnerLeads(Number(row?.original.id))
			const newLeads = data?.newLeads
			const inWorkLeads = data?.inWorkLeads
			const dealLeads = data?.dealLeads
			const cancelLeads = data?.cancelLeads

			return (
				<div className='lowercase flex items-center justify-between gap-[2px]'>
					<BaseSquareText color='new'>{newLeads}</BaseSquareText>
					<BaseSquareText color='inWork'>{inWorkLeads}</BaseSquareText>
					<BaseSquareText color='deal'>{dealLeads}</BaseSquareText>
					<BaseSquareText color='cancel'>{cancelLeads}</BaseSquareText>
				</div>
			)
		},
	},
	{
		accessorKey: 'status',
		header: ({ column }) => {
			const [activeSelectItem, setActiveSelecItem] = useState('Clear')

			useEffect(() => {
				if (activeSelectItem === 'Clear') {
					column.setFilterValue('')
				} else {
					column.setFilterValue(activeSelectItem)
				}
			}, [activeSelectItem, column])
			return <PartnersStatusSelect setActiveSelecItem={setActiveSelecItem} />
		},
		cell: ({ row }) => {
			const partner = row.original
			const [isEditing, setIsEditing] = useState(false)
			const [typeState, setTypeState] = useState(partner.status)

			// Ф-ия на двойной клик
			const handleDoubleClick = () => {
				setIsEditing(true)
				setTypeState(partner.status)
			}

			// Ф-ия на сохранение
			const handleSave = async (e: FormEvent) => {
				e.preventDefault()
				await PartnerService.updatePartner({
					id: partner.id,
					status: typeState
				})
				setIsEditing(false)
				setTypeState(partner.status)
			}

			// Ф-ия отмены
			const handleCancel = useCallback(() => {
				setIsEditing(false)
				setTypeState(partner.status)
			}, [partner])

			useEffect(() => {
				const handleKeyDown = (e: KeyboardEvent) => {
					if (e.key === 'Escape') {
						handleCancel()
					}
				}

				if (isEditing) {
					window.addEventListener('keydown', handleKeyDown)
				} else {
					window.removeEventListener('keydown', handleKeyDown)
				}

				return () => {
					window.removeEventListener('keydown', handleKeyDown)
				}
			}, [handleCancel, isEditing])

			return isEditing ? (
				<form className='flex items-center justify-center'>
					<PartnersStatusSelect setActiveSelecItem={setTypeState} />
					{/* Кнопки */}
					<div className='flex items-center gap-1'>
						<button type='submit' onClick={handleSave}>
							<CheckCheck className='h-4 w-auto cursor-pointer text-green-300 hover:text-green-500 duration-200' />
						</button>
						<button type='button' onClick={handleCancel}>
							<X className='h-4 w-auto cursor-pointer text-red-300 hover:text-red-500 duration-200' />
						</button>
					</div>
				</form>
			) : (
				<div
					className='flex items-center justify-center cursor-pointer'
					onDoubleClick={handleDoubleClick}>
					<span className={`lowercase ${partner.status === 'Базовый' && 'text-gray-400'} ${partner.status === 'Продвинутый' && 'text-blue-400'} ${partner.status === 'Профессионал' && 'text-green-400'}`}>{partner.status}</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'totalAwards',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Вознагр-ие
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return <PartnerEditRow partner={partner} type='totalAwards' />
		},
	},
	{
		accessorKey: 'balance',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Баланс
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return <PartnerEditRow partner={partner} type='balance' />
		},
	},
	{
		accessorKey: 'phone',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Телефон
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return <PartnerEditRow partner={partner} type='phone' />
		},
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Email
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return <PartnerEditRow partner={partner} type='email' />
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		cell: ({ row }) => {
			const partner = row.original
			const [activeEditPartner, setActiveEditPartner] = useState(false)

			const handleDeleteUser = async () => {
				await PartnerService.deletePartner(partner.id)
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
						{/* Update Partner */}
						<DropdownMenuItem
							onClick={() => {
								setActiveEditPartner(true)
							}}
							className='cursor-pointer hover:bg-sidebarText'>
							Изменить
						</DropdownMenuItem>

						{/* Delete Partner */}
						<DropdownMenuItem
							className='cursor-pointer hover:bg-sidebarText'
							onClick={handleDeleteUser}>
							Удалить
						</DropdownMenuItem>
					</DropdownMenuContent>

					{activeEditPartner && (
						<PartnerEditForm
							setActiveEditPartner={setActiveEditPartner}
							partner={partner}
						/>
					)}
				</DropdownMenu>
			)
		},
	},
]
