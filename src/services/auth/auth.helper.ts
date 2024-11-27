'use client'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/token.constants'
import { IAuthResponse, ITokens } from '@/types/auth.interface'
import Cookie from 'js-cookie'

export const saveTokensStorage = (data: ITokens) => {
	Cookie.set(ACCESS_TOKEN, data.accessToken)
	Cookie.set(REFRESH_TOKEN, data.refreshToken)
}

export const removeFromStorage = () => {
	Cookie.remove(ACCESS_TOKEN)
	Cookie.remove(REFRESH_TOKEN)
	localStorage.removeItem('user')
}

export const getAccessToken = () => {
	const accessToken = Cookie.get(ACCESS_TOKEN)
	return accessToken || null
}
export const getRefreshToken = () => {
	const refreshToken = Cookie.get(REFRESH_TOKEN)
	return refreshToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
