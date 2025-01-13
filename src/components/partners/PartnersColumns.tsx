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
} from '../ui/dropdown-menu'
import { IPartner } from '@/types/partner.interface'
import { Button } from '../ui/button'
import PartnerEditForm from './PartnerEditForm'
import { useEffect, useState } from 'react'
import PartnerService from '@/services/partner/partner.service'
import { PartnersStatusSelect } from '../base/PartnersStatusSelect'
import { useGetPartnerLeads } from '@/queries/lead'
import BaseSquareText from '../base/BaseSquareText'
import PartnerEditRow from './PartnerEditRow/PartnerEditRow'
import PartnerEditStatus from './PartnerEditRow/PartnerEditStatus'
import Link from 'next/link'

export const columns: ColumnDef<IPartner>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Имя
				</Button>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return (
				<span className='text-blue1'>
					<Link href={`/partners/${partner.id}`}>
						<PartnerEditRow partner={partner} type='name' />
					</Link>
				</span>
			)
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
				</Button>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return (
				<span className='text-blue2'>
					<PartnerEditRow partner={partner} type='registerDate' />
				</span>
			)
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
			const { data } = useGetPartnerLeads({ partnerId: Number(row?.original.id) })
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
			return (
				<PartnersStatusSelect
					type='normal'
					setActiveSelecItem={setActiveSelecItem}
				/>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return <PartnerEditStatus partner={partner} />
		},
	},
	{
		accessorKey: 'balanceToAwait',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Ожидает выплаты
				</Button>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return (
				<span className='text-blue2/70 font-semibold'>
					<PartnerEditRow partner={partner} type='balanceToAwait' />
				</span>
			)
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
				</Button>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return (
				<span className='text-blue2/70 font-semibold'>
					<PartnerEditRow partner={partner} type='balance' />
				</span>
			)
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
				</Button>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return (
				<span className='text-blue2'>
					<PartnerEditRow partner={partner} type='phone' />
				</span>
			)
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
				</Button>
			)
		},
		cell: ({ row }) => {
			const partner = row.original
			return (
				<span className='text-blue2'>
					<PartnerEditRow partner={partner} type='email' />
				</span>
			)
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
