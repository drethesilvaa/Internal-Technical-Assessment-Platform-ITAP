import { PlusIcon, UserIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useGetTests } from "../hooks/useGetTests";
import { DateTime } from "luxon";

export const Tests = () => {

    const { data: tests, isLoading, isError } = useGetTests();

    const router = useRouter()

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load Tests</p>;

    return (
        <>
            <div className="flex justify-between">
                <h2>Users Tests</h2>
                <button className="btn btn-primary" onClick={() => router.push("tests/new")}>New Test Invite <PlusIcon size={22} /></button>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Stack(s)</th>
                            <th>Deadline</th>
                            <th>Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((t: any, k: number) => (
                            <tr key={k}>
                                <td>{t.candidateEmail}</td>
                                <td>{t.status}</td>
                                <td>
                                    {t.template.name}
                                    {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                </td>
                                <td>{DateTime.fromISO(t.deadline).setLocale('pt').toFormat('dd MMMM, yyyy')}</td>
                                <td>{t.createdBy?.name}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs" onClick={() => router.push(`tests/${t.id}`)}>details</button>
                                </th>
                            </tr>

                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Stack(s)</th>
                            <th>Deadline</th>
                            <th>Created By</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}