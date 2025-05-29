'use client';

import { useParams, useRouter } from 'next/navigation';


export default function Assignment() {
    const { token } = useParams();
    const router = useRouter();
    const AssignmentToken = token as string;

    return <></>
}
