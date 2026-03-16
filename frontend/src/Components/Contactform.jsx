import React, { useState } from "react";
import { useAuth } from "./Authprovider";
import { useNavigate } from "react-router-dom";
import "../Styles/Contactform.css";
import BaseUrl from "./BaseUrl";
import { motion } from "framer-motion";
import { User, Mail, Phone, MessageSquare, Send } from "lucide-react";
import contactIllustration from "../assets/images/contact_illustration.png";

const Contactform = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [requirement, setRequirement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const body = {
      name,
      email,
      phone_number,
      requirement,
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
Requirements: ${requirement}
      `;

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank");

      alert("Form submitted successfully!");

      setName("");
      setEmail("");
      setPhone_number("");
      setRequirement("");

    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      <motion.div 
        className="contact-main-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Left Section - Information & Illustration */}
        <div className="contact-info-section">
          <motion.div 
            className="contact-illustration-container"
            animate={{ y: [0, -15, 0] }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <img src={contactIllustration} alt="Contact Us" className="contact-illustration" />
          </motion.div>
          
          <div className="contact-info-content">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Have questions or need assistance? We're here to help! Fill out the form, and our team will get back to you shortly.
            </motion.p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="contact-form-section">
          <div className="contact-form-header">
            <h2>Send us a Message</h2>
            <p>We'll respond as soon as possible.</p>
          </div>

          <form className="contact-enhanced-form" onSubmit={handlesubmit}>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <Phone className="input-icon" size={20} />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <MessageSquare className="input-icon" size={20} style={{ top: "18px" }} />
              <textarea
                placeholder="Your Message..."
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                required
              ></textarea>
            </div>

            <motion.div 
              className="submit-btn-wrapper"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button 
                type="submit" 
                className="contact-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contactform;