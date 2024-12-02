import LeadsService from '@/services/leads/lead.service'
import { useQuery } from '@tanstack/react-query'

// Получить лид по id
export const useGetLeadById = (leadId: number) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get lead by id', leadId],
		queryFn: () => LeadsService.getLeadById(leadId),
		select: ({ data }) => data,
		// refetchInterval: 1000,
	})

	return { data, isLoading }
}

// Получить всех лидов
export const useGetAllLeads = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get all leads'],
		queryFn: () => LeadsService.getAllLeads(),
		select: ({ data }) => data,
		refetchInterval: 1000,
	})

	return { data, isLoading }
}               

// Получить все лиды партнера по partnerId         
export const useGetPartnerLeads = (partnerId: number) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get all partner leads', partnerId],
		queryFn: () => LeadsService.getAllPartnerLeads(partnerId),
		select: ({ data }) => data,
		refetchInterval: 1000,
	})

	return { data, isLoading }
}