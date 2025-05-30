"use client";

import Assignment from "@/modules/assignment/pages";
import { QuestionProvider } from "@/providers/QuestionProvider";

export default function AssignmentPage() {
    return (<QuestionProvider>
        <Assignment />
    </QuestionProvider>)
}
