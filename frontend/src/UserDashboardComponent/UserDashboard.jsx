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
import NavBar from "../UserDashboardComponent/NavBar";
import Faq from "../Components/Faq";
import CarouselImages from "./CrouselImages";
import SuccessStories from "../Components/SuccessStories";
import Reviews from "../Components/Reviews";
import Certificates from "../Components/Certificates";
import { useAuth } from "../Components/Authprovider";
import BaseUrl from "../Components/BaseUrl";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
};




const UserDashboard = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [userName, setUserName] = useState("");
  const [showNotification, setShowNotification] = useState(false);


  const [showChat, setShowChat] = useState(false);

  { showChat && <Chatbot onClose={() => setShowChat(false)} /> }

  const [step, setStep] = useState(0);

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
    // Show notification after a short delay
    const timer = setTimeout(() => setShowNotification(true), 2000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <>

      <NavBar />
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








      </div>




      <CourseListings />
      <WhyChooseUpgradeU />
      <SuccessStories />
      <Reviews />
      <Certificates />















      <button
        className="help-fab"
        aria-label="Help"
        type="button"
        onClick={() => setShowChat(!showChat)}
      >
        💬
      </button>

      {showChat && (
        <div className="box">
          <Chatbot onClose={() => setShowChat(false)} />
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











      {/* FOOTER */}
      <footer className="footer">

        {/* Column 1: Brand & About */}
        <div className="footer-section brand-section">
          <h3>UpgradeU</h3>
          <p className="footer-desc">
            Empowering professional growth with industry-leading courses and certifications.
            Learn, apply, and upgrade your career today.
          </p>
          <div className="social-links-text">
            <span><a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/" target="blank">LinkedIN</a></span> | <span> <a href="https://youtube.com/@rrtalktrends?si=ePSFA_O-lA0-YLqH" target="blank">YouTube</a></span> | <span > <a href="https://www.instagram.com/ygrgobalitservices?igsh=bGpkY3Rscmt0OWN4" target="blank">Instagram</a></span>
          </div>
        </div>

        {/* Column 2: Platform & Company */}
        <div className="footer-section">
          <h3>Platform</h3>
          <p onClick={() => navigate(`/Aboutus`)}>About Us</p>
          <p onClick={() => navigate(`/GetBlogs`)}>Blog & Insights</p>
          <p onClick={() => navigate(`/Contactform`)}>Careers & Teaching</p>
          <p onClick={() => navigate(`/Contactform`)}>Plans & Pricing</p>
          <p onClick={() => navigate(`/Contactform`)}>Contact Support</p>
        </div>

        {/* Column 3: Popular Domains (Interactive) */}
        <div className="footer-section">
          <h3>Trending Domains</h3>

          {/* Web Development Dropdown */}
          <div className="footer-dropdown">
            <p className="footer-dropdown-trigger" onClick={() => toggleDropdown('web')}>
              Web & Full Stack {activeDropdown === 'web' ? '▲' : '▼'}
            </p>
            <div className={`footer-dropdown-content ${activeDropdown === 'web' ? 'active' : ''}`}>
              <p onClick={() => navigate(`/Courses`)}>Web Development</p>
              <p onClick={() => navigate(`/javascriptinfo`)}>JavaScript</p>
              <p onClick={() => navigate(`/reactinfo`)}>React JS</p>
              <p onClick={() => navigate(`/angularinfo`)}>Angular</p>
              <p onClick={() => navigate(`/javainfo`)}>Java</p>
              <p onClick={() => navigate(`/nodejsinfo`)}>Node JS</p>
              <p onClick={() => navigate(`/mongodbinfo`)}>MongoDB</p>
            </div>
          </div>

          {/* Data Science Dropdown */}
          <div className="footer-dropdown">
            <p className="footer-dropdown-trigger" onClick={() => toggleDropdown('data')}>
              Data Science & AI {activeDropdown === 'data' ? '▲' : '▼'}
            </p>
            <div className={`footer-dropdown-content ${activeDropdown === 'data' ? 'active' : ''}`}>
              <p onClick={() => navigate(`/datascienceinfo`)}>Data Science</p>
              <p onClick={() => navigate(`/pythoninfo`)}>Python</p>
              <p onClick={() => navigate(`/machinelearninginfo`)}>Machine Learning</p>
              <p onClick={() => navigate(`/chatgptinfo`)}>ChatGPT</p>
            </div>
          </div>

          {/* Cloud Computing Dropdown */}
          <div className="footer-dropdown">
            <p className="footer-dropdown-trigger" onClick={() => toggleDropdown('cloud')}>
              Cloud Computing {activeDropdown === 'cloud' ? '▲' : '▼'}
            </p>
            <div className={`footer-dropdown-content ${activeDropdown === 'cloud' ? 'active' : ''}`}>
              <p onClick={() => navigate(`/awsinfo`)}>Amazon AWS</p>
              <p onClick={() => navigate(`/azureinfo`)}>Microsoft Azure</p>
              <p onClick={() => navigate(`/kubernetesinfo`)}>Kubernetes</p>
              <p onClick={() => navigate(`/cybersecurityinfo`)}>Cybersecurity</p>
            </div>
          </div>

          {/* Business & Marketing Dropdown */}
          <div className="footer-dropdown">
            <p className="footer-dropdown-trigger" onClick={() => toggleDropdown('business')}>
              Business & Marketing {activeDropdown === 'business' ? '▲' : '▼'}
            </p>
            <div className={`footer-dropdown-content ${activeDropdown === 'business' ? 'active' : ''}`}>
              <p onClick={() => navigate(`/digitalmarketinginfo`)}>Digital Marketing</p>
              <p onClick={() => navigate(`/projectmanagementinfo`)}>Project Management</p>
              <p onClick={() => navigate(`/excelinfo`)}>Microsoft Excel</p>
              <p onClick={() => navigate(`/powerbiinfo`)}>Power BI</p>
            </div>
          </div>

          <p onClick={() => navigate(`/Courses`)} className="highlight-link">View All Courses →</p>
        </div>

        {/* Column 4: Legal & Policy */}
        <div className="footer-section">
          <h3>Legal & Support</h3>
          <p onClick={() => navigate(`/termsofuses`)}>Terms of Use</p>
          <p onClick={() => navigate(`/legal-protection`)}>Privacy Policy</p>
          <p onClick={() => navigate(`/RefundPolicy`)}>Refund Policy</p>
          <p onClick={() => navigate(`/accessibility`)}>Accessibility</p>
          <p onClick={() => navigate(`/sitemap`)}>Sitemap</p>
        </div>

      </footer>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2025 <strong>UpgradeU</strong>. All Rights Reserved.</p>
          <p className="designer-credit">Designed By <strong>YGR GOBAL IT SERVICES.pvt.ltd,2023</strong></p>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
