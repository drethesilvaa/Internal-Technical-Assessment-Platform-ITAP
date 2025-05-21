import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

export const usePostStack = (refetchStacks: any) => {
    return useMutation({
        mutationFn: (values: { name: string }) => api.post('/stacks', values),
        onSuccess: () => { refetchStacks(); alert('Stack created!') },
        onError: () => alert('Failed to create stack'),
    });
}