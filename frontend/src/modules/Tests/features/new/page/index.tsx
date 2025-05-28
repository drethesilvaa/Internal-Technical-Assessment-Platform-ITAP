'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useGetTestTemplates } from '@/modules/Test-Templates/hooks/useGetTestTemplates';
import { TestForm } from '@/modules/Tests/components/TestForm';

export default function TestNew() {
    const router = useRouter();

    const { data: TestTemplates = [] } = useGetTestTemplates()

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: any) => api.post('/assign-test', payload),
        onSuccess: () => router.push('/dashboard/tests'),
    });

    return (
        <TestForm
            isPending={isPending}
            onSubmit={(values) => mutate(values)}
            templates={TestTemplates}
            initialValues={{
                candidateName: "",
                candidateEmail: "",
                template: "",
                deadline: ""
            }}
        />
    );
}
