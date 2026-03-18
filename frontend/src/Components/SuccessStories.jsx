import React, { useEffect, useRef } from "react";
import "../Styles/SuccessStories.css";

import gopiProfile from "../assets/SuccessImages/gopi.jpeg";
import rrtrainingLogo from "../assets/SuccessImages/rrtraining.png";
import lokeshProfile from "../assets/SuccessImages/lokesh.jpg";
import wiproLogo from "../assets/SuccessImages/wipro.jpg";
import maheshProfile from "../assets/SuccessImages/mahesh.jpg";
import hclLogo from "../assets/SuccessImages/hcl.jpg";
import ramuProfile from "../assets/SuccessImages/ramu.jpg";
import infosysLogo from "../assets/SuccessImages/infosys.jpeg";

const data = [
  {
    name: "venkata Gopi Pathi",
    profile: gopiProfile,
    company: rrtrainingLogo,
    before: "Python Automation",
    after: "system Engineer",
    bg: "blue"
  },
  {
    name: "lokesh Reddy Ogirala",
    profile: lokeshProfile,
    company: wiproLogo,
    before: "Fresher",
    after: "Software Developer",
    bg: "yellow"
  },
  {
    name: "Mahesh  Vennapusala",
    profile: maheshProfile,
    company: hclLogo,
    before: "python Intern",
    after: "Python developer",
    bg: "pink"
  },
  {
    name: "Ramu Bhuvanaboina",
    profile: ramuProfile,
    company: infosysLogo,
    before: "System Engineer",
    after: "Associate Consultant",
    bg: "purple"
  }
];

const LearnerSuccess = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const cardWidth = scrollContainer.firstChild ? scrollContainer.firstChild.offsetWidth + 16 : 300; // card width + gap
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const interval = setInterval(() => {
      // Only auto-scroll on mobile where horizontal scroll is active
      if (window.innerWidth <= 600) {
        if (scrollAmount >= maxScroll) {
          scrollAmount = 0;
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollAmount += cardWidth;
          scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="ls-section">
      <h2 className="ls-title">THEY CHOSE TO LEARN. THEY CHOSE TO GROW. <br />
        THEY SUCCEEDED.
        WILL YOU BE NEXT?</h2>

      <div className="ls-wrapper">
        <button className="nav-btn left">‹</button>

        <div className="ls-cards" ref={scrollRef}>
          {data.map((item, i) => (
            <div className={`ls-card ${item.bg}`} key={i}>
              {/* PROFILE IMAGE */}
              <img
                className="ls-profile-img"
                src={item.profile}
                alt={item.name}
              />

              <h3 className="ls-name">{item.name}</h3>

              <img
                className="company"
                src={item.company}
                alt="company"
              />

              <div className="before">{item.before}</div>

              {/* FLOW ROW */}
              <div className="flow-row">
                <div className="flow-left">
                  <div className="flow-icon">↻</div>
                  <div className="flow-line"></div>
                </div>

                <span className="flow-text">After UpgradeU</span>
              </div>

              <div className="after">{item.after}</div>
            </div>
          ))}
        </div>

        <button className="nav-btn right">›</button>
      </div>
    </section>
  );
};

export default LearnerSuccess;
