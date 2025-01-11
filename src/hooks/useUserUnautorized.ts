'use client'
import { useRouter } from 'next/navigation'               
import { useUser } from '@/hooks/useSelectors'

export const useUserUnautorized = () => {
   const { user } = useUser()
   const router = useRouter()

   if (typeof window !== 'undefined' && !user?.id) {
      router.push('/auth/login')
      router.refresh()
   }

}