import { IPartner } from "./partner.interface"
import { IUser } from "./user.interface"

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
   user?: IUser
   userId?: number
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
   user?: IUser
   userId?: number
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
   user?: IUser
   userId?: number
   partnerId?: number
   partner?: IPartner
}

export interface GetAllLeadsRequest {
   filterType?: string 
   startDate?: Date 
   endDate?: Date
}

export interface GetAllPartnerLeadsRequest {
   partnerId?: number
   filterType?: string 
   startDate?: Date 
   endDate?: Date
}