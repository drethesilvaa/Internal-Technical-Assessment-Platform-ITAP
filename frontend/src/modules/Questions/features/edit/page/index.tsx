'use client';
import { useParams, useRouter } from 'next/navigation';
import { QuestionForm } from '@/modules/Questions/components/QuestionForm';
import { useGetQuestion } from '@/modules/Questions/hooks/useGetQuestion';
import { useUpdateQuestion } from '@/modules/Questions/hooks/useUpdateQuestion';
import { useDeleteQuestion } from '@/modules/Questions/hooks/useDeleteQuestion';

export default function EditQuestion() {
    const { id } = useParams();
    const router = useRouter();

    const { data: question, isLoading } = useGetQuestion(id as string);
    const { mutate: update, isPending } = useUpdateQuestion(id as string);
    const { mutate: deleteQ } = useDeleteQuestion(id as string);

    if (isLoading) return <p>Loading...</p>;
    if (!question) return <p>Question not found</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Edit Question</h1>
            <QuestionForm
                mode="edit"
                initialValues={{
                    ...question,
                    stackId: question.stack?.id ?? '',
                }}
                isPending={isPending}
                onSubmit={(data) => update(data)}
                onDelete={() => {
                    if (confirm('Are you sure you want to delete this question?')) {
                        deleteQ(undefined, { onSuccess: () => router.push('/dashboard/questions') });
                    }
                }}
            />
        </div>
    );
}
