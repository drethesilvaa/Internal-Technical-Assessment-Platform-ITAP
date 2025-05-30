"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Tests } from "@/modules/Tests/page";

export default function TestPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
            <Tests />
        </div>
    </DashboardLayout>)
}
