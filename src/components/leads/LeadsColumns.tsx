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
import { Button } from '../ui/button'
import { ILead } from '@/types/lead.interface'
import { useEffect, useState } from 'react'
import { LeadSourceSelect } from '../base/LeadSourceSelect'
import { LeadStatusSelect } from '../base/LeadStatusSelect'
import LeadEditForm from './LeadEditForm'
import LeadsService from '@/services/leads/lead.service'

export const columns: ColumnDef<ILead>[] = [
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
		cell: ({ row }) => (
			<div className='flex items-center gap-[2px]'>
				<span className='lowercase text-blue1'>{row.getValue('name')}</span>
			</div>
		),
	},
	{
		accessorKey: 'createdFormatedDate',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Дата Соз-ия
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => <div className='lowercase'>{row.getValue('createdFormatedDate')}</div>,
	},
	{
		accessorKey: 'updatedFormatedDate',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Дата Изм-ия
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => <div className='lowercase'>{row.getValue('updatedFormatedDate')}</div>,
	},
	{
		accessorKey: 'partnerId',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Партнер
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
         const partnerName = row.original.partner?.name
      return (<div className='lowercase text-blue1'>{partnerName}</div>)
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
			return <LeadSourceSelect setActiveSelecItem={setActiveSelecItem} />
		},
		cell: ({ row }) => {
			const styleClassName = `${row.getValue('sourse') === 'Прямое добавление' ? 'text-green-400' : ''} ${row.getValue('sourse') === 'Реферальная программа' ? 'text-orange-400' : ''}
			 ${row.getValue('sourse') === 'Промокод' ? 'text-blue-400' : ''}`
		return (<div className={`lowercase ${styleClassName}`} >{row.getValue('sourse')}</div>)
      }
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
			return <LeadStatusSelect setActiveSelecItem={setActiveSelecItem} />
		},
		cell: ({ row }) => {
			const styleClassName = `${row.getValue('status') === 'Новый' ? 'text-green-400' : ''} ${row.getValue('status') === 'В работе' ? 'text-orange-400' : ''}
			 ${row.getValue('status') === 'Сделка' ? 'text-blue-400' : ''} ${row.getValue('status') === 'Отмена' ? 'text-red-300' : ''}`
		return (<div className={`lowercase ${styleClassName}`} >{row.getValue('status')}</div>)
      }
	},
	{
		accessorKey: 'offer',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Оффер
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => <div className='lowercase'>{row.getValue('offer')}</div>,
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Сумма
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => <div className='lowercase'>{row.getValue('amount')}</div>,
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
