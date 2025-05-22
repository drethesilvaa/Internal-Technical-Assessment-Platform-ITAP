import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useDeleteQuestion = (id: string) => {
    return useMutation({
        mutationKey: ['delete-question', id],
        mutationFn: () => api.delete(`/questions/${id}`),
    });
};
