import * as algoliasearch from 'algoliasearch/lite';

const client = algoliasearch.default(
    process.env.VITE_ALGOLIA_APP_ID as string,
    process.env.VITE_ALGOLIA_SEARCH_KEY as string
);

const index = client.initIndex('quiz_results');

export async function saveQuizResults(results: any) {
    return index.saveObject({
        objectID: Date.now().toString(),
        ...results,
        timestamp: new Date().toISOString(),
    });
}

export async function processQuizResults(answers: Record<string, string>) {
    // Реальная логика обработки результатов
    return {
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
}