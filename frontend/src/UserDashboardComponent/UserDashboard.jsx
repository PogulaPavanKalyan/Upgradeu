import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import "../Styles/UserDasboard.css";


import profileImg from "../assets/images/rrtalks.jpg";
import rrtraining from "../assets/images/rrtraining.png";
import upgrade from "../assets/images/upgrade.jpeg"


import Chatbot from "./Chatbot"
import "../Styles/WhyChooseUpgradeU.css";



import { useNavigate } from "react-router-dom";

import WhyChooseUpgradeU from "./WhyChooseUpgradeU";
import CourseListings from "./CourseListings";


import Faq from "../Components/Faq";
import CarouselImages from "./CrouselImages";
import SuccessStories from "../Components/SuccessStories";
import Reviews from "../Components/Reviews";
import Certificates from "../Components/Certificates";
import { useAuth } from "../Components/Authprovider";
import BaseUrl from "../Components/BaseUrl";

// ─── Stats Bar ────────────────────────────────────────────────
const stats = [
  { icon: "👨‍🎓", end: 1, suffix: "M+", label: "Active Learners" },
  { icon: "✅",  end: 95, suffix: "%",  label: "Success Rate" },
  { icon: "⭐",  end: 4.8, suffix: "/5", label: "Google Rating", decimal: true },
  { icon: "💻",  end: 100, suffix: "% Live", label: "Training" },
];

