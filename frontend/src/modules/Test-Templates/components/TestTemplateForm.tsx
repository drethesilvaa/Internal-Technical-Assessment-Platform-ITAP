'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface TemplateFormProps {
    initialValues: {
        name: string;
        difficulty: 'junior' | 'intermediate' | 'senior';
        stackId: string;
        questionIds: string[];
    };
    isPending?: boolean;
    onSubmit: (values: TemplateFormProps['initialValues']) => void;
    onDelete?: () => void;
    stacks: { id: string; name: string }[];
    questions: { id: string; content: string }[];
    mode?: 'create' | 'edit';
}

const schema = Yup.object({
    name: Yup.string().required(),
    difficulty: Yup.string().oneOf(['junior', 'intermediate', 'senior']).required(),
    stackId: Yup.string().required(),
    questionIds: Yup.array().of(Yup.string().required()).min(1),
});

export const TestTemplateForm = ({
    initialValues,
    isPending,
    onSubmit,
    onDelete,
    stacks,
    questions,
    mode = 'create',
}: TemplateFormProps) => {
    return (
        <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">
                {mode === 'edit' ? 'Edit Template' : 'Create New Template'}
            </h2>

            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                enableReinitialize
                onSubmit={onSubmit}
            >
                {({ isValid, dirty }) => (
                    <Form className="flex flex-col gap-4">
                        <Field name="name">
                            {({ field }: any) => (
                                <input
                                    {...field}
                                    placeholder="Template Name"
                                    className="input input-bordered w-full"
                                />
                            )}
                        </Field>
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                        <Field as="select" name="difficulty" className="select select-bordered w-full">
                            <option value="" disabled>
                                Select Difficulty
                            </option>
                            <option value="junior">Junior</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="senior">Senior</option>
                        </Field>
                        <ErrorMessage name="difficulty" component="div" className="text-red-500 text-sm" />

                        <Field as="select" name="stackId" className="select select-bordered w-full">
                            <option value="" disabled>
                                Select Stack
                            </option>
                            {stacks.map((stack) => (
                                <option key={stack.id} value={stack.id}>
                                    {stack.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="stackId" component="div" className="text-red-500 text-sm" />

                        <div>
                            <label className="font-semibold block mb-2">Select Questions</label>
                            <Field as="select" name="questionIds" multiple className="select select-bordered w-full h-40">
                                {questions.map((q) => (
                                    <option key={q.id} value={q.id}>
                                        {q.content}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="questionIds" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mt-6 flex justify-between">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!dirty || !isValid || isPending}
                            >
                                {isPending ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}
                            </button>

                            {mode === 'edit' && onDelete && (
                                <button
                                    type="button"
                                    className="btn btn-error"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this template?')) {
                                            onDelete();
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
