import { unAuthApi } from '@/utils/unAuthApi';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Question {
    id: string;
    title: string;
    content: string;
    type: string;
}

interface QuestionContextType {
    question: Question | null;
    questionResultId: string | null;
    elapsed: number;
    loadQuestion: (assignmentToken: string, questionId: string) => Promise<void>;
    error: string | null;
    submitAnswer: (answer: string) => Promise<void>;
    token: string;
}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export const QuestionProvider = ({ children, token }: { token: string, children: ReactNode }) => {
    const [question, setQuestion] = useState<Question | null>(null);
    const [questionResultId, setQuestionResultId] = useState<string | null>(null);
    const [elapsed, setElapsed] = useState(0);
    const [error, setError] = useState<string | null>(null);


    const secondsRef = React.useRef(0);
    const lastSavedRef = React.useRef(Date.now());
    const [isVisible, setIsVisible] = useState(true);

    const loadQuestion = async (assignmentToken: string, questionId: string) => {
        try {
            setError(null);
            const res = await unAuthApi.get(`/test/question/${questionId}`, {
                params: { assignmentToken },
                headers: { 'x-candidate-token': assignmentToken }
            });
            setQuestion(res.data.question);
            setQuestionResultId(res.data.questionResultId);


            const timeRes = await unAuthApi.get(`/test/question-result/${res.data.questionResultId}/time`,
                {
                    headers: { 'x-candidate-token': assignmentToken }
                }
            );
            setElapsed(timeRes.data.timeSpent);

            secondsRef.current = 0;
            lastSavedRef.current = Date.now();
        } catch (e) {
            setError('Failed to load question');
            setQuestion(null);
            setQuestionResultId(null);
        }
    };

    const submitAnswer = async (answer: string) => {
        if (!questionResultId || !question) {
            setError('No question loaded');
            return;
        }
        try {
            await unAuthApi.post('/submit-answer', {
                testId: questionResultId, // **Note**: your current backend expects testId (TestResult id), but QuestionResult id is different. Adjust accordingly.
                questionId: question.id,
                answer,
                timeSpent: elapsed, // or 0 if no timer
                headers: { 'x-candidate-token': token }
            });
            // On success, you may want to update UI or notify parent TestProvider to mark question as answered
        } catch {
            setError('Failed to submit answer');
        }
    };


    useEffect(() => {
        const handleVisibility = () => {
            const visible = !document.hidden;
            setIsVisible(visible);

            if (!visible && questionResultId) {
                unAuthApi.patch(`/test/question-result/${questionResultId}/time`, {
                    seconds: secondsRef.current,
                    tabSwitch: true,
                }, { headers: { 'x-candidate-token': token } });
                setElapsed((prev) => prev + secondsRef.current);
                secondsRef.current = 0;
                lastSavedRef.current = Date.now();
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, [questionResultId]);

    // Timer interval
    useEffect(() => {
        if (!questionResultId) return;

        const interval = setInterval(() => {
            if (isVisible) {
                secondsRef.current += 1;
                setElapsed((prev) => prev + 1);
            }

            const now = Date.now();
            if ((now - lastSavedRef.current) / 1000 >= 10 && secondsRef.current > 0) {
                unAuthApi.patch(`/test/question-result/${questionResultId}/time`, {
                    seconds: secondsRef.current,

                }, { headers: { 'x-candidate-token': token } });
                secondsRef.current = 0;
                lastSavedRef.current = now;
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isVisible, questionResultId]);

    return (
        <QuestionContext.Provider
            value={{ question, questionResultId, elapsed, loadQuestion, error, submitAnswer, token }}
        >
            {children}
        </QuestionContext.Provider>
    );
};


export const useQuestion = () => {
    const context = useContext(QuestionContext);
    if (!context) throw new Error('useQuestion must be used within a QuestionProvider');
    return context;
};
