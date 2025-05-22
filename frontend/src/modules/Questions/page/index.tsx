import { PlusIcon, UserIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useGetQuestions } from "../hooks/useGetQuestions";

export const Questions = () => {

    const { data: questions, isLoading, isError } = useGetQuestions();

    const router = useRouter()

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load questions</p>;

    return (
        <>
            <div className="flex justify-between">
                <h2>Questions</h2>
                <button className="btn btn-primary" onClick={() => router.push("questions/new")}>New Question <PlusIcon size={22} /></button>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Stack</th>
                            <th>Difficulty</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((t: any, k: number) => (
                            <tr key={k}>
                                <td>{t.title}</td>
                                <td>
                                    {t.type}
                                    {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                </td>
                                <td>{t.stack?.name}</td>
                                <td>{t.difficulty}</td>
                                <td>{t.points}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs" onClick={() => router.push(`questions/edit/${t.id}`)}>details</button>
                                </th>
                            </tr>

                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Stack</th>
                            <th>Difficulty</th>
                            <th>Points</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}