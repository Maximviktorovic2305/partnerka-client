'use client'

import { REFRESH_TOKEN } from "@/constants/token.constants";
import { useActions } from "@/hooks/useActions";
import { getAccessToken } from "@/services/auth/auth.helper";
import Cookies from "js-cookie";
import { FC, PropsWithChildren, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useSelectors";

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
   const { user } = useUser()
   const { checkAuth, getProfile } = useActions();
   const pathname = usePathname();

   useEffect(() => {
      const accessToken = getAccessToken();
      if (accessToken) {
         checkAuth();
      }
   }, [checkAuth]);

   useEffect(() => {
      const refreshToken = Cookies.get(REFRESH_TOKEN);
      if (!refreshToken && user) {
         getProfile();
      }
   }, [getProfile, user, pathname]);

   return <>{children}</>;

};

export default AuthProvider;
