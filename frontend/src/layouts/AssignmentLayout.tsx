import { BellIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"

export const AssignmentLayout = ({ children }: any) => {

    return (
        <>
            <div className="navbar px-7 bg-transparent">
                <div className="navbar-start text-neutral ">
                    Test
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
            <div className="flex min-h-screen h-full gap-4">

                {/* Test Recap */}
                <div></div>

                {/* Active Question */}
                <div></div>

            </div>
        </>

    )
}