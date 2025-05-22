'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PlusIcon, PencilSimpleIcon } from '@phosphor-icons/react';

interface PointsConfigFormProps {
    initialValues: { name: string };
    onSubmit: (values: { name: string }) => void;
    isPending?: boolean;
    mode?: 'create' | 'edit';
    onDelete?: () => void;
}


const pointsConfigSchema = Yup.object({
    name: Yup.string().min(2).max(30).required('Stack name is required'),
});

export const PointsConfigForm = ({
    initialValues,
    onSubmit,
    isPending = false,
    mode = 'create',
    onDelete
}: PointsConfigFormProps) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">
                {mode === 'edit' ? 'Edit Stack' : 'New Stack'}
            </h2>

            <Formik
                initialValues={initialValues}
                validationSchema={pointsConfigSchema}
                enableReinitialize
                onSubmit={(values, actions) => {
                    onSubmit(values);
                    actions.setSubmitting(false);
                }}
            >
                {({ isValid, dirty }) => (
                    <Form className="flex flex-col gap-4 max-w-md">
                        <label className="input input-bordered flex items-center gap-2">
                            <Field
                                name="name"
                                type="text"
                                placeholder="e.g. Frontend, Backend, DevOps"
                                className="grow"
                            />
                        </label>
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                        <div className="flex gap-4 mt-4">
                            <button
                                type="submit"
                                disabled={!dirty || !isValid || isPending}
                                className="btn btn-success"
                            >
                                {mode === 'edit' ? <PencilSimpleIcon /> : <PlusIcon />}
                                {isPending ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}
                            </button>

                            <button type="reset" className="btn btn-outline">Clear</button>

                            {mode === 'edit' && onDelete && (
                                <button
                                    type="button"
                                    className="btn btn-error ml-auto"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this stack?')) {
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
