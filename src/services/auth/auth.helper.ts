/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/token.constants'
import { IAuthResponse, ITokens } from '@/types/auth.interface'

export const saveTokensStorage = (data: ITokens) => {
	localStorage.setItem(ACCESS_TOKEN, JSON.stringify(data.accessToken))
	localStorage.setItem(REFRESH_TOKEN, JSON.stringify(data.refreshToken))
}

export const removeFromStorage = () => {
	localStorage.removeItem(ACCESS_TOKEN)
	localStorage.removeItem(REFRESH_TOKEN)
	localStorage.removeItem('user')
}

export const getAccessToken = () => {
	// @ts-ignore
	const accessToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN))
	return accessToken || null
}
export const getRefreshToken = () => {
	// @ts-ignore
	const refreshToken = JSON.parse(localStorage.getItem(REFRESH_TOKEN))
	return refreshToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
