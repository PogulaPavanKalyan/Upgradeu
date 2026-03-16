import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Camera, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";
import BaseUrl from "./BaseUrl";
import "../Styles/Login.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access the camera.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "profile-capture.jpg", { type: "image/jpeg" });
          setImage(file);
          setImagePreview(URL.createObjectURL(blob));
          stopCamera();
        }
      }, "image/jpeg");
    }
  };

  // Password strength rules
  const passwordRules = useMemo(() => [
    { label: "At least 8 characters", test: (p) => p.length >= 8 },
    { label: "Uppercase letter (A-Z)", test: (p) => /[A-Z]/.test(p) },
    { label: "Lowercase letter (a-z)", test: (p) => /[a-z]/.test(p) },
    { label: "Number (0-9)", test: (p) => /[0-9]/.test(p) },
    { label: "Special character (!@#$%^&*)", test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(p) },
  ], []);

  const allRulesPassed = password.length > 0 && passwordRules.every((r) => r.test(password));
  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  const calculateStrength = () => {
    if (password.length === 0) return 0;
    return passwordRules.filter((r) => r.test(password)).length;
  };
  const strength = calculateStrength();
  const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Excellent"];
  const strengthColors = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e"];

  React.useEffect(() => {
    document.body.classList.add("no-padding");
    return () => {
      document.body.classList.remove("no-padding");
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !username || !number || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(number)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    // Validate password strength
    if (!allRulesPassed) {
      alert("Password does not meet the strength requirements");
      return;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      alert("Passwords do not match");
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

      {/* Centered Auth container */}
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

        {/* Register Form */}
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
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setNumber(val);
                        }}
                        maxLength={10}
                        required
                      />
                    </div>
                    {number.length > 0 && number.length < 10 && (
                      <span className="reg-field-hint reg-hint-error">
                        Enter 10-digit number ({number.length}/10)
                      </span>
                    )}
                    {number.length === 10 && (
                      <span className="reg-field-hint reg-hint-success">✓ Valid phone number</span>
                    )}
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
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="reg-eye-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Password strength checklist */}
                    {password.length > 0 && (
                      <div className="reg-password-rules">
                        <div style={{ marginBottom: '15px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                            <span>Password Strength:</span>
                            <span style={{ color: strengthColors[Math.max(0, strength - 1)], fontWeight: 'bold' }}>
                              {strength > 0 ? strengthLabels[strength - 1] : ""}
                            </span>
                          </div>
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', display: 'flex' }}>
                            <div style={{
                              height: '100%',
                              width: `${(strength / 5) * 100}%`,
                              backgroundColor: strengthColors[Math.max(0, strength - 1)],
                              transition: 'all 0.3s ease'
                            }}></div>
                          </div>
                        </div>

                        <div className="reg-rules-header">
                          <ShieldCheck size={14} />
                          <span>Password Requirements</span>
                        </div>
                        <ul className="reg-rules-list">
                          {passwordRules.map((rule, idx) => (
                            <li key={idx} className={rule.test(password) ? "reg-rule-pass" : "reg-rule-fail"}>
                              <span className="reg-rule-icon">{rule.test(password) ? "✓" : "✗"}</span>
                              {rule.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="login-field-group span-2">
                    <label>Confirm Password</label>
                    <div className="login-input-wrap">
                      <Lock className="login-field-icon" size={18} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="reg-eye-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {confirmPassword.length > 0 && (
                      <span className={`reg-field-hint ${passwordsMatch ? "reg-hint-success" : "reg-hint-error"}`}>
                        {passwordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                      </span>
                    )}
                  </div>

                  <div className="login-field-group span-2">
                    <label>Profile Picture (Live Capture)</label>
                    <div className="login-input-wrap" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '15px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '16px', border: '1.5px solid rgba(255, 255, 255, 0.08)' }}>
                      {isCameraActive ? (
                        <div style={{ width: '100%', position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '12px', backgroundColor: '#000' }} />
                          <canvas ref={canvasRef} style={{ display: 'none' }} />
                          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button type="button" onClick={captureImage} style={{ flex: 1, padding: '10px', background: 'var(--login-primary)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Capture Photo</button>
                            <button type="button" onClick={stopCamera} style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '15px' }}>
                          {imagePreview ? (
                            <img src={imagePreview} alt="Profile Preview" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--login-primary)' }} />
                          ) : (
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <User size={24} color="#64748b" />
                            </div>
                          )}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                            <button type="button" onClick={startCamera} style={{ padding: '8px 15px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', width: '100%' }}>
                              <Camera size={16} /> Open Camera
                            </button>
                            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  setImage(file);
                                  if (file) setImagePreview(URL.createObjectURL(file));
                                }}
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  opacity: 0,
                                  cursor: 'pointer'
                                }}
                              />
                              <button type="button" style={{ padding: '8px 15px', background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', width: '100%', pointerEvents: 'none' }}>
                                Or upload an image
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="login-submit-btn"
                  disabled={loading || !allRulesPassed || !passwordsMatch}
                  style={{ marginTop: '20px' }}
                >
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
