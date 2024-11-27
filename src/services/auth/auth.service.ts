/* eslint-disable @typescript-eslint/ban-ts-comment */
import { axiosClassic } from "@/api/api.interceptor";
import Cookies from "js-cookie";
import { getUserFromStorage, saveToStorage } from "./auth.helper";
import { REFRESH_TOKEN } from "@/constants/token.constants";
import { IAuthResponse, IEmailPassword } from "@/types/auth.interface";

export const AuthService = {

   // Логин для пользователя   
   async login(data: IEmailPassword) {
      const response = await axiosClassic<IAuthResponse>({
         url: `/auth/login`,
         method: "POST",
         data,
      });

      if (response.data.accessToken) {
         saveToStorage(response.data);
      }

      return response.data;
   },   

   // Получение новых токенов               
   async getNewTokens() {
      const refreshToken = Cookies.get(REFRESH_TOKEN);

      const response = await axiosClassic.post<string, { data: IAuthResponse }>(
         "/auth/login/access-token",
         { refreshToken },
      );   
      
      if (response.data.accessToken) {
         saveToStorage(response.data);
      }

      return response.data;
   },         

   // Получение своего профайла                        
   async getMyProfile() {
      const user = getUserFromStorage()
      const userId = user.id

      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await axiosClassic.post<number, { data: any }>(
         "/auth/me",
         { userId },
      );  
      
      if (response.data.accessToken) {
         saveToStorage(response.data);
      }

      return response.data;
   },
};

export default AuthService;
