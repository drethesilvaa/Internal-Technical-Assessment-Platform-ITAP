import { useAuth } from "@/context/AuthContext";
import { BellIcon, HouseIcon, MagnifyingGlassIcon, SignOutIcon, UsersFourIcon } from "@phosphor-icons/react";

export const DashboardLayout = ({ children }: any) => {

    const { logout } = useAuth();


    return (
        <div className="flex h-screen">
            <ul className="menu bg-secondary h-full gap-2">
                <li>
                    <a href="/dashboard" className="tooltip tooltip-right" data-tip="Home">
                        <HouseIcon size={24} />
                    </a>
                </li><li>
                    <a href="/dashboard/users" className="tooltip tooltip-right" data-tip="Users">
                        <UsersFourIcon size={24} />
                    </a>
                </li>
                <li>
                    <a onClick={logout} className="tooltip tooltip-right" data-tip="Sign Out">
                        <SignOutIcon size={24} />
                    </a>
                </li>
            </ul>
            <div className="bg-[#efede8] w-full h-full">
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