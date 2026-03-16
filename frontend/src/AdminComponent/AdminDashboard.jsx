import React, { useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { useAuth } from "../Components/Authprovider";
import BaseUrl from "../Components/BaseUrl";
import {
  Users,
  BookOpen,
  IndianRupee,
  CreditCard,
  PlusSquare,
  FileText,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, role = "ADMIN" } = useAuth(); // role: ADMIN | INSTRUCTOR

  const [statsData, setStatsData] = useState({
    userCount: 0,
    courseCount: 0,
    revenue: 0,
    totalTransactions: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, coursesRes, paymentsRes] = await Promise.all([
          BaseUrl.get("/registerstudents", { headers: { Authorization: `Bearer ${token}` } }),
          BaseUrl.get("/Course", { headers: { Authorization: `Bearer ${token}` } }),
          BaseUrl.get("/admin/mypayment", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const allUsers = usersRes.data;

        const totalRevenue = paymentsRes.data.reduce((acc, pay) => {
          const amount = pay.amount || pay.totalAmount || (pay.course?.price || 0);
          return acc + amount;
        }, 0);

        setStatsData({
          userCount: allUsers.length,
          courseCount: coursesRes.data.length,
          revenue: totalRevenue,
          totalTransactions: paymentsRes.data.length
        });

        // Get recent 5 users (sorted by ID or arrival)
        const sortedUsers = [...allUsers].sort((a, b) => b.id - a.id).slice(0, 5);
        setRecentUsers(sortedUsers);

        // Get recent 5 payments
        const sortedPayments = [...paymentsRes.data].reverse().slice(0, 5);
        setRecentPayments(sortedPayments);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const handleDownloadReport = () => {
    // Prepare CSV Headers
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Metric,Value\n";
    
    // Add Stats Data
    csvContent += `Overview,Total Users,${statsData.userCount}\n`;
    csvContent += `Overview,Active Courses,${statsData.courseCount}\n`;
    csvContent += `Overview,Total Revenue,₹${statsData.revenue}\n`;
    csvContent += `Overview,Total Transactions,${statsData.totalTransactions}\n\n`;

    // Add Recent Users
    csvContent += "Recent Activities - Users,User Name,Details\n";
    recentUsers.forEach(user => {
      csvContent += `New User,${user.name.replace(/,/g, "")},Joined the platform\n`;
    });
    csvContent += "\n";

    // Add Recent Payments
    csvContent += "Recent Activities - Payments,Amount,Details\n";
    recentPayments.forEach(pay => {
      const amount = pay.amount || pay.totalAmount || pay.course?.price || 0;
      const username = pay.user?.username || 'Student';
      csvContent += `Payment,₹${amount},From ${username.replace(/,/g, "")}\n`;
    });

    // Trigger Download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Admin_Dashboard_Report_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = [
    { title: "Total Users", value: statsData.userCount.toLocaleString(), icon: <Users size={24} />, color: "blue", trend: "+12%", link: "/registeruser" },
    { title: "Active Courses", value: statsData.courseCount.toLocaleString(), icon: <BookOpen size={24} />, color: "purple", trend: "+5%", link: "/AllCourses" },
    { title: "Revenue", value: `₹${statsData.revenue.toLocaleString()}`, icon: <IndianRupee size={24} />, color: "green", trend: "+18%" },
    { title: "Transactions", value: statsData.totalTransactions.toLocaleString(), icon: <CreditCard size={24} />, color: "orange", trend: "-2%", link: "/PaymentDetails" },
  ];

  const { dark } = useOutletContext() || { dark: true };

  return (
    <div className="dashboard-grid-wrapper" style={{ padding: "45px" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="primary-btn" onClick={handleDownloadReport}>Download Report</button>
      </div>

      {/* STATS GRID */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`stat-card ${stat.color}`}
            onClick={stat.link ? () => navigate(stat.link) : undefined}
            style={{ cursor: stat.link ? "pointer" : "default" }}
          >
            <div className="stat-icon-box">
              {stat.icon}
            </div>
            <div className="stat-details">
              <span className="stat-label">{stat.title}</span>
              <div className="stat-value-group">
                <h2 className="stat-value">{stat.value}</h2>
                <span className={`stat-trend ${stat.trend.startsWith('+') ? 'up' : 'down'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TWO COLUMN SECTION (Placeholder for future expansion) */}
      <div className="dashboard-grid">
        <div className="data-card large">
          <div className="card-header">
            <h3>Recent Activities</h3>
            <button className="text-btn">View All</button>
          </div>
          <div className="placeholder-content">
            {recentUsers.length === 0 && (
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-text">
                  <span>No recent activities found</span>
                </div>
              </div>
            )}

            {recentUsers.slice(0, 3).map((user, idx) => (
              <div className="activity-item" key={`user-${user.id}`}>
                <div className="activity-dot"></div>
                <div className="activity-text">
                  <strong>New User Registered</strong>
                  <span>{user.name} joined the platform</span>
                  <small>Just now</small>
                </div>
              </div>
            ))}

            {recentPayments.slice(0, 2).map((pay, idx) => (
              <div className="activity-item" key={`pay-${pay.id}`}>
                <div className="activity-dot blue"></div>
                <div className="activity-text">
                  <strong>Payment Received</strong>
                  <span>₹{pay.amount || pay.totalAmount || pay.course?.price || 0} from {pay.user?.username || 'Student'}</span>
                  <small>Recent transaction</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="data-card small">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <button className="action-tile" onClick={() => navigate("/addCourse")}>
              <PlusSquare />
              <span>New Course</span>
            </button>

            <button className="action-tile" onClick={() => navigate("/PostBlogs")}>
              <FileText />
              <span>Write Blog</span>
            </button>
            <button className="action-tile" onClick={() => navigate("/AdminAddExam")}>
              <ClipboardList size={24} />
              <span>Add Exam</span>
            </button>
            <button className="action-tile" onClick={() => navigate("/PaymentDetails")}>
              <CreditCard />
              <span>Finance</span>
            </button>
            <button className="action-tile" onClick={() => navigate("/registeruser")}>
              <Users />
              <span>Manage Users</span>
            </button>
            <button className="action-tile highlight" onClick={() => navigate("/registeradmin")}>
              <ShieldCheck />
              <span>Register Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
