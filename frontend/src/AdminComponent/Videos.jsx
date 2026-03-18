import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BaseUrl from "../Components/BaseUrl";
import { useAuth } from "../Components/Authprovider";
import { useToast } from "../Components/ToastContext";
import {
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  X,
  PlusCircle,
  Layout,
  UploadCloud
} from "lucide-react";
import "../AdminStyles/Videos.css";

const Videos = () => {
  const { token } = useAuth();
  const { showToast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();

  const [previews, setPreviews] = useState([]);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessingMetadata, setIsProcessingMetadata] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    return () => previews.forEach(p => URL.revokeObjectURL(p.url));
  }, [previews]);

  // Track processing state whenever previews change
  useEffect(() => {
    const stillLoading = previews.some(p => p.end === null);
    setIsProcessingMetadata(stillLoading);
  }, [previews]);

  const onSelectFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    setPreviews(
      selected.map(file => ({
        file,
        url: URL.createObjectURL(file),
        start: 0,
        end: null, // Initial state, will be updated by onLoadedMeta
      }))
    );
  };

  const onLoadedMeta = (idx) => {
    const v = videoRefs.current[idx];
    if (!v) return;
    const duration = Math.floor(v.duration || 0);
    setPreviews(prev =>
      prev.map((p, i) =>
        i === idx ? { ...p, end: duration > 0 ? duration : 0 } : p
      )
    );
  };

  const uploadAll = async (e) => {
    e.preventDefault();
    if (!id) {
      showToast("Invalid course context.", "error");
      return;
    }
    if (!previews.length) {
      showToast("Please select at least one video.", "warning");
      return;
    }

    // Safety check: Don't upload if still processing metadata
    if (isProcessingMetadata) {
      showToast("Please wait for all videos to finish processing.", "info");
      return;
    }

    setIsUploading(true);
    setMessage("");

    try {
      for (const p of previews) {
        const fd = new FormData();
        fd.append("video", p.file);
        fd.append("trimStart", p.start ?? 0);

        // Ensure trimEnd is never 0 unless explicitly intended (unlikely for full uploads)
        // If p.end is somehow still missing or 0, we use a very large number to send "keep everything" signal
        const finalTrimEnd = (p.end && p.end > 0) ? p.end : 999999;
        fd.append("trimEnd", finalTrimEnd);

        await BaseUrl.post(`/admin/postvideo/${id}`, fd, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowSuccessModal(true);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Upload failed";
      showToast(msg, "error");
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
            <h2>Add Course Videos</h2>
            <p>Upload and manage video lessons for your curriculum.</p>
          </div>
        </div>

        <form onSubmit={uploadAll} className="upload-form">
          <div className="file-drop-zone">
            <input
              type="file"
              id="video-upload"
              accept="video/*"
              multiple
              onChange={onSelectFiles}
              hidden
            />
            <label htmlFor="video-upload" className="drop-zone-label">
              <PlusCircle size={24} />
              <span>Select Video Files</span>
            </label>
          </div>

          <div className="preview-grid">
            {previews.map((p, idx) => (
              <div className="preview-card" key={idx}>
                <div className="video-wrapper">
                  <video
                    ref={el => (videoRefs.current[idx] = el)}
                    src={p.url}
                    controls
                    onLoadedMetadata={() => onLoadedMeta(idx)}
                    preload="metadata"
                    muted
                  />
                  {p.end === null && (
                    <div className="processing-overlay">
                      <div className="spinner-mini"></div>
                      <span>Analyzing...</span>
                    </div>
                  )}
                </div>
                <div className="video-info">
                  <p className="v-name">{p.file.name}</p>
                  <div className="v-meta-row">
                    <span className="v-size">{(p.file.size / (1024 * 1024)).toFixed(1)} MB</span>
                    {p.end !== null && <span className="v-duration">{p.end}s</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className={`upload-btn ${(isUploading || isProcessingMetadata) ? 'loading' : ''}`}
            disabled={isUploading || isProcessingMetadata || previews.length === 0}
          >
            {isUploading ? "Uploading Lessons..." : isProcessingMetadata ? "Processing Metadata..." : "Confirm & Upload"}
          </button>

          {message && <p className="status-text error">{message}</p>}
        </form>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="success-modal-backdrop">
          <div className="success-modal-content">
            <div className="modal-icon-badge">
              <CheckCircle2 size={40} />
            </div>
            <h3>Upload Successful!</h3>
            <p>Your video lessons have been added to the course content.</p>

            <div className="modal-question-box">
              <div className="q-icon">
                <HelpCircle size={20} />
              </div>
              <div className="q-text">
                Would you like to add an exam for these new videos now?
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="modal-btn primary"
                onClick={() => navigate(`/AdminAddExam/${id}`)}
              >
                <PlusCircle size={18} />
                <span>Yes, Create Exam</span>
                <ArrowRight size={16} className="arrow" />
              </button>
              <button
                className="modal-btn secondary"
                onClick={() => navigate(`/admincoursedetails/${id}`)}
              >
                <Layout size={18} />
                <span>No, Back to Course</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
