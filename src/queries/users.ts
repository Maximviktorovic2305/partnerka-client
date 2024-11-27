import UsersService from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

// Получение всех пользователей администратором
export const useUsers = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get all users'],
		queryFn: () => UsersService.getAllUserByAdmin(),
		select: ({ data }) => data,
		refetchInterval: 1000,
	})

	return { data, isLoading }
}

// Получение пользователя пользователем
export const useGetUserById = (userId: number) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get user by id', userId],
		queryFn: () => UsersService.getUserById(userId),
		select: ({ data }) => data,
	})

	return { data, isLoading }
}         

// Получение своего профайла   
export const useGetProfile = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get my profile'],
		queryFn: () => UsersService.getMyProfile(),
		select: ({ data }) => data,
	})

	return { data, isLoading }
}
