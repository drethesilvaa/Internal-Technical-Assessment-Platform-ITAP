"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import UsersEdit from "@/modules/Users/features/edit/page";
import { UsersNew } from "@/modules/Users/features/new/page";

export default function UsersEditPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
            <UsersEdit />
        </div>
    </DashboardLayout>)
}
