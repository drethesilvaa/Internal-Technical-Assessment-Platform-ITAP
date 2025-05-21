import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useDeleteStack = (onSuccess?: () => void) =>
    useMutation({
        mutationFn: (id: string) => api.delete(`/stacks/${id}`),
        onSuccess,
    });
