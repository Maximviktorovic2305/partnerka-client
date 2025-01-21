'use client'

import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, getProfile, login, logout, register, toggleIsAdmin } from './user.actions'
import { IInitialState } from './user.interface'
import { getStorageLocal } from '@/utils/local-storage'

const storedUser = getStorageLocal('user')

const initialState: IInitialState = {
	user: storedUser || null,
	isLoading: false,
	isAdmin: storedUser ? storedUser.isAdmin : false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
				state.isAdmin = action.payload.user.isAdmin || false
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false
				state.user = null
				state.isAdmin = false
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
				state.isAdmin = action.payload.user.isAdmin || false
			})
			.addCase(register.rejected, (state) => {
				state.isLoading = false
				state.user = null
				state.isAdmin = false
			})
			.addCase(logout.fulfilled, (state) => {
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
			.addCase(toggleIsAdmin.pending, (state) => {
				state.isLoading = true
			})
			.addCase(toggleIsAdmin.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload
				state.isAdmin = payload.isAdmin || false
			})
			.addCase(toggleIsAdmin.rejected, (state) => {
				state.isLoading = false
			})
	},
})

export const { } = userSlice.actions