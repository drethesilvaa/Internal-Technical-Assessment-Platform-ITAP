'use client';

import { useQuestion } from '@/providers/QuestionProvider';
import { useTest } from '@/providers/TestProvider';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuestionTimerDisplay } from '../hooks/useQuestionTimerDisplay';
import { AssignmentLayout } from '@/layouts/AssignmentLayout';
import { AssignmentQuestionAnswer } from '../features/question-answer/pages';


export default function Assignment() {
    const {
        startOrResumeTest,
        currentQuestionId,
        goNext,
        loading,
        error,
    } = useTest();

    const {
        question,
        error: questionError,
        loadQuestion,
        submitAnswer,
        token,
    } = useQuestion();

    const [userAnswer, setUserAnswer] = useState('');

    useEffect(() => {
        startOrResumeTest(token);
    }, [token]);

    useEffect(() => {
        if (currentQuestionId) {
            loadQuestion(token, currentQuestionId);
            setUserAnswer('');
        }
    }, [currentQuestionId, token]);

    const handleSubmit = async () => {
        await submitAnswer(userAnswer);
        goNext();
    };

    if (loading) return <div>Loading test...</div>;
    if (error) return <div>Error: {error}</div>;
    if (questionError) return <div>Error loading question: {questionError}</div>;

    if (!question) return <div>No question loaded</div>;

    return (
        <AssignmentLayout>
            <AssignmentQuestionAnswer />
        </AssignmentLayout>
    );
}
