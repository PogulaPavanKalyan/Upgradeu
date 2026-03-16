import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../Components/Authprovider";
import BaseUrl from "../Components/BaseUrl";
import {
    Plus,
    Trash2,
    ClipboardList,
    Settings,
    HelpCircle,
    Save,
    ChevronRight,
    CheckCircle2
} from "lucide-react";
import "../AdminStyles/AdminAddExam.css";

const AdminAddExam = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [title, setTitle] = useState("");
    const [durationMinutes, setDurationMinutes] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    const [passMarks, setPassMarks] = useState("");
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(courseId || "");
    const [videos, setVideos] = useState([]);
    const [selectedVideoId, setSelectedVideoId] = useState("");

    const [questions, setQuestions] = useState([
        {
            id: Date.now(),
            questionText: "",
            options: [
                { id: Date.now() + 1, optionText: "", correct: false },
                { id: Date.now() + 2, optionText: "", correct: false }
            ]
        }
    ]);

    useEffect(() => {
        if (courseId) {
            setSelectedCourseId(courseId);
        }
    }, [courseId]);

    useEffect(() => {
        BaseUrl.get("/Course", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => setCourses(res.data))
            .catch((err) => console.error("Failed to fetch courses:", err));
    }, [token]);

    useEffect(() => {
        if (selectedCourseId) {
            BaseUrl.get(`/courseVideoList/${selectedCourseId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => setVideos(res.data))
                .catch((err) => {
                    console.error("Failed to fetch videos:", err);
                    setVideos([]);
                });
        } else {
            setVideos([]);
        }
    }, [selectedCourseId, token]);

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: Date.now(),
                questionText: "",
                options: [
                    { id: Date.now() + 1, optionText: "", correct: false },
                    { id: Date.now() + 2, optionText: "", correct: false }
                ]
            }
        ]);
    };

    const handleRemoveQuestion = (id) => {
        if (questions.length > 1) {
            setQuestions(questions.filter(q => q.id !== id));
        }
    };

    const handleQuestionChange = (id, value) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, questionText: value } : q));
    };

    const handleAddOption = (questionId) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    options: [...q.options, { id: Date.now(), optionText: "", correct: false }]
                };
            }
            return q;
        }));
    };

    const handleRemoveOption = (questionId, optionId) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const updatedOptions = q.options.filter(o => o.id !== optionId);
                if (updatedOptions.length >= 2) {
                    return { ...q, options: updatedOptions };
                }
            }
            return q;
        }));
    };

    const handleOptionChange = (questionId, optionId, field, value) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                if (field === 'correct' && value === true) {
                    return {
                        ...q,
                        options: q.options.map(o => ({
                            ...o,
                            correct: o.id === optionId
                        }))
                    };
                } else {
                    return {
                        ...q,
                        options: q.options.map(o => o.id === optionId ? { ...o, [field]: value } : o)
                    };
                }
            }
            return q;
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedVideoId) {
            alert("Please select a video for the exam.");
            return;
        }

        try {
            const transformedQuestions = questions.map(q => {
                const optionsList = q.options.map(o => o.optionText);
                const correctIndex = q.options.findIndex(o => o.correct);

                if (correctIndex === -1) {
                    throw new Error(`Question "${q.questionText}" must have a correct answer selected.`);
                }

                return {
                    questionText: q.questionText,
                    options: optionsList,
                    correctOptionIndex: correctIndex
                };
            });

            const examData = {
                examName: title,
                totalMarks: parseInt(totalMarks),
                passMarks: parseInt(passMarks),
                questions: transformedQuestions
            };

            await BaseUrl.post(`/admin/course/${selectedCourseId}/video/${selectedVideoId}`, examData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Exam created successfully!");
            navigate("/Admindashboard");

        } catch (err) {
            console.error("Error creating exam:", err);
            alert(err.message || "Failed to create exam.");
        }
    }

    return (
        <div className="admin-exam-container">
            <div className="exam-card">
                <div className="exam-header">
                    <h2>Add New Exam</h2>
                    <p className="subtitle">Design an assessment for your course content</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3><Settings size={20} /> Exam Settings</h3>
                        <div className="form-input-group">
                            <select
                                value={selectedCourseId}
                                onChange={(e) => setSelectedCourseId(e.target.value)}
                                required
                            >
                                <option value="">-- Select Course --</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.course_Name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedVideoId}
                                onChange={(e) => setSelectedVideoId(e.target.value)}
                                required
                                disabled={!selectedCourseId}
                                style={{ opacity: selectedCourseId ? 1 : 0.5 }}
                            >
                                <option value="">-- Select Video/Lesson --</option>
                                {videos.map((video, index) => (
                                    <option key={video.id || video.videoId} value={video.id || video.videoId}>
                                        {video.video_name || `Lesson ${index + 1}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-input-group">
                            <input
                                type="text"
                                placeholder='Entry Exam Title (e.g. Final Recap)'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder='Duration (Minutes)'
                                value={durationMinutes}
                                onChange={(e) => setDurationMinutes(e.target.value)}
                            />
                        </div>

                        <div className="form-input-group">
                            <input
                                type="number"
                                placeholder='Total Marks'
                                value={totalMarks}
                                onChange={(e) => setTotalMarks(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder='Passing Marks threshold'
                                value={passMarks}
                                onChange={(e) => setPassMarks(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3><HelpCircle size={20} /> Question Builder</h3>
                        <div className="questions-container">
                            {questions.map((q, qIndex) => (
                                <div key={q.id} className="question-block">
                                    <div className="question-header">
                                        <h4><ClipboardList size={18} /> Question {qIndex + 1}</h4>
                                        <button
                                            type="button"
                                            className="remove-btn"
                                            onClick={() => handleRemoveQuestion(q.id)}
                                            style={{ visibility: questions.length > 1 ? 'visible' : 'hidden' }}
                                        >
                                            <Trash2 size={16} /> Remove
                                        </button>
                                    </div>

                                    <textarea
                                        placeholder="What's the question you want to ask?"
                                        value={q.questionText}
                                        onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                                        required
                                        style={{ minHeight: '80px', marginBottom: '15px' }}
                                    />

                                    <div className="options-list">
                                        {q.options.map((o, oIndex) => (
                                            <div key={o.id} className="option-row">
                                                <span style={{ color: 'var(--text-muted)', fontWeight: '700', fontSize: '14px', minWidth: '20px' }}>
                                                    {String.fromCharCode(65 + oIndex)}.
                                                </span>
                                                <input
                                                    type="text"
                                                    placeholder={`Option ${oIndex + 1}`}
                                                    value={o.optionText}
                                                    onChange={(e) => handleOptionChange(q.id, o.id, 'optionText', e.target.value)}
                                                    required
                                                />
                                                <label className={`correct-check ${o.correct ? 'active' : ''}`}>
                                                    <input
                                                        type="radio"
                                                        name={`correct-${q.id}`}
                                                        checked={o.correct}
                                                        onChange={(e) => handleOptionChange(q.id, o.id, 'correct', e.target.checked)}
                                                    />
                                                    {o.correct ? <CheckCircle2 size={18} /> : 'Correct'}
                                                </label>
                                                {q.options.length > 2 && (
                                                    <button
                                                        type="button"
                                                        className="remove-btn"
                                                        onClick={() => handleRemoveOption(q.id, o.id)}
                                                        style={{ padding: '6px' }}
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="add-btn"
                                            onClick={() => handleAddOption(q.id)}
                                            style={{ padding: '10px', marginTop: '10px', fontSize: '13px' }}
                                        >
                                            <Plus size={14} /> Add Option
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button type="button" className="add-btn" onClick={handleAddQuestion}>
                            <Plus size={20} /> Add New Question
                        </button>
                    </div>

                    <button className='submit-exam-btn' type='submit'>
                        <Save size={20} /> Upload Exam
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminAddExam;