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











    </>
  );
};

export default UserDashboard;
