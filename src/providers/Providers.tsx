'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import AuthProvider from "./AuthProvider";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false
      }
   }
});

export default function Providers({children}: PropsWithChildren<unknown>) {
   return (
      <QueryClientProvider client={queryClient}>
         <Provider store={store}>
               <AuthProvider>
                     {children}
               </AuthProvider>
         </Provider>
      </QueryClientProvider>
   );
}
