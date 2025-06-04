import { useQuestionTimerDisplay } from "@/modules/assignment/hooks/useQuestionTimerDisplay";
import { useQuestion } from "@/providers/QuestionProvider";
import { useTest } from "@/providers/TestProvider";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr"
import DOMPurify from 'dompurify';

export const AssignmentLayout = ({ children }: any) => {


    const {
        questions,
        testTemplateName,
        currentQuestionId,
        goNext,
        goPrev,
        jumpToQuestion
    } = useTest();

    const {
        question,
    } = useQuestion();

    const Timer = useQuestionTimerDisplay()

    const safeHtml = DOMPurify.sanitize(question?.content || '');

    return (
        <>
            <div className="min-h-screen h-full bg-gradient-to-r from-[#735e9d] from-10% via-[#a373b5] via-30% to-[#d589c9] to-90%">
                <div className="navbar px-7">
                    <div className="navbar-start uppercase text-white font-bold text-xl">
                        {testTemplateName}
                    </div>

                    <div className="navbar-end gap-2 text-black font-bold text-xl">
                        {Timer}
                    </div>
                </div>
                <div className="grid m-4 h-full shadow bg-white/80  rounded-br-sm rounded-bl-sm">
                    <div className="dock dock-xs relative  text-neutral rounded-tl-sm rounded-tr-sm">
                        <button onClick={() => goPrev()}><CaretLeftIcon /></button>
                        {questions.map((q, i) => (
                            <button onClick={() => { jumpToQuestion(q.id) }} className={`font-semibold ${currentQuestionId === q.id ? "dock-active" : ""}`} key={i}>{i}</button>
                        ))}
                        <button className="font-semibold" onClick={() => goNext()}><CaretRightIcon /></button>
                    </div>

                    <div className="grid lg:grid-cols-2  ">
                        <div className="text-neutral  h-full py-10 px-4 relative">
                            <h2 className="heading-2xl font-semibold">{question?.title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
                        </div>
                        <div className="text-neutral py-10 px-4 flex flex-col justify-between ">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}