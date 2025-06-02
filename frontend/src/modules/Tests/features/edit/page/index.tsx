'use client';

import { useParams, useRouter } from 'next/navigation';
import { TestForm } from '@/modules/Tests/components/TestForm';
import { useGetTestTemplates } from '@/modules/Test-Templates/hooks/useGetTestTemplates';
import { api } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { useGetTestById } from '@/modules/Tests/hooks/useGetTestById';
import { DateTime } from 'luxon';

export default function EditTestPage() {
    const { id } = useParams();
    const router = useRouter();
    const TestId = id as string;

    const { data: TestTemplates = [] } = useGetTestTemplates()

    const { data: Test, isLoading } = useGetTestById(TestId)

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: any) => api.patch(`/test/${TestId}`, payload),
        onSuccess: () => router.push('/dashboard/tests'),
    });

    if (isLoading) return <p>Loading...</p>


    return (
        <TestForm
            isPending={isPending}
            onSubmit={(values) => mutate(values)}
            templates={TestTemplates}
            initialValues={{
                candidateName: Test?.candidateName,
                candidateEmail: Test?.candidateEmail,
                template: Test?.template?.id,
                deadline:new DateTime(Test?.deadline).setLocale('pt').toFormat('yyyy-MM-dd') 
            }}
        />
    );
}
