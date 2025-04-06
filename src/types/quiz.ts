import { Entry, EntrySkeletonType } from 'contentful';

export interface QuizQuestionFields {
    questionText: string;
    questionType: 'multipleChoice' | 'openEnded' | 'scale';
    answerOptions?: string[];
    scaleMin?: number;
    scaleMax?: number;
    correctAnswer?: string;
}

export interface QuizQuestion extends EntrySkeletonType {
    contentTypeId: 'quizQuestion';
    fields: QuizQuestionFields;
}

export interface QuizStepFields {
    title: string;
    order: number;
    questions: Entry<QuizQuestion>[];
}

export interface QuizStep extends EntrySkeletonType {
    contentTypeId: 'quizStep';
    fields: QuizStepFields;
}

export interface QuizResults {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    analysis: Record<string, {
        correct: boolean;
        userAnswer: string;
        correctAnswer: string;
    }>;
}