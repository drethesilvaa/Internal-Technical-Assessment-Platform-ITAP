import { PlusIcon, UserIcon } from "@phosphor-icons/react";
import { useGetUsers } from "../hooks/useGetUsers";
import { useRouter } from "next/navigation";

export const Users = () => {

    const { data: users, isLoading, isError } = useGetUsers();

    const router = useRouter()

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load users</p>;

    return (
        <>
            <div className="flex justify-between">
                <h2>Users</h2>
                <button className="btn btn-primary" onClick={() => router.push("users/new")}>New User <PlusIcon size={22} /></button>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u: any, k: number) => (
                            <tr key={k}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <UserIcon size={48} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{u.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {u.email}
                                    <br />
                                    {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                </td>
                                <td>{u.role}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs" onClick={() => router.push(`users/edit/${u.id}`)}>details</button>
                                </th>
                            </tr>

                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}