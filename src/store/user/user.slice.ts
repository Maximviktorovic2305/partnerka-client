'use client'

import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, getProfile, login, logout, register } from './user.actions'
import { IInitialState } from './user.interface'
import { getStorageLocal } from '@/utils/local-storage'

const initialState: IInitialState = {
	user: getStorageLocal('user') || null,
	isLoading: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
			.addCase(register.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
			.addCase(getProfile.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	},
})
