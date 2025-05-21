import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUser = () => {
    return useMutation({
        mutationFn: (id: string) => api.delete(`/users/${id}`),
    });
};
