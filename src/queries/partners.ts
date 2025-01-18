import PartnerService from '@/services/partner/partner.service'
import { useQuery } from '@tanstack/react-query'

// Получить партнера по id
export const useGetPartnerById = (id: number) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get partner by id', id],
		queryFn: () => PartnerService.getPartnerById(id),
		select: ({ data }) => data,
		// refetchInterval: 1000,
	})

	return { data, isLoading }
}

// Получить партнера по email
export const useGetPartnerByEmail = (email: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get partner by id', email],
		queryFn: () => PartnerService.getPartnerByEmail(email),
		select: ({ data }) => data,
		refetchInterval: 1000,
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