import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useGetTestById = (id: string) => {
    return useQuery({
        queryKey: ['tests', id],
        queryFn: async () => {
            const res = await api.get(`/tests/${id}`);
            return res.data;
        },
    });
};