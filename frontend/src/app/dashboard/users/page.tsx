"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Users } from "@/modules/Users/page";

export default function UsersPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
            <Users />
        </div>
    </DashboardLayout>)
}
