import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "../Components/Authprovider";
import BaseUrl from "../Components/BaseUrl";
import { 
    ChevronLeft, 
    ChevronRight, 
    Trash2, 
    Layout, 
    Award, 
    Clock, 
    CheckCircle2,
    BookOpen
} from "lucide-react";
import "../AdminStyles/AdminViewExam.css";

const AdminViewExam = () => {
    const { videoId } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const res = await BaseUrl.get(`/video/${videoId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setExam(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Exam fetch failed:", err);
                setError("Exam not found or failed to load.");
                setLoading(false);
            }
        };
        fetchExam();
    }, [videoId, token]);

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

    if (loading) return (
        <div className="ave-viewport" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className="ave-status-spinner"></div>
            <p>Loading Exam Assets...</p>
        </div>
    );

    if (error) return (
        <div className="ave-viewport" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className="ave-error-card">
                <h3>System Error</h3>
                <p>{error}</p>
                <button className="back-btn" onClick={() => navigate(-1)}>Return to Course</button>
            </div>
        </div>
    );

    if (!exam || !exam.questions || exam.questions.length === 0) {
        return (
            <div className="ave-viewport" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <p>No questions found in this exam.</p>
            </div>
        );
    }

    const currentQuestion = exam.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

    const handleDeleteExam = async () => {
        const examId = exam.id || exam.examId || exam._id;
        if (!examId) return alert("Exam ID missing.");
        
        if (window.confirm("Are you sure? This will permanently delete this assessment.")) {
            try {
                await BaseUrl.delete(`/admin/exam/${examId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("Exam deleted successfully.");
                navigate(-1);
            } catch (err) {
                console.error("Error deleting exam:", err);
                alert("Failed to delete exam.");
            }
        }
    };

    return (
        <div className="ave-viewport">
            {/* Sidebar - Question Palette */}
            <aside className="ave-sidebar">
                <h3><Layout size={20} /> Question Palette</h3>
                <div className="ave-palette-grid">
                    {exam.questions.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentQuestionIndex(index)}
                            className={`palette-btn ${currentQuestionIndex === index ? "active" : ""}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <div className="palette-legend" style={{ marginTop: 'auto', borderTop: '1px solid var(--e-glass-border)', paddingTop: '20px' }}>
                    <div className="stat-item" style={{ marginBottom: '10px' }}>
                        <div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--e-primary)' }}></div>
                        <span>Current Selection</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ave-main">
                <header className="ave-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ChevronLeft size={18} /> Back to Course
                    </button>
                    <div className="instructor-badge">Instructor Preview</div>
                </header>

                <div className="ave-info-card">
                    <h1>{exam.examName}</h1>
                    <div className="exam-stats">
                        <div className="stat-item">
                            <BookOpen size={16} />
                            <span>Total Questions: <strong>{exam.questions.length}</strong></span>
                        </div>
                        <div className="stat-item">
                            <Award size={16} />
                            <span>Total Marks: <strong>{exam.totalMarks}</strong></span>
                        </div>
                        <div className="stat-item">
                            <CheckCircle2 size={16} />
                            <span>Pass Threshold: <strong>{exam.passMarks}</strong></span>
                        </div>
                    </div>
                </div>

                <div className="question-card" key={currentQuestionIndex}>
                    <span className="q-number">Question {currentQuestionIndex + 1} of {exam.questions.length}</span>
                    <h2 className="q-text">{currentQuestion.questionText}</h2>
                    
                    <div className="options-grid">
                        {currentQuestion.options.map((opt, idx) => (
                            <div 
                                key={idx} 
                                className={`option-item ${currentQuestion.correctOptionIndex === idx ? "correct" : ""}`}
                            >
                                <div className="opt-indicator">
                                    {currentQuestion.correctOptionIndex === idx ? <CheckCircle2 size={16} /> : String.fromCharCode(65 + idx)}
                                </div>
                                <span className="opt-text">{opt}</span>
                                {currentQuestion.correctOptionIndex === idx && (
                                    <span className="correct-tag">Correct Answer</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="ave-actions">
                    <div className="nav-controls">
                        <button 
                            className="action-btn" 
                            onClick={handlePrevious} 
                            disabled={currentQuestionIndex === 0}
                        >
                            <ChevronLeft size={18} /> Previous
                        </button>
                        
                        {!isLastQuestion ? (
                            <button className="action-btn primary" onClick={handleNext}>
                                Next <ChevronRight size={18} />
                            </button>
                        ) : null}
                    </div>

                    {isLastQuestion && (
                        <button className="action-btn danger" onClick={handleDeleteExam}>
                            <Trash2 size={18} /> Delete Assessment
                        </button>
                    )}
                </footer>
            </main>
        </div>
    );
};

export default AdminViewExam;