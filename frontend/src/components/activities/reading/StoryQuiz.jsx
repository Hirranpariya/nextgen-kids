import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import Button from '../../ui/Button';

const StoryQuiz = ({ story, onBack, onRestart }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [feedback, setFeedback] = useState('');

    const quiz = story.quiz;
    const totalQuestions = quiz.length;

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: answerIndex
        }));

        const isCorrect = answerIndex === quiz[questionIndex].correctAnswer;
        setFeedback(isCorrect ? 'Correct! 🎉' : 'Try again! 💪');

        setTimeout(() => {
            setFeedback('');
            if (questionIndex < totalQuestions - 1) {
                setCurrentQuestion(questionIndex + 1);
            } else {
                setShowResults(true);
            }
        }, 1500);
    };

    const calculateScore = () => {
        let correct = 0;
        quiz.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                correct++;
            }
        });
        return correct;
    };

    const getScoreMessage = (score) => {
        const percentage = (score / totalQuestions) * 100;
        if (percentage >= 80) return "Excellent! 🌟";
        if (percentage >= 60) return "Good job! 👍";
        return "Keep practicing! 📚";
    };

    if (showResults) {
        const score = calculateScore();
        return (
            <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Button variant="ghost" onClick={onBack}>
                        <ArrowLeft size={16} />
                    </Button>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2D3748' }}>
                        Quiz Results
                    </h2>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: '800',
                        color: score >= totalQuestions * 0.6 ? '#38A169' : '#DD6B20',
                        marginBottom: '1rem'
                    }}>
                        {score}/{totalQuestions}
                    </div>
                    <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.5rem' }}>
                        {getScoreMessage(score)}
                    </p>
                    <p style={{ color: '#718096' }}>
                        You got {score} out of {totalQuestions} questions correct!
                    </p>
                </div>

                {/* Question Review */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2D3748', marginBottom: '1rem' }}>
                        Review Your Answers
                    </h3>
                    {quiz.map((question, index) => {
                        const userAnswer = selectedAnswers[index];
                        const isCorrect = userAnswer === question.correctAnswer;
                        return (
                            <div key={index} style={{
                                background: '#F7FAFC',
                                padding: '1rem',
                                borderRadius: '12px',
                                marginBottom: '1rem',
                                border: `1px solid ${isCorrect ? '#C6F6D5' : '#FED7D7'}`
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    {isCorrect ? (
                                        <CheckCircle size={20} color="#38A169" />
                                    ) : (
                                        <XCircle size={20} color="#E53E3E" />
                                    )}
                                    <span style={{ fontWeight: '600', color: '#2D3748' }}>
                                        Question {index + 1}
                                    </span>
                                </div>
                                <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>{question.question}</p>
                                <p style={{ fontSize: '0.9rem', color: '#718096' }}>
                                    Your answer: <span style={{ fontWeight: '600', color: isCorrect ? '#38A169' : '#E53E3E' }}>
                                        {question.options[userAnswer] || 'Not answered'}
                                    </span>
                                </p>
                                {!isCorrect && (
                                    <p style={{ fontSize: '0.9rem', color: '#38A169' }}>
                                        Correct answer: {question.options[question.correctAnswer]}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Button onClick={onRestart} variant="outline">
                        <RotateCcw size={16} style={{ marginRight: '0.5rem' }} />
                        Listen Again
                    </Button>
                    <Button onClick={onBack} style={{ background: '#DD6B20', color: 'white' }}>
                        Back to Stories
                    </Button>
                </div>
            </div>
        );
    }

    const question = quiz[currentQuestion];

    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Button variant="ghost" onClick={onBack}>
                    <ArrowLeft size={16} />
                </Button>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2D3748' }}>
                        Story Quiz
                    </h2>
                    <p style={{ color: '#718096', fontSize: '0.9rem' }}>
                        Question {currentQuestion + 1} of {totalQuestions}
                    </p>
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2D3748', marginBottom: '1rem' }}>
                    {question.question}
                </h3>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(currentQuestion, index)}
                            disabled={!!feedback}
                            style={{
                                padding: '1rem',
                                border: '2px solid #E2E8F0',
                                borderRadius: '12px',
                                background: 'white',
                                textAlign: 'left',
                                fontSize: '1rem',
                                cursor: feedback ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                opacity: feedback ? 0.6 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!feedback) e.target.style.borderColor = '#DD6B20';
                            }}
                            onMouseLeave={(e) => {
                                if (!feedback) e.target.style.borderColor = '#E2E8F0';
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {feedback && (
                <div style={{
                    textAlign: 'center',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: feedback.includes('Correct') ? '#C6F6D5' : '#FED7D7',
                    color: feedback.includes('Correct') ? '#22543D' : '#742A2A',
                    fontWeight: '600',
                    marginBottom: '1rem'
                }}>
                    {feedback}
                </div>
            )}

            {/* Progress Bar */}
            <div style={{
                width: '100%',
                height: '6px',
                background: '#EDF2F7',
                borderRadius: '3px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
                    height: '100%',
                    background: '#DD6B20',
                    borderRadius: '3px'
                }} />
            </div>
        </div>
    );
};

export default StoryQuiz;