"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import TestTemplateNew from "@/modules/Test-Templates/features/new/page";

export default function TestTemplateNewPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
            <TestTemplateNew />
        </div>
    </DashboardLayout>)
}
