import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Components/Authprovider";
import BaseUrl from "../Components/BaseUrl";

const StudentExam = () => {
    const { videoId } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Helpers
    const styles = {
        container: {
            display: 'flex',
            minHeight: '100vh',
            fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            background: '#121212',
            color: '#e0e0e0'
        },
        sidebar: {
            width: '320px',
            background: '#1e1e1e',
            padding: '25px',
            borderRight: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
            zIndex: 10
        },
        main: {
            flex: 1,
            padding: '40px',
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            borderBottom: '1px solid #333',
            paddingBottom: '20px'
        },
        questionCard: {
            background: '#252525',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            marginBottom: '30px',
            transition: 'transform 0.2s ease',
            border: '1px solid #333'
        },
        optionLabel: {
            display: 'flex',
            alignItems: 'center',
            padding: '15px 20px',
            background: '#2f2f2f',
            borderRadius: '8px',
            cursor: 'pointer',
            border: '2px solid transparent',
            transition: 'all 0.2s ease',
            margin: '0',
            position: 'relative',
            overflow: 'hidden'
        },
        optionSelected: {
            background: 'rgba(40, 167, 69, 0.15)',
            border: '2px solid #28a745',
            boxShadow: '0 0 10px rgba(40, 167, 69, 0.2)'
        },
        button: {
            padding: '12px 25px',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontWeight: '600',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        },
        sidebarButton: {
            width: '100%',
            aspectRatio: '1',
            borderRadius: '8px',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }
    };

    useEffect(() => {
        const fetchExam = async () => {
            try {
                // Fixed API Endpoint to match MainController /video/{videoId}
                const res = await BaseUrl.get(`/video/${videoId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Fetched Exam Data:", res.data);
                setExam(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Exam fetch error:", err);
                setError("Exam not found or failed to load.");
                setLoading(false);
            }
        };
        fetchExam();
    }, [videoId, token]);

    const handleOptionSelect = (questionIndex, optionIndex) => {
        setAnswers({
            ...answers,
            [questionIndex]: optionIndex
        });
    };

    const handleQuestionClick = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleNext = () => {
        if (exam && currentQuestionIndex < exam.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        // Validate all questions answered?
        const unanswseredCount = exam.questions.length - Object.keys(answers).length;
        if (unanswseredCount > 0) {
            if (!window.confirm(`You have ${unanswseredCount} unanswered questions. Are you sure you want to submit?`)) {
                return;
            }
        }

        // Prepare answers list (ordered by question index)
        const answersList = exam.questions.map((_, index) => {
            return answers[index] !== undefined ? answers[index] : null;
        });

        const examId = exam.id || exam.examId || exam._id;
        if (!examId || examId === "undefined") {
            alert("Error: Exam ID is missing. Cannot submit.");
            return;
        }

        try {
            // Updated Endpoint: /<examId>/submit based on MainController
            const res = await BaseUrl.post(
                `/${examId}/submit`,
                { answers: answersList },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Submission Response:", res.data);
            setResult(res.data);
        } catch (err) {
            console.error("Submission error:", err);
            console.log("Falling back to local scoring...");

            // FALLBACK: Local Scoring
            let score = 0;
            exam.questions.forEach((q, index) => {
                const selected = answers[index];
                if (selected === undefined || selected === -1) return;

                let isCorrect = false;
                if (q.correctOptionIndex !== undefined && q.correctOptionIndex !== null) {
                    if (Number(selected) === Number(q.correctOptionIndex)) isCorrect = true;
                } else if (q.correct_option_index !== undefined && q.correct_option_index !== null) {
                    if (Number(selected) === Number(q.correct_option_index)) isCorrect = true;
                } else if (Array.isArray(q.options) && typeof q.options[0] === 'object') {
                    if (q.options[selected] && q.options[selected].correct) isCorrect = true;
                }

                if (isCorrect) score++;
            });

            const isPass = score >= exam.passMarks;

            setResult({
                score: score,
                totalQuestions: exam.questions.length,
                passed: isPass,
                message: "Exam submitted (Local Calculation)"
            });
        }
    };

    if (loading) return <div style={{ padding: '20px', color: 'white', background: '#121212', minHeight: '100vh' }}>Loading Exam...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red', background: '#121212', minHeight: '100vh' }}>{error}</div>;
    if (!exam || !exam.questions) return <div style={{ padding: '20px', color: 'white', background: '#121212', minHeight: '100vh' }}>No questions found in this exam.</div>;

    // RESULTS VIEW
    if (result) {
        return (
            <div style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ ...styles.questionCard, textAlign: 'center', maxWidth: '500px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#fff' }}>Exam Results</h2>
                    <div style={{ fontSize: '1.2rem', marginBottom: '30px', lineHeight: '1.8' }}>
                        <p>Total Questions: <strong>{result.totalQuestions || exam.questions.length}</strong></p>
                        <p>Your Score: <strong style={{ color: '#28a745', fontSize: '1.5em' }}>{result.score}</strong></p>
                        <p>Status: <strong style={{ color: result.passed ? '#28a745' : '#dc3545' }}>{result.passed ? "PASSED" : "FAILED"}</strong></p>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ ...styles.button, background: '#007bff', color: 'white', width: '100%' }}
                    >
                        Return to Course
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = exam.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h3 style={{ marginBottom: '25px', textAlign: 'center', color: '#fff', borderBottom: '2px solid #28a745', paddingBottom: '10px' }}>
                    Questions
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                    {exam.questions.map((_, index) => {
                        const isAnswered = answers[index] !== undefined;
                        const isCurrent = currentQuestionIndex === index;
                        let bg = '#3a3a3a';
                        let border = '2px solid transparent';

                        if (isAnswered) bg = 'linear-gradient(145deg, #28a745, #218838)';
                        if (isCurrent) {
                            border = '2px solid #5da9f5';
                            if (!isAnswered) bg = '#4a4a4a';
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleQuestionClick(index)}
                                style={{
                                    ...styles.sidebarButton,
                                    background: bg,
                                    border: border,
                                    transform: isCurrent ? 'scale(1.1)' : 'scale(1)'
                                }}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Area */}
            <div style={styles.main}>
                <div style={styles.header}>
                    <div></div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.9rem', color: '#888', display: 'block' }}>Question</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
                            {currentQuestionIndex + 1} <span style={{ fontSize: '1rem', color: '#666' }}>/ {exam.questions.length}</span>
                        </span>
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '2rem', margin: '0 0 10px 0', color: '#fff' }}>{exam.examName}</h2>
                </div>

                <div style={styles.questionCard}>
                    <p style={{ fontSize: '1.3em', lineHeight: '1.6', marginBottom: '25px', fontWeight: '500' }}>
                        <span style={{ color: '#5da9f5', marginRight: '10px' }}>Q{currentQuestionIndex + 1}.</span>
                        {currentQuestion.questionText}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {currentQuestion.options.map((opt, optIndex) => {
                            const isSelected = answers[currentQuestionIndex] === optIndex;
                            return (
                                <label
                                    key={optIndex}
                                    style={{
                                        ...styles.optionLabel,
                                        ...(isSelected ? styles.optionSelected : {}),
                                    }}
                                >
                                    <div style={{
                                        minWidth: '24px', height: '24px', borderRadius: '50%',
                                        border: isSelected ? '6px solid #28a745' : '2px solid #666',
                                        marginRight: '15px', background: isSelected ? 'white' : 'transparent'
                                    }}></div>
                                    <input
                                        type="radio"
                                        checked={isSelected}
                                        onChange={() => handleOptionSelect(currentQuestionIndex, optIndex)}
                                        style={{ display: 'none' }}
                                    />
                                    <span style={{ fontSize: '1.1em', flex: 1 }}>{opt}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '20px' }}>
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        style={{
                            ...styles.button,
                            background: currentQuestionIndex === 0 ? '#333' : '#444',
                            color: currentQuestionIndex === 0 ? '#666' : 'white',
                            cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Previous
                    </button>

                    {isLastQuestion ? (
                        <button
                            onClick={handleSubmit}
                            style={{ ...styles.button, background: '#16a34a', color: 'white', fontSize: '1.1rem' }}
                        >
                            Submit Exam
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            style={{ ...styles.button, background: '#007bff', color: 'white' }}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentExam;