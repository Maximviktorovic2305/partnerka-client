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
import OfferEditForm from './OfferEditForm'
import { useState } from 'react'
import { IOffer } from '@/types/offer.interface'
import OfferService from '@/services/offer/offer.service'
import OfferEditRow from './OfferEditRow'

export const columns: ColumnDef<IOffer>[] = [
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
			const offer = row.original
			return <OfferEditRow offer={offer} type='name' />
		},
	},
	{
		accessorKey: 'domain',
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
			const offer = row.original
			return <OfferEditRow offer={offer} type='domain' />
		},
	},
	{
		accessorKey: 'partnersCount',
		header: ({ column }) => {
			return (
				<Button
            className='flex items-center justify-center justify-self-center place-self-center'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Кол-во партнеров
				</Button>
			)
		},
		cell: ({ row }) => {
			const offerId = row.original.id
			const [partnersCount, setPartnersCount] = useState(0)

			const getPartnetsCount = async () => {
				const partnerCounts = await OfferService.getPartnersByOfferId(offerId)
				setPartnersCount(partnerCounts.data)
			}
			getPartnetsCount()

			return <div
			className='flex items-center justify-center justify-self-center place-self-center cursor-pointer'>
			<span className='lowercase bg-[#E0F4F5] px-3 rounded-md text-[#44B8BF]'>{partnersCount}</span>
		</div>
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
			const offer = row.original
			return <OfferEditRow offer={offer} type='conversions' />
		},
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => {
			return (
				<Button
					className='flex self-center justify-self-center'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Сумма
				</Button>
			)
		},
		cell: ({ row }) => {
			const offer = row.original
			return <OfferEditRow offer={offer} type='amount' />
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		cell: ({ row }) => {
			const offer = row.original
			const [activeEditOffer, setActiveEditOffer] = useState(false)

			const handleDeleteUser = async () => {
				await OfferService.deleteOffer(offer.id)
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
								setActiveEditOffer(true)
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

					{activeEditOffer && (
						<OfferEditForm
							setActiveEditOffer={setActiveEditOffer}
							offer={offer}
						/>
					)}
				</DropdownMenu>
			)
		},
	},
]
