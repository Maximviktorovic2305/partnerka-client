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
import { Button } from '../ui/button'
import { useState } from 'react'
import { IRefferalLink } from '@/types/refferal-links.interface'
import ReffEditForm from './ReffEditForm'
import RefferalLinkService from '@/services/referral-links/referral-links.service'
import RefLinkEditRow from './RefLinkEditRow'
import RefLinksEditPartner from './RefLinksEditPartner'
import RefLinksEditOffer from './RefLinksEditOffer'

export const columns: ColumnDef<IRefferalLink>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					className='flex self-center justify-self-center'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Название
				</Button>
			)
		},
		cell: ({ row }) => {
			const reffLink = row.original
			return <span className='text-blue2'><RefLinkEditRow reffLink={reffLink} type='name' /></span>
		},
	},
	{
		accessorKey: 'partnerId',
		header: ({ column }) => {
			return (
				<Button
					className='flex self-center justify-self-center'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Партнер
				</Button>
			)
		},
		cell: ({ row }) => {
			const reffLink = row.original
			return <RefLinksEditPartner reffLink={reffLink} />
		},
	},
	{
		accessorKey: 'localeLinkPath',
		header: ({ column }) => {
			return (
				<Button
					className='flex self-center justify-self-center'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Посадочная страница
				</Button>
			)
		},
		cell: ({ row }) => {
			const reffLink = row.original
			return <span className='text-blue3'><RefLinkEditRow reffLink={reffLink} type='localeLinkPath' /></span>
		},
   },
   {
		accessorKey: 'offerId',
		header: ({ column }) => {
			return (
				<Button
					className='flex self-center justify-self-center'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Оффер
				</Button>
			)
		},
		cell: ({ row }) => {
			const reffLink = row.original
			return <RefLinksEditOffer reffLink={reffLink} />         
		},
	},
	{
		accessorKey: 'viewUniqueCount',
		header: ({ column }) => {
			return (
				<Button
					className='flex self-center justify-self-center'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Уник переходы
				</Button>
			)
		},
		cell: ({ row }) => {
			const reffLink = row.original
			return <span className='text-blue2'><RefLinkEditRow reffLink={reffLink} type='viewUniqueCount' /></span>
		},
   },
	{
		accessorKey: 'viewUniqueCount',
		header: ({ column }) => {
			return (
				<Button
					className='flex self-center justify-self-center'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Все переходы
				</Button>
			)
		},
		cell: ({ row }) => {
			const reffLink = row.original
			return <span className='text-blue2'><RefLinkEditRow reffLink={reffLink} type='viewCount' /></span>
		},
   },
	{
		accessorKey: 'conversions',
		header: ({ column }) => {
			return (
				<Button
					className='flex self-center justify-self-center'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Конверсии
				</Button>
			)
		},
		cell: ({ row }) => {
			const reffLink = row.original
			return <RefLinkEditRow reffLink={reffLink} type='conversions' />
		},
   },
	{
		accessorKey: 'amountToAwait',
		header: ({ column }) => {
			return (
				<Button
					className='flex self-center justify-self-center'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Сумма в ожидании
				</Button>
			)
		},
		cell: ({ row }) => {
			const reffLink = row.original
			return <span className='font-bold text-blue2'><RefLinkEditRow reffLink={reffLink} type='amountToAwait' /></span>
		},
   },
	{
		accessorKey: 'amountToPay',
		header: ({ column }) => {
			return (
				<Button
					className='flex self-center justify-self-center'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Сумма начислено
				</Button>
			)
		},
		cell: ({ row }) => {
			const reffLink = row.original
			return <span className='font-bold text-blue2'><RefLinkEditRow reffLink={reffLink} type='amountToPay' /></span>
		},
   },
	{
		id: 'actions',
		enableHiding: false,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		cell: ({ row }) => {
			const reffLink = row.original
			const [activeEditReffLink, setActiveEditReffLink] = useState(false)

			const handleDeleteUser = async () => {
				await RefferalLinkService.deleteRefferalLink(reffLink.id ?? 0)
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
								setActiveEditReffLink(true)
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

					{activeEditReffLink && (
						<ReffEditForm
							setActiveEditReffLink={setActiveEditReffLink}
							reffLink={reffLink}
						/>
					)}
				</DropdownMenu>
			)
		},
	},
]
