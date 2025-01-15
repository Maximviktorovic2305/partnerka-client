import { ILead } from './lead.interface'
import { IPartner } from './partner.interface'

interface IBaseWithdrawResponse {
	id: number
	createdAt: string
	updatedAt: string
}

export interface IWithdrawRequest extends Partial<IBaseWithdrawResponse> {
	createdFormatedDate?: string
	partnerId?: number
	leadName?: string
	partnerEmail?: string
	leadId: number
	lead: ILead
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
	leadId: number
	lead: ILead
	leadName?: string
	comment?: string
	amount?: number
}

export interface ICreateWithdraw {
	id?: number
	createdFormatedDate?: string
	partnerId?: number
	isPaydOut?: boolean
	partnerEmail?: string
	leadName?: string
	leadId: number
	lead: ILead
	comment?: string
	amount?: number
}
