"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { TestTemplates } from "@/modules/Test-Templates/page";

export default function TestTemplatesPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
            <TestTemplates />
        </div>
    </DashboardLayout>)
}
