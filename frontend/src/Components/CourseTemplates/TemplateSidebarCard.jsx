import React from 'react';
import { motion } from 'framer-motion';
import '../../Styles/TemplateSidebarCard.css';

// ── UNIQUE SIDEBAR CARD ANIMATIONS (Snappy / Bouncy) ───────────
const SIDEBAR_EASE = "backOut";
const SIDEBAR_DUR = 0.6;

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const staggerItem = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: SIDEBAR_DUR, ease: SIDEBAR_EASE } }
};

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: SIDEBAR_DUR, ease: SIDEBAR_EASE, delay } }
});

const slideFromRight = {
  hidden: { opacity: 0, x: 80, scale: 0.9 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: "circOut", delay: 0.3 } }
};
// ─────────────────────────────────────────────────────────────────────────────

const TemplateSidebarCard = ({ course, courseData, isPurchased, alreadyInCart, imageUrl, videos, buyCourse, handleAddToCart, navigate, id }) => {

  return (
    <div className="tsc-page">
      {/* ===== HERO BACKGROUND AREA ===== */}
      <div
        className="tsc-hero-wrapper"
        style={{
          background: `linear-gradient(135deg, var(--hero-start, #0f172a) 0%, var(--hero-end, #1e293b) 100%)`
        }}
      >
        <div className="container">
          <div className="row">
            <motion.div
              className="col-lg-7 tsc-hero-text"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="tsc-breadcrumb" variants={staggerItem}>
                Home / Courses / {course.category || 'Professional'}
              </motion.div>
              
              <motion.h1 className="tsc-hero-title" variants={staggerItem}>
                {course.title || course.course_Name || 'Course'}
              </motion.h1>

              <motion.p className="tsc-hero-subtitle" variants={staggerItem}>
                {course.description || ''}
              </motion.p>

              <motion.div className="tsc-hero-badges" variants={staggerItem}>
                {course.course_duration && <span className="tsc-badge">🕐 {course.course_duration}</span>}
                {course.mode && <span className="tsc-badge">📡 {course.mode}</span>}
              </motion.div>
            </motion.div>
            <div className="col-lg-5">
              {/* Spacer for sticky card */}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN EXCLUSION ZONE & STICKY CARD ===== */}
      <div className="container tsc-main-layout">
        <div className="row">
          
          {/* LEFT CONTENT */}
          <div className="col-lg-7">
            
            {/* Split Box (Before/After) */}
            <motion.div className="tsc-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUp(0)}>
              <h2 className="tsc-section-title">Why This Program?</h2>
              <div className="tsc-splitbox-row">
                <div className="tsc-splitbox tsc-splitbox-before">
                  <div className="tsc-splitbox-header">Without UpgradeU</div>
                  {courseData.beforePoints.map((p, i) => <p key={i}>❌ {p}</p>)}
                </div>
                <div className="tsc-splitbox tsc-splitbox-after">
                  <div className="tsc-splitbox-header">With UpgradeU</div>
                  {courseData.afterPoints.map((p, i) => <p key={i}>✅ {p}</p>)}
                </div>
              </div>
            </motion.div>

            {/* Course Overview — New Fields */}
            <motion.div className="tsc-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
              <motion.h2 className="tsc-section-title" variants={staggerItem}>Course Overview</motion.h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <motion.div variants={staggerItem} style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ color: 'var(--primary-color)', marginBottom: '12px', fontWeight: 600 }}>🎯 Who Is This For?</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {courseData.targetAudience?.map((t, i) => (
                      <li key={i} style={{ marginBottom: '10px', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--primary-color)' }}>•</span>
                        <span style={{ color: '#475569', fontSize: '14px' }}>{t}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={staggerItem} style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ color: 'var(--primary-color)', marginBottom: '12px', fontWeight: 600 }}>💼 Career Outcomes</h4>
                  <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '10px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <motion.div variants={staggerItem} style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ color: 'var(--primary-color)', marginBottom: '12px', fontWeight: 600 }}>🛠️ Tools & Tech Stack</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {courseData.toolsCovered?.map((t, i) => (
                      <span key={i} style={{ background: '#fff', color: '#334155', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={staggerItem} style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ color: 'var(--primary-color)', marginBottom: '12px', fontWeight: 600 }}>📋 Prerequisites</h4>
                  <p style={{ color: '#475569', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{courseData.prerequisites}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Learn Grid */}
            <motion.div className="tsc-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
              <motion.h2 className="tsc-section-title" variants={staggerItem}>What You'll Master</motion.h2>
              <div className="tsc-learn-grid">
                {courseData.learnList.map((p, i) => (
                  <motion.div className="tsc-learn-item" key={i} variants={staggerItem}>
                    <span className="tsc-check">✔</span> <span>{p}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Methodology Grid */}
            <motion.div className="tsc-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
              <motion.h2 className="tsc-section-title" variants={staggerItem}>Our Approach</motion.h2>
              <div className="tsc-method-grid">
                {courseData.methodology.map((m, i) => (
                  <motion.div className="tsc-method-card" key={i} variants={staggerItem} whileHover={{ y: -4 }}>
                    <div className="tsc-method-icon">{m.icon}</div>
                    <h5>{m.title}</h5>
                    <p>{m.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div className="tsc-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
              <motion.h2 className="tsc-section-title" variants={staggerItem}>Real-World Projects</motion.h2>
              <div className="tsc-projects-list">
                {courseData.projects.map((p, i) => (
                  <motion.div className="tsc-project-row" key={i} variants={staggerItem} whileHover={{ x: 5 }}>
                    <div className="tsc-proj-icon">{p.icon}</div>
                    <div>
                      <h5>{p.title}</h5>
                      <p>{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div className="tsc-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
              <motion.h2 className="tsc-section-title" variants={staggerItem}>Student Reviews</motion.h2>
              <div className="tsc-testimonials-grid">
                {courseData.testimonials?.map((t, i) => (
                  <motion.div className="tsc-testimonial-card" key={i} variants={staggerItem}>
                    <div className="tsc-stars">★★★★★</div>
                    <p>"{t.review}"</p>
                    <div className="tsc-reviewer">
                      <div className="tsc-avatar">{t.name.charAt(0)}</div>
                      <div>
                        <strong>{t.name}</strong><br/>
                        <small>{t.role}</small>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div className="tsc-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
              <motion.h2 className="tsc-section-title" variants={staggerItem}>FAQs</motion.h2>
              {courseData.faqs?.map((f, i) => (
                <motion.div className="tsc-faq-item" key={i} variants={staggerItem}>
                  <h5>+ {f.q}</h5>
                  <p>{f.a}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Curriculum / Syllabus (FLAT LIST - NO ACCORDION) */}
            <motion.div className="tsc-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={staggerContainer}>
              <motion.h2 className="tsc-section-title" variants={staggerItem}>Syllabus</motion.h2>
              <motion.p style={{ marginBottom: '20px', color: '#64748b' }} variants={staggerItem}>
                {videos.length} total lessons
              </motion.p>
              
              <div className="curriculum-list">
                {videos.length === 0 ? (
                   <motion.p variants={staggerItem}>Syllabus updating soon.</motion.p>
                ) : videos.map((video, index) => (
                  <motion.div 
                    key={video.id || video.videoId || index}
                    className={`curriculum-item ${!isPurchased ? 'locked' : 'unlocked'}`}
                    onClick={() => {
                      if (isPurchased) navigate(`/SingleCourse/${id}?videoId=${video.id || video.videoId}`);
                      else alert('Please purchase to unlock.');
                    }}
                    variants={staggerItem}
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

          {/* RIGHT STICKY BUY CARD — slides in from right */}
          <div className="col-lg-4">
            <motion.div
              className="tsc-buy-card sticky-top"
              variants={slideFromRight}
              initial="hidden"
              animate="visible"
            >
              <div className="tsc-card-image">
                <motion.img
                  src={imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600'}
                  alt={course.title}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="tsc-card-body">
                <div className="tsc-price-area">
                  <span className="tsc-price">₹{course.price}</span>
                  {course.price > 0 && <span className="tsc-emi">EMI Available</span>}
                </div>
                {!isPurchased ? (
                  <>
                    <motion.button
                      className="tsc-enroll-btn"
                      onClick={buyCourse}
                      whileHover={{ scale: 1.03, boxShadow: '0 12px 30px rgba(0,0,0,0.25)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Enroll Now
                    </motion.button>
                    <motion.button
                      className="tsc-cart-btn"
                      onClick={() => handleAddToCart(course.id)}
                      disabled={alreadyInCart}
                      whileHover={!alreadyInCart ? { scale: 1.03 } : {}}
                      whileTap={!alreadyInCart ? { scale: 0.97 } : {}}
                    >
                      {alreadyInCart ? 'Added to Cart ✓' : 'Add to Cart'}
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    className="tsc-enroll-btn"
                    onClick={() => navigate(`/SingleCourse/${course.id}`)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Start Learning ▶
                  </motion.button>
                )}
                <p className="tsc-guarantee">✅ 100% Satisfaction Guaranteed</p>
                <ul className="tsc-includes">
                  <li>📺 Pre-recorded HD Video Lessons</li>
                  <li>⏳ 2 Years Course Access</li>
                  <li>💳 EMI Options Available</li>
                  <li>📄 Resume Building Support</li>
                  <li>💼 100% Placement Assistance</li>
                  <li>🏆 Verified Course Certificate</li>
                </ul>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TemplateSidebarCard;
