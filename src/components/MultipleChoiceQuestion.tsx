import { QuizQuestion } from '../types/quiz';

export const MultipleChoiceQuestion = ({
                                           question,
                                           onAnswer,
                                           currentAnswer,
                                       }: {
    question: QuizQuestion;
    onAnswer: (answer: string) => void;
    currentAnswer: string;
}) => {
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-medium">{question.fields.questionText}</h3>
            <div className="space-y-2">
                {question.fields.answerOptions?.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            //@ts-ignore
                            name={question.sys.id}
                            value={option}
                            checked={currentAnswer === option}
                            onChange={() => onAnswer(option)}
                            className="h-4 w-4"
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};