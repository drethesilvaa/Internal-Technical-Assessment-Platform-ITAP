'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { api } from '@/utils/api';
import { UserForm } from '@/modules/Users/components/UserForm';
import { usePatchUser } from '../hooks/usePatchUser';
import { useDeleteUser } from '@/modules/Users/hooks/useDeleteUser';

export default function UsersEdit() {
    const { id } = useParams();

    const { data: user, isLoading } = useQuery({
        queryKey: ["user", id],
        queryFn: () => {
            return api.get(`/users/${id}`).then((res) => res.data)
        }
    })

    const { mutate, isPending } = usePatchUser(id as string);
    const { mutate: deleteUser, isPending: deleteUserPending } = useDeleteUser();

    if (isLoading || !user) return <p>Loading...</p>;

    return (
        <UserForm
            mode="edit"
            initialValues={{ ...user, password: '', repeatPassword: '' }}
            onSubmit={(data) =>
                mutate(data, {
                    onSuccess: () => alert('User updated!'),
                    onError: () => alert('Failed to update user'),
                })
            }
            onDelete={() =>
                deleteUser(id as string, {
                    onSuccess: () => alert("User Deleted!"),
                    onError: () => alert("Failed to delete user"),
                })
            }
            isPending={isPending}
        />
    );
}
