export interface QuizQuestion {
    sys: {
        id: string;
    };
    fields: {
        questionText: string;
        questionType: 'multipleChoice' | 'openEnded' | 'scale';
        answerOptions?: string[];
        scaleMin?: number;
        scaleMax?: number;
    };
}

export interface QuizStep {
    sys: {
        id: string;
    };
    fields: {
        title: string;
        questions: QuizQuestion[];
        order: number;
    };
}

export interface QuizResults {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    analysis: {
        [questionId: string]: {
            correct: boolean;
            userAnswer: string;
            correctAnswer?: string;
        };
    };
}