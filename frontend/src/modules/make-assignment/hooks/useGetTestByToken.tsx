import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useGetTestByToken = (token: string) => {
    return useQuery({
        queryKey: ['Test by Token', token],
        queryFn: async () => {
            const res = await api.get(`test/${token}`, { headers: { 'x-candidate-token': token } });
            return res.data;
        },
        enabled: !!token,
    });
};
