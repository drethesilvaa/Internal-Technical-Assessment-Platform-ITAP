import { useQuestion } from "@/providers/QuestionProvider";
import { QuestionAnswerMcq } from "../components/mcq";
import { QuestionAnswerCode } from "../components/code";
import { QuestionAnswerOpenText } from "../components/openText";

export const AssignmentQuestionAnswer = () => {
    const {
        question,
        error: questionError,
        loadQuestion,
        submitAnswer,
        token,
    } = useQuestion();


    switch (question?.type) {
        case "mcq":
            return <QuestionAnswerMcq />
            break;
        case "code":
            return <QuestionAnswerCode />
            break;
        case "text":
            return <QuestionAnswerOpenText />
            break;
        default:
            return <></>
            break;
    }
}