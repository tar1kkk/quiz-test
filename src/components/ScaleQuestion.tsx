import { QuizQuestion } from '../types/quiz';

export const ScaleQuestion = ({
                                  question,
                                  onAnswer,
                                  currentAnswer,
                              }: {
    question: QuizQuestion;
    onAnswer: (answer: string) => void;
    currentAnswer: string;
}) => {
    const min = question.fields.scaleMin || 1;
    const max = question.fields.scaleMax || 10;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">{question.fields.questionText}</h3>
            <div className="flex items-center justify-between">
                <span>{min}</span>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={currentAnswer || min}
                    onChange={(e) => onAnswer(e.target.value)}
                    className="w-full mx-4"
                />
                <span>{max}</span>
            </div>
            <div className="text-center font-medium">
                Selected: {currentAnswer || min}
            </div>
        </div>
    );
};