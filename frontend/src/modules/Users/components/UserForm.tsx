'use client';

import { EnvelopeOpenIcon, KeyIcon, PlusIcon, UserIcon } from '@phosphor-icons/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

interface UserFormProps {
    initialValues: {
        name: string;
        email: string;
        password?: string;
        repeatPassword?: string;
        role: string;
    };
    mode: 'create' | 'edit';
    onSubmit: (values: any) => void;
    onDelete?: () => void;
    isPending: boolean;
}

const validationSchema = Yup.object({
    name: Yup.string()
        .matches(/^[A-Za-z][A-Za-z0-9\-]*$/, 'Invalid username')
        .min(3)
        .max(30)
        .required(),
    email: Yup.string().email('Invalid email').required(),
    password: Yup.string()
        .min(8)
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Weak password')
        .when('mode', {
            is: 'create',
            then: (schema) => schema.required(),
            otherwise: (schema) => schema.notRequired(),
        }),
    repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    role: Yup.string().oneOf(['admin', 'manager', 'reviewer', 'candidate']).required(),
});

export const UserForm = ({ initialValues, mode, onSubmit, onDelete, isPending }: UserFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">{mode === 'edit' ? 'Edit User' : 'New User'}</h2>

            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    const { repeatPassword, ...data } = values;
                    onSubmit(data);
                    actions.setSubmitting(false);
                }}
            >
                {({ isValid, dirty }) => (
                    <Form className="flex flex-col gap-4 max-w-lg">
                        <label className="input input-bordered flex items-center gap-2">
                            <UserIcon />
                            <Field name="name" type="text" placeholder="Username" className="grow" />
                        </label>
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                        <label className="input input-bordered flex items-center gap-2">
                            <EnvelopeOpenIcon />
                            <Field name="email" type="email" placeholder="mail@site.com" className="grow" />
                        </label>
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                        <label className="input input-bordered flex items-center gap-2">
                            <KeyIcon />
                            <Field
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder={mode === 'edit' ? 'New Password (optional)' : 'Password'}
                                className="grow"
                            />
                            <button type="button" onClick={() => setShowPassword((p) => !p)}>
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </label>
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                        <label className="input input-bordered flex items-center gap-2">
                            <KeyIcon />
                            <Field
                                name="repeatPassword"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Repeat password"
                                className="grow"
                            />
                        </label>
                        <ErrorMessage name="repeatPassword" component="div" className="text-red-500 text-sm" />

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Role</span>
                            </div>
                            <Field as="select" name="role" className="select select-bordered">
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                                <option value="reviewer">Reviewer</option>
                                <option value="candidate">Candidate</option>
                            </Field>
                        </label>

                        <div className="flex gap-4 mt-4">
                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={isPending || !isValid || !dirty}
                            >
                                <PlusIcon /> {isPending ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}
                            </button>
                            <button type="reset" className="btn btn-error btn-outline">
                                Clear
                            </button>
                            {mode === "edit" && (
                                <button type="reset" className="btn btn-error" onClick={() => onDelete && onDelete()}>
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
