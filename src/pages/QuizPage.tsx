import { useQuiz } from '../hooks/useQuiz';
import { QuizProgress } from '../components/QuizProgress';
import { QuestionRenderer } from '../components/QuestionRenderer';
import { ResultsScreen } from '../components/ResultsScreen';

export const QuizPage = () => {
    const {
        steps,
        currentStep,
        answers,
        isLoading,
        isComplete,
        validationErrors,
        handleAnswer,
        nextStep,
        prevStep,
        progress,
        currentQuestions,
    } = useQuiz();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p>Loading quiz...</p>
            </div>
        );
    }

    if (isComplete) return <ResultsScreen answers={answers} />;

    return (
        <div className="max-w-md mx-auto p-4 min-h-screen flex flex-col">
            <QuizProgress progress={progress} />

            <div className="mb-4">
                <h2 className="text-xl font-bold">
                    Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.fields.title}
                </h2>
            </div>
            <div className="space-y-6 flex-grow">
                {currentQuestions.map((question : any) => (
                    <div key={question.sys.id}>
                        <QuestionRenderer
                            question={question}
                            onAnswer={(answer) => handleAnswer(question.sys.id, answer)}
                            currentAnswer={answers[question.sys.id]}
                        />
                        {validationErrors[question.sys.id] && (
                            <p className="text-red-500 text-sm mt-1">
                                {validationErrors[question.sys.id]}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="btn px-6 py-2"
                >
                    Previous
                </button>
                <button
                    onClick={nextStep}
                    className="btn btn-primary px-6 py-2"
                >
                    {currentStep === steps.length - 1 ? 'Submit Quiz' : 'Next'}
                </button>
            </div>
        </div>
    );
};