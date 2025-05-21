import { PlusIcon, UserIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { Stacks } from "../features/Stacks/page";

export const Settings = () => {


    const router = useRouter()

    return (
        <>
            <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
                <div className="flex justify-between">
                    <h2>Settings</h2>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
                    <Stacks />
                </div>
            </div>

        </>
    )
}