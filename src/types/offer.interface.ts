import { IPartner } from './partner.interface'
import { IRefferalLink } from './refferal-links.interface'

interface IBaseOfferResponse {
	id: number
	createdAt: string
	updatedAt: string
}

export interface IOfferRequest extends Partial<IBaseOfferResponse> {
	name?: string
	domain?: string
	conversions?: number
	amount?: number
	status?: string

	partners?: IPartner[]
	refferalLinks?: IRefferalLink[]
	partnersCount?: number
}

export interface IOffer extends IBaseOfferResponse {
	name?: string
	domain?: string
	conversions?: number
	amount?: number
	status?: string

	partners?: IPartner[]
	refferalLinks?: IRefferalLink[]
	partnersCount?: number
}

export interface ICreateOffer {
	id?: number,
	name?: string
	domain?: string
	conversions?: number
	amount?: number
	status?: string
	partnersCount?: number

	partners?: IPartner[]
	refferalLinks?: IRefferalLink[]
}
