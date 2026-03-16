import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "./Authprovider";
import BaseUrl from "./BaseUrl";
import "../Styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-padding");
    return () => {
      document.body.classList.remove("no-padding");
    };
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    try {
      const res = await BaseUrl.post("/login/login", {
        username,
        password,
      });

      saveToken(res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") {
        navigate("/admindashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      alert("Invalid credentials. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
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

      {/* Centered Auth container */}
      <div className="login-split-container">

        {/* LEFT — Brand & 3D Showcase (desktop/tablet) */}
        <div className="login-brand-side">
          <div className="login-brand-content">
            <div className="login-brand-logo">Upgrade<span>U</span></div>
            <h2 className="login-brand-tagline">
              Your career journey starts here
            </h2>
            <p className="login-brand-desc">
              Join thousands of students mastering in-demand skills with
              industry-expert mentors and hands-on projects.
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

        {/* Login Form */}
        <div className="login-form-side">
          <div className="login-form-container">

            {/* Logo */}
            <div className="login-mobile-logo" onClick={() => navigate("/")}>
              <span className="login-mobile-logo-text">
                Upgrade<span>U</span>
              </span>
              <span className="login-mobile-subtitle">Learn. Grow. Succeed.</span>
            </div>

            <div className="login-glass-card">
              <div className="login-form-header">
                <span className="login-header-icon">👋</span>
                <h1>Welcome Back</h1>
                <p>Sign in to continue your learning</p>
              </div>

              <form onSubmit={handlesubmit}>
                <div className="login-input-stack">
                  <div className="login-field-group">
                    <label>Username / Email</label>
                    <div className="login-input-wrap">
                      <User className="login-field-icon" size={18} />
                      <input
                        type="text"
                        placeholder="e.g. rahul_sharma"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="login-field-group">
                    <label>Password</label>
                    <div className="login-input-wrap">
                      <Lock className="login-field-icon" size={18} />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="login-submit-btn" disabled={isLoading}>
                  {isLoading ? "Signing in..." : (
                    <>
                      Sign In <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="login-footer-link">
                Don't have an account?
                <a href="/register">Create one for free</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
