import { createClient } from 'contentful';

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

// Получение всех шагов квиза
export async function getQuizSteps() {
    try {
        const entries = await client.getEntries({
            content_type: 'quizStep',
            order: 'fields.order',
        });
        return entries.items;
    } catch (error) {
        console.error('Error fetching quiz steps:', error);
        throw error;
    }
}

// Получение конкретных вопросов по их ID
export async function getQuestions(questionIds: string[]) {
    try {
        const entries = await client.getEntries({
            content_type: 'quizQuestion',
            'sys.id[in]': questionIds.join(','),
        });
        return entries.items;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}

// Экспортируем все необходимые функции
export default {
    getQuizSteps,
    getQuestions,
};