'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PlusIcon, PencilSimpleIcon } from '@phosphor-icons/react';
import { PointsConfig } from '../page';

interface PointsConfigFormProps {
    initialValues: PointsConfig;
    onSubmit: (values: PointsConfig) => void;
    isPending?: boolean;
    mode?: 'create' | 'edit';
    onDelete?: () => void;
}


const pointsConfigSchema = Yup.object({
    level: Yup.string().required('Config Name is required'),
    minQuestions: Yup.number().required('Minimum Questions is required'),
    totalPoints: Yup.number().required('Total Points is required'),

    easyQuestionsPercentage: Yup.number()
        .required('Easy Questions Percentage is required')
        .min(0)
        .max(100),

    mediumQuestionsPercentage: Yup.number()
        .required('Medium Questions Percentage is required')
        .min(0)
        .max(100),

    hardQuestionsPercentage: Yup.number()
        .required('Hard Questions Percentage is required')
        .min(0)
        .max(100),
}).test(
    'percentages-sum',
    'Sum of percentages must be exactly 100',
    (values) => {
        if (!values) return false;
        const sum =
            (values.easyQuestionsPercentage || 0) +
            (values.mediumQuestionsPercentage || 0) +
            (values.hardQuestionsPercentage || 0);
        return sum === 100;
    }
);

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
                {mode === 'edit' ? 'Edit Config' : 'New Config'}
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
                            Config
                            <Field
                                name="level"
                                type="text"
                                placeholder="Config"
                                className="grow"
                            />
                        </label>
                        <ErrorMessage name="level" component="div" className="text-red-500 text-sm" />

                        <label className="input input-bordered flex items-center gap-2">
                            Total Points
                            <Field
                                name="totalPoints"
                                type="number"
                                placeholder="e.g. 50,100,150"
                                className="grow"
                            />
                        </label>
                        <ErrorMessage name="totalPoints" component="div" className="text-red-500 text-sm" />

                        <label className="input input-bordered flex items-center gap-2">
                            Min. Questions
                            <Field
                                name="minQuestions"
                                type="number"
                                placeholder="e.g. 10,20,30"
                                className="grow"
                            />
                        </label>
                        <ErrorMessage name="minQuestions" component="div" className="text-red-500 text-sm" />

                        <label className="input input-bordered flex items-center gap-2">
                            Easy Percentage
                            <Field
                                name="easyQuestionsPercentage"
                                type="number"
                                placeholder="e.g. 10%,20%,30%"
                                className="grow"
                            />
                        </label>
                        <ErrorMessage name="easyQuestionsPercentage" component="div" className="text-red-500 text-sm" />

                        <label className="input input-bordered flex items-center gap-2">
                            Medium Percentage
                            <Field
                                name="mediumQuestionsPercentage"
                                type="number"
                                placeholder="e.g. 10%,20%,30%"
                                className="grow"
                            />
                        </label>
                        <ErrorMessage name="mediumQuestionsPercentage" component="div" className="text-red-500 text-sm" />

                        <label className="input input-bordered flex items-center gap-2">
                            Hard Percentage
                            <Field
                                name="hardQuestionsPercentage"
                                type="number"
                                placeholder="e.g. 10%,20%,30%"
                                className="grow"
                            />
                        </label>
                        <ErrorMessage name="hardQuestionsPercentage" component="div" className="text-red-500 text-sm" />


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
