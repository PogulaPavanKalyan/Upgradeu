export const getBotReply = (keyword, userName = "", courses = []) => {
  const input = keyword.toLowerCase();
  const nameToUse = userName ? ` ${userName}` : "";

  // 1. Greetings
  if (input.match(/\b(hi|hello|hey|greetings|howdy|morning|afternoon|evening)\b/)) {
    return `Hello${nameToUse}! I'm the UpgradeU Assistant. How can I assist you with your learning journey today?`;
  }
  
  if (input.match(/\b(how are you|how do you do|what's up)\b/)) {
    return `I'm doing great${nameToUse}, thanks for asking! Ready to help you upskill. What do you need help with?`;
  }

  // 2. Courses General
  if (input.includes("what courses") || input.includes("all course") || input.includes("list course")) {
    return "We offer comprehensive tracks in Full Stack Java, Full Stack Python, Cloud Computing (AWS/Azure), Data Science, Machine Learning, Digital Marketing, and UI/UX Design. You can check the 'Courses' tab for the full catalog!";
  }
  
  // 3. Specific Courses Features
  if (input.includes("java")) {
    return "Our Full Stack Java course covers Core Java, Advanced Java (Spring Boot, Hibernate), React/Angular for the frontend, and SQL. It's a zero-to-hero program perfect for aspiring software engineers.";
  }
  
  if (input.includes("python")) {
    return "The Full Stack Python program focuses on Core Python, Django framework, REST APIs, and integrates seamlessly with our Data Science track. Highly recommended for back-end developers!";
  }
  
  if (input.includes("data science") || input.includes("machine learning") || input.includes("ai")) {
    return "Our Data Science & AI courses dive deep into Pandas, NumPy, Scikit-Learn, TensorFlow, and real-world datasets. A strong foundation in Python (which we provide) is the only prerequisite.";
  }
  
  if (input.includes("aws") || input.includes("cloud")) {
    return "The AWS Cloud Computing course prepares you for AWS Solutions Architect certification. You'll learn EC2, S3, VPCs, IAM, and deploying scalable architectures.";
  }
  
  if (input.includes("devops")) {
    return "Our DevOps specialization covers CI/CD pipelines, Docker, Kubernetes, Jenkins, and Ansible. It's one of our most popular tracks!";
  }

  if (input.includes("react") || input.includes("frontend") || input.includes("web dev")) {
    return "Our Frontend Development track covers HTML, CSS, JavaScript ES6+, React.js, Redux, and modern UI frameworks. Perfect for creative developers!";
  }

  // 4. Pricing & Payments
  if (input.match(/\b(cost|price|fee|fees|pricing|pay|payment|emi|discount|offer)\b/)) {
    let specificCoursePrice = null;
    if (courses && courses.length > 0) {
      const matchCourse = courses.find(c => input.includes(c.title.toLowerCase()) || (c.category && input.includes(c.category.toLowerCase())));
      if (matchCourse && matchCourse.price) {
        specificCoursePrice = `The price for ${matchCourse.title} is ₹${matchCourse.price}.`;
      }
    }

    if (specificCoursePrice) {
      return `${specificCoursePrice} We accept UPI, Credit/Debit Cards, and offer NO-COST EMI.`;
    }

    if (courses && courses.length > 0) {
      const coursePrices = courses.slice(0, 3).map(c => `${c.title} (₹${c.price})`).join(", ");
      return `Our popular courses include ${coursePrices}. For exact details, check the specific course page. We accept UPI, Cards, and offer NO-COST EMI!`;
    }

    return "Our courses are competitively priced to be accessible. We accept UPI, Credit/Debit Cards, and offer NO-COST EMI. You might also find special discount codes on the course pages (like UPGRADE500)!";
  }

  // 5. Certificates
  if (input.match(/\b(certificate|degree|diploma|certification|validity|certified)\b/)) {
    return "Yes! Upon successfully submitting your final project, you receive a verified, industry-recognized certificate from RR Global IT Services, which you can showcase on LinkedIn.";
  }

  // 6. Placement & Career
  if (input.match(/\b(job|placement|career|hiring|interview|resume|portfolio)\b/)) {
    return "We have a dedicated 'Career Support' wing. We help you build a stunning resume, conduct mock interviews, optimize your LinkedIn, and provide direct referrals to our 500+ hiring partners.";
  }

  // 7. Mentor & Support
  if (input.match(/\b(mentor|teacher|instructor|support|doubt|doubts|help|stuck|telugu)\b/)) {
    return "You're never alone! You get 1-on-1 mentor support and daily live doubt-clearing sessions. If you have any doubts and want to talk to our Telugu support team, please reach out via the Contact Us page or click the WhatsApp Support link!";
  }

  // 8. Duration & Format
  if (input.match(/\b(how long|duration|months|weeks|time|format|online|offline|live|recorded)\b/)) {
    return "Most of our professional tracks range from 3 to 6 months. Classes are a hybrid of high-quality recorded videos (for self-paced learning) and live weekend sessions for Q&A and project building.";
  }

  // 9. Account & Tech issues
  if (input.match(/\b(password|login|account|email|cant log in|forgot)\b/)) {
    return "If you are facing login issues, you can use the 'Forgot Password' link on the login page. Need urgent help? Click 'Email Support' below.";
  }
  
  if (input.match(/\b(video not playing|buffer|lag|bug|error)\b/)) {
    return "I'm sorry you're experiencing technical glitches. Please try clearing your browser cache. If the issue persists, use the WhatsApp Support link to reach our tech team directly.";
  }

  // 10. Refund & Policy
  if (input.match(/\b(refund|cancel|money back|guarantee)\b/)) {
    return "We have a 7-day refund policy. If you aren't satisfied within the first week of enrollment, you can claim a no-questions-asked refund by emailing us.";
  }

  // 11. Prerequisites & Eligibility
  if (input.match(/\b(prerequisite|beginner|eligibility|who can join|do i need coding|background)\b/)) {
    return "Most of our courses are designed for absolute beginners! No prior coding experience is required. We start from the very basics and scale up to advanced topics.";
  }

  // 12. Corporate / B2B
  if (input.match(/\b(corporate|business|team|b2b|bulk)\b/)) {
    return "We do offer corporate training and bulk team enrollments with customized syllabus options! Please email info@rrgobalitservices.com to get a quote.";
  }

  // 13. Fun / Casual
  if (input.match(/\b(thank you|thanks|thx|appreciate)\b/)) {
    return `You're very welcome${nameToUse}! I'm always here if you need anything else. Happy learning!`;
  }
  
  if (input.match(/\b(bye|goodbye|see ya|cya)\b/)) {
    return `Goodbye${nameToUse}! Catch you later. Have a productive day!`;
  }

  if (input.match(/\b(who are you|are you a bot|your name)\b/)) {
    return "I am the UpgradeU AI Assistant! I don't need sleep, so I'm here 24/7 to help you navigate our courses and platform.";
  }

  if (input.match(/\b(joke|funny)\b/)) {
    return "Why do programmers prefer dark mode? Because light attracts bugs! 🐛 Let me know if you need help with courses!";
  }

  // 14. Advanced Generic Exact Matches mapped statically
  // This acts as a database of ~20 highly specific FAQs
  const qaMap = {
    "what is upgradeu": "UpgradeU is a premium e-learning LMS focused on making students job-ready through practical, project-based courses and expert mentorship.",
    "where are you located": "We are proudly an online-first platform, but our headquarters and partner RR Global IT Services operate out of India.",
    "is it free": "We have some free preview lessons and masterclasses, but our comprehensive, certification-yielding career tracks are paid.",
    "syllabus": "You can find the detailed, downloadable PDF syllabus on the specific course landing page under 'Course Curriculum'.",
    "projects": "Yes! We strongly believe in 'Learning by Doing'. Every major course includes 3-5 real-world corporate-style projects.",
    "internship": "Top performers in our programs often get fast-tracked into internship roles at our partner company, YGR Global IT Services.",
    "laptop or mobile": "You can watch lectures on either a laptop or mobile phone. However, for coding practice, a laptop/PC is highly recommended.",
    "mac or windows": "Our tech stacks (Java, Python, Web Dev) work perfectly on both Windows and macOS. No specific OS is required.",
    "can i download videos": "To prevent piracy, videos must be streamed within the UpgradeU platform. However, source code and PDF notes are fully downloadable.",
    "how to contact": "You can reach us at info@rrgobalitservices.com, via the Contact Us page, or using the WhatsApp Support button right here in the chat!",
    "lifetime access": "Most of our courses come with lifetime access to the recorded videos and community forums!",
    "community": "Yes, enrolled students get access to an exclusive Discord/WhatsApp community where alumni and mentors interact daily.",
    "live classes": "Live classes usually happen on weekends (Saturdays & Sundays) so working professionals and college students can easily attend.",
    "language": "Currently, all our premium courses are primarily taught in completely accessible English, with doubt support available in regional languages upon request.",
    "scholarship": "We occasionally offer merit-based scholarships during special enrollment drives. Keep an eye on the website banners!"
  };

  for (const [q, a] of Object.entries(qaMap)) {
    if (input.includes(q)) {
      return a;
    }
  }

  return null;
};
