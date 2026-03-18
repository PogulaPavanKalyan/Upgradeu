import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './Authprovider';
import "../Styles/SingleCourseDetails.css";
import BaseUrl from './BaseUrl';
import { courseLandingData } from '../data/courseLandingData';

// ===== TEMPLATE IMPORTS =====
import TemplateCenteredGlass from './CourseTemplates/TemplateCenteredGlass';
import TemplateSidebarCard from './CourseTemplates/TemplateSidebarCard';
import TemplateSplitHero from './CourseTemplates/TemplateSplitHero';


const SingleCourseDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => { fetchCourse(); }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await BaseUrl.get(`Course/${id}`);
      setCourse(res.data);
      fetchImage(id);
      fetchVideos(id);
      if (token) checkIfPurchased(id);
    } catch (err) { console.error(err); }
  };

  const fetchVideos = async (courseId) => {
    try {
      const res = await BaseUrl.get(`courseVideoList/${courseId}`);
      setVideos(res.data);
    } catch (err) { console.error("Failed to fetch videos", err); }
  };

  const checkIfPurchased = async (courseId) => {
    try {
      const res = await BaseUrl.get("/mypaymentuser");
      const isOwned = res.data.some(p => p.course && p.course.id === parseInt(courseId));
      setIsPurchased(isOwned);
    } catch (err) { console.error(err); }
  };

  const fetchImage = async (courseId) => {
    try {
      const res = await BaseUrl.get(`getimage/${courseId}`, { responseType: "blob" });
      setImageUrl(URL.createObjectURL(res.data));
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    return () => { if (imageUrl) URL.revokeObjectURL(imageUrl); };
  }, [imageUrl]);

  useEffect(() => {
    const checkCart = async () => {
      try {
        const res = await BaseUrl.get("getcart");
        const isInCart = res.data.some(item => item.course && item.course.id === Number(course?.id));
        setAlreadyInCart(isInCart);
      } catch (err) { console.error(err); }
    };
    if (token && course) checkCart();
  }, [token, course]);

  const buyCourse = async () => {
    if (!token) { alert("Please log in to continue."); navigate("/login"); return; }
    try {
      if (!alreadyInCart) {
        await BaseUrl.post(`addtocart/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
        setAlreadyInCart(true);
      }
      navigate("/checkout", { state: { directBuyCourse: course } });
    } catch (err) { console.error(err); alert("Failed to proceed to checkout."); }
  };

  const handleAddToCart = async (courseId) => {
    if (!token) { alert("Please log in to add to cart."); navigate("/login"); return; }
    try {
      await BaseUrl.post(`addtocart/${courseId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setAlreadyInCart(true);
      navigate('/AddtoCart');
    } catch (err) { console.error(err); }
  };

  if (!course) return <h2 style={{ textAlign: 'center', marginTop: '80px' }}>Loading course details...</h2>;

  // ===== FUZZY MATCHING =====
  const titleLower = (course.title || "").toLowerCase();
  const catLower = (course.category || "").toLowerCase();

  let matchedKey = "default";
  for (const key of Object.keys(courseLandingData)) {
    if (key === "default") continue;
    const keywords = key.toLowerCase().split(" ");
    const isMatch = keywords.some(kw => kw.length > 3 && (titleLower.includes(kw) || catLower.includes(kw)));
    if (isMatch) { matchedKey = key; break; }
  }

  if (matchedKey === "default") {
    if (titleLower.includes("java") || titleLower.includes("python") || catLower.includes("dev")) {
      matchedKey = "Software Development";
    } else if (titleLower.includes("test") || titleLower.includes("qa")) {
      matchedKey = "Full Stack Testing";
    }
  }

  const courseData = courseLandingData[matchedKey] || courseLandingData["default"];

  // ===== INJECT THEME CSS VARIABLES =====
  const pageStyle = {
    '--hero-start': courseData.theme?.heroStart || '#0b1121',
    '--hero-end': courseData.theme?.heroEnd || '#1e293b',
    '--accent-color': courseData.theme?.accent || '#fbbf24',
    '--primary-color': courseData.theme?.primary || '#4f8df7'
  };

  // ===== THE TEMPLATE PROPS (passed to every template) =====
  const templateProps = {
    course,
    courseData,
    isPurchased,
    alreadyInCart,
    imageUrl,
    videos,
    buyCourse,
    handleAddToCart,
    navigate,
    id,
  };

  // ===== TEMPLATE ROUTER =====
  const renderTemplate = () => {
    const type = courseData.templateType || "CENTERED_GLASS";
    switch (type) {
      case "SIDEBAR_CARD":   return <TemplateSidebarCard  {...templateProps} />;
      case "SPLIT_HERO":     return <TemplateSplitHero    {...templateProps} />;
      case "CENTERED_GLASS":
      default:               return <TemplateCenteredGlass {...templateProps} />;
    }
  };

  return (
    <div style={pageStyle}>
      {renderTemplate()}
    </div>
  );
};

export default SingleCourseDetails;
