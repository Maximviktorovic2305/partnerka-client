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
	totalAwards?: number
}

export interface IPartner extends IBasePartnerResponse {
	name?: string
	lastname?: string
	email?: string
	registerDate?: string
	status?: string
	phone?: string
	balance?: number
	totalAwards?: number
}

export interface ICreatePartner {
	id?: number, 
	name?: string
	lastname?: string
	email?: string
	registerDate?: string
	status?: string
	phone?: string
	balance?: number
	totalAwards?: number
}

