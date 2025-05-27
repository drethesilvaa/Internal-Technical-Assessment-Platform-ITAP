"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import EditTemplatePage from "@/modules/Test-Templates/features/edit/page";

export default function TestTemplateEditPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
            <EditTemplatePage />
        </div>
    </DashboardLayout>)
}
