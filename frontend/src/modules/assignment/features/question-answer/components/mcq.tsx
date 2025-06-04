import { useQuestion } from "@/providers/QuestionProvider";
import { useState } from "react";

export const QuestionAnswerMcq = () => {
    const { questionAnswerOptions, submitAnswer, question } = useQuestion();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedId) return alert("Please select an answer.");
        submitAnswer?.(selectedId);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {questionAnswerOptions?.map((ao, index) => {
                const letter = String.fromCharCode(97 + index); // 97 = 'a'
                return (
                    <label
                        key={ao.id}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="mcq-option"
                            className="radio radio-md"
                            value={ao.id}
                            checked={selectedId === ao.id}
                            onChange={() => setSelectedId(ao.id)}
                        />
                        <span>
                            {letter}) {ao.text}
                        </span>
                    </label>
                );
            })}

            <button
                type="submit"
                className="btn btn-primary mt-4"
                disabled={!selectedId}
            >
                Submit
            </button>
        </form>
    );
};
