"use client";

import Assignment from "@/modules/assignment/pages";
import { QuestionProvider } from "@/providers/QuestionProvider";
import { TestProvider } from "@/providers/TestProvider";
import { useParams } from "next/navigation";

export default function AssignmentPage() {
    const { token } = useParams();

    if (!token) return <div>Invalid token</div>;
    
    return (<TestProvider >
        <QuestionProvider token={token as string}  >
            <Assignment />
        </QuestionProvider>
    </TestProvider>)
}
