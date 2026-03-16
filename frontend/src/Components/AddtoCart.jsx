import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  CreditCard, 
  ShoppingCart,
  BookOpen,
  Info
} from "lucide-react";
import { useAuth } from "./Authprovider";
import BaseUrl from "../Components/BaseUrl";
import "../Styles/AddtoCart.css";

const AddtoCart = () => {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await BaseUrl.get("getcart");
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  /* ================= FETCH IMAGES ================= */
  const loadImages = async (cartItems) => {
    const imageMap = {};
    await Promise.all(
      cartItems.map(async (item) => {
        if (!item.course || !item.course.id) return;
        try {
          const res = await BaseUrl.get(`getimage/${item.course.id}`, {
            responseType: "blob",
          });
          imageMap[item.course.id] = URL.createObjectURL(res.data);
        } catch (err) {
          console.error("Image load failed for course:", item.course.id);
        }
      })
    );
    setImages((prev) => ({ ...prev, ...imageMap }));
  };

  useEffect(() => {
    if (cart.length > 0) {
      loadImages(cart);
    }
  }, [cart]);

  /* ================= CLEANUP IMAGE URLS ================= */
  useEffect(() => {
    return () => {
      Object.values(images).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  /* ================= DELETE CART ITEM ================= */
  const handleDeleteCart = async (cartId, e) => {
    e.stopPropagation();

    try {
      await BaseUrl.delete(`deletecart/${cartId}`);
      setCart((prev) => prev.filter((item) => item.id !== cartId));
    } catch (err) {
      console.error("Failed to delete cart item", err);
    }
  };

  /* ================= TOTAL PRICE ================= */
  const totalPrice = cart.reduce(
    (total, item) => total + (item.course?.price || 0),
    0
  );

  if (loading) {
    return (
      <div className="cart-page-wrapper">
        <div className="cart-container-premium" style={{textAlign: 'center', paddingTop: '100px'}}>
           <div className="spinner"></div>
           <p style={{color: 'var(--text-muted)', marginTop: '20px'}}>Refreshing your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container-premium">
        
        {cart.length === 0 ? (
          <div className="empty-cart-showcase">
            <div className="empty-icon-wrap">
              <ShoppingBag size={48} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any courses yet. Start your learning journey today!</p>
            <Link to="/Courses" className="explore-btn">
              Explore Courses <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-header">
              <h1>Shopping Cart</h1>
              <span className="cart-count-badge">{cart.length} Courses</span>
            </div>

            <div className="cart-layout-grid">
              {/* LEFT: Items List */}
              <div className="cart-items-stack">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item-premium"
                    onClick={() => navigate(`/SingleCourseDetails/${item.course.id}`)}
                  >
                    <div className="item-visual-wrap">
                      <img
                        src={images[item.course.id] || "https://via.placeholder.com/400x250"}
                        alt={item.course.title}
                        className="item-image"
                      />
                    </div>

                    <div className="item-info">
                      <div className="item-meta">
                        <h3>{item.course.title}</h3>
                        <p className="item-desc">{item.course.description}</p>
                      </div>

                      <div className="item-controls">
                        <span className="item-price">₹{item.course.price.toLocaleString()}</span>
                        <button
                          className="remove-action-btn"
                          onClick={(e) => handleDeleteCart(item.id, e)}
                        >
                          <Trash2 size={16} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT: Order Summary */}
              <aside className="order-summary-sidebar">
                <h2 className="summary-title">Order Summary</h2>
                
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Courses ({cart.length})</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Platform Fee</span>
                    <span style={{color: 'var(--success)'}}>FREE</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax</span>
                    <span>Included</span>
                  </div>
                  
                  <div className="summary-row total">
                    <span>Total Amount</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>

                  <button
                    className="premium-checkout-btn"
                    onClick={() => navigate("/checkout")}
                  >
                    <CreditCard size={20} /> Checkout Now
                  </button>
                  
                  <p style={{ 
                    textAlign: 'center', 
                    fontSize: '0.8rem', 
                    color: 'var(--text-muted)', 
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}>
                    <Info size={12} /> Secure Checkout by Razorpay
                  </p>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddtoCart;
