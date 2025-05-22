'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { TestTemplateForm } from '@/modules/Test-Templates/components/TestTemplateForm';
import { useGetStacks } from '@/modules/Settings/features/Stacks/hooks/useGetStacks';

export default function TestTemplateNew() {
    const router = useRouter();

    const { data: stacks = [] } = useGetStacks()

    const { data: questions = [] } = useQuery({
        queryKey: ['questions'],
        queryFn: () => api.get('/questions').then((res) => res.data),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: any) => api.post('/templates', payload),
        onSuccess: () => router.push('/dashboard/templates'),
    });

    return (
        <TestTemplateForm
            mode="create"
            isPending={isPending}
            onSubmit={(values) => mutate(values)}
            stacks={stacks}
            initialValues={{
                name: '',
                difficulty: 'junior',
                stackIds:[]
            }}
        />
    );
}
