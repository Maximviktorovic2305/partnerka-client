import { getAccessToken, removeFromStorage } from "@/services/auth/auth.helper";
import AuthService from "@/services/auth/auth.service";
import axios from "axios";
import { errorCatch, getContentType } from "./api.helper";

export const axiosClassic = axios.create({
   baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
   headers: getContentType(),
});

export const instanse = axios.create({
   baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
   headers: getContentType(),
});   

instanse.interceptors.request.use(async (config) => {
   const accessToken = getAccessToken();

   if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
   }

   return config;
});

instanse.interceptors.response.use(
   (config) => config,
   async (error) => {
      const originalRequest = error.config;

      if (
         (error?.response?.status === 401 ||
            errorCatch(error) === "jwt expired" ||
            errorCatch(error) === "jwt must be provided") &&
         error.config &&
         !error.config._isRetry
      ) {
         originalRequest._isRetry = true;
         try {
            // get new tokens
            await AuthService.getNewTokens();
            return instanse.request(originalRequest);
         } catch (error) {
            // delete tokens
            if (errorCatch(error) === "jwt expired") {
               removeFromStorage();
            }
         }
      }
      throw error;
   }
);
