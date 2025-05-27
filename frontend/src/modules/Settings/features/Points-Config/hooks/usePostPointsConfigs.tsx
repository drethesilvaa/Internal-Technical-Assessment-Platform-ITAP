import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

export const usePostPointsConfig = (refetchPointsConfig: any) => {
    return useMutation({
        mutationFn: ({ level, minQuestions, totalPoints,
            easyQuestionsPercentage,
            mediumQuestionsPercentage,
            hardQuestionsPercentage }: {
                level: string;
                minQuestions: number;
                totalPoints: number;
                easyQuestionsPercentage: number;
                mediumQuestionsPercentage: number;
                hardQuestionsPercentage: number;
            }) => api.post('/points-config', {
                level, minQuestions, totalPoints,
                easyQuestionsPercentage,
                mediumQuestionsPercentage,
                hardQuestionsPercentage
            }),
        onSuccess: () => { refetchPointsConfig(); alert('Config created!') },
        onError: () => alert('Failed to create config'),
    });
}