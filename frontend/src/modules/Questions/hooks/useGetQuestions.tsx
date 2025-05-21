import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useGetQuestions = () => {
    return useQuery({
        queryKey: ['questions'],
        queryFn: async () => {
            const res = await api.get('/questions');
            return res.data;
        },
    });
};