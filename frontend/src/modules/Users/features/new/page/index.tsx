'use client';

import { UserForm } from "@/modules/Users/components/UserForm";
import { usePostNewUser } from "../hooks/usePostNewUser";


export const UsersNew = () => {
    const { mutate, isPending } = usePostNewUser();

    return (
        <UserForm
            mode="create"
            initialValues={{ name: '', email: '', password: '', repeatPassword: '', role: 'manager' }}
            onSubmit={(data) => {
                mutate(data, {
                    onSuccess: () => alert('User created'),
                    onError: () => alert('Failed to create'),
                });
            }}
            isPending={isPending}
        />
    );
};
