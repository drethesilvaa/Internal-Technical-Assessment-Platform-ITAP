import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const usePatchPointsConfig = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: ({ id, level, minQuestions, totalPoints,
            easyQuestionsPercentage,
            mediumQuestionsPercentage,
            hardQuestionsPercentage }: {
                id: string; level: string;
                minQuestions: number;
                totalPoints: number;
                easyQuestionsPercentage: number;
                mediumQuestionsPercentage: number;
                hardQuestionsPercentage: number;
            }) =>
            api.patch(`/points-config/${id}`, {
                level, minQuestions, totalPoints,
                easyQuestionsPercentage,
                mediumQuestionsPercentage,
                hardQuestionsPercentage
            }),
        onSuccess,
    });
};
