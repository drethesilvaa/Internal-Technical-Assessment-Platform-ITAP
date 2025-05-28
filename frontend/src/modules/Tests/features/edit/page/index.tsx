'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { TestTemplateForm } from '@/modules/Test-Templates/components/TestTemplateForm';
import { useGetStacks } from '@/modules/Settings/features/Stacks/hooks/useGetStacks';

export default function EditTemplatePage() {
    const { id } = useParams();
    const router = useRouter();
    const templateId = id as string;

    const { data: stacks = [] } = useGetStacks()

    const { data: template, isLoading } = useQuery({
        queryKey: ['template', templateId],
        queryFn: () => api.get(`/templates/${templateId}`).then((res) => res.data),
    });

    const { mutate: updateTemplate, isPending } = useMutation({
        mutationFn: (values: any) => api.patch(`/templates/${templateId}`, values),
        onSuccess: () => router.push('/dashboard/test-templates'),
    });

    const { mutate: deleteTemplate } = useMutation({
        mutationFn: () => api.delete(`/templates/${templateId}`),
        onSuccess: () => router.push('/dashboard/test-templates'),
    });

    if (isLoading || !template) return <p>Loading...</p>;

    return (
        <TestTemplateForm
            mode="edit"
            isPending={isPending}
            onSubmit={(values) => updateTemplate(values)}
            onDelete={() => deleteTemplate()}
            stacks={stacks}
            initialValues={{
                name: template.name,
                difficulty: template.difficulty,
                stackIds: template.stacks.map((s: any) => s.id),
            }}
        />
    );
}
