import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../Components/BaseUrl";
import { useAuth } from "../Components/Authprovider";
import {
  Users,
  CreditCard,
  ArrowUpDown,
  History,
  ChevronRight,
  Filter,
  Search,
  Calendar,
  Clock
} from "lucide-react";
import "../AdminStyles/ViewAllActivity.css";

const ViewAllActivity = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [readIds, setReadIds] = useState(() => {
    const saved = localStorage.getItem("admin_read_notif_ids");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchAllActivities = async () => {
      try {
        const [usersRes, paymentsRes] = await Promise.all([
          BaseUrl.get("/registerstudents", { headers: { Authorization: `Bearer ${token}` } }),
          BaseUrl.get("/admin/mypayment", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const userActs = usersRes.data.map(u => ({
          id: `user-${u.id}`,
          type: "USER_REG",
          title: "New User Registered",
          message: `${u.name || u.username} joined the platform as a student.`,
          time: "Recently",
          date: "N/A",
          isRead: readIds.includes(`user-${u.id}`),
          numericId: u.id,
          raw: u
        }));

        const payActs = paymentsRes.data.map(p => ({
          id: `pay-${p.id}`,
          type: "COURSE_BUY",
          title: "Course Purchased",
          message: `${p.user?.username || 'User'} successfully purchased ${p.course?.course_Name || 'the course'}.`,
          time: p.time || "N/A",
          date: p.date || "Today",
          isRead: readIds.includes(`pay-${p.id}`),
          numericId: p.id,
          raw: p
        }));

        const combined = [...userActs, ...payActs];
        setActivities(combined);
        setFilteredActivities(combined);
      } catch (err) {
        console.error("Failed to fetch activity history", err);
        setError("Unable to load activity history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllActivities();
  }, [token, readIds]);

  useEffect(() => {
    let results = activities.filter(act => {
      const matchesSearch = act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            act.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "All" || act.type === filterType;
      return matchesSearch && matchesType;
    });

    if (sortBy === "Newest") {
      results.sort((a, b) => b.numericId - a.numericId);
    } else if (sortBy === "Oldest") {
      results.sort((a, b) => a.numericId - b.numericId);
    }

    setFilteredActivities(results);
  }, [searchTerm, activities, filterType, sortBy]);

  const handleMarkAsRead = (id) => {
    if (!readIds.includes(id)) {
      const newReadIds = [...readIds, id];
      setReadIds(newReadIds);
      localStorage.setItem("admin_read_notif_ids", JSON.stringify(newReadIds));
    }
  };

  if (loading) return (
    <div className="activity-status-container">
      <div className="premium-loader"></div>
      <p>Retrieving platform history...</p>
    </div>
  );

  return (
    <div className="activity-page-container">
      <header className="activity-page-header">
        <div className="header-left">
          <div className="icon-badge">
            <History size={24} />
          </div>
          <div className="header-text">
            <h1>Activity Logs</h1>
            <p>Monitor system-wide events, registrations, and transactions.</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-val">{activities.length}</span>
            <span className="stat-lab">Total Events</span>
          </div>
        </div>
      </header>

      <div className="activity-controls">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search activities..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <div className="control-item">
            <Filter size={16} />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All Types</option>
              <option value="USER_REG">Registrations</option>
              <option value="COURSE_BUY">Purchases</option>
            </select>
          </div>

          <div className="control-item">
            <ArrowUpDown size={16} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="activity-list">
        {filteredActivities.length === 0 ? (
          <div className="empty-activity">
            <History size={48} />
            <p>No activities found matching your criteria.</p>
          </div>
        ) : (
          filteredActivities.map((act) => (
            <div 
              key={act.id} 
              className={`activity-card ${act.isRead ? 'read' : 'unread'} ${act.type}`}
              onClick={() => handleMarkAsRead(act.id)}
            >
              <div className="card-indicator"></div>
              <div className="act-icon-box">
                {act.type === 'USER_REG' ? <Users size={20} /> : <CreditCard size={20} />}
              </div>
              
              <div className="act-main-content">
                <div className="act-top-row">
                  <h3>{act.title}</h3>
                  {!act.isRead && <span className="new-tag">New</span>}
                </div>
                <p>{act.message}</p>
                <div className="act-meta">
                  <span className="meta-item"><Calendar size={12} /> {act.date}</span>
                  <span className="meta-item"><Clock size={12} /> {act.time}</span>
                </div>
              </div>

              <div className="act-action">
                <button 
                  className="view-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (act.type === 'USER_REG') navigate('/registeruser');
                    else navigate('/paymentDetails');
                  }}
                >
                  Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewAllActivity;
