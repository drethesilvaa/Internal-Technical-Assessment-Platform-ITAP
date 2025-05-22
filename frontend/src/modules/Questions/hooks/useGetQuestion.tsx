import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useGetQuestion = (id: string) => {
    return useQuery({
        queryKey: ['question', id],
        queryFn: async () => {
            const res = await api.get(`/questions/${id}`);
            return res.data;
        },
        enabled: !!id,
    });
};
