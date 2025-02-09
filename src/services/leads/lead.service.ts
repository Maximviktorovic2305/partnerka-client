import { instanse } from '@/api/api.interceptor'
import { GetAllLeadsRequest, GetAllPartnerLeadsRequest, ICreateLead, ILead, ILeadResponse } from '@/types/lead.interface'

const SERVICE = '/leads'

const LeadsService = {
	// Создать партнера
	async createLead(data: ICreateLead) {
		const response = await instanse<ILead>({
			url: SERVICE,
			method: 'POST',
			data,
		})

		return response
	},

	// Получить лид по id
	async getLeadById(leadId: number) {
		const response = await instanse<ILead>({
			url: `${SERVICE}/leadId`,
			method: 'POST',
         data: { leadId },
		})

		return response
	},         

   // Получить все лиды партнера по partnerId
	async getAllPartnerLeads(dataPartnerLeads: GetAllPartnerLeadsRequest) {
		const response = await instanse<ILeadResponse>({
			url: `${SERVICE}/partnerId`,
			method: 'POST',
         data: dataPartnerLeads
		})

		return response
	},        

	// Получить все лиды               
	async getAllLeads(dataLeads: GetAllLeadsRequest) {
		const response = await instanse<ILeadResponse>({
			url: `${SERVICE}/allLeads`,
			method: 'POST',
			data: dataLeads
		})

		return response
	},

	// Обновить партнера
	async updateLead(data: Partial<ILead>) {
		const response = await instanse<ILead>({
			url: `${SERVICE}/updateLead`,
			method: 'PUT',
			data,
		})

		return response
	},

	// Удалить партнера
	async deleteLead(leadId: number) {
		const response = await instanse<{message: string}>({
			url: SERVICE,
			method: 'DELETE',
         data: { leadId },
		})

		return response
	},
}

export default LeadsService
