import { instanse } from '@/api/api.interceptor'
import { IUser, IUserRequest, IUserUpdateRequest } from '@/types/user.interface'

const USER = 'users'

export const UsersService = {
	// Создание пользователя администратором
	async createUser(data: IUserRequest) {
		return instanse<IUser>({
			url: USER,
			method: 'POST',
			data,
		})
	},

	// Получение своего профиля пользователем
	async getMyProfile() {
		return instanse<IUser>({
			url: USER,
			method: 'GET',
		})
	},

	// Получение userа пользователем
	async getUserById(userId: number) {
		return instanse<IUser>({
			url: `${USER}/id`,
			method: 'GET',   
			data: { userId }
		})
	},

	// Получение всех пользователей администратором
	async getAllUserByAdmin() {
		return instanse<IUser[]>({
			url: `${USER}/all`,
			method: 'GET',
		})
	},

	// Обновление пользователя администратором
	async updateUserByAdmin(data: IUserUpdateRequest) {
		return instanse<IUser>({
			url: USER,
			method: 'PUT',
			data,
		})
	},

	// Удаление пользователя администратором
	async deleteUserByAdmin(userId: number) {
		return instanse<{ message: string }>({
			url: USER,
			method: 'DELETE',
			data: { userId },
		})
	},
}

export default UsersService
