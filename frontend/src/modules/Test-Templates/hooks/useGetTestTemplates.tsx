import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useGetTestTemplates = () => {
    return useQuery({
        queryKey: ['test templates'],
        queryFn: async () => {
            const res = await api.get('/templates');
            return res.data;
        },
    });
};