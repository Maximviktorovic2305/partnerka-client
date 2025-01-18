import LeadsService from '@/services/leads/lead.service'
import { GetAllLeadsRequest, GetAllPartnerLeadsRequest } from '@/types/lead.interface'
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
export const useGetAllLeads = (dataLeads: GetAllLeadsRequest) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get all leads', dataLeads],
		queryFn: () => LeadsService.getAllLeads(dataLeads),
		select: ({ data }) => data,
		refetchInterval: 1000,
	})

	return { data, isLoading }
}               

// Получить все лиды партнера по partnerId         
export const useGetPartnerLeads = (dto: GetAllPartnerLeadsRequest) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get all partner leads', dto],
		queryFn: () => LeadsService.getAllPartnerLeads(dto),
		select: ({ data }) => data,
		refetchInterval: 1000,
	})

	return { data, isLoading }
}