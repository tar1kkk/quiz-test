import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-8">Welcome to the Quiz App</h1>
            <p className="text-lg mb-8 text-center max-w-md">
                Test your knowledge with our interactive quiz. The quiz contains multiple steps with different types of questions.
            </p>
            <Link
                to="/quiz"
                className="btn btn-primary px-8 py-3 text-lg"
            >
                Start Quiz
            </Link>
        </div>
    );
};