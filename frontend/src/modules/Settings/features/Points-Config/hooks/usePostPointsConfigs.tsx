import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

export const usePostPointsConfig = (refetchPointsConfig: any) => {
    return useMutation({
        mutationFn: (values) => api.post('/points-config', values),
        onSuccess: () => { refetchPointsConfig(); alert('Config created!') },
        onError: () => alert('Failed to create config'),
    });
}