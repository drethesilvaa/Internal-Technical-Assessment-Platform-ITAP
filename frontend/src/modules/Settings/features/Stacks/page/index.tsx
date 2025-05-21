import { PlusIcon, UserIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useGetStacks } from "../hooks/useGetStacks";
import { StackForm } from "../components/StackForm";
import { usePostStack } from "../hooks/usePostStack";
import { useState } from "react";
import { usePatchStack } from "../hooks/usePatchStack";
import { useDeleteStack } from "../hooks/useDeleteStack";

export const Stacks = () => {

    const { data: stacks, isLoading, isError, refetch } = useGetStacks();

    const { mutate: createStack, isPending: isCreating } = usePostStack(refetch);
    const { mutate: updateStack, isPending: isUpdating } = usePatchStack(refetch);

    const [editMode, setEditMode] = useState(false);
    const [selectedStack, setSelectedStack] = useState<{ id: string; name: string } | null>(null);
    const { mutate: deleteStack, isPending: isDeleting } = useDeleteStack(refetch);

    const openCreateModal = () => {
        setEditMode(false);
        setSelectedStack(null);
        document.getElementById('dialogCreateStack')?.showModal();
    };

    const openEditModal = (stack: { id: string; name: string }) => {
        setEditMode(true);
        setSelectedStack(stack);
        document.getElementById('dialogCreateStack')?.showModal();
    };

    const router = useRouter()

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load stacks</p>;

    return (
        <>
            <div className="flex justify-between">
                <h2>Stacks</h2>
                <button className="btn btn-primary" onClick={openCreateModal}>
                    New Stack <PlusIcon size={22} />
                </button>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stacks.map((u: any, k: number) => (
                            <tr key={k} className="cursor-pointer hover:bg-base-200" onClick={() => openEditModal(u)}>
                                <td>
                                    {u.name}
                                    <br />
                                    {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                </td>
                            </tr>

                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <dialog id="dialogCreateStack" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <StackForm
                        mode={editMode ? 'edit' : 'create'}
                        isPending={editMode ? isUpdating : isCreating}
                        initialValues={{ name: selectedStack?.name || '' }}
                        onSubmit={(values) => {
                            if (editMode && selectedStack) {
                                updateStack({ id: selectedStack.id, ...values });
                            } else {
                                createStack(values);
                            }
                        }}
                        onDelete={
                            editMode && selectedStack
                                ? () => {
                                    deleteStack(selectedStack.id, {
                                        onSuccess: () => {
                                            document.getElementById('dialogCreateStack')?.close();
                                            alert('Stack deleted!');
                                        },
                                    });
                                }
                                : undefined
                        }
                    />
                </div>
            </dialog>

        </>
    )
}