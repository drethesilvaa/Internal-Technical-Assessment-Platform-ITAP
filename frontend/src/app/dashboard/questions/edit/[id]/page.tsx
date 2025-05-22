"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import EditQuestion from "@/modules/Questions/features/edit/page";

export default function QuestionsEditPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
           <EditQuestion />
        </div>
    </DashboardLayout>)
}
