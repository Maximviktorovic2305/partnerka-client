import { ILead } from "./lead.interface"
import { IUser } from "./user.interface"
import { IWithdraw } from "./withdraw.interface"

interface IBasePartnerResponse {
	id: number
	createdAt: string
	updatedAt: string
}

export interface IPartnerRequest extends Partial<IBasePartnerResponse> {
	name?: string
	lastname?: string
	email?: string
	registerDate?: string
	status?: string
	phone?: string
	balance?: number
	withdraws?: IWithdraw[]
	balanceToAwait?: number
	user?: IUser
	userId?: number
	totalAwards?: number
	leads?: ILead[]
}

export interface IPartner extends IBasePartnerResponse {
	name?: string
	lastname?: string
	email?: string
	registerDate?: string
	status?: string
	withdraws?: IWithdraw[]
	phone?: string
	balance?: number
	balanceToAwait?: number
	user?: IUser
	userId?: number
	totalAwards?: number
	leads?: ILead[]
}

export interface ICreatePartner {
	id?: number, 
	name?: string
	lastname?: string
	email?: string
	registerDate?: string
	status?: string
	phone?: string
	withdraws?: IWithdraw[]
	balance?: number
	balanceToAwait?: number
	user?: IUser
	userId?: number
	totalAwards?: number
	leads?: ILead[]
}

