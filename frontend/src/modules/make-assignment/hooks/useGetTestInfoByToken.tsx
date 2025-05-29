import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useGetTestInfoByToken = (token: string) => {
    return useQuery({
        queryKey: ['Test Name by Token', token],
        queryFn: async () => {
            const res = await api.get(`test/info/${token}`, { headers: { 'x-candidate-token': token } });
            return res.data;
        },
        enabled: !!token,
    });
};
