import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useUpdateQuestion = (id: string) => {
    return useMutation({
        mutationKey: ['update-question', id],
        mutationFn: (data: any) => api.patch(`/questions/${id}`, data),
    });
};
