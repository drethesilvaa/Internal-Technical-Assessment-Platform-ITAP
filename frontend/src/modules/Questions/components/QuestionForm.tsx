'use client';

import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useGetStacks } from '@/modules/Settings/features/Stacks/hooks/useGetStacks';
import TiptapEditor from '@/components/TipTapEditor';

const validationSchema = Yup.object({
    content: Yup.string().required(),
    type: Yup.string().oneOf(['mcq', 'code', 'text']).required(),
    difficulty: Yup.string().oneOf(['easy', 'medium', 'hard']).required(),
    points: Yup.number().required(),
    stack: Yup.string().required(),
    correctAnswer: Yup.string().when('type', {
        is: (val: string) => val === 'text' || val === 'code',
        then: (schema) => schema.required('Required'),
    }),
    options: Yup.array().when('type', {
        is: 'mcq',
        then: (schema) =>
            schema
                .of(Yup.object({ text: Yup.string().required(), isCorrect: Yup.boolean() }))
                .min(2, 'At least 2 options required'),
    }),
});

export const QuestionForm = ({
    initialValues,
    mode = 'create',
    onSubmit,
    isPending,
    onDelete
}: {
    initialValues: any;
    mode?: 'create' | 'edit';
    onSubmit: (data: any) => void;
    isPending: boolean;
    onDelete?: () => void;
}) => {
    const { data: stacks } = useGetStacks();

    const [type, setType] = useState(initialValues.type || 'mcq');

    useEffect(() => {
        setType(initialValues.type);
    }, [initialValues]);


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, isValid, dirty, setFieldValue }) => (
                <Form className="flex flex-col gap-4">
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        Question Title
                        <Field name="title" placeholder="Title" className="grow" />
                    </label>

                    <label className="flex items-start gap-2 w-full">
                        Question content
                        <div className='w-full'>
                            <Field component={TiptapEditor} name="content" />
                        </div>

                    </label>


                    <label className=" flex items-center gap-2 w-full">
                        Question Type
                        <Field as="select" name="type" className="select select-bordered" onChange={(e: any) => {
                            setFieldValue('type', e.target.value);
                            setType(e.target.value);
                        }}>
                            <option value="mcq">Multiple Choice</option>
                            <option value="text">Text Answer</option>
                            <option value="code">Code</option>
                        </Field>
                    </label>

                    <label className=" flex items-center gap-2 w-full">
                        Question Difficulty
                        <Field as="select" name="difficulty" className="select select-bordered">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </Field>
                    </label>

                    <label className=" flex items-center gap-2 w-full">
                        Points
                        <Field type="number" name="points" placeholder="Points" className="input input-bordered" />
                    </label>

                    <label className=" flex items-center gap-2 w-full">
                        Stack
                        <Field as="select" name="stack" className="select select-bordered">
                            <option value="">Select a stack</option>
                            {stacks?.map((s: any) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </Field>
                    </label>

                    {type === 'mcq' && (
                        <FieldArray name="options">
                            {({ push, remove }) => (
                                <>
                                    {values.options?.map((opt: any, idx: number) => (
                                        <div key={idx} className="flex gap-2">
                                            <Field name={`options.${idx}.text`} placeholder="Option text" className="input input-bordered grow" />
                                            <label className="label cursor-pointer">
                                                <Field type="checkbox" name={`options.${idx}.isCorrect`} className="checkbox" />
                                                <span className="label-text ml-2">Correct</span>
                                            </label>
                                            <button type="button" className="btn btn-sm btn-error" onClick={() => remove(idx)}>✕</button>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-sm btn-outline mt-2" onClick={() => push({ text: '', isCorrect: false })}>
                                        + Add Option
                                    </button>
                                </>
                            )}
                        </FieldArray>
                    )}

                    {type !== 'mcq' && (
                        <Field
                            name="correctAnswer"
                            placeholder="Correct answer"
                            className="textarea"
                            as="textarea"
                        />
                    )}

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={!isValid || isPending || !dirty}
                            className="btn btn-primary"
                        >
                            {isPending ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}
                        </button>
                        {mode === 'edit' && onDelete && (
                            <button
                                type="button"
                                className="btn btn-outline btn-error"
                                onClick={onDelete}
                            >
                                Delete Question
                            </button>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};
