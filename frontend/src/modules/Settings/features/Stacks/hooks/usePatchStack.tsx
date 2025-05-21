import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const usePatchStack = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: ({ id, name }: { id: string; name: string }) =>
            api.patch(`/stacks/${id}`, { name }),
        onSuccess,
    });
};
