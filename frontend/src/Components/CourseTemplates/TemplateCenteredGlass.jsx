import React from 'react';
import { motion } from 'framer-motion';
import '../../Styles/TemplateCenteredGlass.css';

// ── FLM-EXACT animation presets ─────────────────────────────────────────────
// FLM uses animate.css "fadeInUp" triggered by Waypoints:
//   opacity: 0 → 1, translateY: 40px → 0, duration 1.2s, ease cubic-bezier(0.25,0.1,0.25,1)
const FLM_EASE = [0.25, 0.1, 0.25, 1.0];   // native CSS "ease"
const FLM_DUR  = 1.2;                         // 1.2s — exactly like FLM

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: FLM_DUR, ease: FLM_EASE, delay }
  }
});

// Staggered children — 0.25s between each (FLM uses ~200-300ms)
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.1 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: FLM_DUR, ease: FLM_EASE } }
};

// For slide-in from right (course image side)
const slideFromRight = (delay = 0.3) => ({
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: FLM_DUR, ease: FLM_EASE, delay }
  }
});

// ─────────────────────────────────────────────────────────────────────────────

const TemplateCenteredGlass = ({ course, courseData, isPurchased, alreadyInCart, imageUrl, videos, buyCourse, handleAddToCart, navigate, id }) => {
  const bgImage = courseData.heroBgImage || null;

  return (
    <div className="tcg-page">

      {/* ===== FLM-STYLE HERO ===== */}
      <section
        className="tcg-outer-hero"
        style={bgImage ? {
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        } : {}}
      >
        {bgImage && <div className="tcg-hero-overlay" />}
        <div className="tcg-glow-left" />
        <div className="tcg-glow-right" />

        {/* Hero card */}
        <motion.div
          className="tcg-hero-card"
          style={{
            background: `linear-gradient(135deg, var(--hero-start, #1a003a) 0%, var(--hero-end, #0d001f) 100%)`
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: FLM_DUR, ease: FLM_EASE }}
        >
          {/* LEFT */}
          <motion.div
            className="tcg-hero-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div className="tcg-hero-badge" variants={staggerItem}>
              ✨ {course.category || 'Professional Course'}
            </motion.div>

            {/* Title (STRICTLY BACKEND) */}
            <motion.h1
              className="tcg-hero-title"
              style={{ color: '#ffffff', fontSize: '38px', fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px 0', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
              variants={staggerItem}
            >
              {course.title || course.course_Name || 'Course Title'}
            </motion.h1>

            {/* Description (STRICTLY BACKEND) */}
            <motion.p className="tcg-hero-desc" variants={staggerItem}>
              {course.description || ''}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="tcg-btn-row" variants={staggerItem}>
              {!isPurchased ? (
                <>
                  <motion.button
                    onClick={buyCourse}
                    className="tcg-btn-primary"
                    whileHover={{ scale: 1.05, boxShadow: '0 16px 40px rgba(255,107,0,0.55)' }}
                    whileTap={{ scale: 0.96 }}
                  >
                    🚀 Enroll Now
                  </motion.button>
                  <motion.button
                    onClick={() => handleAddToCart(course.id)}
                    disabled={alreadyInCart}
                    className="tcg-btn-secondary"
                    whileHover={!alreadyInCart ? { scale: 1.05 } : {}}
                    whileTap={!alreadyInCart ? { scale: 0.96 } : {}}
                  >
                    {alreadyInCart ? '✓ In Cart' : '🛒 Add to Cart'}
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => navigate(`/SingleCourse/${course.id}`)}
                  className="tcg-btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  ▶ Start Learning Now
                </motion.button>
              )}
            </motion.div>

            {/* Info Pills */}
            <motion.div className="tcg-info-pills" variants={staggerItem}>
              {course.course_duration && <span className="tcg-pill">📅 {course.course_duration}</span>}
              {course.mode && <span className="tcg-pill">🎓 {course.mode}</span>}
              {course.price > 0 && <span className="tcg-pill">💰 ₹{course.price}</span>}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="tcg-hero-right"
            variants={fadeInUp(0.5)}
            initial="hidden"
            animate="visible"
            style={{ originX: 0.5, originY: 0.5 }}
          >
            {imageUrl ? (
              <motion.img
                src={imageUrl}
                alt={course.title}
                className="tcg-course-img"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            ) : (
              <motion.div
                className="tcg-img-placeholder"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span>📚</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="tcg-stats-bar"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: FLM_DUR, ease: FLM_EASE, delay: 0.9 }}
        >
          {[
            { emoji: '📡', strong: '100% Live', sub: 'Training' },
            { emoji: '🎙️', strong: '2 Years', sub: 'Recordings' },
            { emoji: '🎁', strong: 'Free', sub: 'Addon Sessions' },
            { emoji: '🚀', strong: 'Real Time', sub: 'Projects' },
          ].map((s, i) => (
            <div className="tcg-stat-item" key={i}>
              <span className="tcg-stat-emoji">{s.emoji}</span>
              <div>
                <strong>{s.strong}</strong>
                <span>{s.sub}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="tcg-main-content">

        {/* Before / After */}
        <motion.div
          className="tcg-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp(0)}
        >
          <h2 className="tcg-section-title">Your Career Transformation</h2>
          <div className="tcg-transform-row">
            <div className="tcg-transform-box tcg-box-before">
              <h4>Before</h4>
              <ul>{courseData.beforePoints.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
            <div className="tcg-arrow">➔</div>
            <div className="tcg-transform-box tcg-box-after">
              <h4>After UpgradeU</h4>
              <ul>{courseData.afterPoints.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
          </div>
        </motion.div>

        {/* Course Overview (New Fields) */}
        <motion.div
          className="tcg-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.h2 className="tcg-section-title" variants={staggerItem}>Course Overview</motion.h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '30px' }}>
            <motion.div variants={staggerItem} style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontWeight: 600 }}>🎯 Who Is This For?</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {courseData.targetAudience?.map((t, i) => (
                  <li key={i} style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
                    <span style={{ color: 'var(--accent-color)' }}>•</span> <span style={{ color: '#cbd5e1', fontSize: '15px' }}>{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={staggerItem} style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontWeight: 600 }}>💼 Career Outcomes</h4>
              <div style={{ marginBottom: '20px', padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <strong style={{ color: '#fff', display: 'block', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Expected Salary Range</strong>
                <span style={{ color: '#34d399', fontSize: '24px', fontWeight: 'bold' }}>{courseData.salaryRange}</span>
              </div>
              <strong style={{ color: '#94a3b8', display: 'block', fontSize: '14px', marginBottom: '10px' }}>Target Roles:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {courseData.jobRoles?.map((r, i) => (
                  <span key={i} style={{ background: 'rgba(79, 141, 247, 0.15)', color: '#93c5fd', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 500 }}>{r}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <motion.div variants={staggerItem} style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontWeight: 600 }}>🛠️ Tools & Tech Stack</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {courseData.toolsCovered?.map((t, i) => (
                  <span key={i} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>{t}</span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerItem} style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontWeight: 600 }}>📋 Prerequisites</h4>
              <p style={{ color: '#cbd5e1', lineHeight: '1.7', margin: 0, fontSize: '16px' }}>{courseData.prerequisites}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* What You'll Learn */}
        <motion.div
          className="tcg-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.h2 className="tcg-section-title" variants={staggerItem}>What You'll Learn</motion.h2>
          <ul className="tcg-learn-list">
            {courseData.learnList.map((p, i) => (
              <motion.li key={i} variants={staggerItem}>
                <span className="tcg-check">✓</span>{p}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Methodology */}
        <motion.div
          className="tcg-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.h2 className="tcg-section-title" variants={staggerItem}>Our Training Methodology</motion.h2>
          <div className="tcg-method-grid">
            {courseData.methodology.map((m, i) => (
              <motion.div
                className="tcg-method-card"
                key={i}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="tcg-method-icon">{m.icon}</div>
                <h5>{m.title}</h5>
                <p>{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div
          className="tcg-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.h2 className="tcg-section-title" variants={staggerItem}>Real-World Projects You'll Build</motion.h2>
          <div className="tcg-project-grid">
            {courseData.projects.map((p, i) => (
              <motion.div
                className="tcg-project-card"
                key={i}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="tcg-proj-icon">{p.icon}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="tcg-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.h2 className="tcg-section-title" variants={staggerItem}>Student Success Stories</motion.h2>
          <div className="tcg-testimonials">
            {courseData.testimonials?.map((t, i) => (
              <motion.div
                className="tcg-testimonial-card"
                key={i}
                variants={staggerItem}
              >
                <p className="tcg-review">"{t.review}"</p>
                <div className="tcg-reviewer">
                  <div className="tcg-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          className="tcg-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.h2 className="tcg-section-title" variants={staggerItem}>Frequently Asked Questions</motion.h2>
          <div className="tcg-faq-list">
            {courseData.faqs?.map((f, i) => (
              <motion.div className="tcg-faq-item" key={i} variants={staggerItem}>
                <h5>Q: {f.q}</h5>
                <p>{f.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Curriculum / Syllabus (FLAT LIST - NO ACCORDION) */}
        <motion.div
          className="tcg-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.h2 className="tcg-section-title" variants={staggerItem}>Course Syllabus</motion.h2>
          <motion.p className="tcg-video-count" variants={staggerItem}>{videos.length} total lessons</motion.p>
          
          <div className="tcg-curriculum">
            {videos.length === 0 ? (
              <motion.p className="tcg-no-videos" variants={staggerItem}>Syllabus updating soon.</motion.p>
            ) : videos.map((video, index) => (
              <motion.div
                key={video.id || video.videoId || index}
                className={`tcg-curr-item ${isPurchased ? 'unlocked' : 'locked'}`}
                onClick={() => {
                  if (isPurchased) navigate(`/SingleCourse/${id}?videoId=${video.id || video.videoId}`);
                  else alert('Please purchase to unlock.');
                }}
                variants={staggerItem}
                whileHover={isPurchased ? { backgroundColor: 'rgba(255,255,255,0.08)', transition: { duration: 0.15 } } : {}}
              >
                <div className="tcg-curr-icon">{isPurchased ? '▶' : '🔒'}</div>
                <div className="tcg-curr-info">
                  <span className="tcg-curr-title">{video.title || video.videoTitle || `Lesson ${index + 1}`}</span>
                  <span className="tcg-curr-desc">{video.description || video.videoDescription ? (video.description || video.videoDescription).substring(0, 60) + '...' : 'Watch now'}</span>
                </div>
                <span className="tcg-curr-action">{isPurchased ? 'Watch' : 'Locked'}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default TemplateCenteredGlass;
