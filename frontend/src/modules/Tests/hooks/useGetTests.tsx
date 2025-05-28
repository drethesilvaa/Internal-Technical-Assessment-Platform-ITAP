import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useGetTests = () => {
    return useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await api.get('/tests');
            return res.data;
        },
    });
};