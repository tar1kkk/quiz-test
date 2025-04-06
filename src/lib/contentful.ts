import { createClient } from 'contentful';

const client = createClient({
    //@ts-ignore
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    //@ts-ignore
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export async function getQuizSteps() {
    try {
        const entries = await client.getEntries({
            content_type: 'quizStep',
            //@ts-ignore
            order: 'fields.order',
        });
        return entries.items;
    } catch (error) {
        console.error('Error fetching quiz steps:', error);
        throw error;
    }
}

export async function getQuestions(questionIds: string[]) {
    try {
        //@ts-ignore
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

export default {
    getQuizSteps,
    getQuestions,
};