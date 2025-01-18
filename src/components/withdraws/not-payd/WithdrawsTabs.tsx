'use client'

import { Button } from '../../ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../ui/table'
import { useGetAllNotPaydWithdraws, useGetPartnerWithdraws } from '@/queries/withdraw'
import { useState, useMemo } from 'react'
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
import { useMutation } from '@tanstack/react-query'
import WithdrawService from '@/services/withdraw/withdraw.service'
import WithdrawAllBtn from './WithdrawAllBtn'
import { Wallet } from 'lucide-react'
import { IPartner } from '@/types/partner.interface'
import { useUser } from '@/hooks/useSelectors'

interface Props {
	partner?: IPartner
}

const WithdrawsTabs = ({ partner }: Props) => {
	const { isAdmin } = useUser()
	const { data: allNotPaydWithdraws } = useGetAllNotPaydWithdraws()
	const { data: partnerWithdraws } = useGetPartnerWithdraws(partner?.id ?? 0)

	const partnerNotPayd = useMemo(() => partnerWithdraws?.filter(withdraw => withdraw.isPaydOut === false), [partnerWithdraws])
	const data = useMemo(() => isAdmin ? allNotPaydWithdraws : partnerNotPayd, [isAdmin, allNotPaydWithdraws, partnerNotPayd])

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})

	const rowsPerPage = 20

	const totalSum = useMemo(() => data
		? data.reduce((acc, item) => (item.amount ? acc + item.amount : 0), 0)
		: 0, [data])

	const { mutate } = useMutation({
		mutationFn: () => WithdrawService.updateManyWithdrawsToPaydOut(data ?? []),
	})

	const handleWithdrawAll = async () => {
		try {
			mutate()
		} catch (error) {
			console.error('Ошибка обновления выплат!!!', error)
		}
	}

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
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
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
						{/* TableBody */}
						<TableBody className='transition-all duration-300 ease-in-out'>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										className=''
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}>
										{row.getVisibleCells().map((cell) => (
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
					<div className='space-x-2 flex items-center gap-3'>
						<div className='text-base font-semibold flex items-center'>
							<span className='text-black/50'>Итого:</span>{' '}
							<span className='ml-2'>{totalSum}</span>
							<WithdrawAllBtn handleWithdrawAll={handleWithdrawAll} />
						</div>

						<div className='flex items-center gap-2'>
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
			</div>
		</section>
	)
}

export default WithdrawsTabs