import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const usePostQuestion = () => {
    return useMutation({
        mutationKey: ['create-question'],
        mutationFn: (data: any) => api.post('/questions', data),
    });
};
