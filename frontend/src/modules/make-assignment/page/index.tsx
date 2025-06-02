import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGetTestInfoByToken } from "../hooks/useGetTestInfoByToken";
import { DateTime } from "luxon";
import { InfoIcon } from "@phosphor-icons/react";

export const MakeAssignment = () => {

    const [token, setToken] = useState('');
    const [ValidToken, setValidToken] = useState('');

    const { data: TestInfo } = useGetTestInfoByToken(ValidToken)

    const { mutate: verifyToken, isPending } = useMutation({
        mutationFn: (values: any) => toast.promise(
            api.post(`/auth/validate-token`, values),
            {
                pending: 'Validating your token ..',
                success: {
                    render({ data }: any) {
                        setValidToken(values.token)
                        return "Your token is valid"
                    }
                },
                error: {
                    render({ data }: any) {
                        return data.response.data.message
                    }
                }
            }
        ),
        onSuccess: () => { },
        onError: () => {

        }
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await verifyToken({ token: token });

    };


    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Make an Assignment</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 rounded-md w-full max-w-lg shrink-0 shadow-2xl text-black">
                    {(ValidToken) ? <>
                        {TestInfo ? (
                            <>
                                <div className="px-8 py-4">
                                    <h2 className="heading-3xl font-bold">Info sobre Teste</h2>
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        <p className="font-semibold">Teste Associado</p>
                                        <p>{TestInfo.template}</p>
                                        <p className="font-semibold">Número de Perguntas</p>
                                        <p>{TestInfo.nQuestions}</p>
                                        <p className="font-semibold">Perguntas Respondidas</p>
                                        <p>{TestInfo.answeredQuestions}</p>
                                        <p className="font-semibold">Criado por</p>
                                        <p>{TestInfo.createdBy}</p>
                                        <p className="font-semibold">Prazo</p>
                                        <p>{new DateTime(TestInfo.deadline).setLocale('pt').toFormat('dd MMMM, yyyy')}</p>
                                        <p className="font-semibold">Total de Tempo</p>
                                        <p>{TestInfo.totalTimeSpent}</p>
                                        <p className="font-semibold">Total de "Tab Switches"</p>
                                        <p>{TestInfo.totalTabSwitches}</p>
                                        <p className="font-semibold">Estado</p>
                                        <p>{TestInfo.status}</p>
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        <button className="btn btn-primary" type="submit" disabled={isPending}>Iniciar Teste</button>
                                        <button className="btn btn-secondary" onClick={() => {
                                            (document.getElementById('dialogTestHelp') as HTMLDialogElement)?.showModal();
                                        }}><InfoIcon size={30} /> </button>
                                        <dialog id="dialogTestHelp" className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>
                                                Test Help
                                                Text

                                            </div>
                                        </dialog>
                                    </div>
                                </div>
                            </>
                        ) :
                            <div className="skeleton h-72"></div>
                        }

                    </> :
                        <form onSubmit={handleSubmit} className="card-body ">
                            <input value={token} className="input" onChange={e => setToken(e.target.value)} placeholder="Token" />
                            <button className="btn" type="submit" disabled={isPending}>Validate Token</button>
                        </form>}

                </div>
            </div>
        </div>

    )
}