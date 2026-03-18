export const courseLandingData = {
  "default": {
    templateType: "CENTERED_GLASS",   // Model A – Frontlines Glassmorphic
    theme: {
      heroStart: "#0b1121",
      heroEnd: "#1e293b",
      accent: "#fbbf24",     /* Gold */
      primary: "#4f8df7"     /* Blue */
    },
    heroTagline: "Professional",
    beforePoints: [
      "❌ Struggling to get interview calls",
      "❌ No real-world project experience",
      "❌ Confusion on technical roadmap"
    ],
    afterPoints: [
      "✅ Confident Developer",
      "✅ Strong Resume with Real Projects",
      "✅ Job-Ready with Placement Support"
    ],
    learnList: [
      "Master all fundamentals and advanced topics",
      "Build enterprise-grade applications from scratch",
      "Understand architecture, scalability, and security",
      "Hands-on experience with modern tools and frameworks"
    ],
    methodology: [
      { icon: "💻", title: "Self-Paced Video Lessons", desc: "Learn at your own pace from recorded sessions." },
      { icon: "🛠", title: "Hands-on Coding", desc: "Practice what you learn immediately." },
      { icon: "🚀", title: "Real-Time Projects", desc: "Build applications from scratch." },
      { icon: "❓", title: "Doubt Clearing", desc: "Dedicated Q&A sessions." }
    ],
    projects: [
      { icon: "🌐", title: "E-Commerce Platform", desc: "Full-stack app with authentication, cart functionality, and integrated payment gateway." },
      { icon: "📊", title: "Management Dashboard", desc: "Comprehensive system with granular roles, secure permissions, and real-time analytics." }
    ],
    testimonials: [
      { name: "Rahul S.", role: "Software Developer", review: "The projects I built here got me hired within a month of graduating." },
      { name: "Priya M.", role: "Backend Engineer", review: "Excellent content. This course bridges the gap between college and industry." }
    ],
    faqs: [
      { q: "Do I need prior coding experience?", a: "No, we cover everything from the basic fundamentals up to advanced architecture." },
      { q: "Is placement guaranteed?", a: "We provide 100% placement assistance, including resume building, mock interviews, and direct company referrals." },
      { q: "How long is the access to recordings?", a: "You will have access to all course videos via your dashboard for 2 years." }
    ]
  },
  "Full Stack Testing": {
    templateType: "SIDEBAR_CARD",      // Model B – Two-Column Overlapping Card
    theme: {
      heroStart: "#064e3b",  /* Dark Green */
      heroEnd: "#0f766e",    /* Teal */
      accent: "#a7f3d0",     /* Soft Mint */
      primary: "#10b981"     /* Emerald */
    },
    heroTagline: "QA Automation Engineer",
    beforePoints: [
      "❌ Stuck doing Manual Testing",
      "❌ No Coding Experience",
      "❌ Missing Selenium & API Skills"
    ],
    afterPoints: [
      "✅ Master Automation Frameworks",
      "✅ High-Paying SDET Roles",
      "✅ End-to-End Testing Expert"
    ],
    learnList: [
      "Core Java for Automation",
      "Selenium WebDriver & TestNG",
      "Rest Assured API Testing",
      "CI/CD Pipeline Integration"
    ],
    methodology: [
      { icon: "💻", title: "Live Automation Labs", desc: "Code along with experts." },
      { icon: "🛠", title: "Framework Building", desc: "Create enterprise automation frameworks." },
      { icon: "🚀", title: "Real-Time Scenarios", desc: "Test live applications." },
      { icon: "❓", title: "Mock Interviews", desc: "Prepare for top SDET roles." }
    ],
    projects: [
      { icon: "🤖", title: "Selenium Keyword-Driven Framework", desc: "Build a robust web testing suite from scratch." },
      { icon: "📱", title: "API Test Automation Suite", desc: "End-to-end backend testing using Rest Assured." }
    ],
    testimonials: [
      { name: "Vikram R.", role: "SDET at TCS", review: "Transitioning from Manual to Automation felt impossible until this structured course." },
      { name: "Anjali K.", role: "QA Engineer", review: "The framework building project was exactly what my interviewers asked about!" }
    ],
    faqs: [
      { q: "I currently do manual testing. Is this for me?", a: "Absolutely! This is designed specifically to upgrade manual testers to highly-paid SDETs." },
      { q: "What programming language is used?", a: "We primarily use Java, as it is the industry standard for Selenium and RestAssured automation." },
      { q: "Will you help me optimize my resume?", a: "Yes, our career services team will rewrite your resume to highlight your new automation projects." }
    ]
  },
  "Software Development": {
    templateType: "SPLIT_HERO",         // Model C – Split Hero with Timeline
    theme: {
      heroStart: "#450a0a",  /* Dark Red */
      heroEnd: "#991b1b",    /* Classic Red */
      accent: "#fca5a5",     /* Soft Red/Pink */
      primary: "#dc2626"     /* Red */
    },
    heroTagline: "Full Stack Developer",
    beforePoints: [
      "❌ Only know basic programming concepts",
      "❌ Can't build a full application end-to-end",
      "❌ Don't understand deployment and APIs"
    ],
    afterPoints: [
      "✅ Enterprise-Ready Full Stack Developer",
      "✅ Mastered Frontend and Backend Tech",
      "✅ Guaranteed Placement Assistance"
    ],
    learnList: [
      "Frontend UI/UX Mastery (React/Angular)",
      "Robust Backend Architecture (Java/Node/Python)",
      "Database Modeling & Optimization",
      "Cloud Deployment & Docker Basics"
    ],
    methodology: [
      { icon: "👨‍💻", title: "Pair Programming Labs", desc: "Code side-by-side with experts." },
      { icon: "🔄", title: "Agile Sprints", desc: "Experience real-world project workflows." },
      { icon: "🚀", title: "Portfolio Building", desc: "Showcase 3 major projects on GitHub." },
      { icon: "🎯", title: "Placement Focused", desc: "Direct company referrals upon graduation." }
    ],
    projects: [
      { icon: "🛒", title: "Amazon Clone Microservices", desc: "Build a highly scalable e-commerce site with independent services." },
      { icon: "🎬", title: "Netflix-Style Streaming App", desc: "Handle media streaming, user auth, and heavy traffic UI." }
    ],
    testimonials: [
      { name: "Suresh", role: "SDE-1", review: "The microservices project pushed my boundaries. I am now confidently working in a product-based company." },
      { name: "Neha", role: "Full Stack Dev", review: "Worth every penny. The placement support is genuine and the teaching quality is top-notch." }
    ],
    faqs: [
      { q: "What stack will I learn?", a: "You will learn the MERN or Java Spring Boot stack depending on the specific cohort you choose." },
      { q: "Are the classes recorded?", a: "Yes, all live interactive sessions are recorded and uploaded to your dashboard within 12 hours." },
      { q: "How many real-world projects will I build?", a: "You will build 2 major enterprise-level projects and 4 mini-projects." }
    ]
  }
};
