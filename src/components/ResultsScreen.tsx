import { useEffect, useState } from 'react';
import { QuizResults } from '../types/quiz';
import { processQuizResults } from '../lib/algolia';

export const ResultsScreen = ({ answers }: { answers: Record<string, string> }) => {
    const [results, setResults] = useState<QuizResults | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const processResults = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockResults: QuizResults = {
                score: 85,
                correctAnswers: 17,
                totalQuestions: 20,
                analysis: Object.fromEntries(
                    Object.entries(answers).map(([id, answer]) => [
                        id,
                        {
                            correct: Math.random() > 0.3,
                            userAnswer: answer,
                            correctAnswer: `Sample correct answer for ${id}`,
                        },
                    ])
                ),
            };

            setResults(mockResults);
            setIsLoading(false);
        };

        processResults();
    }, [answers]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p>Processing your results...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Your Quiz Results</h2>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-blue-600">{results?.score}%</div>
                        <div className="text-gray-600">Overall Score</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold">
                            {results?.correctAnswers}/{results?.totalQuestions}
                        </div>
                        <div className="text-gray-600">Correct Answers</div>
                    </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                        className="bg-blue-600 h-4 rounded-full"
                        style={{ width: `${results?.score}%` }}
                    ></div>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Detailed Analysis</h3>
            <div className="space-y-4">
                {results && Object.entries(results.analysis).map(([questionId, analysis]) => (
                    <div
                        key={questionId}
                        className={`p-4 border rounded ${
                            analysis.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                        }`}
                    >
                        <div className="font-medium mb-2">Question {questionId.slice(0, 4)}</div>
                        <div className="mb-1">
                            <span className="font-semibold">Your answer:</span> {analysis.userAnswer}
                        </div>
                        {!analysis.correct && (
                            <div>
                                <span className="font-semibold">Correct answer:</span> {analysis.correctAnswer}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={() => window.location.reload()}
                    className="btn btn-primary px-6 py-2"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};