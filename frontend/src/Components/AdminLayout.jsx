import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./Authprovider";
import BaseUrl from "./BaseUrl";
import {
  Users,
  BookOpen,
  CreditCard,
  LogOut,
  LayoutDashboard,
  PlusSquare,
  FileText,
  Image as ImageIcon,
  Trash2,
  Moon,
  Sun,
  Bell,
  Search,
  ShieldCheck,
  Menu,
  AlignLeft,
  AlignRight,
  ChevronDown,
  ChevronUp,
  Plus,
  GraduationCap
} from "lucide-react";
import "../AdminStyles/AdminDashboard.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, role = "ADMIN" } = useAuth(); // role: ADMIN | INSTRUCTOR
  const [dark, setDark] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [readIds, setReadIds] = useState(() => {
    const saved = localStorage.getItem("admin_read_notif_ids");
    return saved ? JSON.parse(saved) : [];
  });
  const notificationRef = useRef(null);

  // Sync readIds to localStorage
  useEffect(() => {
    localStorage.setItem("admin_read_notif_ids", JSON.stringify(readIds));
  }, [readIds]);

  // Fetch recent activities for notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;
      try {
        const [usersRes, paymentsRes] = await Promise.all([
          BaseUrl.get("/registerstudents", { headers: { Authorization: `Bearer ${token}` } }),
          BaseUrl.get("/admin/mypayment", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const recentUsers = [...usersRes.data]
          .sort((a, b) => b.id - a.id)
          .slice(0, 5)
          .map(u => ({
            id: `user-${u.id}`,
            type: "USER_REG",
            title: "New User Registered",
            message: `${u.name || u.username} joined`,
            time: "Recently",
            isRead: readIds.includes(`user-${u.id}`),
            numericId: u.id
          }));

        const recentPayments = [...paymentsRes.data]
          .sort((a, b) => b.id - a.id)
          .slice(0, 5)
          .map(p => ({
            id: `pay-${p.id}`,
            type: "COURSE_BUY",
            title: "Course Purchased",
            message: `${p.user?.username || 'User'} bought ${p.course?.course_Name || 'a course'}`,
            time: p.date || "Today",
            isRead: readIds.includes(`pay-${p.id}`),
            numericId: p.id
          }));

        // Combine and sort by numericId
        const all = [...recentUsers, ...recentPayments]
          .sort((a, b) => b.numericId - a.numericId)
          .slice(0, 10);

        setNotifications(all);
        setUnreadCount(all.filter(n => !n.isRead).length);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    fetchNotifications();
    
    // Auto-refresh every 2 minutes
    const interval = setInterval(fetchNotifications, 120000);
    return () => clearInterval(interval);
  }, [token, readIds]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    const allIds = notifications.map(n => n.id);
    setReadIds(prev => [...new Set([...prev, ...allIds])]);
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const markAsRead = (id) => {
    if (!readIds.includes(id)) {
      setReadIds(prev => [...prev, id]);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const menuItems = [
    { name: "Dashboard", path: "/admindashboard", icon: <LayoutDashboard size={20} />, roles: ["ADMIN", "INSTRUCTOR"] },
    { name: "Courses", path: "/AllCourses", icon: <BookOpen size={20} />, roles: ["ADMIN"] },
    { name: "Users", path: "/registeruser", icon: <Users size={20} />, roles: ["ADMIN"] },
    { name: "Blogs", path: "/PostBlogs", icon: <FileText size={20} />, roles: ["ADMIN"] },
    { name: "Payments", path: "/PaymentDetails", icon: <CreditCard size={20} />, roles: ["ADMIN"] },
    { name: "Carousel Post", path: "/crouselposting", icon: <ImageIcon size={20} />, roles: ["ADMIN"] },
    { name: "Carousel Delete", path: "/crouseldeleting", icon: <Trash2 size={20} />, roles: ["ADMIN"] },
    { name: "Register Admin", path: "/registeradmin", icon: <ShieldCheck size={20} />, roles: ["ADMIN"] },
  ];

  return (
    <div className={`admin-app ${dark ? "dark-theme" : "light-theme"}`}>
      {/* CRYSTAL BACKGROUND DECORATIONS */}
      <div className="bg-glow drift-indigo"></div>
      <div className="bg-glow drift-cyan"></div>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="admin-logo">
            <span className="brand-text" onClick={() => { navigate("/adminDashboard"); setIsSidebarOpen(false); }}>
              Upgrade
              <span className="u-container">
                <GraduationCap className="hat-icon" />
                <strong className="u-letter"> U</strong>
              </span>
            </span>
          </div>

        </div>

        <nav className="sidebar-nav">
          <div className="nav-label">Main Menu</div>
          {menuItems.filter(item => item.roles.includes(role)).map((item) => (
            <React.Fragment key={item.path}>
              <button
                className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
                onClick={() => { navigate(item.path); setIsSidebarOpen(false); }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </button>

              {/* ADD DROPDOWN - Positioned after Courses */}
              {item.name === "Courses" && role === "ADMIN" && (
                <div className={`nav-dropdown ${addDropdownOpen ? "open" : ""}`}>
                  <button
                    className={`nav-item ${addDropdownOpen ? "dropdown-active" : ""}`}
                    onClick={() => setAddDropdownOpen(!addDropdownOpen)}
                  >
                    <span className="nav-icon"><PlusSquare size={20} /></span>
                    <span className="nav-text">Add</span>
                    <span className="dropdown-chevron">
                      {addDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  {addDropdownOpen && (
                    <div className="sub-nav-menu">
                      <button
                        className={`sub-nav-item ${location.pathname === "/addCourse" ? "active" : ""}`}
                        onClick={() => { navigate("/addCourse"); setIsSidebarOpen(false); }}
                      >
                        <Plus size={14} />
                        <span>Add Course</span>
                      </button>
                      <button
                        className={`sub-nav-item ${location.pathname === "/AdminAddExam" ? "active" : ""}`}
                        onClick={() => { navigate("/AdminAddExam"); setIsSidebarOpen(false); }}
                      >
                        <FileText size={14} />
                        <span>Add Exam</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem("token");
            navigate("/register");
          }}>
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="content-wrapper">
        {/* TOP NAVBAR */}
        <header className="admin-header">
          {/* Mobile: always show hamburger */}
          <button className="mobile-menu-btn desktop-hide" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>

          {/* Desktop: toggle AlignLeft / AlignRight */}
          <button
            className="mobile-menu-btn mobile-hide"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <AlignRight size={24} /> : <AlignLeft size={24} />}
          </button>

          <div className="header-search">
            <Search size={18} />
            <input type="text" placeholder="Search analytics..." />
          </div>

          <div className="header-actions">
            <button className="icon-btn" onClick={() => setDark(!dark)}>
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="notification-wrapper" ref={notificationRef}>
              <button className={`icon-btn ${unreadCount > 0 ? 'has-badge' : ''}`} onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={20} />
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
              </button>

              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notif-header">
                    <h3>Notifications</h3>
                    <button onClick={markAllAsRead}>Mark all as read</button>
                  </div>
                  <div className="notif-list">
                    {notifications.length === 0 ? (
                      <div className="notif-empty">No new notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          className={`notif-item ${n.isRead ? 'read' : 'unread'}`}
                          onClick={() => markAsRead(n.id)}
                        >
                          <div className={`notif-icon ${n.type}`}>
                            {n.type === 'USER_REG' ? <Users size={16} /> : <CreditCard size={16} />}
                          </div>
                          <div className="notif-content">
                            <div className="notif-title-row">
                              <p className="notif-title">{n.title}</p>
                              {!n.isRead && <span className="new-badge">New</span>}
                            </div>
                            <p className="notif-msg">{n.message}</p>
                            <span className="notif-time">{n.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="notif-footer">
                    <button onClick={() => { navigate("/viewAllActivity"); setShowNotifications(false); }}>View all activity</button>
                  </div>
                </div>
              )}
            </div>
            <div className="user-profile">
              <div className="user-avatar">AD</div>
              <div className="user-info">
                <span className="user-name">Admin User</span>
                <span className="user-role">{role}</span>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <Outlet context={{ dark }} />
      </div>
    </div>
  );
};

export default AdminLayout;
