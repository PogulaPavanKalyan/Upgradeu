import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import BaseUrl from "../Components/BaseUrl";
import "../AdminStyles/RegisterAdmin.css";

const RegisterAdmin = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !username || !number || !password) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await BaseUrl.post("login/registeradmin", {
                name: name.trim(),
                email: email.trim(),
                username: username.trim(),
                phonenumber: Number(number),
                password: password,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data === "sucess") {
                alert("Admin registration successful!");
                navigate("/registeruser");
            } else {
                setError("Registration failed. Please try again.");
            }

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Registration failed. Please check your details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-register-wrapper">
            <div className="admin-register-header">
                <button className="back-btn" onClick={() => navigate("/admindashboard")}>
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>
            </div>

            <div className="admin-register-card">
                <div className="admin-register-form-header">
                    <div className="admin-icon-badge">
                        <ShieldCheck size={32} />
                    </div>
                    <h1>Register New Admin</h1>
                    <p>Create a new administrator account with full system access.</p>
                </div>

                {error && <div className="admin-register-error">{error}</div>}

                <form onSubmit={handleSubmit} className="admin-register-form">
                    <div className="admin-form-grid">
                        <div className="admin-input-group full-width">
                            <label>Full Name</label>
                            <div className="admin-input-wrapper">
                                <User className="admin-field-icon" size={18} />
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-input-group">
                            <label>Username</label>
                            <div className="admin-input-wrapper">
                                <User className="admin-field-icon" size={18} />
                                <input
                                    type="text"
                                    placeholder="Admin username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-input-group">
                            <label>Phone Number</label>
                            <div className="admin-input-wrapper">
                                <Phone className="admin-field-icon" size={18} />
                                <input
                                    type="tel"
                                    placeholder="10-digit number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-input-group full-width">
                            <label>Email Address</label>
                            <div className="admin-input-wrapper">
                                <Mail className="admin-field-icon" size={18} />
                                <input
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-input-group full-width">
                            <label>Password</label>
                            <div className="admin-input-wrapper">
                                <Lock className="admin-field-icon" size={18} />
                                <input
                                    type="password"
                                    placeholder="Set a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="admin-submit-btn" disabled={loading}>
                        {loading ? "Registering..." : (
                            <>
                                Create Admin Account <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterAdmin;
