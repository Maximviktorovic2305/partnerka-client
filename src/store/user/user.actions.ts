import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "@/services/auth/auth.service";
import { removeFromStorage } from "@/services/auth/auth.helper";
import { errorCatch } from "@/api/api.helper";
import { IRegisterForm, IAuthResponse, IEmailPassword } from "@/types/auth.interface";
import UserService from "@/services/user/user.service";
import { IUser } from "@/types/user.interface";

export const login = createAsyncThunk('user/login', async (data: IEmailPassword) => {
    const response = await AuthService.login(data) 
    if (!response) {
      throw new Error('Failed to login');
    }
    return response
  })         

export const register = createAsyncThunk('user/register', async (data: IRegisterForm) => {
    const response = await AuthService.register(data) 
    if (!response) {
      throw new Error('Failed to register');
    }
    return response
  });


export const logout = createAsyncThunk('auth/logout', 
    async () => {
        removeFromStorage()
    }
)   

export const checkAuth = createAsyncThunk<IAuthResponse>('auth/check-auth',   
    async (_, thunkApi) => {
        try {
            const response = await AuthService.getNewTokens()   
            return response
        } catch (error) {
            if(errorCatch(error) === 'jwt expired') {
                thunkApi.dispatch(logout())
            }   

            return thunkApi.rejectWithValue(error)
        }
    }
)         

export const getProfile = createAsyncThunk<IAuthResponse>('auth/me',   
    async (_, thunkApi) => {
        try {
            const response = await AuthService.getMyProfile()   
            return response
        } catch (error) {
            if(errorCatch(error) === 'jwt expired') {
                thunkApi.dispatch(logout())
            }   

            return thunkApi.rejectWithValue(error)
        }
    }
)   


export const toggleIsAdmin = createAsyncThunk<IUser, void, { state: { user: IUser } }>(
    'user/toggleIsAdmin',
    async (_, thunkApi) => {
      const state = thunkApi.getState();
      const currentUser = state.user;
  
      if (!currentUser) {
        throw new Error('No user found');
      }
  
      const updatedUser = {
        ...currentUser,
        isAdmin: !currentUser.isAdmin,
      };
  
      const response = await UserService.updateUser(updatedUser);
  
      if (!response) {
        throw new Error('Failed to update user');
      }
  
      localStorage.setItem('user', JSON.stringify(response))         
      
      return response;
    }
  );