import { PlusIcon, UserIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useGetPointsConfig } from "../hooks/useGetPointsConfig";
import { usePostPointsConfig } from "../hooks/usePostPointsConfigs";
import { useState } from "react";
import { usePatchPointsConfig } from "../hooks/usePatchPointsConfig";
import { PointsConfigForm } from "../components/PointsConfigForm";

export interface PointsConfig {
    id?: string
    level: string
    minQuestions: number
    totalPoints: number
}

export const PointsConfig = () => {

    const { data: pointsConfig, isLoading, isError, refetch } = useGetPointsConfig();

    const { mutate: createPointsConfig, isPending: isCreating } = usePostPointsConfig(refetch);
    const { mutate: updatePointsConfig, isPending: isUpdating } = usePatchPointsConfig(refetch);

    const [editMode, setEditMode] = useState(false);
    const [selectedConfig, setSelectedConfig] = useState<PointsConfig | null>(null);

    const openCreateModal = () => {
        setEditMode(false);
        setSelectedConfig(null);
        (document.getElementById('dialogCreatePointsConfig') as HTMLDialogElement)?.showModal();
    };

    const openEditModal = (config: PointsConfig) => {
        setEditMode(true);
        setSelectedConfig(config);
        (document.getElementById('dialogCreatePointsConfig') as HTMLDialogElement)?.showModal();
    };

    const router = useRouter()

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load points config</p>;

    return (
        <>
            <div className="flex justify-between">
                <h2>Points Config</h2>
                <button className="btn btn-primary" onClick={openCreateModal}>
                    New Config <PlusIcon size={22} />
                </button>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nivel</th>
                            <th>Total de Pontos</th>
                            <th>Minimo de Questões</th>
                            <th>Facil</th>
                            <th>Médio</th>
                            <th>Dificil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pointsConfig.map((p: any, k: number) => (
                            <tr key={k} className="cursor-pointer hover:bg-base-200" onClick={() => openEditModal(p)}>
                                <td>
                                    {p.level}
                                </td>
                                <td>
                                    {p.totalPoints}
                                </td>
                                <td>
                                    {p.minQuestions}
                                </td>
                                <td>
                                    {p.easyQuestionsPercentage}
                                </td>
                                <td>
                                    {p.mediumQuestionsPercentage}
                                </td>
                                <td>
                                    {p.hardQuestionsPercentage}
                                </td>
                            </tr>

                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Nivel</th>
                            <th>Total de Pontos</th>
                            <th>Minimo de Questões</th>
                            <th>Facil</th>
                            <th>Médio</th>
                            <th>Dificil</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <dialog id="dialogCreatePointsConfig" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <PointsConfigForm
                        mode={editMode ? 'edit' : 'create'}
                        isPending={editMode ? isUpdating : isCreating}
                        initialValues={selectedConfig?.id ? { ...selectedConfig } : {
                            level: "",
                            minQuestions: 0,
                            totalPoints: 0
                        }}
                        onSubmit={(values: PointsConfig) => {
                            if (editMode && selectedConfig) {
                                updatePointsConfig({ ...values });
                            } else {
                                createPointsConfig(values);
                            }
                        }}
                    // onDelete={
                    //     editMode && selectedStack
                    //         ? () => {
                    //             deleteStack(selectedStack.id, {
                    //                 onSuccess: () => {
                    //                     document.getElementById('dialogCreateStack')?.close();
                    //                     alert('Stack deleted!');
                    //                 },
                    //             });
                    //         }
                    //         : undefined
                    // }
                    />
                </div>
            </dialog>

        </>
    )
}