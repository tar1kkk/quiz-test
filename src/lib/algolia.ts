// import algoliasearch from 'algoliasearch/lite';
//
// const client = algoliasearch(
//     import.meta.env.VITE_ALGOLIA_APP_ID,
//     import.meta.env.VITE_ALGOLIA_SEARCH_KEY
// );
// const index = client.initIndex('quiz_results');
//
// interface QuizResult {
//     objectID: string;
//     userId: string;
//     timestamp: string;
//     answers: Record<string, string>;
//     score: number;
//     correctAnswers: number;
//     totalQuestions: number;
// }
//
// export async function processQuizResults(answers: Record<string, string>): Promise<QuizResult> {
//
//     const result: QuizResult = {
//         objectID: Date.now().toString(),
//         userId: 'anonymous', // In a real app, use actual user ID
//         timestamp: new Date().toISOString(),
//         answers,
//         score: Math.floor(Math.random() * 30) + 70, // Mock score 70-100%
//         correctAnswers: Math.floor(Object.keys(answers).length * 0.7), // Mock 70% correct
//         totalQuestions: Object.keys(answers).length,
//     };
//
//
//     return result;
// }
//
// export async function getAverageResults(): Promise<{
//     averageScore: number;
//     totalAttempts: number;
// }> {
//     return {
//         averageScore: 75,
//         totalAttempts: 1243,
//     };
// }