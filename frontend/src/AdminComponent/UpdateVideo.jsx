import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BaseUrl from "../Components/BaseUrl";
import { useAuth } from "../Components/Authprovider";
import { useToast } from "../Components/ToastContext";
import { UploadCloud, CheckCircle2, ArrowLeft, Video } from "lucide-react";
import "../AdminStyles/Videos.css";

const UpdateVideo = () => {
    const { videoId } = useParams();
    const { token } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [video, setVideo] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            setPreviewUrl(URL.createObjectURL(file));
            setMessage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!video) {
            showToast("Please select a video file first.", "warning");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("video", video);

        try {
            await BaseUrl.put(`/admin/updatevideo/${videoId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            });
            showToast("Video updated successfully!", "success");
            setShowSuccess(true);
        } catch (error) {
            console.error("Update video error:", error);
            showToast(error.response?.data || "Failed to update video.", "error");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="multi-video-page">
            <div className="upload-container">
                <div className="upload-header">
                    <UploadCloud size={32} className="header-icon" />
                    <div className="header-text">
                        <h2>Update Video Lesson</h2>
                        <p>Replace the existing video content with a new file.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="file-drop-zone">
                        <input
                            type="file"
                            id="video-update"
                            accept="video/*"
                            onChange={handleFileChange}
                            hidden
                        />
                        <label htmlFor="video-update" className="drop-zone-label">
                            <Video size={24} />
                            <span>{video ? video.name : "Select New Video File"}</span>
                        </label>
                    </div>

                    {previewUrl && (
                        <div className="preview-grid">
                            <div className="preview-card" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                                <div className="video-wrapper">
                                    <video src={previewUrl} controls muted />
                                </div>
                                <div className="video-info">
                                    <p className="v-name">{video.name}</p>
                                    <span className="v-size">{(video.size / (1024 * 1024)).toFixed(1)} MB</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() => navigate(-1)}
                            style={{ flex: 1, height: '48px', borderRadius: '12px', fontWeight: '700' }}
                        >
                           <ArrowLeft size={18} style={{ marginRight: '8px' }} />
                           Cancel
                        </button>
                        <button
                            type="submit"
                            className={`upload-btn ${isUploading ? 'loading' : ''}`}
                            disabled={isUploading || !video}
                            style={{ flex: 2 }}
                        >
                            {isUploading ? "Updating..." : "Confirm & Update Video"}
                        </button>
                    </div>

                    {message && <p className="status-text error">{message}</p>}
                </form>
            </div>

            {showSuccess && (
                <div className="success-modal-backdrop">
                    <div className="success-modal-content">
                        <div className="modal-icon-badge">
                            <CheckCircle2 size={40} />
                        </div>
                        <h3>Update Successful!</h3>
                        <p>The video lesson has been replaced successfully.</p>
                        <button
                            className="modal-btn primary"
                            onClick={() => navigate(-1)}
                        >
                            Back to Course
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateVideo;
