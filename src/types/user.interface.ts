// interface IBaseUserResponse {
// 	id: number
// 	createdAt: string
// 	updatedAt: string
// }

// export interface IUserRequest extends Partial<IBaseUserResponse> {
// 	email: string
// 	username?: string
// 	phone?: string
// 	lastname?: string
// 	nickname?: string
// 	userPost?: string
// 	rang?: string
// 	nomad?: boolean
// 	password: string
// 	isAdmin?: boolean
// 	birthday?: string
// }

// export interface IUserUpdateRequest extends Partial<IUserRequest> {}

// export interface IUser extends IBaseUserResponse {
// 	id: number
// 	email: string
// 	username?: string
// 	phone?: string
// 	lastname?: string
// 	nickname?: string
// 	userPost?: string
// 	rang?: string
// 	nomad?: boolean
// 	password?: string
// 	isAdmin?: boolean
// 	birthday?: string
// 	userPayments?: IUserPayments[]
// 	userDebts?: IUserDebts[]
// 	clubProperty?: IClubProperty[]
// }

// export interface UserOnlineProps {
// 	id: string;
// 	userId: number | string;
//  }