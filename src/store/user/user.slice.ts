'use client'

import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, getProfile, login, logout } from './user.actions'
import { IInitialState } from './user.interface'
import { getStorageLocal } from '@/utils/local-storage'

const initialState: IInitialState = {
	user: getStorageLocal('user') || null,
	isLoading: false,
	usersOnline: []
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsersOnline: (state, action) => {
			state.usersOnline = action.payload;
		 },
	},
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

export const { setUsersOnline } = userSlice.actions;