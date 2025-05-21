import { UserDTO } from "@/modules/Users/data/UserType";
import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query"


export const usePostNewUser = () => {
    return useMutation({
        mutationKey: ['post-new-user'],
        mutationFn: (data: UserDTO) => api.post<UserDTO>('/users', data),
    });
};