import React, { useEffect, useState } from "react";
import { useAuth } from "./Authprovider";
import "../Styles/Courses.css";
import { useNavigate, useParams } from "react-router-dom";
import BaseUrl from "./BaseUrl";

const Courses = () => {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const nav = useNavigate();
  const { keyword } = useParams();

  /* ================= FETCH COURSES & ENROLLMENT ================= */
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());

  useEffect(() => {
    let url = "Course";
    if (keyword) url = `search/${keyword}`;

    const fetchData = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        // Fetch All Courses
        const coursesRes = await BaseUrl.get(url, { headers });
        const allCourses = coursesRes.data;
        setCourses(allCourses);

        // Fetch Enrolled Courses if logged in
        if (token) {
          try {
            const enrolledRes = await BaseUrl.get("mypaymentuser");
            const ids = new Set(enrolledRes.data.map(item => item.course.id));
            setEnrolledCourseIds(ids);
          } catch (err) {
            console.error("Error fetching enrolled courses:", err);
          }
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      }
    };

    fetchData();
  }, [token, keyword]);

  return (
    <>
      <div className="courses-page">
        <div className="course-list">

          {courses.length === 0 ? (
            <p className="no-courses">No courses found</p>
          ) : (
            courses.map((course) => (
              <div
                className="cc-card"
                key={course.id}
                onClick={() => {
                  if (token && enrolledCourseIds.has(course.id)) {
                    nav(`/SingleCourse/${course.id}`);
                  } else {
                    nav(`/SingleCourseDetails/${course.id}`);
                  }
                }}
              >
                {/* ── Thumbnail ── */}
                <div className="cc-thumb">
                  <img
                    src={`${BaseUrl.defaults.baseURL}/getimage/${course.id}`}
                    alt={course.title}
                    className="cc-thumb-img"
                    onError={(e) => {
                      e.target.src = "/course-placeholder.png";
                    }}
                  />
                  {/* Dark gradient overlay with category label */}
                  <div className="cc-thumb-overlay">
                    <span className="cc-category-overlay">{course.category || "Course"}</span>
                  </div>
                  {/* Level badge top-right */}
                  <span className="cc-level-badge">All Levels</span>
                </div>

                {/* ── Card Body ── */}
                <div className="cc-body">
                  {/* Category tag */}
                  <span className="cc-category-tag">{course.category || "General"}</span>

                  {/* Title */}
                  <h3 className="cc-title">{course.title}</h3>

                  {/* Instructor line */}
                  <p className="cc-instructor">UpgradeU Instructor</p>

                  {/* Meta row: rating · duration */}
                  <div className="cc-meta">
                    <span className="cc-star">★</span>
                    <span className="cc-rating">{course.rating || "4.5"}</span>
                    <span className="cc-dot">·</span>
                    <span className="cc-duration">⏱ {course.course_duration || "—"}</span>
                  </div>

                  {/* Divider */}
                  <div className="cc-divider" />

                  {/* Footer: lessons + price */}
                  <div className="cc-footer">
                    <span className="cc-lessons">📘 {course.lesson_count || "—"} lessons</span>
                    <span className="cc-price">₹{course.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </>
  );
};

export default Courses;
