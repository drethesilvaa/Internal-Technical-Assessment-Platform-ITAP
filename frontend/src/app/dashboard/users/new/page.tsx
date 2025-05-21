"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { UsersNew } from "@/modules/Users/features/new/page";

export default function UsersNewPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
            <UsersNew />
        </div>
    </DashboardLayout>)
}
