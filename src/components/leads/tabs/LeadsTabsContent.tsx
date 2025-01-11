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
import { useGetAllLeads } from '@/queries/lead'
import { columns } from '../LeadsColumns'
import LeadCreateModal from '../LeadCreateModal'

export function LeadsTabsContent() {
	const { data } = useGetAllLeads({})

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})         
	
	// Устанавливаем количество строк на страницу
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
		pageCount: Math.ceil((data?.leads ? data.leads.length : 0) / rowsPerPage), // Устанавливаем общее количество страниц
		initialState: {
			pagination: {
				pageSize: rowsPerPage, // Устанавливаем размер страницы
				pageIndex: 0,
			},
		},
	})

	return (
		<>
		<div className='flex items-center justify-between mt-3 pl-6 transition-all duration-300 ease-in-out'>
				<div className='flex items-center gap-3 ml-auto transition-all duration-300 ease-in-out'>
				<Button onClick={() => setIsLeadCreatActive(true)} variant='outline' className='text-blue1 border-blue1 p-5 hover:text-blue1 duration-200 bg-transparent hover:bg-grayDeep/10'> <UserPlus /> Добавить Лида</Button>
				{/* Колонки видимые         */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='border-blue1 shadow text-blue1 py-5 hover:text-blue1 bg-transparent hover:bg-grayDeep/10 shadow-newAccent'>
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
										onCheckedChange={value => column.toggleVisibility(!!value)}>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
				</div>
			</div>

				{/* Поиск по имени         */}
			{/* <div className='flex items-center gap-4 py-4 max-w-[400px]'>
				<Input
					placeholder='Поиск по имени...'
					value={
						(table.getColumn('name')?.getFilterValue() as string) ?? ''
					}
					onChange={event =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className='max-w-[200px] w-full text-primary border-primary/40 shadow shadow-newAccent'
				/>
				
			</div> */}

		<div className='w-full text-primary p-3 rounded-lg bg-white m-3 transition-all duration-300 ease-in-out'>
			

			{ isLeadCreatActive && <LeadCreateModal setIsLeadCreatActive={setIsLeadCreatActive} /> }

			
			{/* Table */}
			<div className='rounded-md border overflow-hidden transition-all duration-300 ease-in-out'>
				<Table>
					{/* TableHeader */}
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
					{/* TableBody */}
					<TableBody className='transition-all duration-300 ease-in-out'>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									className=''
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id} className='transition-all duration-300 ease-in-out'>
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

			{/* Bottom Navigation */}
			<div className='flex items-center justify-end space-x-2 py-4'>
				{/* <div className='flex-1 text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div> */}
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
