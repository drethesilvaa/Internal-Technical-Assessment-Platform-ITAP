
"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import TestNew from "@/modules/Tests/features/new/page";

export default function TestNewPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
            <TestNew />
        </div>
    </DashboardLayout>)
}
