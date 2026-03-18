import React, { useEffect, useState } from "react";
import { useAuth } from "../Components/Authprovider";
import { useToast } from "../Components/ToastContext";
import BaseUrl from "../Components/BaseUrl";
import { 
  Trash2, 
  Image as ImageIcon, 
  Plus, 
  Layout, 
  AlertCircle,
  Eye,
  Info
} from "lucide-react";
import "../Styles/Crouseldelete.css";

const CarouselList = () => {
  const { token } = useAuth();
  const { showConfirm } = useToast();
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCarousels = async () => {
    try {
      const res = await BaseUrl.get("/getcrouselimagelist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCarousels(res.data);
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = await showConfirm("Are you sure you want to delete this banner?", "Confirm Deletion");
    if (!confirmed) return;
    try {
      await BaseUrl.delete(`/admin/deletecrousellist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCarousels((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="carousel-status-viewport">
        <div className="carousel-loader"></div>
        <p>Syncing gallery...</p>
      </div>
    );
  }

  return (
    <div className="carousel-management-viewport">
      {/* HEADER */}
      <div className="carousel-header">
        <div className="header-info">
          <div className="icon-badge">
            <Layout size={24} />
          </div>
          <div className="text-group">
            <h1>Homepage Banners</h1>
            <p>Manage the visual presentation of your platform's carousel.</p>
          </div>
        </div>
        <div className="header-actions">
          <div className="stat-pill">
            <span className="val">{carousels.length}</span>
            <span className="lbl">Active Slides</span>
          </div>
        </div>
      </div>

      {/* GRID */}
      {carousels.length === 0 ? (
        <div className="carousel-empty-state">
          <div className="empty-visual">
            <AlertCircle size={48} />
          </div>
          <h3>No Banners Found</h3>
          <p>You haven't added any slides to the homepage carousel yet.</p>
        </div>
      ) : (
        <div className="carousel-grid">
          {carousels.map((item) => (
            <div key={item.id} className="carousel-card">
              <div className="card-media">
                <img src={item.image_path} alt={item.title} />
                <div className="card-overlay">
                  <button className="preview-btn" title="View Full">
                    <Eye size={18} />
                  </button>
                </div>
              </div>
              <div className="card-content">
                <div className="content-main">
                  <div className="title-stack">
                    <span className="c-id">ID: #{item.id}</span>
                    <h4 className="c-title">{item.title || "Untitled Carousel Slide"}</h4>
                  </div>
                  <button 
                    className="delete-action-btn" 
                    onClick={() => handleDelete(item.id)}
                    title="Remove Slide"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="card-footer">
                   <div className="info-item">
                     <Info size={14} />
                     <span>Visible on Desktop & Mobile</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselList;
