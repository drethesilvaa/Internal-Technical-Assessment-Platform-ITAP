import { PlusIcon, UserIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useGetTestTemplates } from "../hooks/useGetTestTemplates";

export const TestTemplates = () => {

    const { data: testTemplates, isLoading, isError } = useGetTestTemplates();

    const router = useRouter()

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load Test Templates</p>;

    return (
        <>
            <div className="flex justify-between">
                <h2>Test Templates</h2>
                <button className="btn btn-primary" onClick={() => router.push("test-templates/new")}>New Test Template <PlusIcon size={22} /></button>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Stack</th>
                            <th>Difficulty</th>
                            <th>Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testTemplates.map((t: any, k: number) => (
                            <tr key={k}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <UserIcon size={48} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{t.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {t.stacks.map((stack: any) => (stack.name))}
                                    {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                </td>
                                <td>{t.difficulty}</td>
                                <td>{t.createdBy?.name}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs" onClick={() => router.push(`test-templates/edit/${t.id}`)}>details</button>
                                </th>
                            </tr>

                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Stack</th>
                            <th>Difficulty</th>
                            <th>Created By</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}