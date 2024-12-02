import { IPartner } from "./partner.interface"

interface IBaseLeadResponse {
	id: number
	createdAt: string
	updatedAt: string
}

export interface ILeadRequest extends Partial<IBaseLeadResponse> {
   createdFormatedDate?: string
   updatedFormatedDate?: string
	name?: string
	sourse?: string
   status?: string
   offer?: string
   amount?: number
   partnerId?: number
   partner?: IPartner
}

export interface ILeadResponse extends Partial<IBaseLeadResponse> {
	leads?: ILead[]         
	newLeads?: number
	inWorkLeads?: number
	dealLeads?: number
	cancelLeads?: number
}

export interface ILead extends IBaseLeadResponse {
	createdFormatedDate?: string
   updatedFormatedDate?: string
	name?: string
	sourse?: string
   status?: string
   offer?: string
   amount?: number
   partnerId?: number
   partner?: IPartner
}

export interface ICreateLead {
	id?: number, 
	createdFormatedDate?: string
   updatedFormatedDate?: string
	name?: string
	sourse?: string
   status?: string
   offer?: string
   amount?: number
   partnerId?: number
   partner?: IPartner
}

