import { useState, useEffect } from 'react';
import { QuizStep, QuizQuestion } from '../types/quiz';
import { getQuizSteps, getQuestions } from '../lib/contentful';

export function useQuiz() {
    const [steps, setSteps] = useState<QuizStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isComplete, setIsComplete] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const loadQuiz = async () => {
            try {
                const stepsData = await getQuizSteps();
                const stepsWithQuestions = await Promise.all(
                    stepsData.map(async (step) => {
                        const questions = await getQuestions(step.fields.questions.map(q => q.sys.id));
                        return { ...step.fields, questions };
                    })
                );
                setSteps(stepsWithQuestions);
            } catch (error) {
                console.error('Error loading quiz:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadQuiz();
    }, []);

    const validateCurrentStep = () => {
        const errors: Record<string, string> = {};
        const currentQuestions = steps[currentStep]?.questions || [];

        currentQuestions.forEach(question => {
            if (!answers[question.sys.id] && question.fields.questionType !== 'scale') {
                errors[question.sys.id] = 'This question is required';
            }
        });

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAnswer = (questionId: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
        if (validationErrors[questionId]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[questionId];
                return newErrors;
            });
        }
    };

    const nextStep = () => {
        if (!validateCurrentStep()) return;

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsComplete(true);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return {
        steps,
        currentStep,
        answers,
        isLoading,
        isComplete,
        validationErrors,
        handleAnswer,
        nextStep,
        prevStep,
        progress: steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0,
        currentQuestions: steps[currentStep]?.questions || [],
    };
}