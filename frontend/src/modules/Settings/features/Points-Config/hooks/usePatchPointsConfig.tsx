import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const usePatchPointsConfig = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: ({ id, name }: { id: string; name: string }) =>
            api.patch(`/stacks/${id}`, { name }),
        onSuccess,
    });
};
