import { Button } from '../../ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../ui/table'
import { useGetPartnerWithdraws } from '@/queries/withdraw'
import { useState } from 'react'
import { columns } from '../PartnerWithdrawPaydCol'
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
import WithdrawCreateModal from '@/components/withdraws/not-payd/WithdrawCreateModal'
import { IPartner } from '@/types/partner.interface'

interface Props {
	partner: IPartner | undefined                     
}

const PartnerWithdrawsHistoryTabs = ({ partner }: Props) => {
	const { data: partnerWithdraws } = useGetPartnerWithdraws(partner?.id ?? 0)
	const data = partnerWithdraws?.filter(item => item.isPaydOut === true)

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
		<section className='w-full text-primary rounded-lg bg-white mt-5'>

			<div className='w-full text-primary rounded-lg p-3 bg-white transition-all duration-300 ease-in-out'>
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

export default PartnerWithdrawsHistoryTabs
