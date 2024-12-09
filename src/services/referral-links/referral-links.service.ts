import { instanse } from '@/api/api.interceptor'
import { IRefferalLink, IRefferalLinksRequest } from '@/types/refferal-links.interface'

const REFERRAL_LINK = '/referral-links'

const RefferalLinkService = {
	// Создать ссылку
	async createRefferalLink(data: IRefferalLinksRequest) {
		const response = await instanse<IRefferalLink>({
			url: REFERRAL_LINK,
			method: 'POST',
			data,
		})

		return response
	},

	// Получить ссылку по id
	async getRefferalLinkById(id: number) {
		const response = await instanse<IRefferalLink>({
			url: `${REFERRAL_LINK}/id`,
			method: 'POST',
         data: { id },
		})

		return response
	},         

   // Получить все ссылки партнера по partnerId
	async getAllPartnerRefferalLinks(partnerId: number) {
		const response = await instanse<IRefferalLink[]>({
			url: `${REFERRAL_LINK}/partnerId`,
			method: 'POST',
         data: { partnerId }
		})

		return response
	},

	// Получить все ссылки                  
	async getAllRefferalLinks() {
		const response = await instanse<IRefferalLink[]>({
			url: REFERRAL_LINK,
			method: 'GET',
		})

		return response
	},

	// Обновить ссылку
	async updateRefferalLink(data: Partial<IRefferalLinksRequest>) {
		const response = await instanse<IRefferalLink>({
			url: REFERRAL_LINK,
			method: 'PUT',
			data,
		})

		return response
	},

	// Удалить ссылку
	async deleteRefferalLink(id: number) {
		const response = await instanse<{message: string}>({
			url: REFERRAL_LINK,
			method: 'DELETE',
         data: { id },
		})

		return response
	},
}

export default RefferalLinkService
