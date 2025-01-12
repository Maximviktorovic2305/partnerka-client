import { IPartner } from "./partner.interface"

interface IBaseWithdrawResponse {
	id: number
	createdAt: string
	updatedAt: string
}

export interface IWithdrawRequest extends Partial<IBaseWithdrawResponse> {
	createdFormatedDate?: string
	partnerId?: number
	partnerEmail?: string
	isPaydOut?: boolean
	comment?: string
	amount?: number
}

export interface IWithdraw extends IBaseWithdrawResponse {
	createdFormatedDate?: string
	partnerId?: number
   partner?: IPartner
	partnerEmail?: string
	isPaydOut?: boolean
	comment?: string
	amount?: number
}

export interface ICreateWithdraw {
	id?: number
	createdFormatedDate?: string
	partnerId?: number
	isPaydOut?: boolean
	partnerEmail?: string
	comment?: string
	amount?: number
}
