import OfferService from '@/services/offer/offer.service'
import { useQuery } from '@tanstack/react-query'

// Получить offer по id
export const useGetOfferById = (id: number) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get offer by id', id],
		queryFn: () => OfferService.getOfferById(id),
		select: ({ data }) => data,
		// refetchInterval: 1000,
	})

	return { data, isLoading }
}

// Получить all offers 
export const useGetAllOffers = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get all offers'],
		queryFn: () => OfferService.getAllOffers(),
		select: ({ data }) => data,
		refetchInterval: 1000,
	})

	return { data, isLoading }
}