import { IOffer } from './offer.interface'
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
	localeLinkPath?: string
	serverLinkPath?: string
	hash?: string
	viewCount?: number
	viewUniqueCount?: number
	offer?: IOffer
	offerId?: number
	amountToPay?: number
	amountToAwait?: number
	conversions?: number
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
	hash?: string
	viewCount?: number
	viewUniqueCount?: number
	offer?: IOffer
	offerId?: number
	amountToPay?: number
	amountToAwait?: number
	conversions?: number
}

export interface IRefferalLink {
	id?: number
	createdFormatedDate?: string
	updatedFormatedDate?: string
	name?: string
	partnerId?: number
	partner?: IPartner
	localeLinkPath?: string
	serverLinkPath?: string
	hash?: string
	viewCount?: number
	viewUniqueCount?: number
	offer?: IOffer
	offerId?: number
	amountToPay?: number
	amountToAwait?: number
	conversions?: number
}
