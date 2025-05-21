import { PlusIcon, UserIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export const Settings = () => {


    const router = useRouter()

    return (
        <>
            <div className="flex justify-between">
                <h2>Settings</h2>
            </div>
        </>
    )
}