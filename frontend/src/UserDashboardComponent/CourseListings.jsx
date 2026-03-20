import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Authprovider";
import BaseUrl from "../Components/BaseUrl";
import fallbackImg from "../assets/images/img2.png";
import { Award, ChevronRight } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/CourseListing.css";

// Extracted CourseCard Component

const CourseCard = ({ course, badge, navigate }) => (
  <div
    className="course-card"
    onClick={() => {
      const token = localStorage.getItem("token");
      if (token && course.isEnrolled) {
        navigate(`/SingleCourse/${course.id}`);
      } else {
        navigate(`/SingleCourseDetails/${course.id}`);
      }
    }}
  >
    {badge && <div className={`course-badge ${badge.type}`}>{badge.text}</div>}

    <img
      src={`${BaseUrl.defaults.baseURL}/getimage/${course.id}`}
      className="course-img"
      alt={course.title}
      draggable="false"
      onError={(e) => {
        e.target.src = fallbackImg;
      }}
    />

    <div className="course-name-strip">
      <h4>{course.title}</h4>
    </div>

    <div className="course-hover-panel">
      <p className="course-category">{course.category || "Technology"}</p>
      <h4>{course.title}</h4>

      <div className="course-meta-info">
        <span>⏱ {course.course_duration || "8 weeks"}</span>
        <span>⭐ {course.rating || "4.6"}</span>
      </div>

      <div className="price-box">
        {course.oldPrice && (
          <span className="old-price">₹{course.oldPrice}</span>
        )}
        <span className="new-price">₹{course.price}</span>
      </div>

      <button
        className="know-more-btn"
        onClick={(e) => {
          e.stopPropagation();
          const token = localStorage.getItem("token");
          if (token && course.isEnrolled) {
            navigate(`/SingleCourse/${course.id}`);
          } else {
            navigate(`/SingleCourseDetails/${course.id}`);
          }
        }}
      >
        {course.isEnrolled ? "Watch Course" : "View Details"}
      </button>
    </div>
  </div>
);

// Extracted CourseSection Component with Auto-Scroll Logic
const CourseSection = ({ title, icon, courses, badgeType, layout = "grid", enableAutoScroll = false, navigate }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!enableAutoScroll || layout !== "carousel") return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;

    const interval = setInterval(() => {
      // Only auto-scroll on mobile/tablet where carousel is active
      if (window.innerWidth <= 768) {
        if (!scrollContainer.firstChild) return;

        const cardWidth = scrollContainer.firstChild.offsetWidth + 15; // width + gap
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

        if (scrollAmount >= maxScroll) {
          scrollAmount = 0;
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollAmount += cardWidth;
          scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [enableAutoScroll, layout, courses]);

  if (!courses || courses.length === 0) return null;

  return (
    <div className="course-category-section">
      <div className="section-header">
        <div className="section-title-wrapper">
          {icon}
          <h3 className="section-title">{title}</h3>
        </div>
        <button
          className="view-all-btn"
          onClick={() => navigate('/Courses')}
        >
          View All <ChevronRight size={18} />
        </button>
      </div>

      <div className={`course-grid ${layout}`} ref={scrollRef}>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            badge={badgeType ? { type: badgeType, text: badgeType === 'featured' ? 'Featured' : badgeType === 'trending' ? 'Trending' : 'Top Rated' } : null}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  );
};

const CourseListings = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        // Fetch All Courses
        const coursesRes = await BaseUrl.get("/Course", { headers });
        let allCourses = coursesRes.data;

        // Fetch Enrolled Courses if logged in
        if (token) {
          try {
            const enrolledRes = await BaseUrl.get("mypaymentuser", {
              headers: { Authorization: `Bearer ${token}` }
            });
            const enrolledIds = new Set(enrolledRes.data.map(item => item.course.id));
            
            // Mark courses as enrolled
            allCourses = allCourses.map(c => ({
              ...c,
              isEnrolled: enrolledIds.has(c.id)
            }));
          } catch (err) {
            console.error("Error fetching enrolled courses:", err);
          }
        }
        
        setCourses(allCourses);
      } catch (err) {
        console.error("Error loading courses on dashboard:", err);
      }
    };

    fetchData();
  }, [token]);

  const featuredCourses = courses.slice(0, 4);

  return (
    <div className="course-section">
      {/* Featured Courses */}
      <CourseSection
        title="Featured Courses"
        icon={<Award className="section-icon" size={28} />}
        courses={featuredCourses}
        badgeType="featured"
        layout="stack"
        navigate={navigate}
      />

      {/* All Available Courses */}
      {courses.length > 0 && (
        <CourseSection
          title="All Available Courses"
          courses={courses.slice(0, 6)}
          layout="carousel"
          enableAutoScroll={true}
          navigate={navigate}
        />
      )}
    </div>
  );
};

export default CourseListings;
