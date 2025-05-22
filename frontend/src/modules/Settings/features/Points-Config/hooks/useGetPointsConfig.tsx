import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useGetPointsConfig = () => {
    return useQuery({
        queryKey: ['points-config'],
        queryFn: async () => {
            const res = await api.get('/points-config');
            return res.data;
        },
    });
};