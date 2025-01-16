/* eslint-disable @typescript-eslint/ban-ts-comment */
import { axiosClassic } from "@/api/api.interceptor";
import { IUser, IUserRequest } from "@/types/user.interface";

const USER = '/users'

export const UserService = {

   // Регистрация для пользователя   
   async updateUser(data: Partial<IUserRequest>) {
      const response = await axiosClassic<IUser>({
         url: USER,
         method: "PATCH",
         data,
      });

      return response.data;
   },         

};

export default UserService;
