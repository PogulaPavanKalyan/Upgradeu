import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Camera, ArrowRight } from "lucide-react";
import BaseUrl from "./BaseUrl";
import "../Styles/Login.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !username || !number || !password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const registerRes = await BaseUrl.post("/login/register", {
        name: name.trim(),
        email: email.trim(),
        username: username.trim(),
        phonenumber: Number(number),
        password: password,
      });

      const userId = registerRes.data?.id;

      if (image && userId) {
        const formData = new FormData();
        formData.append("image", image);
        await BaseUrl.post(`/login/profileimage/${userId}`, formData);
      }

      alert("Registration successful! Please login.");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-3d-wrapper">
      {/* Grid dot pattern */}
      <div className="login-grid-bg"></div>

      {/* Ambient glow orbs */}
      <div className="login-glow-orb"></div>
      <div className="login-glow-orb"></div>
      <div className="login-glow-orb"></div>

      {/* 3D Floating student elements */}
      <div className="login-float-elements">
        <div className="login-float-item">🎓</div>
        <div className="login-float-item">📚</div>
        <div className="login-float-item">💻</div>
        <div className="login-float-item">🏆</div>
        <div className="login-float-item">✏️</div>
        <div className="login-float-item">🚀</div>
        <div className="login-float-item">📊</div>
        <div className="login-float-item">🧠</div>
      </div>

      {/* Split container */}
      <div className="login-split-container">
        {/* LEFT — Brand & 3D Showcase */}
        <div className="login-brand-side">
          <div className="login-brand-content">
            <div className="login-brand-logo">Upgrade<span>U</span></div>
            <h2 className="login-brand-tagline">
              Start your learning journey today.
            </h2>
            <p className="login-brand-desc">
              Build real-world projects, learn from industry experts, and join a community of lifelong learners.
            </p>

            {/* 3D Rotating Cube */}
            <div className="login-3d-showcase">
              <div className="login-showcase-face">🎓</div>
              <div className="login-showcase-face">💻</div>
              <div className="login-showcase-face">📚</div>
              <div className="login-showcase-face">🏆</div>
            </div>
          </div>
        </div>

        {/* RIGHT — Register Form */}
        <div className="login-form-side">
          <div className="login-form-container" style={{ maxWidth: '500px' }}>
            {/* Mobile logo (visible < 768px) */}
            <div className="login-mobile-logo" onClick={() => navigate("/")}>
              <span className="login-mobile-logo-text">
                Upgrade<span>U</span>
              </span>
              <span className="login-mobile-subtitle">Learn. Grow. Succeed.</span>
            </div>

            <div className="login-glass-card">
              <div className="login-form-header">
                <span className="login-header-icon">✨</span>
                <h1>Create Account</h1>
                <p>Join the next generation of digital creators.</p>
              </div>

              <form onSubmit={handleSubmit} className="login-input-stack">
                <div className="register-grid">
                  <div className="login-field-group span-2">
                    <label>Full Name</label>
                    <div className="login-input-wrap">
                      <User className="login-field-icon" size={18} />
                      <input
                        type="text"
                        placeholder="Enter full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="login-field-group">
                    <label>Username</label>
                    <div className="login-input-wrap">
                      <User className="login-field-icon" size={18} />
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="login-field-group">
                    <label>Phone Number</label>
                    <div className="login-input-wrap">
                      <Phone className="login-field-icon" size={18} />
                      <input
                        type="tel"
                        placeholder="10-digit number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="login-field-group span-2">
                    <label>Email Address</label>
                    <div className="login-input-wrap">
                      <Mail className="login-field-icon" size={18} />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="login-field-group span-2">
                    <label>Password</label>
                    <div className="login-input-wrap">
                      <Lock className="login-field-icon" size={18} />
                      <input
                        type="password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="login-field-group span-2">
                    <label>Profile Picture (Optional)</label>
                    <div className="login-input-wrap">
                      <Camera className="login-field-icon" size={18} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={{ paddingLeft: '52px', paddingTop: '15px' }}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="login-submit-btn" disabled={loading} style={{ marginTop: '20px' }}>
                  {loading ? "Creating account..." : (
                    <>
                      Register Now <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="login-footer-link">
                Already have an account?
                <a href="/login" onClick={() => navigate("/login")}>Sign in instead</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
