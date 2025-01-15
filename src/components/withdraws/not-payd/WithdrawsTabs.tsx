import { Wallet } from 'lucide-react'
import { Button } from '../../ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../ui/table'
import { useGetAllNotPaydWithdraws } from '@/queries/withdraw'
import { useState } from 'react'
import { columns } from '../not-payd/WithdrawsTabsColumns'
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
import WithdrawCreateModal from './WithdrawCreateModal'

const WithdrawsTabs = () => {
	const { data: withdraw } = useGetAllNotPaydWithdraws()
	const {  }

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})

	// Устанавливаем количество строк на страницу
	const rowsPerPage = 20

	const [isWithdrawCreateActive, setIsWithdrawCreateActive] = useState(false)
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
		pageCount: Math.ceil((data ? data.length : 0) / rowsPerPage), // Устанавливаем общее количество страниц
		initialState: {
			pagination: {
				pageSize: rowsPerPage, // Устанавливаем размер страницы
				pageIndex: 0,
			},
		},
	})

	return (
		<section className='w-full text-primary p-3 rounded-lg bg-white m-3 mt-5'>
			<div className='flex items-center gap-3 transition-all duration-300 ease-in-out justify-self-end'>
				<Button
					onClick={() => setIsWithdrawCreateActive(true)}
					variant='outline'
					className='text-blue1 border-blue1 p-5 hover:text-blue1 duration-200 bg-transparent hover:bg-grayDeep/10'>
					{' '}
					<Wallet /> Создать выплату
				</Button>
			</div>

			<div className='w-full text-primary mt-3 rounded-lg bg-white transition-all duration-300 ease-in-out'>
				{isWithdrawCreateActive && (
					<WithdrawCreateModal
						setIsWithdrawCreateActive={setIsWithdrawCreateActive}
					/>
				)}

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

				{/* Bottom Navigation */}
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
		</section>
	)
}

export default WithdrawsTabs
