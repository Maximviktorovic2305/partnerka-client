import PartnerService from '@/services/partner/partner.service'
import { useQuery } from '@tanstack/react-query'

// Получить партнера по id
export const useGetPartnerById = (partnerId: number) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get partner by id', partnerId],
		queryFn: () => PartnerService.getPartnerById(partnerId),
		select: ({ data }) => data,
		// refetchInterval: 1000,
	})

	return { data, isLoading }
}

// Получить всех партнеров
export const useGetAllPartners = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get all partners'],
		queryFn: () => PartnerService.getAllPartners(),
		select: ({ data }) => data,
		refetchInterval: 1000,
	})

	return { data, isLoading }
}