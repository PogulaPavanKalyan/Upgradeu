import React from 'react';
import { motion } from 'framer-motion';
import '../../Styles/TemplateSplitHero.css';

// ── UNIQUE SPLIT HERO ANIMATIONS (Left/Right Slides) ─────────────
const SPLIT_EASE = "easeOut";
const SPLIT_DUR = 0.8;

const heroZoomContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const heroZoomItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "backOut" } }
};

const heroRightImage = {
  hidden: { opacity: 0, scale: 0.8, x: 50 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.8, ease: "backOut", delay: 0.2 } }
};

const slideLeftSection = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: SPLIT_DUR, ease: SPLIT_EASE, staggerChildren: 0.1, delayChildren: 0.1 } }
};

const slideRightSection = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: SPLIT_DUR, ease: SPLIT_EASE, staggerChildren: 0.1, delayChildren: 0.1 } }
};

const childFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
// ─────────────────────────────────────────────────────────────────────────────

const TemplateSplitHero = ({ course, courseData, isPurchased, alreadyInCart, imageUrl, videos, buyCourse, handleAddToCart, navigate, id }) => {
  const [openSection, setOpenSection] = React.useState(0);

  const toggleSection = (idx) => {
    setOpenSection(openSection === idx ? null : idx);
  };

  return (
    <div className="tsh-page">

      {/* ===== SPLIT HERO: text left, image right ===== */}
      <div className="tsh-hero" style={{
        background: `linear-gradient(135deg, var(--hero-start) 0%, var(--hero-end) 100%)`
      }}>
        <div className="container tsh-hero-inner">

          {/* LEFT — inside to outside zoom like requested */}
          <motion.div
            className="tsh-hero-left"
            variants={heroZoomContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="tsh-category-pill" variants={heroZoomItem}>
              {course.category}
            </motion.span>

            <motion.h1 className="tsh-hero-title" variants={heroZoomItem}>
              {courseData.heroTagline || course.title}
            </motion.h1>

            <motion.p className="tsh-hero-desc" variants={heroZoomItem}>
              {course.description || 'A career-changing program built by industry professionals.'}
            </motion.p>

            <motion.div className="tsh-stats-row" variants={heroZoomItem}>
              {course.course_duration && (
                <div className="tsh-stat">
                  <strong>{course.course_duration}</strong>
                  <span>Duration</span>
                </div>
              )}
              {course.mode && (
                <div className="tsh-stat">
                  <strong>{course.mode}</strong>
                  <span>Format</span>
                </div>
              )}
            </motion.div>

            <motion.div className="tsh-cta-row" variants={heroZoomItem}>
              <div className="tsh-price-tag">
                {course.price > 0 && <span className="tsh-price">₹{course.price}</span>}
              </div>
            </motion.div>

            <motion.div className="tsh-cta-row" variants={heroZoomItem} style={{ marginTop: '10px' }}>
              {!isPurchased ? (
                <>
                  <motion.button
                    onClick={buyCourse}
                    className="tsh-btn tsh-btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enroll Now
                  </motion.button>
                  <motion.button
                    onClick={() => handleAddToCart(course.id)}
                    disabled={alreadyInCart}
                    className="tsh-btn tsh-btn-secondary"
                    whileHover={!alreadyInCart ? { scale: 1.05 } : {}}
                    whileTap={!alreadyInCart ? { scale: 0.95 } : {}}
                  >
                    {alreadyInCart ? 'In Cart' : 'Add to Cart'}
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => navigate(`/SingleCourse/${course.id}`)}
                  className="tsh-btn tsh-btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Go to Classroom
                </motion.button>
              )}
            </motion.div>

            <motion.div className="tsh-price-tag" variants={heroZoomItem}>
              <span className="tsh-price">₹{course.price}</span>
              {course.price > 0 && <span className="tsh-offer">🎉 Code UPGRADE500 → ₹500 OFF</span>}
            </motion.div>
          </motion.div>

          {/* RIGHT — slides from right, then floats */}
          <motion.div
            className="tsh-hero-right"
            variants={heroRightImage}
            initial="hidden"
            animate="visible"
          >
            <div className="tsh-image-card">
              <motion.img
                src={imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600'}
                alt={course.title}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="tsh-image-overlay">
                <span>📂 {videos.length} Lessons</span>
                <span>🕐 {course.course_duration}</span>
                <span>📡 {course.mode}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ===== MAIN CONTENT — scroll-triggered staggered fadeInUp ===== */}
      <div className="container tsh-content mt-5">

        <motion.div
          className="tsh-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={slideLeftSection}
        >
          <h2 className="tsh-section-title">Is This For You?</h2>
          <div className="tsh-ba-grid">
            <div className="tsh-ba-col tsh-ba-before">
              <h4>😟 Before</h4>
              {courseData.beforePoints.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="tsh-ba-divider">VS</div>
            <div className="tsh-ba-col tsh-ba-after">
              <h4>🎉 After UpgradeU</h4>
              {courseData.afterPoints.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="tsh-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideRightSection}
        >
          <motion.h2 className="tsh-section-title" variants={childFadeUp}>Course Overview</motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            <motion.div variants={childFadeUp} style={{ background: '#f8fafc', padding: '22px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '14px', fontWeight: 600 }}>🎯 Who Is This For?</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {courseData.targetAudience?.map((t, i) => (
                  <li key={i} style={{ marginBottom: '10px', display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--primary-color)' }}>▸</span>
                    <span style={{ color: '#475569', fontSize: '14px' }}>{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={childFadeUp} style={{ background: '#f8fafc', padding: '22px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '14px', fontWeight: 600 }}>💼 Career Outcomes</h4>
              <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(34,197,94,0.1)', borderRadius: '10px', border: '1px solid rgba(34,197,94,0.2)' }}>
                <strong style={{ color: '#1e293b', display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Expected Salary</strong>
                <span style={{ color: '#16a34a', fontSize: '22px', fontWeight: 'bold' }}>{courseData.salaryRange}</span>
              </div>
              <strong style={{ color: '#64748b', display: 'block', fontSize: '13px', marginBottom: '8px' }}>Job Roles:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {courseData.jobRoles?.map((r, i) => (
                  <span key={i} style={{ background: 'rgba(79,141,247,0.1)', color: 'var(--primary-color)', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>{r}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <motion.div variants={childFadeUp} style={{ background: '#f8fafc', padding: '22px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '14px', fontWeight: 600 }}>🛠️ Tools & Tech Stack</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {courseData.toolsCovered?.map((t, i) => (
                  <span key={i} style={{ background: '#fff', color: '#334155', border: '1px solid #cbd5e1', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={childFadeUp} style={{ background: '#f8fafc', padding: '22px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '14px', fontWeight: 600 }}>📋 Prerequisites</h4>
              <p style={{ color: '#475569', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{courseData.prerequisites}</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="tsh-section tsh-learn-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideLeftSection}
        >
          <motion.h2 className="tsh-section-title" variants={childFadeUp}>What You'll Learn</motion.h2>
          <div className="tsh-learn-grid">
            {courseData.learnList.map((p, i) => (
              <motion.div className="tsh-learn-item" key={i} variants={childFadeUp}>
                <span className="tsh-bullet">●</span><span>{p}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="tsh-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideRightSection}
        >
          <motion.h2 className="tsh-section-title" variants={childFadeUp}>Your Learning Journey</motion.h2>
          <div className="tsh-timeline">
            {courseData.methodology.map((m, i) => (
              <motion.div className="tsh-timeline-step" key={i} variants={childFadeUp}>
                <div className="tsh-step-circle">{m.icon}</div>
                <div className="tsh-step-content">
                  <h5>{m.title}</h5>
                  <p>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div className="tsh-section tsh-testimonials-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={slideLeftSection}>
          <motion.h2 className="tsh-section-title" variants={childFadeUp}>Alumni Success</motion.h2>
          <div className="tsh-testimonials-grid">
            {courseData.testimonials?.map((t, i) => (
              <motion.div className="tsh-testimonial-card" key={i} variants={childFadeUp}>
                <div className="tsh-tcard-header">
                  <div className="tsh-t-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <strong>{t.name}</strong><br/>
                    <small>{t.role}</small>
                  </div>
                </div>
                <div className="tsh-stars">★★★★★</div>
                <p>"{t.review}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div className="tsh-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={slideRightSection}>
          <motion.h2 className="tsh-section-title" variants={childFadeUp}>Got Questions?</motion.h2>
          <div className="tsh-faq-grid">
            {courseData.faqs?.map((f, i) => (
              <motion.div className="tsh-faq-card" key={i} variants={childFadeUp}>
                <h5>{f.q}</h5>
                <p>{f.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Curriculum / Syllabus (FLAT LIST - NO ACCORDION) */}
        <motion.div className="tsh-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={slideLeftSection}>
          <motion.h2 className="tsh-section-title" variants={childFadeUp}>Course Curriculum</motion.h2>
          <motion.p style={{ marginBottom: '20px', color: '#64748b' }} variants={childFadeUp}>
            {videos.length} total lessons
          </motion.p>
          <div className="curriculum-list">
            {videos.length === 0 ? (
               <motion.p variants={childFadeUp}>Syllabus updating soon.</motion.p>
            ) : videos.map((video, index) => (
              <motion.div 
                key={video.id || video.videoId || index}
                className={`curriculum-item ${!isPurchased ? 'locked' : 'unlocked'}`}
                onClick={() => {
                  if (isPurchased) navigate(`/SingleCourse/${id}?videoId=${video.id || video.videoId}`);
                  else alert('Please purchase to unlock.');
                }}
                variants={childFadeUp}
                whileHover={isPurchased ? { backgroundColor: '#f8fafc', borderColor: 'var(--primary-color)' } : {}}
              >
                <div className="curr-icon">{isPurchased ? '▶' : '🔒'}</div>
                <div className="curr-info">
                  <span className="curr-title">{video.title || video.videoTitle || `Lesson ${index + 1}`}</span>
                  <span className="curr-desc-preview">{video.description || video.videoDescription ? (video.description || video.videoDescription).substring(0, 60) + '...' : ''}</span>
                </div>
                <div className="curr-action">{isPurchased ? 'Watch' : 'Locked'}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default TemplateSplitHero;
