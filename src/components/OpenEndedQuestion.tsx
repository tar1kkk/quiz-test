import { QuizQuestion } from '../types/quiz';

export const OpenEndedQuestion = ({
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
            <textarea
                value={currentAnswer || ''}
                onChange={(e) => onAnswer(e.target.value)}
                className="w-full p-2 border rounded"
                rows={4}
            />
        </div>
    );
};