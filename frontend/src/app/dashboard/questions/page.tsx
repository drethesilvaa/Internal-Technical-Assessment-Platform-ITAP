"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Questions } from "@/modules/Questions/page";

export default function QuestionsPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
            <Questions />
        </div>
    </DashboardLayout>)
}
