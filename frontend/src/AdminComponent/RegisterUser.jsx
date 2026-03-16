import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../Components/BaseUrl";
import {
  Users,
  Search,
  Mail,
  Phone,
  User as UserIcon,
  ShieldCheck,
  Filter,
  ArrowUpDown,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import "../AdminStyles/RegisterUsers.css";

const RegisterUser = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const [studentsRes, adminsRes] = await Promise.all([
          BaseUrl.get("/registerstudents", { headers: { Authorization: `Bearer ${token}` } }),
          BaseUrl.get("/login/registeradmin", { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] }))
        ]);

        const allUsers = [...studentsRes.data, ...(Array.isArray(adminsRes.data) ? adminsRes.data : [])];
        setStudents(allUsers);
        setFilteredStudents(allUsers);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) setError("Unauthorized. Please login again.");
        else if (err.response?.status === 403) setError("Access denied.");
        else setError("Failed to fetch user directory.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let results = students.filter(student => {
      const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.username?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === "All" || student.role?.toLowerCase() === roleFilter.toLowerCase();
      
      return matchesSearch && matchesRole;
    });

    if (sortBy === "Name") {
      results.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortBy === "Recent") {
      results.sort((a, b) => (b.id || 0) - (a.id || 0));
    }

    setFilteredStudents(results);
  }, [searchTerm, students, roleFilter, sortBy]);

  if (loading) return (
    <div className="users-loading-viewport">
      <div className="users-loader"></div>
      <p>Loading member directory...</p>
    </div>
  );

  if (error) return (
    <div className="users-error-viewport">
      <div className="users-error-card">
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="users-management-container">
      {/* HEADER SECTION */}
      <div className="users-header">
        <div className="header-left">
          <div className="icon-badge">
            <Users size={24} />
          </div>
          <div className="header-text">
            <h1>User Directory</h1>
            <p>Manage and monitor all registered students and administrators.</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-pill">
            <span className="stat-value">{students.length}</span>
            <span className="stat-label">Total Users</span>
          </div>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="users-controls">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, email or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-actions">
          <div className="dropdown-container">
            <button className={`control-btn ${roleFilter !== "All" ? "active" : ""}`} onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}>
              <Filter size={16} />
              <span>{roleFilter === "All" ? "Filter" : roleFilter}</span>
            </button>
            {isFilterOpen && (
              <div className="dropdown-menu">
                <button onClick={() => { setRoleFilter("All"); setIsFilterOpen(false); }}>All Roles</button>
                <button onClick={() => { setRoleFilter("Admin"); setIsFilterOpen(false); }}>Admin</button>
                <button onClick={() => { setRoleFilter("Student"); setIsFilterOpen(false); }}>Student</button>
              </div>
            )}
          </div>

          <div className="dropdown-container">
            <button className="control-btn" onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}>
              <ArrowUpDown size={16} />
              <span>Sort: {sortBy}</span>
            </button>
            {isSortOpen && (
              <div className="dropdown-menu">
                <button onClick={() => { setSortBy("Newest"); setIsSortOpen(false); }}>Newest First</button>
                <button onClick={() => { setSortBy("Name"); setIsSortOpen(false); }}>Name (A-Z)</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Contact Info</th>
              <th>System Details</th>
              <th>Role</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  <div className="empty-msg">
                    <Search size={40} />
                    <p>No matching users found for "{searchTerm}"</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id} onClick={() => navigate(`/singleuserdetails/${student.id}`)}>
                  <td>
                    <div className="member-cell">
                      <div className="member-avatar">
                        {student.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="member-info">
                        <span className="member-name">{student.name}</span>
                        <span className="member-id">ID: #{student.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-cell">
                      <div className="contact-item">
                        <Mail size={14} />
                        <span>{student.email}</span>
                      </div>
                      <div className="contact-item">
                        <Phone size={14} />
                        <span>{student.phonenumber || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="system-cell">
                      <div className="system-item">
                        <UserIcon size={14} />
                        <span>{student.username}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${student.role?.toLowerCase()}`}>
                      <ShieldCheck size={12} />
                      {student.role}
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="view-btn">
                      <span>Full Profile</span>
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisterUser;