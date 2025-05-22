'use client';
import { QuestionForm } from '@/modules/Questions/components/QuestionForm';
import { usePostQuestion } from '@/modules/Questions/hooks/usePostQuestion';

export default function NewQuestion() {
    const { mutate, isPending } = usePostQuestion();

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Create New Question</h1>
            <QuestionForm
                initialValues={{
                    title: "",
                    content: '',
                    type: 'mcq',
                    difficulty: 'easy',
                    points: 1,
                    correctAnswer: '',
                    options: [],
                    stackId: '',
                }}
                isPending={isPending}
                onSubmit={(data) => mutate(data)}
            />
        </div>
    );
}
