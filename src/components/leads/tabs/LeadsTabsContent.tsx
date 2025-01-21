'use client'

import { useState } from 'react'
import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { Settings, UserPlus } from 'lucide-react'
import { useGetAllLeads, useGetPartnerLeads } from '@/queries/lead'
import { columns } from '../LeadsColumns'
import LeadCreateModal from '../LeadCreateModal'
import { IPartner } from '@/types/partner.interface'
import { useUser } from '@/hooks/useSelectors'

interface Props {
	partner?: IPartner
}

export function LeadsTabsContent({ partner }: Props) {
	const { isAdmin } = useUser()
	const { data: allLeads } = useGetAllLeads({})
	const { data: partnerLeads } = useGetPartnerLeads({ partnerId: partner?.id ?? 0 })

	const data = isAdmin ? allLeads : partnerLeads

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})

	const rowsPerPage = 20
	const [isLeadCreatActive, setIsLeadCreatActive] = useState(false)

	const table = useReactTable({
		data: data?.leads ? data.leads : [],
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		pageCount: Math.ceil((data?.leads ? data.leads.length : 0) / rowsPerPage),
		initialState: {
			pagination: {
				pageSize: rowsPerPage,
				pageIndex: 0,
			},
		},
	})

	if (typeof window === 'undefined') {
		return null
	}

	if (!partner && !isAdmin) {
		return <div>Partner not found</div>
	}

	return (
		<>
			<div className='flex items-center justify-between mt-3 pl-6 transition-all duration-300 ease-in-out'>
				<div className='flex items-center gap-3 ml-auto transition-all duration-300 ease-in-out'>
					<Button
						onClick={() => setIsLeadCreatActive(true)}
						variant='outline'
						className='text-blue1 border-blue1 p-5 hover:text-blue1 duration-200 bg-transparent hover:bg-grayDeep/10'>
						{' '}
						<UserPlus /> Добавить Лида
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								className='border-blue1 shadow text-blue1 py-5 hover:text-blue1 bg-transparent hover:bg-grayDeep/10 shadow-newAccent'>
								<Settings />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							className='text-primary bg-secondary shadow-primary'>
							{table
								.getAllColumns()
								.filter(column => column.getCanHide())
								.map(column => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className='capitalize cursor-pointer'
											checked={column.getIsVisible()}
											onCheckedChange={value =>
												column.toggleVisibility(!!value)
											}>
											{column.id}
										</DropdownMenuCheckboxItem>
									)
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className='w-full text-primary p-3 rounded-lg bg-white m-3 transition-all duration-300 ease-in-out'>
				{isLeadCreatActive && (
					<LeadCreateModal setIsLeadCreatActive={setIsLeadCreatActive} />
				)}

				<div className='rounded-md border overflow-hidden transition-all duration-300 ease-in-out'>
					<Table>
						<TableHeader className='bg-secondary transition-all duration-300 ease-in-out'>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map(header => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
													  )}
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody className='transition-all duration-300 ease-in-out'>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map(row => (
									<TableRow
										className=''
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}>
										{row.getVisibleCells().map(cell => (
											<TableCell
												key={cell.id}
												className='transition-all duration-300 ease-in-out'>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className='h-24 text-center'>
										Нет данных...
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>

				<div className='flex items-center justify-end space-x-2 py-4'>
					<div className='space-x-2'>
						<Button
							variant='outline'
							size='sm'
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}>
							Previous
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}>
							Next
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}