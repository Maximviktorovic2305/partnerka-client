/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ILead } from '@/types/lead.interface'
import { Button } from '@/components/ui/button'
import LeadEditRow from '@/components/leads/LeadsEditRow/LeadEditRow'
import { useEffect, useState } from 'react'
import { LeadSourceSelect } from '@/components/base/LeadSourceSelect'
import LeadEditSourse from '@/components/leads/LeadsEditRow/LeadEditSourseRow'
import LeadEditStatus from '@/components/leads/LeadsEditRow/LeadEditStatusRow'
import { LeadStatusSelect } from '@/components/base/LeadStatusSelect'
import LeadsService from '@/services/leads/lead.service'
import LeadEditForm from '@/components/leads/LeadEditForm'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<ILead>[] = [
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
			const lead = row.original
			return (
				<span className='text-blue1 text-center'>
					<LeadEditRow lead={lead} type='name' />
				</span>
			)
		},
	},
	{
		accessorKey: 'createdFormatedDate',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Дата Соз-ия
				</Button>
			)
		},
		cell: ({ row }) => {
			const lead = row.original
			return (
				<div className='lowercase text-blue2 text-center'>{lead.createdFormatedDate}</div>
			)
		},
	},
	{
		accessorKey: 'updatedFormatedDate',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Дата Изм-ия
				</Button>
			)
		},
		cell: ({ row }) => {
			const lead = row.original
			return (
				<div className='lowercase text-blue2 text-center'>{lead.updatedFormatedDate}</div>
			)
		},
	},
	{
		accessorKey: 'sourse',
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
				<LeadSourceSelect className='flex justify-self-center'
					type='normal'
					setActiveSelecItem={setActiveSelecItem}
				/>
			)
		},
		cell: ({ row }) => {
			const lead = row.original
			return <LeadEditSourse lead={lead} />
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
				<LeadStatusSelect className='flex justify-self-center'
					type='normal'
					setActiveSelecItem={setActiveSelecItem}
				/>
			)
		},
		cell: ({ row }) => {
			const lead = row.original
			return <LeadEditStatus lead={lead} />
		},
	},
	{
		accessorKey: 'offer',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Оффер
				</Button>
			)
		},
		cell: ({ row }) => {
			const lead = row.original
			return (
				<span className='text-blue1 text-center'>
					<LeadEditRow lead={lead} type='offer' />
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
			const lead = row.original
			return (
				<span className='text-blue2 text-center font-semibold'>
					<LeadEditRow lead={lead} type='amount' />
				</span>
			)
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		cell: ({ row }) => {
			const lead = row.original
			const [activeEditLead, setActiveEditLead] = useState(false)

			const handleDeleteUser = async () => {
				await LeadsService.deleteLead(lead.id)
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
								setActiveEditLead(true)
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

					{activeEditLead && (
						<LeadEditForm setActiveEditLead={setActiveEditLead} lead={lead} />
					)}
				</DropdownMenu>
			)
		},
	},
]
