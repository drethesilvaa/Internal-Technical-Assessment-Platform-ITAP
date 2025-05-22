import { useAuth } from "@/context/AuthContext";
import { BellIcon, ExamIcon, GearFineIcon, HouseIcon, MagnifyingGlassIcon, QuestionMarkIcon, SignOutIcon, StackIcon, UsersFourIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export const DashboardLayout = ({ children }: any) => {

    const router = useRouter()
    const { logout } = useAuth();


    return (
        <div className="flex min-h-screen h-full">
            <ul className="menu bg-secondary min-h-screen gap-2">
                <li>
                    <a onClick={() => { router.push("/dashboard") }} className="tooltip tooltip-right" data-tip="Home">
                        <HouseIcon size={24} />
                    </a>
                </li>
                <li>
                    <a onClick={() => { router.push("/dashboard/users") }} className="tooltip tooltip-right" data-tip="Users">
                        <UsersFourIcon size={24} />
                    </a>
                </li>
                <li>
                    <a onClick={() => { router.push("/dashboard/test-templates") }} className="tooltip tooltip-right" data-tip="Test Templates">
                        <StackIcon size={24} />
                    </a>
                </li>
                <li>
                    <a onClick={() => { router.push("/dashboard/questions") }} className="tooltip tooltip-right" data-tip="Questions">
                        <QuestionMarkIcon size={24} />
                    </a>
                </li>
                <li>
                    <a onClick={() => { router.push("/dashboard/tests") }} className="tooltip tooltip-right" data-tip="Users Tests">
                        <ExamIcon size={24} />
                    </a>
                </li>
                <li>
                    <a onClick={() => { router.push("/dashboard/settings") }} className="tooltip tooltip-right" data-tip="Settings">
                        <GearFineIcon size={24} />
                    </a>
                </li>
                <li>
                    <a onClick={logout} className="tooltip tooltip-right" data-tip="Sign Out">
                        <SignOutIcon size={24} />
                    </a>
                </li>
            </ul>
            <div className="bg-[#efede8] w-full min-h-screen h-full">
                <div className="navbar bg-transparent">
                    <div className="navbar-start text-neutral ">
                        <a className="btn btn-ghost text-xl">Dashboard</a>
                    </div>

                    <div className="navbar-end gap-2">
                        <button className="btn btn-circle">
                            <MagnifyingGlassIcon size={22} />
                        </button>
                        <button className="btn btn-circle">
                            <div className="indicator">
                                <BellIcon size={22} />
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="py-7 text-neutral px-7">
                    {children}
                </div>
            </div>
        </div>
    )
}