import React, { useRef, useEffect } from "react";
import profileImg from "../assets/images/rrtalks.jpg";
import rrtraining from "../assets/images/rrtraining.png";
import upgrade from "../assets/images/upgrade.jpeg";
import "../Styles/UserDasboard.css";

const IndustryCollaborations = () => {
    const scrollRef = useRef(null);

    // Auto-scroll logic for mobile
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollAmount = 0;

        const interval = setInterval(() => {
            // Only auto-scroll on mobile where grid becomes flex/carousel
            if (window.innerWidth <= 768) {
                if (!scrollContainer.firstChild) return;

                const cardWidth = scrollContainer.firstChild.offsetWidth + 24; // width + gap
                const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

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
        <section className="collab">
            <div className="mb-5 text-center">
                <h2 className="collab-title">Industry Collaborations</h2>
                <p className="collab-desc">
                    We work closely with trusted industry partners to deliver
                    real-world training and career-oriented learning.
                </p>
            </div>

            <div className="row gy-4 cards4" ref={scrollRef}>
                <div className="col-12 col-md-6 col-lg-5 collab-card-wrapper">
                    <a href="https://ygrgobalitservices.com/" target="_blank" rel="noopener noreferrer">
                        <div className="corp-card corp-left corp-blue icon-right">
                            <div className="corp-text">
                                <h6>YGR Global IT Services</h6>
                                <p>Industry collaboration, live projects,enterprise IT exposure.</p>
                            </div>
                            <img src={rrtraining} alt="YGR Global IT Services" />
                        </div>
                    </a>
                </div>

                <div className="col-12 col-md-6 col-lg-5 collab-card-wrapper">
                    <a href="https://ygrittraining.ygrgobalitservices.com/" target="_blank" rel="noopener noreferrer">
                        <div className="corp-card corp-right corp-orange icon-left">
                            <img src={rrtraining} alt="RR IT Trainings" />
                            <div className="corp-text">
                                <h6>RR IT Trainings</h6>
                                <p>Job-oriented technical training with mentor support.</p>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-12 col-md-6 col-lg-5 collab-card-wrapper">
                    <a href="https://youtube.com/@rrtalktrends?si=P_NbBgkCfE_Aj2kP" target="_blank" rel="noopener noreferrer">
                        <div className="corp-card corp-left corp-green icon-right">
                            <div className="corp-text">
                                <h6>RR Talks (YouTube)</h6>
                                <p>Career guidance, interviews, and industry awareness content.</p>
                            </div>
                            <img src={profileImg} alt="RR Talks" />
                        </div>
                    </a>
                </div>

                <div className="col-12 col-md-6 col-lg-5 collab-card-wrapper">
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
    );
};

export default IndustryCollaborations;
