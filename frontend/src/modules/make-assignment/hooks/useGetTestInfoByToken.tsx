import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { unAuthApi } from '@/utils/unAuthApi';

export const useGetTestInfoByToken = (token: string) => {
    return useQuery({
        queryKey: ['Test Name by Token', token],
        queryFn: async () => {
            const res = await unAuthApi.get(`test/info/${token}`, { headers: { 'x-candidate-token': token } });
            return res.data;
        },
        enabled: !!token,
    });
};
