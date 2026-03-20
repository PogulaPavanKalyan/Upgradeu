import React, { useState, useEffect } from "react";
import "../Styles/Chatbot.css";
import { getBotReply } from "../Chat/chatService";
import BaseUrl from "../Components/BaseUrl";

const QUICK_ACTIONS = [
  { label: "📘 Course Details", value: "course" },
  { label: "🎓 Certificates", value: "certificate" },
  { label: "💳 Payment Issues", value: "payment" },
  { label: "🧑‍🏫 Mentor Support", value: "mentor" }
];

const Chatbot = ({ onClose, userName = "" }) => {
  const firstName = userName ? userName.split(" ")[0] : "";
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: firstName ? `Welcome to UpgradeU Support 👋\nHi ${firstName}, how can I help you excel today?` : "Welcome to UpgradeU Support 👋\nHow can I help you excel today?"
    }
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    BaseUrl.get("/allcourses")
      .then(res => setCourses(res.data || []))
      .catch(err => console.error("Error fetching courses for chatbot:", err));
  }, []);

  const handleQuickAction = (value) => {
    setMessages((prev) => [...prev, { sender: "user", text: value }]);

    setIsTyping(true);
    setTimeout(() => {
      const reply = getBotReply(value, firstName, courses);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      const reply = getBotReply(userMessage.toLowerCase(), firstName, courses);
      if (reply) {
        setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "That's a great question! Please wait, our support team will connect with you shortly to assist you further."
          }
        ]);
        setShowSupport(true);
      }
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="lms-chatbox open">
      <div className="lms-chat-header">
        <span>UpgradeU Support</span>
        <button type="button" onClick={onClose}>✕</button>
      </div>

      <div className="lms-chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-row ${msg.sender}`}>
            <div className="chat-avatar">{msg.sender === 'bot' ? '🤖' : '👤'}</div>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-row bot">
            <div className="chat-bubble typing">Typing...</div>
          </div>
        )}

        <div className="quick-actions">
          {QUICK_ACTIONS.map((item, i) => (
            <button
              key={i}
              type="button"
              className="quick-btn"
              onClick={() => handleQuickAction(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {showSupport && (
          <div className="support-links">
            <a
              href="https://wa.me/917794053340"
              target="_blank"
              rel="noreferrer"
              className="wa"
            >
              📱 WhatsApp Support
            </a>
            <a
              href="mailto:info@rrgobalitservices.com"
              className="email"
            >
              📧 Email Support
            </a>
          </div>
        )}
      </div>

      <div className="lms-chat-footer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your message..."
        />
        <button type="button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
