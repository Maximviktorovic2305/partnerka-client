/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { LeadSourceSelect } from '../base/LeadSourceSelect'
import { LeadStatusSelect } from '../base/LeadStatusSelect'
import LeadEditForm from './LeadEditForm'
import LeadsService from '@/services/leads/lead.service'
import LeadEditRow from './LeadEditRow'
import { SelectPartner } from '../base/PartnerSelect'
import { CheckCheck, X } from 'lucide-react'

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
		cell: ({ row }) => {
			const lead = row.original
			return <LeadEditRow lead={lead} type='name' />
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
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const lead = row.original
			return <div className='lowercase'>{lead.createdFormatedDate}</div>
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
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const lead = row.original
			return <div className='lowercase'>{lead.updatedFormatedDate}</div>
		},
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
			const lead = row.original
			const [isEditing, setIsEditing] = useState(false)
			const [typeState, setTypeState] = useState<number | undefined>(lead.partnerId)

			// Ф-ия на двойной клик
			const handleDoubleClick = () => {
				setIsEditing(true)
				setTypeState(lead.partnerId)
			}

			// Ф-ия на сохранение
			const handleSave = async (e: FormEvent) => {
				e.preventDefault()
				await LeadsService.updateLead({
					id: lead.id,
					partnerId: typeState && +typeState
				})
				setIsEditing(false)
				setTypeState(lead.partnerId)
			}

			// Ф-ия отмены
			const handleCancel = useCallback(() => {
				setIsEditing(false)
				setTypeState(lead.partnerId)
			}, [lead])

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
					{/* @ts-ignore */ }
					<SelectPartner setActiveSelecItem={setTypeState} />
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
					<span>{lead.partner?.name}</span>
				</div>
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
			return <LeadSourceSelect setActiveSelecItem={setActiveSelecItem} />
		},
		cell: ({ row }) => {
			const lead = row.original
			const [isEditing, setIsEditing] = useState(false)
			const [typeState, setTypeState] = useState(lead.sourse)

			const styleClassName = `${row.getValue('sourse') === 'Прямое добавление' ? 'text-green-400' : ''} ${row.getValue('sourse') === 'Реферальная программа' ? 'text-orange-400' : ''}
		      ${row.getValue('sourse') === 'Промокод' ? 'text-blue-400' : ''}`

			// Ф-ия на двойной клик
			const handleDoubleClick = () => {
				setIsEditing(true)
				setTypeState(lead.sourse)
			}

			// Ф-ия на сохранение
			const handleSave = async (e: FormEvent) => {
				e.preventDefault()
				await LeadsService.updateLead({
					id: lead.id,
					sourse: typeState
				})
				setIsEditing(false)
				setTypeState(lead.sourse)
			}

			// Ф-ия отмены
			const handleCancel = useCallback(() => {
				setIsEditing(false)
				setTypeState(lead.sourse)
			}, [lead])

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
					{/* @ts-ignore */ }
					<LeadSourceSelect setActiveSelecItem={setTypeState} />
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
					<div className={`lowercase ${styleClassName}`} >{lead.sourse}</div>
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
			return <LeadStatusSelect setActiveSelecItem={setActiveSelecItem} />
		},         
		cell: ({ row }) => {
			const lead = row.original
			const [isEditing, setIsEditing] = useState(false)
			const [typeState, setTypeState] = useState(lead.status)

			const styleClassName = `${row.getValue('status') === 'Новый' ? 'text-green-400' : ''} ${row.getValue('status') === 'В работе' ? 'text-orange-400' : ''}
				${row.getValue('status') === 'Сделка' ? 'text-blue-400' : ''} ${row.getValue('status') === 'Отмена' ? 'text-red-300' : ''}`

			// Ф-ия на двойной клик
			const handleDoubleClick = () => {
				setIsEditing(true)
				setTypeState(lead.status)
			}

			// Ф-ия на сохранение
			const handleSave = async (e: FormEvent) => {
				e.preventDefault()
				await LeadsService.updateLead({
					id: lead.id,
					status: typeState
				})
				setIsEditing(false)
				setTypeState(lead.status)
			}

			// Ф-ия отмены
			const handleCancel = useCallback(() => {
				setIsEditing(false)
				setTypeState(lead.status)
			}, [lead])

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
					{/* @ts-ignore */ }
					<LeadStatusSelect setActiveSelecItem={setTypeState} />
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
					<div className={`lowercase ${styleClassName}`} >{lead.status}</div>
				</div>
			)
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
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const lead = row.original
			return <LeadEditRow lead={lead} type='offer' />
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
					<CaretSortIcon className='h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const lead = row.original
			return <LeadEditRow lead={lead} type='amount' />
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
