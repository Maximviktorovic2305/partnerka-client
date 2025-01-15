import { instanse } from '@/api/api.interceptor'
import { ICreateWithdraw, IWithdraw } from '@/types/withdraw.interface'

const WITHDRAW = '/withdraw'

const WithdrawService = {
   // Создать выплату
   async createWithdraw(data: ICreateWithdraw) {
      const response = await instanse<IWithdraw>({
         url: WITHDRAW,
         method: 'POST',
         data,
      })

      return response
   },

   // Получить выплату по id
   async getWithdrawById(withdrawId: number) {
      const response = await instanse<IWithdraw>({
         url: `${WITHDRAW}/withdrawId`,
         method: 'POST',
         data: { withdrawId },
      })

      return response
   },                  

   // Получить выплаты партнера                  
   async getPartnerWithdraws(partnerId: number) {
      const response = await instanse<IWithdraw[]>({
         url: `${WITHDRAW}/partnerId`,
         method: 'POST',
         data: { partnerId }
      })

      return response
   },

   // Получить все выплаты
   async getALLWithdraw() {
      const response = await instanse<IWithdraw[]>({
         url: WITHDRAW,
         method: 'GET',
      })

      return response
   },

   // Получить все непроведенные выплаты
   async getALLIsNotPaydWithdraws() {
      const response = await instanse<IWithdraw[]>({
         url: `${WITHDRAW}/not-payd`,
         method: 'GET',
      })

      return response
   },

   // Получить все проведенные выплаты
   async getALLIsPaydWithdraws() {
      const response = await instanse<IWithdraw[]>({
         url: `${WITHDRAW}/payd`,
         method: 'GET',
      })

      return response
   },

   // Обновить выплату
   async updateWithdraw(data: Partial<ICreateWithdraw>) {
      const response = await instanse<IWithdraw>({
         url: WITHDRAW,
         method: 'PUT',
         data,
      })

      return response
   },   
   
   // Обновить много выплат на isPaydOut = true
   async updateManyWithdrawsToPaydOut(data: Partial<ICreateWithdraw>[]) {
      const response = await instanse<IWithdraw[]>({
         url: `${WITHDRAW}/update-many-isPaydOutTrue`,
         method: 'PUT',
         data,
      })

      return response
   },

   // Удалить выплату
   async deleteWithdraw(withdrawId: number) {
      const response = await instanse<{message: string}>({
         url: WITHDRAW,
         method: 'DELETE',         
         data: { withdrawId },
      })

      return response
   },
}

export default WithdrawService
