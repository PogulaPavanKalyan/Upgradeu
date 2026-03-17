import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Footer.css";

const TRENDING = [
  { label: "Web Development", path: "/Courses" },
  { label: "JavaScript", path: "/javascriptinfo" },
  { label: "React JS", path: "/reactinfo" },
  { label: "Angular", path: "/angularinfo" },
  { label: "Java", path: "/javainfo" },
  { label: "Node JS", path: "/nodejsinfo" },
  { label: "MongoDB", path: "/mongodbinfo" },
  { label: "Python", path: "/pythoninfo" },
  { label: "Data Science", path: "/datascienceinfo" },
  { label: "Machine Learning", path: "/machinelearninginfo" },
  { label: "ChatGPT & AI", path: "/chatgptinfo" },
  { label: "Amazon AWS", path: "/awsinfo" },
  { label: "Microsoft Azure", path: "/azureinfo" },
  { label: "Kubernetes", path: "/kubernetesinfo" },
  { label: "Cybersecurity", path: "/cybersecurityinfo" },
  { label: "Digital Marketing", path: "/digitalmarketinginfo" },
  { label: "Project Management", path: "/projectmanagementinfo" },
  { label: "Microsoft Excel", path: "/excelinfo" },
  { label: "Power BI", path: "/powerbiinfo" },
  { label: "Full Stack", path: "/Courses" },
];

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed with ${email}!`);
      setEmail("");
    }
  };

  return (
    <>
      {/* ─── MAIN FOOTER ─── */}
      <footer className="pf-footer">
        <div className="pf-container">

          {/* ── Brand Column ── */}
          <div className="pf-col pf-brand-col">
            <div className="pf-logo">Upgrade<span>U</span></div>
            <p className="pf-tagline">
              Empowering careers with industry-aligned courses, expert mentors, and real-world projects.
            </p>
            {/* Social Icons — horizontal row */}
            <div className="pf-socials">
              <a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/" target="_blank" rel="noreferrer" className="pf-icon-btn" title="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://youtube.com/@rrtalktrends" target="_blank" rel="noreferrer" className="pf-icon-btn" title="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#0f172a" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
              <a href="https://www.instagram.com/ygrgobalitservices" target="_blank" rel="noreferrer" className="pf-icon-btn" title="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>

            {/* App Store Badges */}
            <div className="pf-app-badges">
              <span className="pf-heading-sm">Get our Mobile App</span>
              <div className="pf-badge-row">
                <a href="#playstore" className="pf-app-link">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="app-badge-img" />
                </a>
                <a href="#appstore" className="pf-app-link">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="app-badge-img" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Platform ── */}
          <div className="pf-col">
            <h4 className="pf-heading">Platform</h4>
            <ul className="pf-list">
              <li onClick={() => navigate("/Aboutus")}>About Us</li>
              <li onClick={() => navigate("/GetBlogs")}>Blog &amp; Insights</li>
              <li onClick={() => navigate("/Contactform")}>Careers &amp; Teaching</li>
              <li onClick={() => navigate("/Contactform")}>Plans &amp; Pricing</li>
              <li onClick={() => navigate("/Contactform")}>Contact Support</li>
            </ul>
          </div>

          {/* ── Popular Domains ── */}
          <div className="pf-col">
            <h4 className="pf-heading">Popular Domains</h4>
            <ul className="pf-list">
              <li onClick={() => navigate("/Courses")}>Web Development</li>
              <li onClick={() => navigate("/pythoninfo")}>Python &amp; Data Science</li>
              <li onClick={() => navigate("/chatgptinfo")}>AI &amp; Machine Learning</li>
              <li onClick={() => navigate("/awsinfo")}>Cloud &amp; DevOps</li>
              <li onClick={() => navigate("/digitalmarketinginfo")}>Digital Marketing</li>
              <li onClick={() => navigate("/Courses")} className="pf-view-all">View All Courses →</li>
            </ul>
          </div>

          {/* ── Legal ── */}
          <div className="pf-col">
            <h4 className="pf-heading">Legal &amp; Support</h4>
            <ul className="pf-list">
              <li onClick={() => navigate("/termsofuses")}>Terms of Use</li>
              <li onClick={() => navigate("/legal-protection")}>Privacy Policy</li>
              <li onClick={() => navigate("/RefundPolicy")}>Refund Policy</li>
              <li onClick={() => navigate("/accessibility")}>Accessibility</li>
              <li onClick={() => navigate("/sitemap")}>Sitemap</li>
            </ul>
          </div>

        </div>

        {/* ── Inner Divider + Trending ── */}
        <div className="pf-trending-wrap">
          <span className="pf-trending-label">TRENDING DOMAINS</span>
          <div className="pf-trending-links">
            {TRENDING.map((item, i) => (
              <span key={item.label}>
                <span className="pf-tlink" onClick={() => navigate(item.path)}>{item.label}</span>
                {i < TRENDING.length - 1 && <span className="pf-tsep"> | </span>}
              </span>
            ))}
          </div>
        </div>
      </footer>

      {/* ─── BOTTOM BAR ─── */}
      <div className="pf-bottom">
        <div className="pf-bottom-inner">
          <p>© 2025 <strong>UpgradeU</strong>. All rights reserved.</p>
          <a href="https://www.ygrgobalitservices.com/" target="_blank" rel="noreferrer" className="pf-credit">
            Designed by <strong>YGR GOBAL IT SERVICES Pvt. Ltd.</strong>
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;