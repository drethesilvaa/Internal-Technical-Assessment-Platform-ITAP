'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DateTime } from 'luxon';

interface TestFormProps {
    mode?: "edit" | "new"
    initialValues: {
        candidateName: string,
        candidateEmail: string,
        template: {} | null,
        deadline: string
    };
    isPending?: boolean;
    onSubmit: (values: TestFormProps['initialValues']) => void;
    onDelete?: () => void;
    templates: { id: string; name: string }[];
}

const schema = Yup.object({
    candidateName: Yup.string()
        .required('Candidate name is required'),

    candidateEmail: Yup.string()
        .email('Must be a valid email')
        .required('Candidate email is required'),

    template: Yup.string()
        .required('Template is required'),

    deadline: Yup.date()
        .min(
            DateTime.now().plus({ days: 7 }).toJSDate(),
            'Deadline must be at least 7 days from today'
        )
        .required('Deadline is required')
});

export const TestForm = ({
    mode = "new",
    initialValues,
    isPending,
    onSubmit,
    onDelete,
    templates,
}: TestFormProps) => {

    return (
        <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">
                {mode === "new" ? 'New User Test' : "Edit User test"}
            </h2>

            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                enableReinitialize
                onSubmit={onSubmit}
            >
                {({ isValid, dirty }) => (
                    <Form className="flex flex-col gap-4">
                        <Field name="candidateName">
                            {({ field }: any) => (
                                <input
                                    {...field}
                                    disabled={mode === "edit"}
                                    placeholder="Candidate Name"
                                    className="input input-bordered w-full"
                                />
                            )}
                        </Field>
                        <ErrorMessage name="candidateName" component="div" className="text-red-500 text-sm" />

                        <Field name="candidateEmail">
                            {({ field }: any) => (
                                <input
                                    {...field}
                                    disabled={mode === "edit"}
                                    placeholder="Candidate Email"
                                    className="input input-bordered w-full"
                                />
                            )}
                        </Field>
                        <ErrorMessage name="candidateEmail" component="div" className="text-red-500 text-sm" />

                        <Field disabled={mode === "edit"} as="select" name="template" className="select select-bordered w-full">
                            <option value="" disabled>
                                Select Template
                            </option>
                            {templates.map((t, k) => (
                                <option key={k} value={t.id}>{t.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="template" component="div" className="text-red-500 text-sm" />

                        <Field name="deadline">
                            {({ field }: any) => (
                                <input
                                    {...field}
                                    type='date'
                                    placeholder="Deadline"
                                    className="input input-bordered w-full"
                                />
                            )}
                        </Field>
                        <ErrorMessage name="deadline" component="div" className="text-red-500 text-sm" />

                        <div className="mt-6 flex justify-between">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!dirty || !isValid || isPending}
                            >
                                {isPending ? 'Saving...' : mode === "new" ? 'Create' : "Update"}
                            </button>

                            {/* {mode === 'edit' && onDelete && (
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
                            )} */}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
