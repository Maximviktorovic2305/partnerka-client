'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
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
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { columns } from '@/components/partners/PartnersColumns'
import { useGetAllPartners } from '@/queries/partners'
import PartnerCreateModal from '@/components/partners/PartnerCreateModal'

export function Partners() {
	const { data } = useGetAllPartners()

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})         
	
	const [isPartnerCreatActive, setIsPartnerCreatActive] = useState(false)   
	
	const table = useReactTable({
		data: data ? data : [],
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
	})

	return (
		<div className='w-full min-h-screen text-primary p-3'>
			<Button onClick={() => setIsPartnerCreatActive(true)} className='shadow-md shadow-primary text-primary/90 bg-newAccent flex self-start hover:bg-primary hover:text-white duration-200'>Создать +</Button>

			{ isPartnerCreatActive && <PartnerCreateModal setIsPartnerCreatActive={setIsPartnerCreatActive} /> }

			<div className='flex items-center gap-4 py-4 max-w-[400px]'>
				{/* Поиск по прозвищу         */}
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
				{/* Колонки видимые         */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='border-primary/40 shadow shadow-newAccent'>
							Колонки <ChevronDownIcon className='ml-2 h-4 w-4' />
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
			{/* Table */}
			<div className='rounded-md border overflow-hidden'>
				<Table>
					{/* TableHeader */}
					<TableHeader className='bg-sidebarText'>
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
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									className=''
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
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
	)
}
