import React from 'react';
import '../../Styles/TemplateCenteredGlass.css';

const TemplateCenteredGlass = ({ course, courseData, isPurchased, alreadyInCart, imageUrl, videos, buyCourse, handleAddToCart, navigate, id }) => {
  return (
    <div className="tcg-page">
      {/* ===== CENTERED GLASSMORPHIC HERO ===== */}
      <section className="tcg-hero-section" style={{
        background: `linear-gradient(135deg, var(--hero-start) 30%, var(--hero-end) 100%)`
      }}>
        <div className="tcg-hero-container">
          <div className="tcg-top-badge">✨ Premium Course – High-Quality Pre-Recorded Lessons</div>

          <h1 className="tcg-hero-title">
            Become a Job-Ready <br />
            <span className="tcg-title-accent">{courseData.heroTagline || course.title}</span>
          </h1>

          <p className="tcg-hero-subtext">
            Go from zero to a job-ready <strong>professional</strong>. Built for{' '}
            <strong>beginners and career switchers</strong> with self-paced training, real projects,
            and full placement support.
          </p>

          {/* Info Boxes */}
          <div className="tcg-info-row">
            <div className="tcg-info-box">
              <div className="tcg-info-icon">📅</div>
              <div className="tcg-info-content">
                <span>Duration</span>
                <strong>{course.course_duration}</strong>
              </div>
            </div>
            <div className="tcg-info-box">
              <div className="tcg-info-icon">🕘</div>
              <div className="tcg-info-content">
                <span>Mode</span>
                <strong>{course.mode}</strong>
              </div>
            </div>
            <div className="tcg-info-box">
              <div className="tcg-info-icon">🏷️</div>
              <div className="tcg-info-content">
                <span>Price</span>
                <strong>₹{course.price}</strong>
              </div>
            </div>
          </div>

          {/* Offer Strip */}
          {course.price > 0 && (
            <div className="tcg-offer-strip">
              <span className="tcg-offer-label">🎉 Special Offer</span>
              <span className="tcg-offer-text">Flat ₹500 OFF · Code:</span>
              <span className="tcg-offer-code">UPGRADE500</span>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="tcg-button-row">
            {!isPurchased ? (
              <>
                <button onClick={buyCourse} className="tcg-btn tcg-btn-primary">Enroll Now →</button>
                <button onClick={() => handleAddToCart(course.id)} disabled={alreadyInCart} className="tcg-btn tcg-btn-secondary">
                  {alreadyInCart ? 'Already in Cart' : 'Add to Cart'}
                </button>
              </>
            ) : (
              <button onClick={() => navigate(`/SingleCourse/${course.id}`)} className="tcg-btn tcg-btn-primary">Start Learning ▶</button>
            )}
          </div>

          {/* Feature Cards */}
          <div className="tcg-feature-row">
            {[
              { icon: '💻', label: 'Self-Paced Learning' },
              { icon: '💼', label: 'Job Assistance' },
              { icon: '👨‍💻', label: 'Real Projects' },
              { icon: '🏆', label: 'Certification Prep' },
            ].map((f, i) => (
              <div className="tcg-feature-card" key={i}>
                <div className="tcg-feature-icon">{f.icon}</div>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container tcg-main-content mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Before / After */}
            <div className="course-section">
              <h3 className="section-header-centered">Your Career Transformation</h3>
              <div className="transform-container">
                <div className="transform-box before-box">
                  <h4>Before</h4>
                  <ul>{courseData.beforePoints.map((p, i) => <li key={i}>{p}</li>)}</ul>
                </div>
                <div className="transform-arrow">➔</div>
                <div className="transform-box after-box">
                  <h4>After UpgradeU</h4>
                  <ul>{courseData.afterPoints.map((p, i) => <li key={i}>{p}</li>)}</ul>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="course-section">
              <h3 className="section-header-centered">What you'll learn</h3>
              <ul className="learn-list">{courseData.learnList.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>

            {/* Methodology */}
            <div className="course-section">
              <h3 className="section-header-centered">Our Training Methodology</h3>
              <div className="method-grid">
                {courseData.methodology.map((m, i) => (
                  <div className="method-card" key={i}>
                    <div className="method-icon">{m.icon}</div>
                    <h5>{m.title}</h5>
                    <p>{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="course-section">
              <h3 className="section-header-centered">Real-World Projects You'll Build</h3>
              <div className="project-grid">
                {courseData.projects.map((p, i) => (
                  <div className="project-card" key={i}>
                    <div className="proj-icon">{p.icon}</div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="course-section">
              <h3 className="section-header-centered">Student Success Stories</h3>
              <div className="dynamic-testimonials">
                {courseData.testimonials?.map((t, i) => (
                  <div className="d-testimonial-card" key={i}>
                    <p>"{t.review}"</p>
                    <div className="d-user-info">
                      <div className="d-avatar">{t.name.charAt(0)}</div>
                      <div className="d-name"><h5>{t.name}</h5><span>{t.role}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="course-section">
              <h3 className="section-header-centered">Frequently Asked Questions</h3>
              <div className="faq-container">
                {courseData.faqs?.map((f, i) => (
                  <div className="faq-item" key={i}>
                    <h5 className="faq-question">Q: {f.q}</h5>
                    <p className="faq-answer">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="course-section mb-5">
              <h3 className="section-header-centered">Course Content</h3>
              <p className="small text-muted mb-3 text-center">{videos.length} lessons available</p>
              <div className="curriculum-list">
                {videos.length === 0 ? <p className="text-center">No videos uploaded yet.</p> : videos.map((video, index) => (
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
      </div>
    </div>
  );
};

export default TemplateCenteredGlass;
