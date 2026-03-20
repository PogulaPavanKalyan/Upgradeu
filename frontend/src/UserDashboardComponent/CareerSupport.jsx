import React, { useState } from "react";
import {
    Briefcase, TrendingUp, Users, ArrowRight, Award, FileText, Download, X, MessageCircle, Building2, Calendar, Target,
    Star, Quote, CheckCircle2, ShieldCheck, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../Styles/CareerSupport.css";
import { useNavigate } from "react-router-dom";

// Images
import atsResume from "../assets/images/ats_resume.png";
import upgradeImg from "../assets/images/upgrade.jpeg"; 
import certificateImg from "../assets/images/certifcate.jpg";

// ================= DUMMY DATA =================

const placementStats = [
    { title: "Highest Package", value: "32 LPA", icon: <TrendingUp size={28} /> },
    { title: "Average Package", value: "8.5 LPA", icon: <Briefcase size={28} /> },
    { title: "Alumni Placed", value: "15,000+", icon: <Users size={28} /> },
    { title: "Hiring Partners", value: "250+", icon: <Building2 size={28} /> }
];

const hiringPartners = [
    { name: "Google",       domain: "google.com" },
    { name: "Microsoft",    domain: "microsoft.com" },
    { name: "Amazon",       domain: "amazon.com" },
    { name: "IBM",          domain: "ibm.com" },
    { name: "Accenture",    domain: "accenture.com" },
    { name: "Infosys",      domain: "infosys.com" },
    { name: "TCS",          domain: "tcs.com" },
    { name: "Wipro",        domain: "wipro.com" },
    { name: "Cognizant",    domain: "cognizant.com" },
    { name: "Capgemini",    domain: "capgemini.com" },
    { name: "Deloitte",     domain: "deloitte.com" },
    { name: "HCL",          domain: "hcltech.com" },
    { name: "SAP",          domain: "sap.com" },
    { name: "Oracle",       domain: "oracle.com" },
    { name: "Cisco",        domain: "cisco.com" },
];

const topJobRoles = [
    { role: "Full Stack Developer", salary: "6 - 15 LPA", icon: <FileText size={24} /> },
    { role: "Data Scientist", salary: "8 - 18 LPA", icon: <TrendingUp size={24} /> },
    { role: "Cloud Architect", salary: "10 - 22 LPA", icon: <Building2 size={24} /> },
    { role: "DevOps Engineer", salary: "7 - 16 LPA", icon: <Target size={24} /> },
];

const careeGuaranteeFeatures = [
    "6 Months Post-Course Placement Support",
    "Dedicated Personal HR Contact",
    "Unlimited Mock Interviews",
    "Direct Referrals to Partner MNCs"
];

const successStories = [
    { name: "Rahul Sharma", company: "Amazon", role: "SDE-1", hike: "120% Hike", quote: "UpgradeU's mentorship completely changed my approach to DSA and system design. The mock interviews were exactly like the real thing." },
    { name: "Priya Patel", company: "TCS Digital", role: "System Engineer", hike: "First Job", quote: "The ATS resume templates and HR preparation guides helped me clear the TCS interview in my very first attempt!" },
    { name: "Amit Kumar", company: "Microsoft", role: "Cloud Engineer", hike: "85% Hike", quote: "I transitioned from a non-tech background to a FAANG company. The career roadmap here is genuinely world-class." },
];

const careerRoadmap = [
    { title: "Profile Building", subtitle: "PHASE 1", desc: "Build an ATS-optimized resume, optimize your LinkedIn, and curate a standout GitHub portfolio.", icon: <FileText size={28} /> },
    { title: "Aptitude & Tech Prep", subtitle: "PHASE 2", desc: "Master quantitative, logical reasoning, and core technical concepts demanded by top MNCs.", icon: <Target size={28} /> },
    { title: "Mock Interviews", subtitle: "PHASE 3", desc: "Rigorous 1-on-1 technical and HR mock rounds with industry leaders to eliminate interview fear.", icon: <MessageCircle size={28} /> },
    { title: "Placement Drives", subtitle: "PHASE 4", desc: "Exclusive ongoing access to our partner recruitment drives, job fairs, and direct HR referrals.", icon: <Award size={28} /> }
];

const templates = [
    { id: 1, name: "The Standard", type: "Classic", desc: "Minimalist Harvard-style layout. 95% ATS pass rate.", image: atsResume },
    { id: 2, name: "The Startup Pro", type: "Creative", desc: "Two-column design highlighting projects and impact.", image: atsResume },
    { id: 3, name: "The SWE Elite", type: "Technical", desc: "Dense skills section tailored for FAANG recruiters.", image: atsResume }
];

// ================= MAIN COMPONENT =================

const CareerSupport = () => {
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    // Ultra Smooth Animation Variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
    };
    
    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const slideLeft = {
        hidden: { opacity: 0, x: -60 },
        show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const slideRight = {
        hidden: { opacity: 0, x: 60 },
        show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const handleDownload = (tplName) => {
        alert(`Downloading ${tplName}.docx...`);
        setSelectedTemplate(null);
    };

    return (
        <div className="career-page-premium">
            
            {/* HERO SECTION */}
            <motion.section 
                className="career-hero-premium"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="hero-gradient-orb"></div>
                <div className="hero-gradient-orb-2"></div>
                
                <div className="container">
                    <div className="hero-content-wrapper">
                        <motion.div className="hero-text" variants={slideLeft}>
                            <motion.div className="badge-elite-premium" variants={scaleIn}>
                                <span className="pulse-dot"></span> 100% Placement Guarantee
                            </motion.div>
                            <motion.h1 variants={fadeUp}>Design Your <span className="text-gradient">Dream Career</span> With Us</motion.h1>
                            <motion.p variants={fadeUp}>
                                From resume creation to negotiating your final offer, our dedicated career experts provide end-to-end guidance to land you in top-tier tech firms.
                            </motion.p>
                            
                            <motion.div className="hero-btn-group" variants={fadeUp}>
                                <button className="btn-premium-primary" onClick={() => document.getElementById('roadmap-section').scrollIntoView({ behavior: 'smooth' })}>
                                    Explore Career Services <ArrowRight size={18} />
                                </button>
                                <button className="btn-premium-secondary" onClick={() => navigate('/Contactus')}>
                                    Talk to an Expert
                                </button>
                            </motion.div>
                        </motion.div>

                        <motion.div className="hero-visual" variants={slideRight}>
                            <div className="visual-card-glass">
                                <div className="vc-header">
                                    <ShieldCheck size={24} color="#fca5a5" />
                                    <span>Career Protection</span>
                                </div>
                                <ul>
                                    {careeGuaranteeFeatures.map((feat, i) => (
                                        <li key={i}><CheckCircle2 size={18} color="#10b981" /> {feat}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* PLACEMENT METRICS */}
            <motion.section 
                className="metrics-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <div className="container">
                    <div className="metrics-grid">
                        {placementStats.map((stat, idx) => (
                            <motion.div key={idx} className="metric-card" variants={fadeUp} whileHover={{ y: -10, scale: 1.02 }}>
                                <div className="metric-icon">{stat.icon}</div>
                                <div className="metric-info">
                                    <h3>{stat.value}</h3>
                                    <p>{stat.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* HIRING PARTNERS */}
            <motion.section 
                className="partners-section-premium"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
            >
                <div className="container">
                    <h4 className="section-mini-title">RECRUITED BY OVER 250+ GLOBAL GIANTS</h4>
                        <div className="partners-marquee">
                            <div className="marquee-track">
                                {[...hiringPartners, ...hiringPartners].map((partner, i) => (
                                    <div key={i} className="partner-logo-chip">
                                        <img
                                            src={`https://logo.clearbit.com/${partner.domain}`}
                                            alt={partner.name}
                                            onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                                        />
                                        <span className="partner-fallback" style={{ display: 'none' }}>{partner.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                </div>
            </motion.section>

            {/* TOP ROLES SECTION */}
            <motion.section 
                className="roles-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <div className="container">
                    <motion.div className="section-header-premium" variants={fadeUp}>
                        <h2>Targeted High-Growth Roles</h2>
                        <p>We train and place you in the most lucrative engineering positions in the market.</p>
                    </motion.div>
                    
                    <div className="roles-grid">
                        {topJobRoles.map((role, idx) => (
                            <motion.div key={idx} className="role-card" variants={scaleIn} whileHover={{ y: -8 }}>
                                <div className="role-icon-box">{role.icon}</div>
                                <h3>{role.role}</h3>
                                <div className="salary-badge">Expected: {role.salary}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ROADMAP SECTION */}
            <motion.section 
                id="roadmap-section" 
                className="process-section-premium"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <div className="container">
                    <motion.div className="section-header-premium text-left" variants={slideLeft}>
                        <h2 className="glow-text">The Blueprint to Your Success</h2>
                        <p>Our structured, 4-phase placement pipeline guarantees you are enterprise-ready.</p>
                    </motion.div>
                    
                    <div className="process-stepper">
                        {careerRoadmap.map((step, index) => (
                            <motion.div key={index} className="stepper-item" variants={fadeUp}>
                                <div className="stepper-head">
                                    <div className="stepper-number">{String(index + 1).padStart(2, '0')}</div>
                                    {index < careerRoadmap.length - 1 && <div className="stepper-line"></div>}
                                </div>
                                <div className="stepper-body">
                                    <div className="stepper-icon">{step.icon}</div>
                                    <span className="stepper-phase">{step.subtitle}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ALUMNI SUCCESS STORIES */}
            <motion.section 
                className="testimonials-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <div className="container">
                    <motion.div className="section-header-premium" variants={fadeUp}>
                        <h2>Alumni Success Stories</h2>
                        <p>Hear from our graduates who unlocked their potential and cracked top MNCs.</p>
                    </motion.div>

                    <div className="stories-grid">
                        {successStories.map((story, i) => (
                            <motion.div key={i} className="story-card" variants={fadeUp} whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}>
                                <Quote className="quote-icon" size={40} />
                                <p className="story-quote">"{story.quote}"</p>
                                <div className="story-author">
                                    <div className="author-avatar">{story.name.charAt(0)}</div>
                                    <div className="author-info">
                                        <h4>{story.name}</h4>
                                        <span>{story.role} at <strong>{story.company}</strong></span>
                                        <div className="hike-badge"><Zap size={14}/> {story.hike}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* RESUME GALLERY */}
            <motion.section 
                className="resume-gallery-premium"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <div className="container">
                    <motion.div className="section-header-premium" variants={fadeUp}>
                        <h2>ATS-Optimized Templates</h2>
                        <p>Download our battle-tested resume layouts designed by industry recruiters.</p>
                    </motion.div>

                    <div className="template-grid">
                        {templates.map((tpl) => (
                            <motion.div key={tpl.id} className="template-card-ultra" variants={scaleIn} whileHover={{ y: -8 }}>
                                <div className="template-thumb" onClick={() => setSelectedTemplate(tpl)}>
                                    <img src={tpl.image} alt={tpl.name} />
                                    <div className="thumb-action">
                                        <span>Preview Design</span>
                                    </div>
                                </div>
                                <div className="template-meta">
                                    <span className="t-type">{tpl.type}</span>
                                    <h3>{tpl.name}</h3>
                                    <p>{tpl.desc}</p>
                                    <button className="download-outline" onClick={() => handleDownload(tpl.name)}>
                                        <Download size={16} /> Get Template
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* MODAL */}
            <AnimatePresence>
                {selectedTemplate && (
                    <motion.div 
                        className="template-modal-premium" 
                        onClick={() => setSelectedTemplate(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="modal-box" 
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                        >
                            <button className="close-btn-p" onClick={() => setSelectedTemplate(null)}><X size={20} /></button>
                            <div className="modal-body-scroll">
                                <img src={selectedTemplate.image} alt={selectedTemplate.name} />
                            </div>
                            <div className="modal-action-bar">
                                <div>
                                    <h3>{selectedTemplate.name}</h3>
                                    <p>Ready to pass ATS filters.</p>
                                </div>
                                <button className="btn-premium-primary" onClick={() => handleDownload(selectedTemplate.name)}>
                                    Download Now
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA SECTION */}
            <motion.section 
                className="cta-section-premium"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
            >
                <div className="cta-premium-box">
                    <div className="cta-pattern"></div>
                    <motion.div className="cta-content-p" variants={scaleIn}>
                        <h2>Take the First Step Towards Your Dream Job</h2>
                        <p>Schedule a free 1-on-1 counseling session with our senior career strategists.</p>
                        <button className="btn-premium-white" onClick={() => navigate('/Contactform')}>
                            <Calendar size={18} /> Book Your Session
                        </button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default CareerSupport;
