import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useGetStacks = () => {
    return useQuery({
        queryKey: ['stacks'],
        queryFn: async () => {
            const res = await api.get('/stacks');
            return res.data;
        },
    });
};