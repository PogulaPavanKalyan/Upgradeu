import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import "../Styles/SingleCourse.css";
import BaseUrl from "./BaseUrl";

/* ─── helpers ─── */
const storageKey = (videoId) => `vp_progress_${videoId}`;

const getSavedTime = (videoId, studentIdMarker) => {
  try {
    const key = `vp_progress_${studentIdMarker}_${videoId}`;
    return parseFloat(localStorage.getItem(key)) || 0;
  } catch {
    return 0;
  }
};

const saveTime = async (videoId, seconds, studentIdMarker, token) => {
  try {
    const key = `vp_progress_${studentIdMarker}_${videoId}`;
    localStorage.setItem(key, seconds.toString());
    
    if (token) {
        await BaseUrl.post(`/saveProgress?videoId=${videoId}&lastWatchedTime=${seconds}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
  } catch (err) {
      console.error("Failed to save progress to backend", err);
  }
};

const SingleCourse = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const requestedVideoId = searchParams.get("videoId");
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState({});
  const [passedExams, setPassedExams] = useState({});
  const [terminalUsed, setTerminalUsed] = useState({});

  const videoRef = useRef(null);
  const saveInterval = useRef(null);

  const token = localStorage.getItem("token");
  // Try to use a unique identifier for the user. We'll use id or token as fallback
  const _studentId = localStorage.getItem("studentId") || token?.substring(0, 15) || "unknown";

  const getWatchedKey = (vId) => `watched_video_${_studentId}_${vId}`;
  const getPassedKey = (vId) => `passed_exam_${_studentId}_${vId}`;
  const getFailedKey = (vId) => `failed_exam_${_studentId}_${vId}`;
  const getTerminalUsedKey = (vId) => `terminal_used_${_studentId}_${vId}`;
  const getStorageKey = (vId) => `vp_progress_${_studentId}_${vId}`;

  /* ─── fetch course + video list ─── */
  useEffect(() => {
    fetchCourse();
    fetchVideos();
    // eslint-disable-next-line
  }, [id]);

  const fetchCourse = async () => {
    const res = await BaseUrl.get(`Course/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCourse(res.data);
  };

  const fetchVideos = async () => {
    const res = await BaseUrl.get(`courseVideoList/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.length > 0) {
      setVideos(res.data);

      const initialWatched = {};
      const initialPassed = {};
      const initialFailed = {};
      const initialTerminalUsed = {};
      res.data.forEach(v => {
        if (localStorage.getItem(getWatchedKey(v.videoId)) === 'true') {
           initialWatched[v.videoId] = true;
        }
        if (localStorage.getItem(getPassedKey(v.videoId)) === 'true') {
           initialPassed[v.videoId] = true;
        }
        if (localStorage.getItem(getFailedKey(v.videoId)) === 'true') {
           initialFailed[v.videoId] = true;
        }
        if (localStorage.getItem(getTerminalUsedKey(v.videoId)) === 'true') {
           initialTerminalUsed[v.videoId] = true;
        }
      });
      setWatchedVideos(initialWatched);
      setPassedExams(initialPassed);
      setTerminalUsed(initialTerminalUsed);
      // We don't necessarily need to keep failed exams in state here, 
      // but we will check it below when rendering the button.

      let nextVideoToPlay = res.data[0];
      for (let i = 0; i < res.data.length; i++) {
        const v = res.data[i];
        if (!initialPassed[v.videoId]) {
          nextVideoToPlay = v;
          break;
        }
      }

      if (requestedVideoId) {
        const found = res.data.find((v) => v.videoId == requestedVideoId);
        if (found) { 
            setCurrentVideo(found); 
            fetchBackendProgress(found.videoId);
            return; 
        }
      }
      setCurrentVideo(nextVideoToPlay);
      if (nextVideoToPlay) {
          fetchBackendProgress(nextVideoToPlay.videoId);
      }
    }
  };

  const fetchBackendProgress = async (vId) => {
      try {
          const res = await BaseUrl.get(`/getProgress/${vId}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data && res.data.lastWatchedTime > 0) {
              const key = getStorageKey(vId);
              localStorage.setItem(key, res.data.lastWatchedTime.toString());
          }
      } catch (err) {
          console.error("Failed to fetch progress from backend", err);
      }
  };

  useEffect(() => {
    const handleFocus = () => {
      setPassedExams(prev => {
        const newPassed = { ...prev };
        let changed = false;
        videos.forEach(v => {
          if (localStorage.getItem(getPassedKey(v.videoId)) === 'true') {
            if (!newPassed[v.videoId]) {
              newPassed[v.videoId] = true;
              changed = true;
            }
          }
        });
        return changed ? newPassed : prev;
      });
      setTerminalUsed(prev => {
        const newTerminal = { ...prev };
        let changed = false;
        videos.forEach(v => {
          if (localStorage.getItem(getTerminalUsedKey(v.videoId)) === 'true') {
            if (!newTerminal[v.videoId]) {
              newTerminal[v.videoId] = true;
              changed = true;
            }
          }
        });
        return changed ? newTerminal : prev;
      });
    };
    window.addEventListener("focus", handleFocus);
    window.addEventListener("popstate", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("popstate", handleFocus);
    };
  }, [videos]);

  /* ─── auto-advance to next video if just completed ─── */
  useEffect(() => {
    if (!currentVideo || videos.length === 0) return;
    const advanceKey = `auto_advance_${currentVideo.videoId}`;
    if (localStorage.getItem(advanceKey) === 'true') {
      localStorage.removeItem(advanceKey);
      
      const idx = videos.findIndex(v => v.videoId === currentVideo.videoId);
      if (idx !== -1 && idx + 1 < videos.length) {
          const nextVid = videos[idx + 1];
          setCurrentVideo(nextVid);
          navigate(`/Course/${id}?videoId=${nextVid.videoId}`, { replace: true });
      }
    }
  }, [currentVideo, videos, id, navigate]);

  /* ─── build streaming URL ─── */
  useEffect(() => {
    if (!currentVideo) return;
    const streamUrl = `${BaseUrl.defaults.baseURL}/getvideo/${currentVideo.videoId}?token=${token}`;
    setVideoUrl(streamUrl);
    return () => setVideoUrl(null);
  }, [currentVideo, token]);

  /* ─── save progress every 5 s ─── */
  useEffect(() => {
    clearInterval(saveInterval.current);
    if (!currentVideo) return;

    saveInterval.current = setInterval(() => {
      const v = videoRef.current;
      if (v && !v.paused && v.currentTime > 3) {
        saveTime(currentVideo.videoId, v.currentTime, _studentId, token);
      }
    }, 5000);

    return () => clearInterval(saveInterval.current);
  }, [currentVideo]);

  /* ─── when video metadata loaded — seek to saved position ─── */
  const handleLoadedMetadata = () => {
    if (!currentVideo || !videoRef.current) return;
    const saved = getSavedTime(currentVideo.videoId, _studentId);
    if (saved > 5 && saved < videoRef.current.duration - 5) {
      videoRef.current.currentTime = saved;
    }
  };

  /* ─── force browser to reload video when videoUrl changes ─── */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  /* ─── on video end: clear saved time + play next ─── */
  const handleEnded = () => {
    if (currentVideo) {
      localStorage.removeItem(getStorageKey(currentVideo.videoId));
      localStorage.setItem(getWatchedKey(currentVideo.videoId), 'true');
      setWatchedVideos(prev => ({ ...prev, [currentVideo.videoId]: true }));
    }
  };

  const playNext = () => {
    const index = videos.findIndex((v) => v.videoId === currentVideo?.videoId);
    if (videos[index + 1]) setCurrentVideo(videos[index + 1]);
  };

  /* ─── switch video: save current before switching ─── */
  const handleSelectVideo = (v) => {
    const el = videoRef.current;
    if (el && currentVideo && el.currentTime > 3) {
      saveTime(currentVideo.videoId, el.currentTime, _studentId, token);
    }
    setCurrentVideo(v);
    fetchBackendProgress(v.videoId);
  };

  if (!course) return <h2>Loading...</h2>;

  return (
    <div className="udemy-page">

      {/* LEFT: VIDEO AREA */}
      <div className="video-area">
        <h1 className="course-title">
          {currentVideo ? currentVideo.videoTitle : course.title}
        </h1>

        {videoUrl && (
          <video
            ref={videoRef}
            key={currentVideo.videoId}
            controls
            autoPlay
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            className="video-player"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Resume indicator */}
        {currentVideo && getSavedTime(currentVideo.videoId, _studentId) > 5 && (
          <p className="resume-hint">
            ▶ Resuming from {formatTime(getSavedTime(currentVideo.videoId, _studentId))}
          </p>
        )}

        <p className="course-desc">
          {currentVideo ? currentVideo.videoDescription : course.description}
        </p>

        {currentVideo && (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '15px' }}>
            <button 
              onClick={() => navigate(`/StudentExam/${currentVideo.videoId}?terminal=true`)}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#6c757d', 
                color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' 
              }}
            >
              💻 Practice Terminal
            </button>
            {watchedVideos[currentVideo.videoId] ? (
              passedExams[currentVideo.videoId] ? (
                <div style={{ color: '#28a745', fontWeight: 'bold' }}>
                  ✅ Exam Passed
                </div>
              ) : (
                <button 
                  onClick={() => navigate(`/StudentExam/${currentVideo.videoId}`)}
                  style={{ 
                    padding: '10px 20px', 
                    backgroundColor: localStorage.getItem(getFailedKey(currentVideo.videoId)) === 'true' ? '#dc3545' : '#007bff', 
                    color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' 
                  }}
                >
                  {localStorage.getItem(getFailedKey(currentVideo.videoId)) === 'true' ? "Re-attempt Exam" : "Take Exam"}
                </button>
              )
            ) : (
              <div style={{ color: '#ff9800', fontWeight: 'bold' }}>
                Watch the full video to unlock the exam.
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT: PLAYLIST */}
      <div className="playlist-panel">
        <h3>Course content</h3>
        <div className="playlist-scroll">
          {videos.map((v, index) => {
            const isUnlocked = index === 0 || passedExams[videos[index - 1].videoId] || terminalUsed[videos[index - 1].videoId];
            return (
              <div
                key={v.videoId}
                className={`playlist-item ${
                  currentVideo && currentVideo.videoId === v.videoId ? "active" : ""
                } ${!isUnlocked ? "locked" : ""}`}
                onClick={() => {
                  if (isUnlocked) {
                    handleSelectVideo(v);
                  } else {
                    alert("You must pass the previous video's exam to unlock this lesson.");
                  }
                }}
                style={{ opacity: isUnlocked ? 1 : 0.5, cursor: isUnlocked ? 'pointer' : 'not-allowed' }}
              >
                <span>{index + 1}.</span>
                <span>{v.videoTitle || `Lesson ${index + 1}`}</span>
                {!isUnlocked && <span style={{marginLeft: 'auto'}}>🔒</span>}
                {/* Show saved progress dot */}
                {getSavedTime(v.videoId, _studentId) > 5 && isUnlocked && (
                  <span className="progress-dot" title="In progress" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* helper: format seconds → "m:ss" */
const formatTime = (secs) => {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export default SingleCourse;