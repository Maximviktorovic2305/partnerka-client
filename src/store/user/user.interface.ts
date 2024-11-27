import { IUser, UserOnlineProps } from "@/types/user.interface"

export interface IInitialState {
	user: IUser | null
	isLoading: boolean
	usersOnline: UserOnlineProps[] | []
}
