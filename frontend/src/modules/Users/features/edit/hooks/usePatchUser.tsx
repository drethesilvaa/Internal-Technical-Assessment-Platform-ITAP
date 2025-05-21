import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { UserDTO } from '@/modules/Users/data/UserType';

export const usePatchUser = (id: string) => {
    return useMutation({
        mutationKey: ['update-user', id],
        mutationFn: (data: Partial<UserDTO>) => api.patch(`/users/${id}`, data),
    });
};
