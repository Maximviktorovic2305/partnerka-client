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

interface Props {
	partner?: IPartner
}

import { columns } from '@/components/reffferal-link/RefLinksColumns'
import { Link, Settings } from 'lucide-react'
import { useGetAllRefferalLinks, useGetPartnerRefferalLinks } from '@/queries/refferal-link'
import ReffCreateModal from './RefCreateModal'
import { useUserUnautorized } from '@/hooks/useUserUnautorized'
import { IPartner } from '@/types/partner.interface'
import { useUser } from '@/hooks/useSelectors'

export default function ReferralsLinksWidget({ partner }: Props) {
	const { isAdmin } = useUser()
	const { data: partnerLinks } = useGetPartnerRefferalLinks(partner?.id ?? 0)
	const { data: allLinks } = useGetAllRefferalLinks()

	const data = isAdmin ? allLinks : partnerLinks

	useUserUnautorized()

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})

	const [isReffLinkCreatActive, setIsReffLinkCreatActive] = useState(false)

	const rowsPerPage = 15

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

	return (
		<>
			<div className='flex items-center justify-between mt-10 pl-6'>
				<div className='text-left text-[30px] text-blue2 font-bold'>
					Список ссылок
				</div>
				<div className='flex items-center gap-3'>
					<Button
						onClick={() => setIsReffLinkCreatActive(true)}
						variant='outline'
						className='text-blue1 border-blue1 p-5 hover:text-blue1 duration-200 bg-transparent hover:bg-grayDeep/10'>
						<Link /> Создать Ссылку
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								className='border-blue1 shadow text-blue1 py-5 hover:text-blue1 bg-transparent hover:bg-grayDeep/10 shadow-newAccent'>
								<Settings />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='text-primary bg-secondary shadow-primary'>
							{table
								.getAllColumns()
								.filter(column => column.getCanHide())
								.map(column => (
									<DropdownMenuCheckboxItem
										key={`ref-${column.id}`} // Уникальный ключ
										className='capitalize cursor-pointer'
										checked={column.getIsVisible()}
										onCheckedChange={value => column.toggleVisibility(!!value)}>
										{column.id}
									</DropdownMenuCheckboxItem>
								))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className='w-full text-primary p-3 rounded-lg bg-white m-3'>
				{isReffLinkCreatActive && (
					<ReffCreateModal setIsReffLinkCreatActive={setIsReffLinkCreatActive} />
				)}

				{/* Table */}
				<div className='rounded-md border overflow-hidden'>
					<Table>
						<TableHeader className='bg-secondary'>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map(header => (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id} // Уникальный ключ для строки
										data-state={row.getIsSelected() && 'selected'}>
										{row.getVisibleCells().map((cell, cellIndex) => (
											<TableCell key={`${cell.id}-${cellIndex}`}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={columns.length} className='h-24 text-center'>
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
		</>
	)
}
