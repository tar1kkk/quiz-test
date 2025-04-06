import { QuizQuestion } from '../types/quiz';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { OpenEndedQuestion } from './OpenEndedQuestion';
import { ScaleQuestion } from './ScaleQuestion';

export const QuestionRenderer = ({
                                     question,
                                     onAnswer,
                                     currentAnswer,
                                 }: {
    question: QuizQuestion;
    onAnswer: (answer: string) => void;
    currentAnswer: string;
}) => {
    switch (question.fields.questionType) {
        case 'multipleChoice':
            return (
                <MultipleChoiceQuestion
                    question={question}
                    onAnswer={onAnswer}
                    currentAnswer={currentAnswer}
                />
            );
        case 'openEnded':
            return (
                <OpenEndedQuestion
                    question={question}
                    onAnswer={onAnswer}
                    currentAnswer={currentAnswer}
                />
            );
        case 'scale':
            return (
                <ScaleQuestion
                    question={question}
                    onAnswer={onAnswer}
                    currentAnswer={currentAnswer}
                />
            );
        default:
            return <div>Unsupported question type</div>;
    }
};