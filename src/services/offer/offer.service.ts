import { instanse } from '@/api/api.interceptor'
import { ICreateOffer, IOffer } from '@/types/offer.interface'

const OFFER = '/offers'

const OfferService = {
   // Создать Оффер
   async createOffer(data: ICreateOffer) {
      const response = await instanse<IOffer>({
         url: OFFER,
         method: 'POST',
         data,
      })

      return response
   },

   // Получить оффер по id
   async getOfferById(id: number) {
      const response = await instanse<IOffer>({
         url: `${OFFER}/id`,
         method: 'POST',
         data: { id },
      })

      return response
   },         

   // Получить кол-во партнеров по offerId
   async getPartnersByOfferId(offerId: number) {
      const response = await instanse<number>({
         url: `${OFFER}/offerId`,
         method: 'POST',
         data: { offerId },
      })

      return response
   },

   // Получить всех офферов
   async getAllOffers() {
      const response = await instanse<IOffer[]>({
         url: OFFER,
         method: 'GET',
      })

      return response
   },

   // Обновить оффера
   async updateOffer(data: Partial<ICreateOffer>) {
      const response = await instanse<IOffer>({
         url: OFFER,
         method: 'PUT',
         data,
      })

      return response
   },

   // Удалить оффера
   async deleteOffer(id: number) {
      const response = await instanse<{message: string}>({
         url: OFFER,
         method: 'DELETE',
         data: { id },
      })

      return response
   },
}

export default OfferService
