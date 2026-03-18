import React from 'react';
import '../../Styles/TemplateSplitHero.css';

const TemplateSplitHero = ({ course, courseData, isPurchased, alreadyInCart, imageUrl, videos, buyCourse, handleAddToCart, navigate, id }) => {
  return (
    <div className="tsh-page">

      {/* ===== SPLIT HERO: text left, image right ===== */}
      <div className="tsh-hero" style={{
        background: `linear-gradient(135deg, var(--hero-start) 0%, var(--hero-end) 100%)`
      }}>
        <div className="container tsh-hero-inner">
          {/* LEFT */}
          <div className="tsh-hero-left">
            <span className="tsh-category-pill">{course.category}</span>
            <h1 className="tsh-hero-title">
              {courseData.heroTagline || course.title}
            </h1>
            <p className="tsh-hero-desc">{course.description || 'A career-changing program built by industry professionals.'}</p>

            <div className="tsh-stats-row">
              <div className="tsh-stat"><strong>5,000+</strong><span>Students Enrolled</span></div>
              <div className="tsh-stat"><strong>4.9 ★</strong><span>Average Rating</span></div>
              <div className="tsh-stat"><strong>100%</strong><span>Placement Support</span></div>
            </div>

            <div className="tsh-cta-row">
              {!isPurchased ? (
                <>
                  <button className="tsh-btn tsh-btn-primary" onClick={buyCourse}>Enroll Now →</button>
                  <button className="tsh-btn tsh-btn-secondary" onClick={() => handleAddToCart(course.id)} disabled={alreadyInCart}>
                    {alreadyInCart ? 'In Cart ✓' : 'Add to Cart'}
                  </button>
                </>
              ) : (
                <button className="tsh-btn tsh-btn-primary" onClick={() => navigate(`/SingleCourse/${course.id}`)}>Start Learning ▶</button>
              )}
            </div>

            <div className="tsh-price-tag">
              <span className="tsh-price">₹{course.price}</span>
              {course.price > 0 && <span className="tsh-offer">🎉 Code UPGRADE500 → ₹500 OFF</span>}
            </div>
          </div>

          {/* RIGHT – Course Image Card */}
          <div className="tsh-hero-right">
            <div className="tsh-image-card">
              <img src={imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600'} alt={course.title} />
              <div className="tsh-image-overlay">
                <span>📂 {videos.length} Lessons</span>
                <span>🕐 {course.course_duration}</span>
                <span>📡 {course.mode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container tsh-content mt-5">

        {/* Before / After */}
        <div className="tsh-section">
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
        </div>

        {/* What You'll Learn */}
        <div className="tsh-section tsh-learn-section">
          <h2 className="tsh-section-title">What You'll Learn</h2>
          <div className="tsh-learn-grid">
            {courseData.learnList.map((p, i) => (
              <div className="tsh-learn-item" key={i}>
                <span className="tsh-bullet">●</span><span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Steps */}
        <div className="tsh-section">
          <h2 className="tsh-section-title">Your Learning Journey</h2>
          <div className="tsh-timeline">
            {courseData.methodology.map((m, i) => (
              <div className="tsh-timeline-step" key={i}>
                <div className="tsh-step-circle">{m.icon}</div>
                <div className="tsh-step-content">
                  <h5>{m.title}</h5>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="tsh-section">
          <h2 className="tsh-section-title">Capstone Projects</h2>
          <div className="tsh-projects-row">
            {courseData.projects.map((p, i) => (
              <div className="tsh-project-card" key={i}>
                <div className="tsh-proj-num">0{i + 1}</div>
                <div className="tsh-proj-icon">{p.icon}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="tsh-section tsh-testimonials-section">
          <h2 className="tsh-section-title">Alumni Spotlight</h2>
          <div className="tsh-testimonials-grid">
            {courseData.testimonials?.map((t, i) => (
              <div className="tsh-testimonial-card" key={i}>
                <div className="tsh-tcard-header">
                  <div className="tsh-t-avatar">{t.name.charAt(0)}</div>
                  <div><strong>{t.name}</strong><br /><small>{t.role}</small></div>
                </div>
                <p>"{t.review}"</p>
                <div className="tsh-stars">★★★★★</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="tsh-section">
          <h2 className="tsh-section-title">Got Questions?</h2>
          <div className="tsh-faq-grid">
            {courseData.faqs?.map((f, i) => (
              <div className="tsh-faq-card" key={i}>
                <h5>{f.q}</h5>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum */}
        <div className="tsh-section mb-5">
          <h2 className="tsh-section-title">Course Content ({videos.length} Lessons)</h2>
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
    </div>
  );
};

export default TemplateSplitHero;