const StatsBar = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        stats.forEach((s, i) => {
          const duration = 1800;
          const steps = 60;
          const increment = s.end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= s.end) { current = s.end; clearInterval(timer); }
            setCounts(prev => {
              const next = [...prev];
              next[i] = s.decimal ? parseFloat(current.toFixed(1)) : Math.floor(current);
              return next;
            });
          }, duration / steps);
        });
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="stats-bar" ref={ref}>
      {stats.map((s, i) => (
        <div className="stat-item" key={i}>
          <span className="stat-icon">{s.icon}</span>
          <div className="stat-content">
            <span className="stat-number">{counts[i]}{s.suffix}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Hiring Partners ──────────────────────────────────────────
const hiringPartners = [
  { name: "TCS",           domain: "tcs.com" },
  { name: "Infosys",       domain: "infosys.com" },
  { name: "Wipro",         domain: "wipro.com" },
  { name: "HCL",           domain: "hcltech.com" },
  { name: "Cognizant",     domain: "cognizant.com" },
  { name: "Accenture",     domain: "accenture.com" },
  { name: "IBM",           domain: "ibm.com" },
  { name: "Capgemini",     domain: "capgemini.com" },
  { name: "Tech Mahindra", domain: "techmahindra.com" },
  { name: "Deloitte",      domain: "deloitte.com" },
  { name: "Mphasis",       domain: "mphasis.com" },
  { name: "Mindtree",      domain: "mindtree.com" },
];

const HiringPartners = () => (
  <section className="hiring-section">
    <div className="hiring-header">
      <h2 className="hiring-title">Our Students Work At</h2>
      <p className="hiring-sub">Top companies hire UpgradeU graduates</p>
    </div>
    <div className="marquee-track-wrapper">
      <div className="marquee-track">
        {[...hiringPartners, ...hiringPartners].map((p, i) => (
          <div className="partner-chip" key={i}>
            <img
              src={`https://logo.clearbit.com/${p.domain}`}
              alt={p.name}
              onError={e => { e.target.style.display = "none"; }}
            />
            <span>{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);


const UserDashboard = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [userName, setUserName] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showChat, setShowChat] = useState(false);

  // Footer Dropdown State
  const [activeDropdown, setActiveDropdown] = useState(null);
  const toggleDropdown = (section) => {
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  useEffect(() => {
    if (token) {
      BaseUrl.get("/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setUserName(res.data.name || "User");
        })
        .catch(err => {
          console.error("Error fetching profile for greeting:", err);
          setUserName("User");
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      BaseUrl.get("/mypaymentuser", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          const courses = res.data.map(item => item.course);
          setEnrolledCourses(courses);
        })
        .catch(err => console.error("Error fetching enrolled courses:", err));
    }
  }, [token]);

  useEffect(() => {
    // Show notification after a short delay
    const timer = setTimeout(() => setShowNotification(true), 2000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <>

      {showNotification && (
        <div className="feedback-notification">
          <div className="notification-content">
            <span className="bell-icon">🔔</span>
            <div className="text-content">
              <h4>We value your feedback!</h4>
              <p>How was your experience today?</p>
            </div>
            <div className="action-buttons">
              <button className="notif-btn primary" onClick={() => setShowNotification(false)}>Great!</button>
              <button className="notif-close" onClick={() => setShowNotification(false)}><X size={18} /></button>
            </div>
          </div>
        </div>
      )}
      <div className="body">

        <CarouselImages userName={userName} />
        <StatsBar />

        {enrolledCourses.length > 0 && (
          <div className="continue-watching-container">
            <div className="continue-watching-section">
              <div className="cw-header">
                <h3>Continue Watching</h3>
                <span className="cw-tag">In Progress</span>
              </div>
              <div className="cw-card" onClick={() => navigate(`/SingleCourse/${enrolledCourses[0].id}`)}>
                <div className="cw-img-wrapper">
                  <img 
                    src={`${BaseUrl.defaults.baseURL}/getimage/${enrolledCourses[0].id}`} 
                    alt={enrolledCourses[0].title} 
                    onError={(e) => {
                      e.target.src = upgrade;
                    }}
                  />
                  <div className="cw-play-overlay">
                    <div className="play-icon-box">▶</div>
                  </div>
                </div>
                <div className="cw-details">
                  <h4>{enrolledCourses[0].title}</h4>
                  <p>{enrolledCourses[0].category || "Professional Course"}</p>
                  <button className="cw-btn">
                    Resume Learning
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}








      </div>




      <CourseListings />
      <WhyChooseUpgradeU />
      <SuccessStories />
      <HiringPartners />
      <Reviews />
      <Certificates />















      <button
        className="help-fab"
        aria-label="Help"
        type="button"
        onClick={() => {
          if (!token) {
            alert("Please login to use the support chat.");
            navigate("/login");
          } else {
            setShowChat(!showChat);
          }
        }}
      >
        💬
      </button>

      {showChat && (
        <div className="box">
          <Chatbot onClose={() => setShowChat(false)} userName={userName} />
        </div>
      )}














      <section className="collab" >
        <div className="mb-5 text-center">
          <h2 className="collab-title">Industry Collaborations</h2>
          <p className="collab-desc">
            We work closely with trusted industry partners to deliver
            real-world training and career-oriented learning.
          </p>
        </div>

        <div className="row gy-4 cards4">

          <div className="col-12 col-md-6 col-lg-5">
            <a href="https://ygrgobalitservices.com/" target="_blank">
              <div className="corp-card corp-left corp-blue icon-right" >


                <div className="corp-text">
                  <h6>YGR Global IT Services</h6>
                  <p>Industry collaboration, live projects,enterprise IT exposure.</p>
                </div>
                <img src={rrtraining} alt="YGR Global IT Services" />

              </div>
            </a>
          </div>

          <div className="col-12 col-md-6 col-lg-5" >
            <a href="https://ygrittraining.ygrgobalitservices.com/" target="_blank">
              <div className="corp-card corp-right corp-orange icon-left">
                <img src={rrtraining} alt="RR IT Trainings" />
                <div className="corp-text">
                  <h6>RR IT Trainings</h6>
                  <p>Job-oriented technical training with mentor support.</p>
                </div>
              </div>
            </a>
          </div>

          <div className="col-12 col-md-6 col-lg-5">
            <a href="https://youtube.com/@rrtalktrends?si=P_NbBgkCfE_Aj2kP" target="_blank">
              <div className="corp-card corp-left corp-green icon-right">
                <div className="corp-text">
                  <h6>RR Talks (YouTube)</h6>
                  <p>Career guidance, interviews, and industry awareness content.</p>
                </div>
                <img src={profileImg} alt="RR Talks" />
              </div>
            </a>
          </div>

          <div className="col-12 col-md-6 col-lg-5">
            <div className="corp-card corp-right corp-purple icon-left">
              <img src={upgrade} alt="UpgradeU LMS" />
              <div className="corp-text">
                <h6>UpgradeU LMS</h6>
                <p>Assessments, progress tracking, and verified certifications.</p>
              </div>
            </div>
          </div>

        </div>



      </section>








      <section className="soft-roadmap">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="soft-title">A Roadmap to Skill Development</h2>
            <p className="soft-subtitle">
              A smooth, structured learning journey designed for students and early professionals.
            </p>
          </div>

          <div className="row g-4 justify-content-center">

            <div className="col-lg-4 col-md-6">
              <div className="soft-card">
                <div className="soft-icon">🔍</div>
                <h5>Discover</h5>
                <p>Explore career paths and identify the skills that matter.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="soft-card">
                <div className="soft-icon">📘</div>
                <h5>Select Course</h5>
                <p>Choose a structured program aligned with your goals.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="soft-card highlight">
                <div className="soft-icon">🎓</div>
                <h5>Learn & Practice</h5>
                <p>Build skills through guided lessons and hands-on projects.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="soft-card">
                <div className="soft-icon">🛠</div>
                <h5>Apply Skills</h5>
                <p>Work on real-world problems with mentor support.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="soft-card final">
                <div className="soft-icon">🏆</div>
                <h5>Certification</h5>
                <p>Earn recognition and become job-ready.</p>
              </div>
            </div>

          </div>
        </div>
      </section>





      <Faq />











    </>
  );
};

export default UserDashboard;
