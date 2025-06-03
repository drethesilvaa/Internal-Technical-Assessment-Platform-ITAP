'use client';

import { useQuestion } from '@/providers/QuestionProvider';
import { useTest } from '@/providers/TestProvider';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuestionTimerDisplay } from '../hooks/useQuestionTimerDisplay';


export default function Assignment() {
    const {
        startOrResumeTest,
        currentQuestionId,
        goNext,
        goPrev,
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

    const Timer = useQuestionTimerDisplay()

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
        goNext(); // move to next question after submit
    };

    if (loading) return <div>Loading test...</div>;
    if (error) return <div>Error: {error}</div>;
    if (questionError) return <div>Error loading question: {questionError}</div>;

    if (!question) return <div>No question loaded</div>;

    return (
        <div>
            <h3>{question.title}</h3>
            <div>{question.content}</div>
            {Timer}
            {/* Simple input for answer example */}
            <input
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
            />

            <button onClick={handleSubmit}>Submit Answer</button>

            <button onClick={goPrev}>Previous</button>
            <button onClick={goNext}>Next</button>
        </div>
    );
}
