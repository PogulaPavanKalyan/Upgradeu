import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../Styles/SingleCourse.css";
import BaseUrl from "./BaseUrl";

/* ─── helpers ─── */
const storageKey = (videoId) => `vp_progress_${videoId}`;

const getSavedTime = (videoId) => {
  try {
    return parseFloat(localStorage.getItem(storageKey(videoId))) || 0;
  } catch {
    return 0;
  }
};

const saveTime = (videoId, seconds) => {
  try {
    localStorage.setItem(storageKey(videoId), seconds.toString());
  } catch {}
};

const SingleCourse = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const requestedVideoId = searchParams.get("videoId");

  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const videoRef = useRef(null);
  const saveInterval = useRef(null);

  const token = localStorage.getItem("token");

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
      if (requestedVideoId) {
        const found = res.data.find((v) => v.videoId == requestedVideoId);
        if (found) { setCurrentVideo(found); return; }
      }
      setCurrentVideo(res.data[0]);
    }
  };

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
        saveTime(currentVideo.videoId, v.currentTime);
      }
    }, 5000);

    return () => clearInterval(saveInterval.current);
  }, [currentVideo]);

  /* ─── when video metadata loaded — seek to saved position ─── */
  const handleLoadedMetadata = () => {
    if (!currentVideo || !videoRef.current) return;
    const saved = getSavedTime(currentVideo.videoId);
    if (saved > 5 && saved < videoRef.current.duration - 5) {
      videoRef.current.currentTime = saved;
    }
  };

  /* ─── on video end: clear saved time + play next ─── */
  const handleEnded = () => {
    if (currentVideo) {
      localStorage.removeItem(storageKey(currentVideo.videoId));
    }
    playNext();
  };

  const playNext = () => {
    const index = videos.findIndex((v) => v.videoId === currentVideo?.videoId);
    if (videos[index + 1]) setCurrentVideo(videos[index + 1]);
  };

  /* ─── switch video: save current before switching ─── */
  const handleSelectVideo = (v) => {
    const el = videoRef.current;
    if (el && currentVideo && el.currentTime > 3) {
      saveTime(currentVideo.videoId, el.currentTime);
    }
    setCurrentVideo(v);
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
        {currentVideo && getSavedTime(currentVideo.videoId) > 5 && (
          <p className="resume-hint">
            ▶ Resuming from {formatTime(getSavedTime(currentVideo.videoId))}
          </p>
        )}

        <p className="course-desc">
          {currentVideo ? currentVideo.videoDescription : course.description}
        </p>
      </div>

      {/* RIGHT: PLAYLIST */}
      <div className="playlist-panel">
        <h3>Course content</h3>
        <div className="playlist-scroll">
          {videos.map((v, index) => (
            <div
              key={v.videoId}
              className={`playlist-item ${
                currentVideo && currentVideo.videoId === v.videoId ? "active" : ""
              }`}
              onClick={() => handleSelectVideo(v)}
            >
              <span>{index + 1}.</span>
              <span>{v.videoTitle || `Lesson ${index + 1}`}</span>
              {/* Show saved progress dot */}
              {getSavedTime(v.videoId) > 5 && (
                <span className="progress-dot" title="In progress" />
              )}
            </div>
          ))}
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
