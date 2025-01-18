'use client'

import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, getProfile, login, logout, register } from './user.actions'
import { IInitialState } from './user.interface'
import { getStorageLocal } from '@/utils/local-storage'

const initialState: IInitialState = {
	user: getStorageLocal('user') || null,
	isLoading: false,
	isAdmin: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleIsAdmin: (state) => {
			state.isAdmin = !state.isAdmin
		}
	},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
				state.isAdmin = action.payload.user.isAdmin || false
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
				state.isAdmin = false
			})
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
				state.isAdmin = action.payload.user.isAdmin || false
			})
			.addCase(register.rejected, state => {
				state.isLoading = false
				state.user = null
				state.isAdmin = false
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
				state.isAdmin = false
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
				state.isAdmin = payload.user.isAdmin || false
			})
			.addCase(getProfile.fulfilled, (state, { payload }) => {
				state.user = payload.user
				state.isAdmin = payload.user.isAdmin || false
			})
	},
})

export const { toggleIsAdmin } = userSlice.actions