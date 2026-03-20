import React, { useState } from "react";
import { useAuth } from "./Authprovider";
import { useNavigate } from "react-router-dom";
import "../Styles/Contactform.css";
import BaseUrl from "./BaseUrl";
import { motion } from "framer-motion";

const Contactform = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [requirement, setRequirement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullRequirement = companyName ? `Company/College: ${companyName}\nMessage: ${requirement}` : requirement;

    const body = {
      name,
      email,
      phone_number,
      requirement: fullRequirement,
    };

    try {
      const res = await BaseUrl.post("/contactform", body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Form submitted:", res.data);

      const whatsappNumber = "917794053340";
      const message = `
New Contact Request

Name: ${name}
Email: ${email}
Phone: ${phone_number}
Company/College: ${companyName ? companyName : 'N/A'}
Requirements: ${requirement}
      `;

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message.trim()
      )}`;

      window.open(whatsappUrl, "_blank");

      alert("Form submitted successfully!");

      setName("");
      setEmail("");
      setPhone_number("");
      setCompanyName("");
      setRequirement("");

    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-contact-wrapper">
      <div className="new-contact-container">
        {/* Left Side: Images & Yellow Circle  */}
        <div className="new-contact-left">
          <motion.div 
            className="nc-yellow-circle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          ></motion.div>

          {/* Floating Hearts */}
          <motion.div 
            className="nc-floating-heart" 
            style={{ top: "5%", left: "40%" }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.div>
          
          <motion.div 
            className="nc-floating-heart" 
            style={{ top: "15%", right: "20%", fontSize: "24px" }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            ❤️
          </motion.div>
          
          <motion.div 
            className="nc-floating-heart" 
            style={{ bottom: "25%", right: "30%", fontSize: "18px" }}
            animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            ❤️
          </motion.div>
          
          <motion.div 
            className="nc-img-group nc-top-img"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="nc-love-badge">
              WE <span className="nc-heart">❤️</span> UPGRADEU
            </div>
            <div className="nc-faces-row">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" alt="Student 1" />
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" alt="Student 2" />
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop" alt="Student 3" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" alt="Student 4" />
            </div>
          </motion.div>

          <motion.div 
            className="nc-img-bottom nc-img-bottom-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=400&fit=crop" alt="Happy Student" />
          </motion.div>

          <motion.div 
            className="nc-img-bottom nc-img-bottom-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop" alt="Professional" />
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="new-contact-right">
          <motion.h1 
            className="nc-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Contact Us
          </motion.h1>
          
          <motion.form 
            className="nc-form" 
            onSubmit={handlesubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="nc-grid-2">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="nc-input"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="nc-input"
              />
            </div>

            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              required
              className="nc-input nc-full-width"
            />

            <input
              type="text"
              placeholder="Company Name / College Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="nc-input nc-full-width"
            />

            <textarea
              placeholder="Describe message here"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              required
              className="nc-textarea nc-full-width"
            ></textarea>

            <div className="nc-submit-row">
              <button 
                type="submit" 
                className="nc-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contactform;