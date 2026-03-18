import React from 'react';
import '../../Styles/TemplateSidebarCard.css';

const TemplateSidebarCard = ({ course, courseData, isPurchased, alreadyInCart, imageUrl, videos, buyCourse, handleAddToCart, navigate, id }) => {
  return (
    <div className="tsc-page">

      {/* ===== FULL WIDTH DARK HERO ===== */}
      <div className="tsc-hero-wrapper" style={{
        background: `linear-gradient(to right, var(--hero-start) 0%, var(--hero-end) 100%)`
      }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 tsc-hero-text py-5">
              <p className="tsc-breadcrumb">{course.category} · Course</p>
              <h1 className="tsc-hero-title">
                {courseData.heroTagline || course.title}
              </h1>
              <p className="tsc-hero-subtitle">{course.description || 'Master the skills that top companies are hiring for right now.'}</p>
              <div className="tsc-hero-badges">
                <span className="tsc-badge">⭐ 4.9 Rating</span>
                <span className="tsc-badge">👥 5,000+ Students</span>
                <span className="tsc-badge">🕐 {course.course_duration}</span>
                <span className="tsc-badge">📡 {course.mode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== OVERLAPPING TWO-COLUMN LAYOUT ===== */}
      <div className="container tsc-main-layout">
        <div className="row g-4">

          {/* LEFT CONTENT COLUMN */}
          <div className="col-lg-8">

            {/* Before / After */}
            <div className="tsc-section">
              <h2 className="tsc-section-title">You Are In The Right Place If...</h2>
              <div className="tsc-splitbox-row">
                <div className="tsc-splitbox tsc-splitbox-before">
                  <div className="tsc-splitbox-header"><span>❌</span> Before</div>
                  {courseData.beforePoints.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className="tsc-splitbox tsc-splitbox-after">
                  <div className="tsc-splitbox-header"><span>✅</span> After UpgradeU</div>
                  {courseData.afterPoints.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="tsc-section">
              <h2 className="tsc-section-title">Skills You'll Master</h2>
              <div className="tsc-learn-grid">
                {courseData.learnList.map((p, i) => (
                  <div className="tsc-learn-item" key={i}><span className="tsc-check">✔</span><span>{p}</span></div>
                ))}
              </div>
            </div>

            {/* Methodology */}
            <div className="tsc-section">
              <h2 className="tsc-section-title">How We Teach</h2>
              <div className="tsc-method-grid">
                {courseData.methodology.map((m, i) => (
                  <div className="tsc-method-card" key={i}>
                    <div className="tsc-method-icon">{m.icon}</div>
                    <h5>{m.title}</h5>
                    <p>{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="tsc-section">
              <h2 className="tsc-section-title">Projects You'll Build</h2>
              <div className="tsc-projects-list">
                {courseData.projects.map((p, i) => (
                  <div className="tsc-project-row" key={i}>
                    <div className="tsc-proj-icon">{p.icon}</div>
                    <div>
                      <h5>{p.title}</h5>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="tsc-section">
              <h2 className="tsc-section-title">What Our Students Say</h2>
              <div className="tsc-testimonials-grid">
                {courseData.testimonials?.map((t, i) => (
                  <div className="tsc-testimonial-card" key={i}>
                    <div className="tsc-stars">★★★★★</div>
                    <p>"{t.review}"</p>
                    <div className="tsc-reviewer">
                      <div className="tsc-avatar">{t.name.charAt(0)}</div>
                      <div><strong>{t.name}</strong><br /><small>{t.role}</small></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="tsc-section">
              <h2 className="tsc-section-title">Frequently Asked Questions</h2>
              {courseData.faqs?.map((f, i) => (
                <div className="tsc-faq-item" key={i}>
                  <h5>❓ {f.q}</h5>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>

            {/* Curriculum */}
            <div className="tsc-section mb-5">
              <h2 className="tsc-section-title">Course Curriculum ({videos.length} Lessons)</h2>
              <div className="curriculum-list">
                {videos.length === 0 ? <p>No videos uploaded yet.</p> : videos.map((video, index) => (
                  <div key={video.videoId} className={`curriculum-item ${isPurchased ? 'unlocked' : 'locked'}`}
                    onClick={() => { if (isPurchased) navigate(`/SingleCourse/${id}?videoId=${video.videoId}`); else alert('Please purchase to unlock.'); }}>
                    <div className="curr-icon">{isPurchased ? '▶' : '🔒'}</div>
                    <div className="curr-info">
                      <span className="curr-title">{video.videoTitle || `Lesson ${index + 1}`}</span>
                      <span className="curr-desc-preview">{video.videoDescription ? video.videoDescription.substring(0, 50) + '...' : 'Watch now'}</span>
                    </div>
                    <span className="curr-action">{isPurchased ? 'Watch' : 'Locked'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT STICKY CARD */}
          <div className="col-lg-4">
            <div className="tsc-buy-card sticky-top">
              <div className="tsc-card-image">
                <img src={imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600'} alt={course.title} />
              </div>
              <div className="tsc-card-body">
                <div className="tsc-price-area">
                  <span className="tsc-price">₹{course.price}</span>
                  {course.price > 0 && <span className="tsc-emi">EMI Available</span>}
                </div>
                {!isPurchased ? (
                  <>
                    <button className="tsc-enroll-btn" onClick={buyCourse}>Enroll Now</button>
                    <button className="tsc-cart-btn" onClick={() => handleAddToCart(course.id)} disabled={alreadyInCart}>
                      {alreadyInCart ? 'Added to Cart ✓' : 'Add to Cart'}
                    </button>
                  </>
                ) : (
                  <button className="tsc-enroll-btn" onClick={() => navigate(`/SingleCourse/${course.id}`)}>Start Learning ▶</button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSidebarCard;
