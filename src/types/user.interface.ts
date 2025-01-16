interface IBaseUserResponse {
	id: number
	createdAt: string
	updatedAt: string
}

export interface IUserRequest extends Partial<IBaseUserResponse> {
	name?: string
	lastname?: string
	email?: string
	password?: string
	isAdmin?: boolean
}

export interface IUser extends IBaseUserResponse {
	id: number
	name?: string
	lastname?: string
	email: string
	password?: string
	isAdmin?: boolean
}
