import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { unAuthApi } from '@/utils/unAuthApi';

interface QuestionStatus {
    id: string;
    answered: boolean;
}

interface TestContextType {
    assignmentToken: string | null;
    testResultId: string | null;
    testTemplateName: string | null;
    questions: QuestionStatus[];
    currentQuestionId: string | null;
    currentIndex: number;
    loading: boolean;
    error: string | null;
    

    startOrResumeTest: (token: string) => Promise<void>;
    goNext: () => void;
    goPrev: () => void;
    jumpToQuestion: (id: string) => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider = ({ children }: { children: ReactNode }) => {
    const [assignmentToken, setAssignmentToken] = useState<string | null>(null);
    const [testTemplateName, setTestTemplateName] = useState<string | null>(null);
    const [testResultId, setTestResultId] = useState<string | null>(null);
    const [questions, setQuestions] = useState<QuestionStatus[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const currentQuestionId = questions.length > 0 ? questions[currentIndex]?.id : null;

    const startOrResumeTest = async (token: string) => {
        setLoading(true);
        setError(null);
        setAssignmentToken(token);

        try {
            const res = await unAuthApi.get(`/test/${token}`, {
                headers: { 'x-candidate-token': token }
            });

            const { testResultId, questions: qs, testName } = res.data;

            setTestResultId(testResultId);
            setTestTemplateName(testName)
            setQuestions(qs);

            const firstUnansweredIndex = qs.findIndex((q: any) => !q.answered);
            setCurrentIndex(firstUnansweredIndex >= 0 ? firstUnansweredIndex : 0);
        } catch (e) {
            setError('Failed to load test status');
            setQuestions([]);
            setTestResultId(null);
            setCurrentIndex(0);
        } finally {
            setLoading(false);
        }
    };

    const goNext = () => {
        if (questions.length === 0) return;

        let nextIndex = currentIndex + 1;
        if (nextIndex >= questions.length) nextIndex = 0;

        setCurrentIndex(nextIndex);
    };

    const goPrev = () => {
        if (questions.length === 0) return;

        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = questions.length - 1;

        setCurrentIndex(prevIndex);
    };

    const jumpToQuestion = (id: string) => {
        const idx = questions.findIndex(q => q.id === id);
        if (idx !== -1) setCurrentIndex(idx);
    };

    return (
        <TestContext.Provider
            value={{
                assignmentToken,
                testResultId,
                questions,
                currentQuestionId,
                currentIndex,
                loading,
                error,
                startOrResumeTest,
                goNext,
                goPrev,
                jumpToQuestion,
                testTemplateName,
            }}
        >
            {children}
        </TestContext.Provider>
    );
};

export const useTest = () => {
    const ctx = useContext(TestContext);
    if (!ctx) throw new Error('useTest must be used within TestProvider');
    return ctx;
};
