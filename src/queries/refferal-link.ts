import RefferalLinkService from '@/services/referral-links/referral-links.service'
import { useQuery } from '@tanstack/react-query'

// Получить ссылку по id
export const useGetRefferalLinkById = (id: number) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get refferal-link by id', id],
		queryFn: () => RefferalLinkService.getRefferalLinkById(id),
		select: ({ data }) => data,
		refetchInterval: 1000,
	})

	return { data, isLoading }
}

// Получить всех ссылок
export const useGetAllRefferalLinks = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get all refferal-links'],
		queryFn: () => RefferalLinkService.getAllRefferalLinks(),
		select: ({ data }) => data,
		refetchInterval: 1000,
	})

	return { data, isLoading }
}               

// Получить все ссылки партнера по partnerId         
export const useGetPartnerRefferalLinks = (partnerId: number) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get all partner refferal-links', partnerId],
		queryFn: () => RefferalLinkService.getAllPartnerRefferalLinks(partnerId),
		select: ({ data }) => data,
		refetchInterval: 1000,
	})

	return { data, isLoading }
}