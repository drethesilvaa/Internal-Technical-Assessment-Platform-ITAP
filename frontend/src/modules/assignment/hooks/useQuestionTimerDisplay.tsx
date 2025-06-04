import { useQuestion } from "@/providers/QuestionProvider";

export const useQuestionTimerDisplay = () => {
    const { elapsed } = useQuestion();

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return formatTime(elapsed)
}
