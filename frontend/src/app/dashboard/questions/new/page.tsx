"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import NewQuestion from "@/modules/Questions/features/new/page";

export default function QuestionsNewPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
           <NewQuestion />
        </div>
    </DashboardLayout>)
}
