import { instanse } from '@/api/api.interceptor'
import { ICreatePartner, IPartner } from '@/types/partner.interface'

const PARTNER = '/partners'

const PartnerService = {
	// Создать партнера
	async createPartner(data: ICreatePartner) {
		const response = await instanse<IPartner>({
			url: PARTNER,
			method: 'POST',
			data,
		})

		return response
	},

	// Получить партнера по id
	async getPartnerById(id: number) {
		const response = await instanse<IPartner>({
			url: `${PARTNER}/${id}`,
			method: 'GET',
		})

		return response
	},   
	
	// Получить партнера по email
	async getPartnerByEmail(email: string) {
		const response = await instanse<IPartner>({
			url: `${PARTNER}/email`,
			method: 'POST',
			data: { email }
		})

		return response
	},

	// Получить всех партнеров
	async getAllPartners() {
		const response = await instanse<IPartner[]>({
			url: PARTNER,
			method: 'GET',
		})

		return response
	},

	// Обновить партнера
	async updatePartner(data: Partial<ICreatePartner>) {
		const response = await instanse<IPartner>({
			url: PARTNER,
			method: 'PUT',
			data,
		})

		return response
	},

	// Удалить партнера
	async deletePartner(partnerId: number) {
		const response = await instanse<{message: string}>({
			url: `${PARTNER}/${partnerId}`,
			method: 'DELETE',
		})

		return response
	},
}

export default PartnerService
