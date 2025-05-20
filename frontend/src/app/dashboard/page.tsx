"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/layouts/DashboardLayout';

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [loading, user]);

    if (loading || !user) return <p>Loading...</p>;

    return (
        <DashboardLayout>
            <div className='card w-96 bg-base-100 card-xs shadow-sm'>
                <h1>Welcome, {user.name}!</h1>
                <p>Your role: {user.role}</p>
            </div>
        </DashboardLayout>
    );
}
