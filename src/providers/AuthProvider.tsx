/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/token.constants";
import { useActions } from "@/hooks/useActions";
import { FC, PropsWithChildren, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useSelectors";

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
   const { user } = useUser()
   const { checkAuth, getProfile } = useActions();
   const pathname = usePathname();

   useEffect(() => {
      // @ts-ignore
      const accessToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN))
      if (accessToken) {
         checkAuth();
      }
   }, [checkAuth]);

   useEffect(() => {
      // @ts-ignore
      const refreshToken = JSON.parse(localStorage.getItem(REFRESH_TOKEN))
      if (!refreshToken && user) {
         getProfile();
      }
   }, [getProfile, user, pathname]);

   return <>{children}</>;

};

export default AuthProvider;
