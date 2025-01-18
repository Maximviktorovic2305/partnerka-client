'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '../../ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../ui/table'
import { useGetAllPaydWithdraws, useGetPartnerWithdraws } from '@/queries/withdraw'
import { columns } from '../payd/WithdrawsTabsPaydColumns'
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
import WithdrawCreateModal from '../not-payd/WithdrawCreateModal'
import { useUser } from '@/hooks/useSelectors'
import { IPartner } from '@/types/partner.interface'

interface Props {
	partner?: IPartner
}

const WithdrawsTabsPayd = ({ partner }: Props) => {
	const { isAdmin } = useUser()
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})
	const [isWithdrawCreateActive, setIsWithdrawCreateActive] = useState(false)

	const { data: allPaydWithdraws } = useGetAllPaydWithdraws()
	const { data: partnerWithdraws } = useGetPartnerWithdraws(partner?.id ?? 0)

	const partnerPayd = useMemo(() => partnerWithdraws?.filter(withdraw => withdraw.isPaydOut === true), [partnerWithdraws])

	const data = useMemo(() => isAdmin ? allPaydWithdraws : partnerPayd, [isAdmin, allPaydWithdraws, partnerPayd])

	const rowsPerPage = 20

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
		pageCount: Math.ceil((data ? data.length : 0) / rowsPerPage),
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

	return (
		<section className='w-full text-primary rounded-lg bg-white m-3 mt-5'>
			<div className='w-full text-primary rounded-lg p-3 bg-white transition-all duration-300 ease-in-out'>
				{isWithdrawCreateActive && (
					<WithdrawCreateModal
						setIsWithdrawCreateActive={setIsWithdrawCreateActive}
					/>
				)}

				<div className='rounded-md border overflow-hidden transition-all duration-300 ease-in-out'>
					<Table>
						<TableHeader className='bg-secondary transition-all duration-300 ease-in-out'>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map(header => (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									))}
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
		</section>
	)
}

export default WithdrawsTabsPayd