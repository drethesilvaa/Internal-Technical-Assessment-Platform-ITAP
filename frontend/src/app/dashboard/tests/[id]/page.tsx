
"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import EditTestPage from "@/modules/Tests/features/edit/page";

export default function TestEditPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
            <EditTestPage />
        </div>
    </DashboardLayout>)
}
