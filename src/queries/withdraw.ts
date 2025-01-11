import WithdrawService from '@/services/withdraw/withdraw.service'
import { useQuery } from '@tanstack/react-query'

// Получить выплату по id
export const useGetWithdrawById = (withdrawId: number) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get withdraw by id', withdrawId],
		queryFn: () => WithdrawService.getWithdrawById(withdrawId),
		select: ({ data }) => data,
		// refetchInterval: 1000,
	})

	return { data, isLoading }
}

// Получить все выплаты партнера
export const useGetPartnerWithdraws = (partnerId: number) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get all partner withdraws', partnerId],
		queryFn: () => WithdrawService.getPartnerWithdraws(partnerId),
		select: ({ data }) => data,
		refetchInterval: 1000,
	})

	return { data, isLoading }
}

// Получить все выплаты
export const useGetAllWithdraws = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get all withdraws'],
		queryFn: () => WithdrawService.getALLWithdraw(),
		select: ({ data }) => data,
		refetchInterval: 1000,
	})

	return { data, isLoading }
}
