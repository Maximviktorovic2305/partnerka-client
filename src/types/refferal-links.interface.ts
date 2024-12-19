import { IPartner } from './partner.interface'

interface IBaseRefferalLinksResponse {
	id: number
	createdAt: string
	updatedAt: string
}

export interface IRefferalLinksRequest
	extends Partial<IBaseRefferalLinksResponse> {
	createdFormatedDate?: string
	updatedFormatedDate?: string
	name?: string
	partnerId?: number
	devicesId?: string
	localeLinkPath?: string
	serverLinkPath?: string
	registerCount?: number
	hash?: string
	viewCount?: number
	viewUniqueCount?: number
}

export interface IRefferalLinksResponse
	extends Partial<IBaseRefferalLinksResponse> {
	createdFormatedDate?: string
	updatedFormatedDate?: string
	name?: string
	partnerId?: number
	localeLinkPath?: string
	serverLinkPath?: string
	partner?: IPartner[]
	devicesId?: string[]
	registerCount?: number
	hash?: string
	viewCount?: number
	viewUniqueCount?: number
}

export interface IRefferalLink {
	id?: number
	createdFormatedDate?: string
	updatedFormatedDate?: string
	name?: string
	partnerId?: number
	partner?: IPartner
	localeLinkPath?: string
	registerCount?: number
	serverLinkPath?: string
	devicesId?: string[]
	hash?: string
	viewCount?: number
	viewUniqueCount?: number
}
