"use client";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Settings } from "@/modules/Settings/page";

export default function SettingsPage() {
    return (<DashboardLayout>
        <div className='card w-full bg-base-100 card-xs shadow-sm p-4'>
            <Settings />
        </div>
    </DashboardLayout>)
}
