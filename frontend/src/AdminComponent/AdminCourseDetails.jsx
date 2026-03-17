import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Authprovider";
import BaseUrl from "../Components/BaseUrl";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Monitor,
  Tag,
  IndianRupee,
  PlayCircle,
  FileText,
  Layout,
  Video,
  ChevronRight,
  Info,
  ClipboardList,
  X,
  UploadCloud,
  Image as ImageIcon
} from "lucide-react";
import "../AdminStyles/AdminCourseDetails.css";

const AdminCourseDetails = () => {
  const { id } = useParams(); // courseId
  const { token } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  const [videoUrl, setVideoUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ================= FETCH COURSE ================= */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await BaseUrl.get(`/Course/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to fetch course", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, token]);

  /* ================= FETCH IMAGE (BLOB) ================= */
  useEffect(() => {
    let imgObjectUrl;

    const fetchImage = async () => {
      try {
        const res = await BaseUrl.get(`/getimage/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        });

        imgObjectUrl = URL.createObjectURL(res.data);
        setImageUrl(imgObjectUrl);
      } catch (err) {
        console.error("Image load failed", err);
      }
    };

    fetchImage();

    return () => {
      if (imgObjectUrl) URL.revokeObjectURL(imgObjectUrl);
    };
  }, [id, token]);

  /* ================= FETCH VIDEO LIST ================= */
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await BaseUrl.get(`/courseVideoList/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVideos(res.data || []);
        if (res.data?.length) {
          setCurrentVideo(res.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };

    fetchVideos();
  }, [id, token]);

  /* ================= FETCH VIDEO BLOB ================= */
  useEffect(() => {
    if (!currentVideo) return;

    let videoObjectUrl;

    const fetchVideoBlob = async () => {
      try {
        const res = await BaseUrl.get(
          `/getvideo/${currentVideo.videoId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "blob",
          }
        );

        videoObjectUrl = URL.createObjectURL(res.data);
        setVideoUrl(videoObjectUrl);
      } catch (err) {
        console.error("Video load failed", err);
      }
    };

    fetchVideoBlob();

    return () => {
      if (videoObjectUrl) URL.revokeObjectURL(videoObjectUrl);
    };
  }, [currentVideo, token]);
  /* ================= DELETE IMAGE ================= */
  const handleDeleteImage = async () => {
    if (!window.confirm("Are you sure you want to delete the course image?")) return;

    try {
      await BaseUrl.delete(`/admin/deletecourseimage/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Image deleted successfully");
      setImageUrl(null);
    } catch (err) {
      console.error("Failed to delete image", err);
      alert("Failed to delete image");
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video lesson?")) return;
    try {
      await BaseUrl.delete(`/admin/deletevideo/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh video list
      const updatedVideos = videos.filter(v => v.videoId !== videoId);
      setVideos(updatedVideos);
      if (currentVideo?.videoId === videoId) {
        setCurrentVideo(updatedVideos[0] || null);
      }
      alert("Video deleted successfully!");
    } catch (error) {
      console.error("Delete video error:", error);
      alert("Failed to delete video.");
    }
  };

  if (loading) return (
    <div className="course-details-status">
      <div className="status-spinner"></div>
      <p>Loading course assets...</p>
    </div>
  );

  if (!course) return (
    <div className="course-details-status">
      <div className="status-error">
        <Info size={48} />
        <h3>Course Not Found</h3>
        <p>This course may have been removed or the ID is invalid.</p>
        <button onClick={() => navigate(-1)}>Back to Catalog</button>
      </div>
    </div>
  );

  return (
    <div className="admin-course-details-viewport">
      <div className="details-container">
        {/* TOP NAVIGATION */}
        <div className="details-nav-bar">
          <button className="back-link" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            <span>Back to Courses</span>
          </button>
          <div className="nav-actions">
            <button className="secondary-btn" onClick={() => navigate(`/editcourses/${id}`)}>Edit Course</button>
            <button className="secondary-btn" onClick={() => navigate(`/AdminAddExam/${id}`)}>Add Exam</button>
            <button className="secondary-btn" onClick={() => navigate(`/addVideos/${id}`)}>Add Videos</button>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="details-hero">
          <div className="hero-content">
            <div className="category-tag">
              <Tag size={14} />
              <span>{course.category}</span>
            </div>
            <h1>{course.course_Name}</h1>
            <p className="hero-sub">{course.title}</p>

            <div className="details-stats">
              <div className="stat-pill">
                <Monitor size={16} />
                <span>{course.mode}</span>
              </div>
              <div className="stat-pill">
                <Clock size={16} />
                <span>{course.course_duration}</span>
              </div>
              <div className="stat-pill highlight">
                <IndianRupee size={16} />
                <span>{course.price?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="hero-media">
            {imageUrl ? (
              <div className="media-container">
                <img src={imageUrl} alt={course.course_Name} className="course-feature-img" />
                <div className="media-actions-overlay">
                   <button className="media-btn delete" onClick={handleDeleteImage}>Delete Image</button>
                   <button className="media-btn update" onClick={() => navigate(`/postCourseimage/${id}`)}>Update Image</button>
                </div>
              </div>
            ) : (
              <div className="img-placeholder">
                <ImageIcon size={48} />
                <span>No Course Image</span>
                <button className="secondary-btn mt-2" onClick={() => navigate(`/postCourseimage/${id}`)}>Upload Image</button>
              </div>
            )}
          </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className="details-section">
          <div className="section-head">
            <FileText size={20} />
            <h2>Course Description</h2>
          </div>
          <div className="section-body description-text">
            <p>{course.description}</p>
          </div>
        </div>

        {/* VIDEO CONTENT SECTION */}
        <div className="details-section">
          <div className="section-head">
            <Video size={20} />
            <h2>Curriculum Preview</h2>
            <span className="count-badge">{videos.length} Videos</span>
          </div>

          <div className="curriculum-container">
            {videos.length === 0 ? (
              <div className="empty-curriculum">
                <PlayCircle size={48} />
                <p>No videos found for this course yet.</p>
                <button className="primary-btn" onClick={() => navigate(`/addVideos/${id}`)}>Upload First Video</button>
              </div>
            ) : (
              <div className="video-master-layout">
                {/* VIDEO PLAYLIST */}
                <div className="video-sidebar">
                  <div className="sidebar-header">Playlist</div>
                  <div className="video-playlist">
                    {videos.map((v, index) => (
                      <div
                        key={v.videoId}
                        className={`playlist-card ${currentVideo?.videoId === v.videoId ? "active" : ""}`}
                        onClick={() => setCurrentVideo(v)}
                      >
                        <div className="play-index">{index + 1}</div>
                        <div className="play-info">
                          <span className="play-label">Lesson {index + 1}</span>
                          <div className="playlist-actions">
                            <span className="play-status">{currentVideo?.videoId === v.videoId ? "Playing..." : "Available"}</span>
                            <div className="action-button-group">
                              <button
                                className="action-icon-btn delete-v"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteVideo(v.videoId);
                                }}
                                title="Delete Video"
                              >
                                <X size={14} />
                              </button>
                              <button
                                className="action-icon-btn update-v"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/updatevideo/${v.videoId}`);
                                }}
                                title="Update Video"
                              >
                                <UploadCloud size={14} />
                              </button>
                              <button
                                className="view-exam-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/AdminViewExam/${v.videoId}`);
                                }}
                                title="View Exam"
                              >
                                <ClipboardList size={14} />
                                <span>Exam</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        {currentVideo?.videoId === v.videoId && <PlayCircle size={16} className="active-icon" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* PLAYER AREA */}
                <div className="video-viewport">
                  {videoUrl ? (
                    <div className="player-wrapper">
                      <video key={videoUrl} controls poster={imageUrl}>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="player-footer">
                        <h3>Lesson {videos.indexOf(currentVideo) + 1}</h3>
                        <p>Now viewing internal course content preview.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="player-placeholder">
                      <div className="spinner-mini"></div>
                      <p>Buffering video stream...</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseDetails;
